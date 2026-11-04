/* Prueba del motor y del contenido de 호랑이의 모험.
   Uso: node Juego_RPG/prueba_motor.js
   Revisa que los mapas estén bien formados, que todo lo que nombra mundo.json exista,
   que cada letrero se pueda armar con letras que algún 도깨비 suelta, y juega el
   capítulo 1 de punta a punta sin pantalla. */
const path = require('path');
const assert = require('assert');
const RPG = require('../public/aventura/motor.js');
const MUNDO = require('../public/aventura/mundo.json');
const BANCO = require('../public/aventura/preguntas.json').preguntas;

let ok = 0;
function t(nombre, fn) {
  try { fn(); ok++; } catch (e) { console.error('✗', nombre, '\n ', e.message); process.exitCode = 1; }
}

/* ── Hangul ─────────────────────────────────────────────────────────── */
t('componer y descomponer', () => {
  assert.strictEqual(RPG.compose('ㅇ', 'ㅜ'), '우');
  assert.strictEqual(RPG.compose('ㅃ', 'ㅏ', 'ㅇ'), '빵');
  assert.deepStrictEqual(RPG.decompose('글'), ['ㄱ', 'ㅡ', 'ㄹ']);
  assert.deepStrictEqual(RPG.letrasDe('우유'), ['ㅇ', 'ㅜ', 'ㅠ']);
  assert.strictEqual(RPG.silabaDeLetra('ㄱ'), '가');
  assert.strictEqual(RPG.silabaDeLetra('ㅗ'), '오');
});
t('revisar sílaba: dice qué parte falló', () => {
  assert.ok(RPG.revisarSilaba('우', 'ㅇ', 'ㅜ', '').ok);
  const r = RPG.revisarSilaba('우', 'ㅇ', 'ㅗ', '', 0);
  assert.ok(!r.ok && r.partes[0] === 'vocal' && !/Va ㅜ/.test(r.explicacion));
  assert.ok(/Va ㅜ/.test(RPG.revisarSilaba('우', 'ㅇ', 'ㅗ', '', 1).explicacion), 'al segundo error da la respuesta');
  assert.strictEqual(RPG.revisarSilaba('빵', 'ㅃ', 'ㅏ', '', 0).partes[0], 'final');
  assert.ok(/ㅇ muda/.test(RPG.revisarSilaba('오', 'ㄴ', 'ㅗ', '', 0).explicacion));
});

