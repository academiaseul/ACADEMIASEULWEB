/* Bot que juega el capítulo 1 en el navegador, con los mismos botones que un alumno.
   Se pega en la consola de /aventura?prueba=1 con una partida nueva empezada y deja el
   avance en window.__bot: { hitos, fin, error }. Sirve para medir cuánto se demora el
   jugador en llegar a cada momento y para encontrar lo que se traba. */
(async function () {
  const a = window.__aventura, $ = (id) => document.getElementById(id), w = (ms) => new Promise((r) => setTimeout(r, ms));
  const bot = window.__bot = { hitos: [], fin: false, error: null, pasos: 0 };
  const t0 = performance.now();
  const hito = (txt) => bot.hitos.push(`${((performance.now() - t0) / 1000).toFixed(1)} s · ${txt}`);
  const vistos = new Set();
  const nuevo = (clave, txt) => { if (!vistos.has(clave)) { vistos.add(clave); hito(txt); } };
  const COMPRAR = 'uyu';
  try {
    for (let i = 0; i < 20000 && !bot.fin; i++) {
      bot.pasos = i;
      await w(60);
      if (a.est.misiones.q6 && a.est.misiones.q6.estado === 'hecha' && $('f-seguir')) { hito('fin del capítulo'); bot.fin = true; break; }
      if (a.modo === 'escena') { a.terminarCine(); continue; }
      if (a.modo === 'dialogo') {
        const ops = [...$('dlg-ops').children];
        const pendiente = ops.length && !ops.some((b) => b.classList.contains('bien'));
        if (pendiente) {
          const l = ops.find((b) => !b.disabled && !b.classList.contains('mal'));
          // Sin saber cuál es la buena: prueba en orden, como alguien que recién empieza
          if (l) l.click();
          continue;
        }
        $('globo').click();
        continue;
      }
      if (a.modo === 'batalla') {
        const seguir = $('bt-seguir');
        if (seguir) { nuevo('victoria', `primer duelo ganado (${a.est.letras.join(' ')})`); seguir.click(); continue; }
        if (!a.bat || a.bat.bloqueado) continue;
        const q = a.bat.q, b = [...document.querySelectorAll('#bt-ops button')].find((x) => x.textContent === q.respuesta && !x.disabled);
        if (b) b.click();
        continue;
      }
      if (a.modo === 'capa') {
        if ($('a-listo')) { const nombre = Object.keys(a.est.letreros).length; nuevo('letrero' + nombre, `letrero ${nombre} armado`); $('a-listo').click(); continue; }
        if ($('f-seguir')) { $('f-seguir').click(); continue; }
        if ($('a-poner')) {
          const arm = a.arm, [ini, voc, fin] = a.R.decompose(arm.sil[arm.i]);
          const toca = (parte, j) => { const b = document.querySelector(`[data-parte="${parte}"][data-j="${j}"]`); if (b && !b.classList.contains('sel')) b.click(); };
          toca('ini', ini); toca('voc', voc); if (arm.conFinal) toca('fin', fin);
          $('a-poner').click();
          await w(120);
          continue;
        }
        const pide = [...document.querySelectorAll('#t-ops .op')].find((b) => b.textContent.includes('주세요'));
        if (pide && !pide.disabled) { pide.click(); await w(100); continue; }
        const seguirC = [...$('tarjeta').querySelectorAll('button')].find((b) => b.textContent === 'Seguir comprando');
        if (seguirC) { seguirC.click(); continue; }
        const obj = document.querySelector(`[data-obj="${COMPRAR}"]`);
        if (obj && a.R.cuantos(a.est, COMPRAR) === 0 && !a.est.flags.despedida) { obj.click(); continue; }
        const c = $('tarjeta').querySelector('.cerrar');
        if (c) c.click();
        continue;
      }
      if (a.modo === 'mapa' && !a.jug.mov && !a.jug.ruta.length) {
        if (!a.paso) { bot.error = 'la guía no tiene siguiente paso'; break; }
        nuevo('paso:' + a.paso.texto, a.paso.texto);
        $('guia').click();
        await w(300);
      }
    }
    bot.resumen = { nivel: a.est.nivel, letras: a.est.letras.length, duelos: a.est.stats.duelos, misiones: Object.keys(a.est.misiones).filter((k) => a.est.misiones[k].estado === 'hecha').length };
    if (!bot.fin && !bot.error) bot.error = 'no terminó';
  } catch (e) { bot.error = String(e && e.stack || e); }
})();
