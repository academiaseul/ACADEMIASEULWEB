// Prueba rápida de Mercado Pago.
// Uso (NO guardes el token en ningún archivo):
//   Windows PowerShell:  $env:MP_ACCESS_TOKEN="TU_TOKEN"; node scripts/test-mp.mjs
//   Mac/Linux:           MP_ACCESS_TOKEN="TU_TOKEN" node scripts/test-mp.mjs
//
// Si funciona, imprime un link de checkout (init_point) que puedes abrir.
// Usa primero tu credencial de PRUEBA (empieza con TEST-).

import { MercadoPagoConfig, Preference } from 'mercadopago';

const token = process.env.MP_ACCESS_TOKEN;
if (!token) {
  console.error('❌ Falta MP_ACCESS_TOKEN. Pásalo como variable de entorno (no lo pegues en el archivo).');
  process.exit(1);
}

const esTest = token.startsWith('TEST-');
console.log(`🔑 Token detectado: ${esTest ? 'PRUEBA (TEST-)' : 'PRODUCCIÓN'} — termina en …${token.slice(-6)}`);

const client = new MercadoPagoConfig({ accessToken: token });
const preference = new Preference(client);

try {
  const res = await preference.create({
    body: {
      items: [
        {
          id: 'test-nivel-1',
          title: 'Academia Seúl · Nivel 1 (A1) — PRUEBA',
          quantity: 1,
          unit_price: 85000,
          currency_id: 'CLP',
        },
      ],
      metadata: { nombre: 'Alumno de Prueba', clase: 'Clase Martes' },
      external_reference: 'prueba@academiaseul.com',
    },
  });

  console.log('\n✅ ¡Conexión correcta! Mercado Pago creó la preferencia.');
  console.log('   ID:', res.id);
  console.log('   Checkout (ábrelo para probar el pago):');
  console.log('   ', res.init_point);
  if (res.sandbox_init_point) {
    console.log('   Sandbox:', res.sandbox_init_point);
  }
} catch (err) {
  console.error('\n❌ Error al conectar con Mercado Pago:');
  console.error('   ', err?.message || err);
  console.error('   Revisa que el token sea válido y de la misma cuenta/país (CLP para Chile).');
  process.exit(1);
}
