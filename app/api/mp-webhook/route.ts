import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'hola.academiaseul@gmail.com';

export async function POST(req: NextRequest) {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) return NextResponse.json({ ok: true });

  try {
    // El id del pago puede venir en el query o en el body, según la notificación.
    const url = new URL(req.url);
    let type = url.searchParams.get('type') || url.searchParams.get('topic') || '';
    let paymentId =
      url.searchParams.get('data.id') || url.searchParams.get('id') || '';

    try {
      const body = await req.json();
      if (body?.type) type = body.type;
      if (body?.data?.id) paymentId = String(body.data.id);
    } catch {
      /* sin body JSON, usamos el query */
    }

    if (type !== 'payment' || !paymentId) {
      return NextResponse.json({ ok: true });
    }

    const client = new MercadoPagoConfig({ accessToken: token });
    const payment = await new Payment(client).get({ id: paymentId });

    if (payment.status === 'approved') {
      const m = (payment.metadata || {}) as Record<string, string>;
      const monto = `${payment.transaction_amount ?? ''} ${payment.currency_id ?? ''}`.trim();

      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Academia Seúl <onboarding@resend.dev>',
          to: OWNER_EMAIL,
          subject: `✅ PAGO APROBADO — ${m.nombre || payment.payer?.email || 'Alumno'} (Nivel 1)`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
              <div style="background:#16a34a;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
                <h1 style="color:#fff;margin:0;font-size:20px;">✅ Pago aprobado · Nivel 1</h1>
              </div>
              <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #eee;">
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tr><td style="padding:10px 8px;color:#888;width:140px;">Alumno</td><td style="padding:10px 8px;color:#111;font-weight:600;">${m.nombre || '—'}</td></tr>
                  <tr><td style="padding:10px 8px;color:#888;">Correo</td><td style="padding:10px 8px;color:#111;">${m.correo || payment.payer?.email || '—'}</td></tr>
                  <tr><td style="padding:10px 8px;color:#888;">WhatsApp</td><td style="padding:10px 8px;color:#111;">${m.whatsapp || '—'}</td></tr>
                  <tr><td style="padding:10px 8px;color:#888;">Clase</td><td style="padding:10px 8px;color:#111;font-weight:600;">${m.clase || '—'}</td></tr>
                  <tr><td style="padding:10px 8px;color:#888;">Monto</td><td style="padding:10px 8px;color:#111;">${monto}</td></tr>
                  <tr><td style="padding:10px 8px;color:#888;">N° de pago</td><td style="padding:10px 8px;color:#111;">${payment.id}</td></tr>
                </table>
                <p style="margin-top:16px;color:#16a34a;font-weight:600;">Cupo confirmado. Da la bienvenida al alumno 🎉</p>
              </div>
            </div>
          `,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('mp-webhook error', err);
    // Devolvemos 200 igual para que Mercado Pago no reintente en loop.
    return NextResponse.json({ ok: true });
  }
}

// Mercado Pago a veces verifica el endpoint con GET.
export async function GET() {
  return NextResponse.json({ ok: true });
}
