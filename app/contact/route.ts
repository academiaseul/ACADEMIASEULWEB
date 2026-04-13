import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, nivel, interes, mensaje } = body;

    if (!nombre || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'Academia Seúl <noreply@academiaseul.com>',
      to: 'hola.academiaseul@gmail.com',
      subject: `Nueva consulta de ${nombre} — Academia Seúl`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
          <div style="background: #C8001E; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Nueva consulta — Academia Seúl</h1>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px; width: 140px;">Nombre</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${nombre}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Teléfono</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${telefono || 'No indicado'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Nivel actual</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${nivel || 'No indicado'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Interés</td>
                <td style="padding: 12px 8px; color: #111; font-weight: 600;">${interes || 'No indicado'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; color: #888; font-size: 13px;">Mensaje</td>
                <td style="padding: 12px 8px; color: #111;">${mensaje || 'Sin mensaje adicional'}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #fff5f5; border-radius: 6px; border-left: 4px solid #C8001E;">
              <p style="margin: 0; color: #C8001E; font-weight: 600; font-size: 14px;">
                ¡Responde en menos de 24 horas para maximizar la conversión!
              </p>
            </div>
          </div>
          <p style="text-align: center; color: #bbb; font-size: 12px; margin-top: 16px;">
            Academia Seúl · Santiago de Chile · hola.academiaseul@gmail.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}
