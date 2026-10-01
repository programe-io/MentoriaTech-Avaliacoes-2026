(function () {
  const CSS = `
  @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Barlow:wght@400;500;600&display=swap");
  :root {
    --bg:#e3e9e4; --painel:#f3f6f3; --tinta:#14312d; --suave:#5d7470; --linha:#c5d1cb;
    --destaque:#2a46f0; --destaque-texto:#fff; --perigo:#b3261e;
    --fonte-num:"Barlow Condensed","Arial Narrow",sans-serif;
    --fonte-ui:"Barlow",system-ui,sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#0f1f1c; --painel:#172c28; --tinta:#e6efeb; --suave:#8fa8a2; --linha:#2a423d;
            --destaque:#7f93ff; --destaque-texto:#0f1f1c; --perigo:#ff8b82; }
  }
  *, *::before, *::after { box-sizing:border-box; }
  html { height:100%; }
  body { margin:0; min-height:100%; background:var(--bg); color:var(--tinta); font-family:var(--fonte-ui);
         display:grid; place-items:center; padding:24px 16px; }
  .cronometro { width:min(100%,420px); background:var(--painel); border:1px solid var(--linha);
                border-radius:28px; padding:28px 24px 20px; }
  .mostrador { position:relative; width:min(100%,320px); margin:0 auto; aspect-ratio:1; }
  .mostrador svg { width:100%; height:100%; transform:rotate(-90deg); }
  .trilho { fill:none; stroke:var(--linha); stroke-width:6; }
  .arco { fill:none; stroke:var(--destaque); stroke-width:6; stroke-linecap:round; }
  .leitura { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .tempo { font-family:var(--fonte-num); font-weight:600; font-size:clamp(3.2rem,17vw,4.6rem);
           line-height:1; font-variant-numeric:tabular-nums; }
  .centesimos { font-size:.55em; color:var(--destaque); }
  .estado { margin-top:8px; font-size:.9rem; color:var(--suave); }
  .controles { display:grid; grid-template-columns:1fr 1.4fr; gap:12px; margin-top:24px; }
  button { font:600 1rem var(--fonte-ui); min-height:52px; border-radius:16px; cursor:pointer;
           border:1px solid var(--linha); background:transparent; color:var(--tinta);
           transition:transform .12s ease, background-color .12s ease; }
  button:hover:not(:disabled) { background:var(--bg); }
  button:active:not(:disabled) { transform:scale(.97); }
  button:disabled { opacity:.4; cursor:not-allowed; }
  button:focus-visible { outline:3px solid var(--destaque); outline-offset:3px; }
  .principal { background:var(--destaque); border-color:var(--destaque); color:var(--destaque-texto); }
  .principal:hover:not(:disabled) { background:var(--destaque); filter:brightness(1.08); }
  .principal.pausar { background:transparent; color:var(--perigo); border-color:var(--perigo); }
  .voltas { list-style:none; margin:20px 0 0; padding:0; max-height:220px; overflow-y:auto; }
  .voltas:empty::before { content:"Toque em Volta para marcar parciais."; display:block; text-align:center;
                          color:var(--suave); font-size:.9rem; padding:8px 0; }
  .voltas li { display:grid; grid-template-columns:2.5rem 1fr auto; gap:8px; align-items:baseline;
               padding:10px 4px; border-top:1px solid var(--linha); font-variant-numeric:tabular-nums; }
  .voltas .n { color:var(--suave); font-size:.9rem; }
  .voltas .parcial { font-family:var(--fonte-num); font-weight:500; font-size:1.3rem; }
  .voltas .total { color:var(--suave); font-size:.9rem; }
  .voltas li.melhor .parcial { color:var(--destaque); }
  .voltas li.pior .parcial { color:var(--perigo); }
  @media (prefers-reduced-motion: reduce) { button { transition:none; } }
  `;

  const HTML = `
  <main class="cronometro">
    <div class="mostrador">
      <svg viewBox="0 0 300 300" aria-hidden="true">
        <circle class="trilho" cx="150" cy="150" r="140"/>
        <circle class="arco" cx="150" cy="150" r="140"/>
      </svg>
      <div class="leitura" role="timer" aria-live="off">
        <div class="tempo"><span data-min>00</span>:<span data-seg>00</span><span class="centesimos">.<span data-cent>00</span></span></div>
        <div class="estado" data-estado>Parado</div>
      </div>
    </div>
    <div class="controles">
      <button data-secundario disabled>Volta</button>
      <button data-principal class="principal">Iniciar</button>
    </div>
    <ol class="voltas" data-voltas></ol>
  </main>`;

  const estilo = document.createElement("style");
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  const raiz = document.getElementById("app") || document.body;
  raiz.innerHTML = HTML;

  const q = s => raiz.querySelector(s);
  const arco = q(".arco"), principal = q("[data-principal]"), secundario = q("[data-secundario]");
  const CIRC = 2 * Math.PI * 140;
  arco.style.strokeDasharray = CIRC;

  let inicio = 0, acumulado = 0, rodando = false, raf = 0, voltas = [], ultimaVolta = 0;

  const pad = n => String(n).padStart(2, "0");
  const partes = ms => ({ m: Math.floor(ms / 60000), s: Math.floor(ms / 1000) % 60, c: Math.floor(ms / 10) % 100 });
  const formatar = ms => { const p = partes(ms); return `${pad(p.m)}:${pad(p.s)}.${pad(p.c)}`; };
  const agora = () => acumulado + (rodando ? performance.now() - inicio : 0);

  function desenhar() {
    const ms = agora(), p = partes(ms);
    q("[data-min]").textContent = pad(p.m);
    q("[data-seg]").textContent = pad(p.s);
    q("[data-cent]").textContent = pad(p.c);
    arco.style.strokeDashoffset = CIRC * (1 - (ms % 60000) / 60000);
    if (rodando) raf = requestAnimationFrame(desenhar);
  }

  function alternar() {
    if (rodando) {
      acumulado += performance.now() - inicio;
      rodando = false;
      cancelAnimationFrame(raf);
      principal.textContent = "Continuar";
      principal.classList.remove("pausar");
      secundario.textContent = "Zerar";
      q("[data-estado]").textContent = "Pausado";
    } else {
      inicio = performance.now();
      rodando = true;
      raf = requestAnimationFrame(desenhar);
      principal.textContent = "Pausar";
      principal.classList.add("pausar");
      secundario.textContent = "Volta";
      secundario.disabled = false;
      q("[data-estado]").textContent = "Em andamento";
    }
  }

  function listar() {
    const ps = voltas.map(v => v.parcial), min = Math.min(...ps), max = Math.max(...ps);
    q("[data-voltas]").innerHTML = voltas.map((v, i) => {
      const cls = voltas.length > 2 ? (v.parcial === min ? "melhor" : v.parcial === max ? "pior" : "") : "";
      return `<li class="${cls}"><span class="n">${i + 1}</span><span class="parcial">${formatar(v.parcial)}</span><span class="total">${formatar(v.total)}</span></li>`;
    }).reverse().join("");
  }

  function acaoSecundaria() {
    if (rodando) {
      const t = agora();
      voltas.push({ parcial: t - ultimaVolta, total: t });
      ultimaVolta = t;
      listar();
    } else {
      acumulado = 0; ultimaVolta = 0; voltas = [];
      listar(); desenhar();
      principal.textContent = "Iniciar";
      secundario.textContent = "Volta";
      secundario.disabled = true;
      q("[data-estado]").textContent = "Parado";
    }
  }

  principal.addEventListener("click", alternar);
  secundario.addEventListener("click", acaoSecundaria);
  document.addEventListener("keydown", e => {
    if (e.code === "Space" && e.target === document.body) { e.preventDefault(); alternar(); }
  });

  desenhar();
})();