/* ── Contenido ─────────────────────────────────────────────────────── */
t('mapas rectangulares y con baldosas conocidas', () => {
  const conocidas = new Set('.,=:_-b~TRG#WVDd^FSCHLXh'.split(''));
  for (const [id, m] of Object.entries(MUNDO.mapas)) {
    const W = m.filas[0].length;
    m.filas.forEach((f, y) => {
      assert.strictEqual(f.length, W, `${id} fila ${y} mide ${f.length} y no ${W}`);
      for (const ch of f) assert.ok(conocidas.has(ch), `${id} fila ${y}: baldosa desconocida «${ch}»`);
    });
  }
});
t('NPC, letreros, portales e info en su lugar', () => {
  for (const [id, m] of Object.entries(MUNDO.mapas)) {
    for (const n of m.npcs) {
      assert.ok(MUNDO.npcs[n.id], `${id}: NPC ${n.id} no existe`);
      assert.ok(RPG.caminable(MUNDO, id, n.x, n.y), `${id}: NPC ${n.id} está sobre una baldosa que no se pisa (${n.x},${n.y})`);
    }
    for (const p of m.portales) {
      assert.strictEqual(RPG.baldosa(MUNDO, id, p.x, p.y), 'D', `${id}: portal en (${p.x},${p.y}) no es una puerta`);
      assert.ok(RPG.caminable(MUNDO, p.a.mapa, p.a.x, p.a.y), `${id}: el portal lleva a una baldosa que no se pisa`);
    }
    for (const z of m.zonas) {
      assert.ok(MUNDO.enemigos[z.enemigo], `zona de ${z.enemigo} sin enemigo`);
      let libres = 0;
      for (let y = z.y; y < z.y + z.h; y++) for (let x = z.x; x < z.x + z.w; x++) if (RPG.caminable(MUNDO, id, x, y)) libres++;
      assert.ok(libres >= z.n * 3, `zona de ${z.enemigo}: muy pocas baldosas libres (${libres})`);
    }
    for (const i of m.info) assert.ok(MUNDO.info[i.id], `info ${i.id} sin texto`);
  }
  for (const [id, l] of Object.entries(MUNDO.letreros)) {
    assert.strictEqual(RPG.baldosa(MUNDO, l.mapa, l.x, l.y), 'S', `letrero ${id} no está sobre una S`);
    assert.ok(MUNDO.misiones[l.mision], `letrero ${id}: misión ${l.mision} no existe`);
  }
  // Cada S del mapa es un letrero o un cartel de info
  for (const [id, m] of Object.entries(MUNDO.mapas)) m.filas.forEach((f, y) => [...f].forEach((ch, x) => {
    if (ch !== 'S') return;
    const es = Object.values(MUNDO.letreros).some((l) => l.mapa === id && l.x === x && l.y === y) || m.info.some((i) => i.x === x && i.y === y);
    assert.ok(es, `${id}: S suelta en (${x},${y})`);
  }));
});
t('todo se puede alcanzar caminando desde el inicio', () => {
  const ini = MUNDO.inicio;
  const m = MUNDO.mapas.plaza;
  const objetivos = [...m.npcs.map((n) => ({ x: n.x, y: n.y, que: n.id })), ...Object.entries(MUNDO.letreros).map(([id, l]) => ({ x: l.x, y: l.y, que: id })), ...m.portales.map((p) => ({ x: p.x, y: p.y, que: 'puerta' }))];
  for (const o of objetivos) assert.ok(RPG.ruta(MUNDO, 'plaza', ini, o, null), `no se llega a ${o.que} (${o.x},${o.y})`);
  for (const z of m.zonas) assert.ok(RPG.ruta(MUNDO, 'plaza', ini, { x: z.x + 1, y: z.y }, null) || RPG.ruta(MUNDO, 'plaza', ini, { x: z.x + 2, y: z.y + 1 }, null), `no se llega a la zona ${z.enemigo}`);
});
t('referencias de diálogos, misiones y objetos', () => {
  const lineas = [];
  for (const n of Object.values(MUNDO.npcs)) for (const d of n.dialogos) lineas.push(...d.lineas);
  lineas.push(...MUNDO.despedida);
  for (const l of lineas) {
    const a = l.accion || {};
    for (const id of [].concat(a.iniciar || [], a.completar || [])) assert.ok(MUNDO.misiones[id], `acción con misión ${id} inexistente`);
    for (const o of Object.keys(Object.assign({}, a.dar, a.quitar))) assert.ok(MUNDO.objetos[o], `acción con objeto ${o} inexistente`);
    if (a.tienda) assert.ok(MUNDO.tiendas[a.tienda]);
    if (a.duelo) assert.ok(MUNDO.enemigos[a.duelo]);
    if (l.elige) assert.ok(l.elige.opciones.some((o) => o.ok), 'una elección sin respuesta buena');
    if (l.elige) for (const o of l.elige.opciones) assert.ok(o.ok ? o.dice : o.porque, `opción «${o.ko}» sin explicación`);
  }
  for (const m of Object.values(MUNDO.misiones)) {
    for (const r of m.requiere || []) assert.ok(MUNDO.misiones[r]);
    for (const o of Object.keys((m.recompensa || {}).objetos || {})) assert.ok(MUNDO.objetos[o], `recompensa con ${o}`);
    assert.ok(MUNDO.npcs[m.da] && MUNDO.npcs[m.entrega]);
  }
  for (const t of Object.values(MUNDO.tiendas)) for (const o of t.objetos) assert.ok(MUNDO.objetos[o].pedir && MUNDO.objetos[o].noPedir);
});
t('cada enemigo tiene preguntas y cada letrero se puede armar', () => {
  for (const [id, e] of Object.entries(MUNDO.enemigos)) assert.ok(BANCO.filter((q) => e.niveles.includes(q.nivel)).length >= 8, `${id}: pocas preguntas`);
  const todas = new Set(['ㅇ']);
  for (const e of Object.values(MUNDO.enemigos)) for (const j of e.letras) todas.add(j);
  for (const [id, l] of Object.entries(MUNDO.letreros)) for (const j of RPG.letrasDe(l.palabra)) assert.ok(todas.has(j), `letrero ${id}: nadie suelta ${j}`);
});
t('preguntas bien formadas', () => {
  const ids = new Set();
  for (const q of BANCO) {
    assert.ok(!ids.has(q.id), `id repetido ${q.id}`); ids.add(q.id);
    assert.ok(q.instruccion && q.respuesta && q.distractores.length, `${q.id} incompleta`);
    assert.ok(!q.distractores.includes(q.respuesta), `${q.id}: la respuesta está entre los distractores`);
    assert.ok(q.explicacion, `${q.id} sin explicación`);
  }
});

