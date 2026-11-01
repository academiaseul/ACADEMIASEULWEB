import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import {
  CLP_LANZAMIENTO_MENSUAL,
  CLP_LANZAMIENTO_UNICO,
  PRECIO_LANZAMIENTO_MENSUAL,
  PRECIO_LANZAMIENTO_UNICO,
  PRECIO_MENSUAL,
  PRECIO_UNICO,
  enLanzamiento,
} from '@/lib/nivel1';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BASE =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.academiaseul.com';

// Precios en CLP (cuenta Mercado Pago Chile) · precio NORMAL: US$150 pago único / US$75 mensual (×2).
// Ajustables por env sin deploy.
// NOTA: se renombraron las vars (antes MP_PRICE_CLP) para que un valor viejo
// configurado en Vercel no cobre el monto de la cohorte anterior.
const PRICE_CLP_UNICO = Number(process.env.MP_PRICE_CLP_UNICO || 150000);
const PRICE_CLP_MENSUAL = Number(process.env.MP_PRICE_CLP_MENSUAL || 75000);

// Precio de lanzamiento de Básico 1 (US$120 / 2 × US$60 hasta el dom 8 nov 2026 23:59 Chile).
// Lo decide el SERVIDOR con `enLanzamiento()`, nunca el navegador: así nadie puede pedir el
// precio rebajado después del plazo, y el lunes 9 vuelve solo al precio normal sin deploy.
const PRICE_CLP_LANZ_UNICO = Number(
  process.env.MP_PRICE_CLP_LANZAMIENTO_UNICO || CLP_LANZAMIENTO_UNICO,
);
const PRICE_CLP_LANZ_MENSUAL = Number(
  process.env.MP_PRICE_CLP_LANZAMIENTO_MENSUAL || CLP_LANZAMIENTO_MENSUAL,
);

export async function POST(req: NextRequest) {
  const token = process.env.MP_ACCESS_TOKEN;

  // Si aún no se configuró el token, avisamos para que el front use el link estático.
  if (!token) {
    return NextResponse.json(
      { error: 'mp_not_configured' },
      { status: 503 },
    );
  }

  try {
    const body = await req.json();
    const { nombre, correo, whatsapp, clase, cohorteKey, plan } = body || {};

    if (!nombre || !correo) {
      return NextResponse.json(
        { error: 'Faltan datos del alumno (nombre y correo).' },
        { status: 400 },
      );
    }

    const esMensual = plan === 'mensual';
    const lanzamiento = enLanzamiento();
    const unitPrice = lanzamiento
      ? esMensual
        ? PRICE_CLP_LANZ_MENSUAL
        : PRICE_CLP_LANZ_UNICO
      : esMensual
        ? PRICE_CLP_MENSUAL
        : PRICE_CLP_UNICO;
    const usd = lanzamiento
      ? esMensual
        ? PRECIO_LANZAMIENTO_MENSUAL
        : PRECIO_LANZAMIENTO_UNICO
      : esMensual
        ? PRECIO_MENSUAL
        : PRECIO_UNICO;
    const planLabel = `${esMensual ? 'Cuota 1 de 2' : 'Pago único'} (US$${usd})${
      lanzamiento ? ' · precio de lanzamiento' : ''
    }`;

    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: `${cohorteKey || 'clase'}-${esMensual ? 'mensual' : 'unico'}${lanzamiento ? '-lanz' : ''}`,
            title: `Academia Seúl · ${clase || 'Curso de coreano'} — ${planLabel}`,
            description:
              'Curso de coreano en vivo · 8 clases · certificado incluido',
            quantity: 1,
            unit_price: unitPrice,
            currency_id: 'CLP',
          },
        ],
        payer: {
          name: nombre,
          email: correo,
        },
        metadata: {
          nombre,
          correo,
          whatsapp: whatsapp || '',
          clase: clase || '',
          cohorte_key: cohorteKey || '',
          plan: esMensual ? 'mensual' : 'unico',
        },
        external_reference: correo,
        back_urls: {
          success: `${BASE}/nivel-1?pago=success`,
          pending: `${BASE}/nivel-1?pago=pending`,
          failure: `${BASE}/nivel-1?pago=failure`,
        },
        auto_return: 'approved',
        notification_url: `${BASE}/api/mp-webhook`,
        statement_descriptor: 'ACADEMIA SEUL',
      },
    });

    const url = result.init_point || result.sandbox_init_point;
    if (!url) {
      return NextResponse.json(
        { error: 'No se pudo crear el pago.' },
        { status: 502 },
      );
    }
    return NextResponse.json({ url });
  } catch (err) {
    console.error('checkout error', err);
    return NextResponse.json(
      { error: 'Error al crear el pago.' },
      { status: 500 },
    );
  }
}
