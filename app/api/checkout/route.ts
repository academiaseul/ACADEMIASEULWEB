import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BASE =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.academiaseul.com';
// Precio en CLP (cuenta Mercado Pago Chile). Ajustable por env.
const PRICE_CLP = Number(process.env.MP_PRICE_CLP || 85000);

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
    const { nombre, correo, whatsapp, clase, cohorteKey } = body || {};

    if (!nombre || !correo) {
      return NextResponse.json(
        { error: 'Faltan datos del alumno (nombre y correo).' },
        { status: 400 },
      );
    }

    const client = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: `nivel-1-${cohorteKey || 'clase'}`,
            title: `Academia Seúl · Nivel 1 (A1) — ${clase || 'Clase'}`,
            description: 'Curso de coreano en vivo · Nivel 1 (A1)',
            quantity: 1,
            unit_price: PRICE_CLP,
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