/* ── Duelo ─────────────────────────────────────────────────────────── */
t('duelo: acertar golpea, fallar enseña y repite', () => {
  const est = RPG.crearEstado(MUNDO);
  const b = RPG.nuevaBatalla(MUNDO, est, 'verde', BANCO, 42);
  const q = RPG.preguntaActual(b);
  const mala = q.opciones.find((o) => o !== q.respuesta);
  const hp = est.hp;
  const r1 = RPG.responder(b, est, mala);
  assert.ok(!r1.correcta && est.hp === hp - MUNDO.enemigos.verde.atk && r1.explicacion);
  assert.strictEqual(RPG.responder(b, est, mala), null, 'una opción tachada no se puede volver a tocar');
  const r2 = RPG.responder(b, est, q.respuesta);
  assert.ok(r2.correcta && !r2.primera && r2.dano === Math.ceil(RPG.ataque(est) / 2));
  assert.ok(b.cola.filter((x) => x.id === q.id).length === 2, 'la pregunta fallada vuelve más adelante');
});
t('duelo: tres seguidas = zarpazo doble', () => {
  const est = RPG.crearEstado(MUNDO);
  const b = RPG.nuevaBatalla(MUNDO, est, 'jefe', BANCO, 7);
  const danos = [];
  for (let k = 0; k < 3; k++) danos.push(RPG.responder(b, est, RPG.preguntaActual(b).respuesta));
  assert.ok(!danos[0].critico && !danos[1].critico && danos[2].critico && danos[2].dano === RPG.ataque(est) * 2);
});
t('objetos de duelo: 부채, 연필 y 우산', () => {
  const est = RPG.crearEstado(MUNDO);
  RPG.agregar(est, 'buchae', 1); RPG.agregar(est, 'yeonpil', 1); RPG.agregar(est, 'usan', 1);
  const b = RPG.nuevaBatalla(MUNDO, est, 'azul', BANCO, 3);
  const r = RPG.usarObjeto(est, MUNDO, 'buchae', b);
  assert.ok(r.ok && b.ocultas.length === 1 && r.oculta !== RPG.preguntaActual(b).respuesta);
  assert.ok(RPG.usarObjeto(est, MUNDO, 'yeonpil', b).ok && b.pista);
  assert.ok(RPG.usarObjeto(est, MUNDO, 'usan', b).ok);
  const q = RPG.preguntaActual(b);
  const mala = q.opciones.find((o) => o !== q.respuesta && !b.ocultas.includes(o));
  const hp = est.hp;
  const res = RPG.responder(b, est, mala);
  assert.ok(res.escudo && est.hp === hp, 'el 우산 para el golpe');
  assert.ok(!RPG.usarObjeto(est, MUNDO, 'buchae', null).ok, 'sin duelo, el 부채 no se usa');
});
t('IA: persigue cuando te ve y vuelve a casa', () => {
  const rnd = RPG.azar(1);
  const en = { x: 5, y: 5, casaX: 5, casaY: 5, estado: 'quieto', t: 3, zona: { x: 0, y: 0, w: 10, h: 10 }, aturdido: 0 };
  const p = RPG.pensarEnemigo(en, { x: 8, y: 5 }, rnd);
  assert.strictEqual(en.estado, 'persigue'); assert.deepStrictEqual([p.x, p.y], [6, 5]);
  en.x = 12; en.y = 5;
  RPG.pensarEnemigo(en, { x: 20, y: 5 }, rnd);
  assert.strictEqual(en.estado, 'vuelve');
});

