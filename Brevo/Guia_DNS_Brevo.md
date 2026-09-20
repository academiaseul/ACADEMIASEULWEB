# Guía · Autenticar academiaseul.com en Brevo (DKIM + DMARC) · 15 minutos

Sin esto, los correos salen "vía brevo" y Gmail/Outlook los mandan más seguido a promociones o spam. Con esto, salen como `hola@academiaseul.com` y llegan a la bandeja principal. Se hace **una sola vez**.

## 1. En Brevo (5 min)
1. Entra a **app.brevo.com** → arriba a la derecha tu nombre → **Senders, Domains & Dedicated IPs** (en español: *Remitentes, dominios e IPs*).
2. Pestaña **Domains** → **Add a domain** → escribe `academiaseul.com` → **Save**.
3. Elige **"I would like to authenticate this domain myself"** (autenticar yo mismo). Brevo te muestra **3 registros DNS**. Déjalos abiertos; se copian al paso 2. Serán de este tipo (los valores exactos los da Brevo; no los inventes):

| Tipo | Nombre / host | Valor |
|---|---|---|
| TXT | `brevo._domainkey` (a veces `mail._domainkey`) | `k=rsa; p=MIGf…` (clave DKIM larga) |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` |
| TXT | `@` (raíz) | `brevo-code:…` (verificación del dominio) |

## 2. En el DNS de academiaseul.com (5 min)
¿Dónde está el DNS? Si el sitio está en Netlify con "Netlify DNS", entra a **app.netlify.com → Domains → academiaseul.com → DNS settings**. Si el dominio lo administra el registrador (NIC Chile, GoDaddy, Namecheap…), entra ahí a **DNS / Zone editor**. (Si no sabes cuál: `nslookup -type=NS academiaseul.com` en la consola dice quién sirve el DNS.)

Por cada registro de Brevo: **Add record** → tipo **TXT** → en *Name/Host* pega el nombre **sin** `.academiaseul.com` (Netlify y la mayoría lo agregan solos; si el panel muestra el nombre completo, pega `brevo._domainkey.academiaseul.com`) → en *Value* pega el valor completo tal cual (si el panel pide comillas, las pone él) → TTL por defecto → **Save**.

No borres registros existentes (MX de Google Workspace, TXT de `v=spf1 …`, el TXT de Netlify). Si ya existe un `_dmarc`, **edítalo** en vez de crear otro: dos DMARC anulan el registro.

## 3. Verificar (5 min, a veces hasta 1 h)
1. Vuelve a Brevo → Domains → **Verify**. Si dice "pending", espera 10–30 min y repite (el DNS tarda en propagar).
2. Cuando aparezca **Authenticated ✓**: Senders → **Add a sender** → nombre `Jay · Academia Seúl`, correo `hola@academiaseul.com` → confirma con el correo que Brevo manda a esa casilla (tiene que existir en Google Workspace; si el buzón se llama distinto, usa ese).
3. Prueba: crea la campaña L1, **Send a test** a un Gmail tuyo → ábrelo → ⋮ → *Mostrar original*: debe decir `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`. Si DKIM falla, revisa que el nombre del registro no haya quedado duplicado (`brevo._domainkey.academiaseul.com.academiaseul.com`).

## Si hoy no alcanzas
Manda L1 desde `hola.academiaseul@gmail.com` (Senders → Add a sender → confirmar el correo; sin DNS). Funciona, pero Gmail marca "vía sendinblue/brevo" y baja un poco la entrega. Autentica el dominio **antes del lunes 28 (L4)**, que es el envío grande.

## Cuándo endurecer DMARC
Después de 2–3 envíos con `p=none` y sin fallos en los informes, cambia a `p=quarantine` (Brevo lo sugiere en la misma pantalla). No lo hagas en campaña.
