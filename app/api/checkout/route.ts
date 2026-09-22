import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BASE =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.academiaseul.com';

// Precios en CLP (cuenta Mercado Pago Chile) · cohorte octubre 2026.
// US$150 pago único / US$75 mensual (×2). Ajustables por env sin deploy.
// NOTA: se renombraron las vars (antes MP_PRICE_CLP) para que un valor viejo
// configurado en Netlify no cobre el monto de la cohorte anterior.
const PRICE_CLP_UNICO = Number(process.env.MP_PRICE_CLP_UNICO || 150000);
const PRICE_CLP_MENSUAL = Number(process.env.MP_PRICE_CLP_MENSUAL || 75000);

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
    const unitPrice = esMensual ? PRICE_CLP_MENSUAL : PRICE_CLP_UNICO;
    const planLabel = esMensual
      ? 'Cuota 1 de 2 (US$75)'
      : 'Pago único (US$150)';

    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: `oct-2026-${cohorteKey || 'clase'}-${esMensual ? 'mensual' : 'unico'}`,
            title: `Academia Seúl · ${clase || 'Curso de coreano'} — ${planLabel}`,
            description:
              'Curso de coreano en vivo · 8 semanas · cohorte octubre 2026 · certificado incluido',
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