/* ── Repaso, racha y guía ─────────────────────────────────────────── */
const DIA = 86400000, AHORA = new Date(2026, 10, 3, 12, 0, 0).getTime();
t('repaso: fallar vuelve pronto, acertar aleja', () => {
  const est = RPG.crearEstado(MUNDO);
  const b = RPG.nuevaBatalla(MUNDO, est, 'verde', BANCO, 5, AHORA);
  const q = RPG.preguntaActual(b);
  RPG.responder(b, est, q.opciones.find((o) => o !== q.respuesta));
  assert.ok(est.repaso[q.id].e === 1 && est.repaso[q.id].c === 0 && est.repaso[q.id].p === AHORA + 600000, 'la caja 0 vuelve en 10 minutos');
  RPG.responder(b, est, q.respuesta);
  assert.strictEqual(est.repaso[q.id].v, 1, 'acertar después de fallar no cuenta como acierto');
  const q2 = RPG.preguntaActual(b);
  RPG.responder(b, est, q2.respuesta);
  assert.ok(est.repaso[q2.id].c === 1 && est.repaso[q2.id].p === AHORA + DIA, 'acertar al primer intento sube de caja');
  const otra = RPG.nuevaBatalla(MUNDO, est, 'verde', BANCO, 6, AHORA + 700000);
  assert.strictEqual(otra.cola[0].id, q.id, 'lo que venció va primero en el próximo duelo');
  assert.deepStrictEqual(RPG.debiles(est, BANCO, 5).map((x) => x.id), [q.id]);
});
t('duelo nuevo: de los niveles bajos a los altos', () => {
  const est = RPG.crearEstado(MUNDO);
  const b = RPG.nuevaBatalla(MUNDO, est, 'azul', BANCO, 11, AHORA);
  const niveles = b.cola.map((q) => q.nivel);
  assert.deepStrictEqual(niveles, niveles.slice().sort((x, y) => x - y));
});
t('el primer duelo suelta dos letras y deja armar el primer letrero', () => {
  const est = RPG.crearEstado(MUNDO), rnd = RPG.azar(3);
  for (const l of RPG.elegirDialogo(est, MUNDO, 'hana').lineas) RPG.aplicarAccion(est, MUNDO, l.accion);
  const gana = () => { const b = RPG.nuevaBatalla(MUNDO, est, 'verde', BANCO, 8, AHORA); while (!b.fin) RPG.responder(b, est, RPG.preguntaActual(b).respuesta); return RPG.botin(b, est, MUNDO, rnd, AHORA); };
  assert.strictEqual(gana().letras.length, 2);
  assert.strictEqual(RPG.siguientePaso(est, MUNDO).tipo, 'letrero');
  assert.strictEqual(gana().letras.length, 1, 'el segundo duelo vuelve a soltar una');
});
t('racha y 도깨비 dorado', () => {
  const est = RPG.crearEstado(MUNDO);
  assert.ok(!RPG.doradoDisponible(est, AHORA), 'sin nada que repasar no aparece');
  for (let k = 0; k < 6; k++) RPG.anotar(est, BANCO[k].id, false, AHORA);
  assert.ok(RPG.doradoDisponible(est, AHORA));
  const pasa = (ahora) => { const b = RPG.nuevaBatalla(MUNDO, est, 'oro', BANCO, 9, ahora); while (!b.fin) RPG.responder(b, est, RPG.preguntaActual(b).respuesta); return RPG.botin(b, est, MUNDO, RPG.azar(1), ahora); };
  const b = RPG.nuevaBatalla(MUNDO, est, 'oro', BANCO, 9, AHORA);
  assert.ok(b.cola.length === 5 && b.cola.every((q) => est.repaso[q.id]), 'el dorado solo pregunta lo ya visto');
  assert.strictEqual(pasa(AHORA).racha, 1);
  assert.ok(!RPG.doradoDisponible(est, AHORA + 1000), 'una vez al día');
  assert.ok(RPG.doradoDisponible(est, AHORA + DIA));
  assert.strictEqual(pasa(AHORA + DIA).racha, 2);
  assert.strictEqual(RPG.rachaViva(est, AHORA + DIA * 2), 2, 'al día siguiente sigue viva');
  assert.strictEqual(RPG.rachaViva(est, AHORA + DIA * 3), 0, 'dos días sin repasar la cortan');
  assert.strictEqual(pasa(AHORA + DIA * 4).racha, 1);
});
t('el dorado hace todas sus preguntas, aunque el tigre pegue fuerte', () => {
  const est = RPG.crearEstado(MUNDO);
  est.nivel = 20;
  for (let k = 0; k < 8; k++) RPG.anotar(est, BANCO[k].id, false, AHORA);
  const b = RPG.nuevaBatalla(MUNDO, est, 'oro', BANCO, 9, AHORA);
  assert.strictEqual(b.hp, b.hpMax);
  const q1 = RPG.preguntaActual(b), mala = q1.opciones.find((o) => o !== q1.respuesta);
  RPG.responder(b, est, mala);
  assert.strictEqual(b.cola.length, 6, 'la fallada vuelve');
  assert.strictEqual(b.hp, b.hpMax, 'y la barra se alarga, no baja');
  let respuestas = 0;
  while (!b.fin) { const anterior = b.hp; RPG.responder(b, est, RPG.preguntaActual(b).respuesta); respuestas++; assert.ok(b.hp < anterior); assert.ok(respuestas <= 6, 'no se queda pegado'); }
  assert.strictEqual(respuestas, 6, 'cinco preguntas más la que volvió');
  assert.strictEqual(b.fin, 'victoria');
});
t('una partida guardada antes de la guía y del repaso se puede cargar', () => {
  const vieja = RPG.crearEstado(MUNDO);
  delete vieja.repaso; delete vieja.racha; delete vieja.ajustes.musica; delete vieja.ajustes.cruz;
  const est = RPG.cargar(JSON.stringify(vieja), MUNDO);
  assert.ok(est.repaso && est.racha.n === 0 && est.ajustes.musica === true && est.ajustes.cruz === false);
  assert.ok(RPG.nuevaBatalla(MUNDO, est, 'verde', BANCO, 1).cola.length);
});

