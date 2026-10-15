/* MISTIK · comportamiento mínimo. Las páginas funcionan completas sin este archivo. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Barra superior: sombra al hacer scroll
  var topbar = document.getElementById('topbar');
  if (topbar) {
    var onScroll = function () {
      topbar.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Aparición suave de bloques
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Barra de celular: en inicio aparece cuando los botones del hero salen de pantalla
  var barra = document.getElementById('barra-movil');
  var heroAcciones = document.getElementById('hero-acciones');
  if (barra && barra.hasAttribute('data-ocultable')) {
    if (heroAcciones && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        barra.classList.toggle('is-visible', !entries[0].isIntersecting);
      }).observe(heroAcciones);
    } else {
      barra.classList.add('is-visible');
    }
  }

  // Estado: abierto / cerrado según hora de Lima (Lun a Dom, 4:00 pm a 11:30 pm)
  var estado = document.getElementById('estado');
  var texto = document.getElementById('estado-texto');
  if (estado && texto) {
    try {
      var partes = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'America/Lima', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      var h = 0, m = 0;
      partes.forEach(function (p) {
        if (p.type === 'hour') h = parseInt(p.value, 10) % 24;
        if (p.type === 'minute') m = parseInt(p.value, 10);
      });
      var min = h * 60 + m;
      var abre = 16 * 60, cierra = 23 * 60 + 30;
      if (min >= abre && min < cierra) {
        estado.classList.add('is-abierto');
        texto.textContent = 'Abierto ahora, cerramos a las 11:30 pm';
      } else if (min < abre) {
        texto.textContent = 'Cerrado ahora, abrimos hoy a las 4:00 pm';
      } else {
        texto.textContent = 'Cerrado ahora, abrimos mañana a las 4:00 pm';
      }
      estado.classList.add('is-visible');
    } catch (err) { /* sin Intl: no se muestra el estado */ }
  }

  // ───── Carta: barra de categorías ─────
  var lista = document.querySelector('.cats__lista');
  if (!lista) return;

  var izq = document.querySelector('.cats__flecha--izq');
  var der = document.querySelector('.cats__flecha--der');
  var arrastrando = false;

  // Desvanecidos en los bordes y estado de las flechas
  var actualizarBordes = function () {
    var max = lista.scrollWidth - lista.clientWidth;
    var x = lista.scrollLeft;
    lista.style.setProperty('--fi', x > 4 ? '28px' : '0px');
    lista.style.setProperty('--fd', x < max - 4 ? '28px' : '0px');
    if (izq) izq.disabled = x <= 4;
    if (der) der.disabled = x >= max - 4;
  };
  lista.addEventListener('scroll', actualizarBordes, { passive: true });
  window.addEventListener('resize', actualizarBordes);
  actualizarBordes();

  var mover = function (dir) {
    lista.scrollBy({ left: dir * lista.clientWidth * 0.7, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  if (izq) izq.addEventListener('click', function () { mover(-1); });
  if (der) der.addEventListener('click', function () { mover(1); });

  // Arrastrar con el mouse
  var inicioX = 0, inicioScroll = 0, presionado = false, movido = false, punteroId = null;
  lista.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    presionado = true;
    movido = false;
    inicioX = e.clientX;
    inicioScroll = lista.scrollLeft;
    punteroId = e.pointerId;
  });
  lista.addEventListener('pointermove', function (e) {
    if (!presionado) return;
    var dx = e.clientX - inicioX;
    if (!movido && Math.abs(dx) > 5) {
      movido = true;
      arrastrando = true;
      lista.classList.add('is-arrastrando');
      try { lista.setPointerCapture(punteroId); } catch (err) {}
    }
    if (movido) lista.scrollLeft = inicioScroll - dx;
  });
  var soltar = function () {
    if (!presionado) return;
    presionado = false;
    lista.classList.remove('is-arrastrando');
    try { lista.releasePointerCapture(punteroId); } catch (err) {}
    // Deja pasar un ciclo para que el click que sigue al arrastre se descarte
    setTimeout(function () { arrastrando = false; }, 0);
  };
  lista.addEventListener('pointerup', soltar);
  lista.addEventListener('pointercancel', soltar);
  lista.addEventListener('click', function (e) {
    if (movido) { e.preventDefault(); e.stopPropagation(); movido = false; }
  }, true);
  lista.addEventListener('dragstart', function (e) { e.preventDefault(); });

  // Categoría activa mientras se hace scroll
  var chips = lista.querySelectorAll('a[href^="#"]');
  if (chips.length && 'IntersectionObserver' in window) {
    var porId = {};
    chips.forEach(function (a) { porId[a.getAttribute('href').slice(1)] = a; });
    var secciones = Object.keys(porId).map(function (id) { return document.getElementById(id); }).filter(Boolean);

    var activar = function (id) {
      chips.forEach(function (a) {
        var on = a === porId[id];
        a.classList.toggle('is-activa', on);
        if (on) {
          a.setAttribute('aria-current', 'true');
          if (!arrastrando && !presionado) {
            var objetivo = a.offsetLeft - lista.clientWidth / 2 + a.clientWidth / 2;
            lista.scrollTo({ left: objetivo, behavior: reduceMotion ? 'auto' : 'smooth' });
          }
        } else {
          a.removeAttribute('aria-current');
        }
      });
    };

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) activar(e.target.id);
      });
    }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });
    secciones.forEach(function (s) { spy.observe(s); });
  }
})();
