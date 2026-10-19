/*
  MISTIK - motor de la pagina.   *** NO TOCAR ESTE ARCHIVO ***
  Lee EDITAR-AQUI/ajustes.js y EDITAR-AQUI/carta.js y arma la pagina.
  Si la pagina se ve mal despues de editar, el problema esta en uno de esos dos archivos.
*/
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================= utilidades ================= */
  function norm(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function rico(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); }
  function partes(s) { return String(s).split('|').map(function (x) { return x.trim(); }); }
  function precio(p) {
    p = String(p || '').trim();
    if (!p) return '';
    if (/^\d+([.,]\d+)?$/.test(p)) return 'S/ ' + p.replace(',', '.');
    return p;
  }
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function hora12(min) {
    var h = Math.floor(min / 60), m = min % 60, suf = h >= 12 ? 'pm' : 'am';
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ':' + (m < 10 ? '0' : '') + m + ' ' + suf;
  }
  function aMinutos(txt, defecto) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(String(txt || '').trim());
    return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : defecto;
  }

  /* ================= ajustes (EDITAR-AQUI/ajustes.js) ================= */
  var A = {};
  try {
    (window.MISTIK_AJUSTES || '').split(/\r?\n/).forEach(function (linea) {
      linea = linea.trim();
      if (!linea || linea.charAt(0) === '#') return;
      var i = linea.indexOf(':');
      if (i < 1) return;
      A[norm(linea.slice(0, i))] = linea.slice(i + 1).trim();
    });
  } catch (e) { A = {}; }

  function aplicarAjustes() {
    // Enlaces
    document.querySelectorAll('[data-enlace]').forEach(function (el) {
      var v = A[norm(el.getAttribute('data-enlace'))];
      if (v) el.setAttribute('href', v);
    });

    // Textos
    document.querySelectorAll('[data-texto]').forEach(function (el) {
      var v = A[norm(el.getAttribute('data-texto'))];
      if (!v) return;
      var p = partes(v);
      if (el.hasAttribute('data-una-linea')) el.textContent = p.join(', ');
      else el.innerHTML = p.map(rico).join('<br>');
    });

    // Mapa
    var mapa = A['direccion del mapa'];
    var marco = document.querySelector('iframe[data-mapa]');
    if (mapa && marco) {
      marco.setAttribute('src', 'https://www.google.com/maps?q=' + encodeURIComponent(mapa) + '&hl=es&z=16&output=embed');
    }

    // Mostrar u ocultar botones
    document.querySelectorAll('[data-mostrar]').forEach(function (el) {
      var v = norm(A[norm(el.getAttribute('data-mostrar'))] || 'si');
      if (v === 'no' || v === 'n' || v === '0' || v === 'false') el.style.display = 'none';
    });
    var barra = document.getElementById('barra-movil');
    if (barra) {
      var visibles = Array.prototype.filter.call(barra.children, function (c) { return c.style.display !== 'none'; });
      if (visibles.length === 1) barra.style.gridTemplateColumns = '1fr';
    }

    // Tarjetas de la carta en el inicio
    var cont = document.querySelector('[data-tarjetas]');
    if (cont) {
      var tarjetas = [];
      var hay = false;
      for (var n = 1; n <= 8; n++) {
        var t = A['tarjeta ' + n];
        if (t === undefined) continue;
        hay = true;
        if (t) tarjetas.push(partes(t));
      }
      if (hay) {
        cont.innerHTML = tarjetas.map(function (p, i) {
          return '<a class="destacado' + (i === 1 ? ' destacado--oscuro' : '') + ' reveal" style="--d:' + (i * 0.08).toFixed(2) + 's" href="carta.html#' + esc(slug(p[4] || p[0])) + '">' +
            '<span class="destacado__cat">' + esc(p[0] || '') + '</span>' +
            '<span class="destacado__desc">' + esc(p[1] || '') + '</span>' +
            '<span class="destacado__pie"><span class="destacado__precio">' +
            (p[2] ? '<small>' + esc(p[2]) + '</small>' : '') + esc(precio(p[3])) + '</span>' +
            '<svg class="ico-flecha" aria-hidden="true"><use href="#flecha"/></svg></span></a>';
        }).join('');
      }
    }

    // Orden de las secciones del inicio
    var orden = A['orden inicio'];
    var bloques = document.querySelectorAll('[data-bloque]');
    if (orden && bloques.length) {
      var porNombre = {};
      bloques.forEach(function (b) { porNombre[norm(b.getAttribute('data-bloque'))] = b; });
      var padre = bloques[0].parentNode;
      var usados = {};
      orden.split(',').forEach(function (nombre) {
        var b = porNombre[norm(nombre)];
        if (b && !usados[norm(nombre)]) { padre.appendChild(b); usados[norm(nombre)] = true; }
      });
      Object.keys(porNombre).forEach(function (k) {
        if (!usados[k]) porNombre[k].style.display = 'none';
      });
    }
  }

  /* ================= carta (EDITAR-AQUI/carta.js) ================= */
  function parseCarta(txt) {
    var grupos = [], g = null, c = null, it = null, llevar = null;
    function grupoActual() {
      if (!g) { g = { titulo: 'Carta', etiqueta: '', frase: '', estilo: 'claro', cats: [] }; grupos.push(g); }
      return g;
    }
    txt.split(/\r?\n/).forEach(function (raw) {
      var l = raw.trim();
      if (!l || l.charAt(0) === '#') return;
      var p;
      if (l.indexOf('==') === 0) {
        p = partes(l.slice(2));
        g = { titulo: p[0] || '', etiqueta: p[1] || '', frase: p[2] || '', estilo: norm(p[3] || 'claro'), cats: [] };
        grupos.push(g); c = null; it = null;
      } else if (l.charAt(0) === '$') {
        llevar = partes(l.slice(1));
      } else if (l.indexOf('--') === 0) {
        c = { titulo: partes(l.slice(2))[0], nota: '', items: [], ficha: null, sabores: null };
        grupoActual().cats.push(c); it = null;
      } else if (!c) {
        return;
      } else if (l.charAt(0) === '~') {
        c.items.push({ sub: l.slice(1).trim() }); it = null;
      } else if (l.charAt(0) === '*') {
        c.nota += (c.nota ? ' ' : '') + l.slice(1).trim();
      } else if (l.indexOf('=>') === 0) {
        c.ficha = partes(l.slice(2));
      } else if (/^sabores\s*:/i.test(l)) {
        c.sabores = l.slice(l.indexOf(':') + 1).split(',').map(function (x) { return x.trim(); }).filter(Boolean);
      } else if (l.charAt(0) === '>') {
        if (it) { p = partes(l.slice(1)); it.vars.push({ n: p[0], p: p[1] || '' }); }
      } else {
        p = partes(l);
        it = { n: p[0], p: p[1] || '', d: p[2] || '', vars: [] };
        c.items.push(it);
      }
    });
    return { grupos: grupos, llevar: llevar };
  }

  function htmlItem(it) {
    if (it.sub) return '<p class="sub">' + esc(it.sub) + '</p>';
    var desc = it.d ? '<p class="item__desc">' + esc(it.d) + '</p>' : '';
    if (it.vars.length) {
      var vars = it.vars.map(function (v) {
        return '<div class="item__linea"><span class="item__nombre">' + esc(v.n) + '</span><span class="item__puntos" aria-hidden="true"></span><span class="item__precio">' + esc(precio(v.p)) + '</span></div>';
      }).join('');
      return '<article class="item reveal"><h4 class="item__nombre">' + esc(it.n) + '</h4>' + desc + '<div class="item__var">' + vars + '</div></article>';
    }
    return '<article class="item reveal"><div class="item__linea"><h4 class="item__nombre">' + esc(it.n) + '</h4>' +
      (it.p ? '<span class="item__puntos" aria-hidden="true"></span><span class="item__precio">' + esc(precio(it.p)) + '</span>' : '') +
      '</div>' + desc + '</article>';
  }

  function htmlCat(c) {
    var out = '<section class="cat" id="' + esc(slug(c.titulo)) + '" aria-label="' + esc(c.titulo) + '">' +
      '<div class="cat__cab reveal"><h3 class="cat__titulo">' + esc(c.titulo) + '</h3></div>';
    if (c.nota) out += '<p class="cat__nota">' + esc(c.nota) + '</p>';
    if (c.ficha || c.sabores) {
      out += '<div class="alitas reveal">';
      if (c.ficha) out += '<div class="alitas__precio"><strong>' + esc(precio(c.ficha[0])) + '</strong><span>' + esc(c.ficha[1] || '') + '</span></div>';
      if (c.sabores) out += '<ul class="sabores">' + c.sabores.map(function (s) { return '<li class="sabor">' + esc(s) + '</li>'; }).join('') + '</ul>';
      out += '</div>';
    }
    if (c.items.length) out += '<div class="items">' + c.items.map(htmlItem).join('') + '</div>';
    return out + '</section>';
  }

  function renderCarta() {
    var cont = document.getElementById('carta-contenido');
    if (!cont) return;
    try {
      var d = parseCarta(window.MISTIK_CARTA || '');
      if (!d.grupos.length) throw new Error('vacia');
      var clases = { profundo: ' banda--profunda', oscuro: ' banda--oscura' };
      cont.innerHTML = d.grupos.map(function (g, i) {
        return '<section class="banda' + (clases[g.estilo] || '') + '" aria-label="' + esc(g.titulo) + '"><div class="wrap">' +
          '<div class="grupo__cab reveal"><span class="grupo__num" aria-hidden="true">0' + (i + 1) + '</span>' +
          (g.etiqueta ? '<p class="eyebrow">' + esc(g.etiqueta) + '</p>' : '') +
          '<h2 class="h2">' + esc(g.titulo) + '</h2>' +
          (g.frase ? '<p>' + esc(g.frase) + '</p>' : '') + '</div>' +
          g.cats.map(htmlCat).join('') + '</div></section>';
      }).join('');

      var chips = '';
      d.grupos.forEach(function (g) {
        g.cats.forEach(function (c) { chips += '<a href="#' + esc(slug(c.titulo)) + '">' + esc(c.titulo) + '</a>'; });
      });
      if (document.getElementById('auraki')) chips += '<a href="#auraki">Makis, Auraki Roll</a>';
      var lista = document.querySelector('.cats__lista');
      if (lista) lista.innerHTML = chips;

      var barra = document.getElementById('llevar');
      if (barra) {
        if (d.llevar && d.llevar.length) {
          barra.innerHTML = '<div class="wrap">' + d.llevar.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>';
        } else {
          barra.style.display = 'none';
        }
      }
    } catch (e) {
      cont.innerHTML = '<div class="wrap carta-error"><p><strong>No se pudo leer la carta.</strong></p>' +
        '<p>Abre el archivo <b>EDITAR-AQUI/carta.js</b> y revisa que las comillas invertidas del inicio y del final sigan en su lugar. ' +
        'Si no encuentras el problema, vuelve a copiar la version original del archivo.</p></div>';
    }
  }

  /* ================= pasos ================= */
  aplicarAjustes();
  renderCarta();

  // Si se llego con un enlace a una categoria (carta.html#alitas), ir ahi una vez armada la carta
  if (location.hash && document.getElementById('carta-contenido')) {
    var destino = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (destino) setTimeout(function () { destino.scrollIntoView({ behavior: 'instant' }); }, 60);
  }

  // iOS: activa los estados :active (efecto al tocar) en botones y tarjetas
  document.addEventListener('touchstart', function () {}, { passive: true });

  // Barra superior: sombra al hacer scroll
  var topbar = document.getElementById('topbar');
  if (topbar) {
    var onScroll = function () { topbar.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Aparicion suave de bloques
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Barra de celular: en inicio aparece cuando los botones del hero salen de pantalla
  var barraMovil = document.getElementById('barra-movil');
  var heroAcciones = document.getElementById('hero-acciones');
  if (barraMovil && barraMovil.hasAttribute('data-ocultable')) {
    if (heroAcciones && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        barraMovil.classList.toggle('is-visible', !entries[0].isIntersecting);
      }).observe(heroAcciones);
    } else {
      barraMovil.classList.add('is-visible');
    }
  }

  // Estado: abierto / cerrado segun la hora de Lima
  var estado = document.getElementById('estado');
  var textoEstado = document.getElementById('estado-texto');
  if (estado && textoEstado) {
    try {
      var abre = aMinutos(A['abre'], 16 * 60), cierra = aMinutos(A['cierra'], 23 * 60 + 30);
      var fh = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Lima', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var h = 0, m = 0;
      fh.forEach(function (p) {
        if (p.type === 'hour') h = parseInt(p.value, 10) % 24;
        if (p.type === 'minute') m = parseInt(p.value, 10);
      });
      var min = h * 60 + m;
      if (min >= abre && min < cierra) {
        estado.classList.add('is-abierto');
        textoEstado.textContent = 'Abierto ahora, cerramos a las ' + hora12(cierra);
      } else if (min < abre) {
        textoEstado.textContent = 'Cerrado ahora, abrimos hoy a las ' + hora12(abre);
      } else {
        textoEstado.textContent = 'Cerrado ahora, abrimos mañana a las ' + hora12(abre);
      }
      estado.classList.add('is-visible');
    } catch (err) { /* sin Intl: no se muestra el estado */ }
  }

  /* ================= carta: barra de categorias ================= */
  var lista = document.querySelector('.cats__lista');
  if (!lista) return;

  var izq = document.querySelector('.cats__flecha--izq');
  var der = document.querySelector('.cats__flecha--der');
  var arrastrando = false;

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
    presionado = true; movido = false;
    inicioX = e.clientX; inicioScroll = lista.scrollLeft; punteroId = e.pointerId;
  });
  lista.addEventListener('pointermove', function (e) {
    if (!presionado) return;
    var dx = e.clientX - inicioX;
    if (!movido && Math.abs(dx) > 5) {
      movido = true; arrastrando = true;
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
    setTimeout(function () { arrastrando = false; }, 0);
  };
  lista.addEventListener('pointerup', soltar);
  lista.addEventListener('pointercancel', soltar);
  lista.addEventListener('click', function (e) {
    if (movido) { e.preventDefault(); e.stopPropagation(); movido = false; }
  }, true);
  lista.addEventListener('dragstart', function (e) { e.preventDefault(); });

  // Pista de deslizar: en pantallas tactiles la barra se mueve un poco, una sola vez
  if (!reduceMotion && window.matchMedia('(hover: none)').matches && !location.hash) {
    setTimeout(function () {
      if (lista.scrollLeft === 0 && lista.scrollWidth > lista.clientWidth) {
        lista.scrollTo({ left: 72, behavior: 'smooth' });
        setTimeout(function () { lista.scrollTo({ left: 0, behavior: 'smooth' }); }, 650);
      }
    }, 1400);
  }

  // Categoria activa mientras se hace scroll
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
      entries.forEach(function (e) { if (e.isIntersecting) activar(e.target.id); });
    }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });
    secciones.forEach(function (s) { spy.observe(s); });
  }
})();