/* ── El capítulo completo, sin pantalla ───────────────────────────── */
t('capítulo 1 de punta a punta', () => {
  const est = RPG.crearEstado(MUNDO);
  const rnd = RPG.azar(99);
  const habla = (npc) => {
    const d = RPG.elegirDialogo(est, MUNDO, npc);
    assert.ok(d, `${npc} no tiene qué decir`);
    for (const l of d.lineas) RPG.aplicarAccion(est, MUNDO, l.accion);
    return d;
  };
  const gana = (tipo) => {
    const b = RPG.nuevaBatalla(MUNDO, est, tipo, BANCO, Math.floor(rnd() * 1e6));
    let vueltas = 0;
    while (!b.fin && vueltas++ < 100) RPG.responder(b, est, RPG.preguntaActual(b).respuesta);
    assert.strictEqual(b.fin, 'victoria');
    return RPG.botin(b, est, MUNDO, rnd);
  };
  const arma = (id) => {
    assert.deepStrictEqual(RPG.faltanLetras(est, MUNDO, id), [], `faltan letras para ${id}`);
    RPG.restaurarLetrero(est, MUNDO, id);
  };
  const ganaHastaTener = (tipo, letreros) => {
    let n = 0;
    while (letreros.some((l) => RPG.faltanLetras(est, MUNDO, l).length) && n++ < 30) gana(tipo);
    assert.ok(n < 30, `${tipo}: nunca soltó las letras de ${letreros}`);
  };
  const guia = () => RPG.siguientePaso(est, MUNDO);
  assert.deepStrictEqual([guia().tipo, guia().id], ['npc', 'hana']);
  habla('hana');
  assert.strictEqual(RPG.estadoMision(est, MUNDO, 'q1'), 'hecha');
  assert.deepStrictEqual([guia().tipo, guia().id], ['zona', 'verde']);
  assert.ok(est.letras.includes('ㅇ') && est.won === 3000);
  for (let k = 0; k < 3; k++) gana('verde');
  ganaHastaTener('verde', ['uyu', 'oi']);
  assert.strictEqual(guia().tipo, 'letrero');
  arma('uyu'); arma('oi');
  assert.strictEqual(RPG.estadoMision(est, MUNDO, 'q2'), 'lista');
  assert.strictEqual(guia().id, 'hana');
  habla('hana');
  assert.strictEqual(guia().id, 'halmeoni');
  assert.strictEqual(RPG.estadoMision(est, MUNDO, 'q3'), 'disponible');
  habla('halmeoni'); habla('doyun');
  assert.deepStrictEqual([guia().id, guia().mapa], ['jeomwon', 'tienda']);
  assert.ok(RPG.comprar(est, MUNDO, 'pyeonuijeom', 'uyu').ok);
  assert.deepStrictEqual([guia().tipo, guia().x, guia().y], ['salida', 5, 8]);
  for (const l of MUNDO.despedida) RPG.aplicarAccion(est, MUNDO, l.accion);
  assert.strictEqual(RPG.estadoMision(est, MUNDO, 'q3'), 'lista');
  habla('halmeoni');
  assert.strictEqual(RPG.estadoMision(est, MUNDO, 'q3'), 'hecha');
  assert.strictEqual(RPG.cuantos(est, 'uyu'), 0);
  for (let k = 0; k < 3; k++) gana('azul');
  ganaHastaTener('azul', ['gogi', 'namu', 'moja']);
  arma('gogi'); arma('namu'); arma('moja');
  habla('doyun'); habla('mateo');
  assert.deepStrictEqual([guia().tipo, guia().id], ['zona', 'morado']);
  for (let k = 0; k < 3; k++) gana('morado');
  ganaHastaTener('morado', ['keopi', 'ppang']);
  arma('keopi'); arma('ppang');
  habla('mateo');
  assert.strictEqual(RPG.estadoMision(est, MUNDO, 'q6'), 'disponible');
  habla('hana');
  assert.strictEqual(guia().id, 'jefe');
  const jefe = gana('jefe');
  assert.ok(jefe.eventos.length);
  assert.strictEqual(guia().tipo, 'letrero');
  arma('hangeul');
  habla('hana');
  assert.strictEqual(RPG.estadoMision(est, MUNDO, 'q6'), 'hecha');
  assert.strictEqual(guia(), null);
  console.log(`  capítulo jugado: nivel ${est.nivel}, ${est.letras.length} letras, ${est.stats.duelos} duelos, ${RPG.fmtWon(est.won)}`);
  // Guardar y cargar
  const otra = RPG.cargar(RPG.serializar(est), MUNDO);
  assert.deepStrictEqual(otra.letreros, est.letreros);
  assert.strictEqual(RPG.cargar('{roto', MUNDO), null);
});

console.log(`${ok} pruebas OK${process.exitCode ? ' · HAY FALLAS' : ''}`);
