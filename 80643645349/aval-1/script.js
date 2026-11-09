<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Duplo — Jogo da Memória</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --fundo: #f5f0e7;
      --texto: #292b25;
      --suave: #696b61;
      --laranja: #c94b26;
      --linha: #d9d4c8;
      --verde: #345c44;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      background: var(--fundo);
      color: var(--texto);
      font-family: "Space Grotesk", sans-serif;
    }

    button { font: inherit; cursor: pointer; }

    button:focus-visible {
      outline: 3px solid var(--laranja);
      outline-offset: 5px;
    }

    .pagina { width: min(1100px, 90%); margin: auto; }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 24px 0;
      border-bottom: 1px solid var(--linha);
    }

    .marca {
      font-family: "Outfit", sans-serif;
      font-weight: 800;
      font-size: 28px;
      letter-spacing: -1px;
    }

    .marca span { color: var(--laranja); }

    .edicao {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    main {
      display: grid;
      gap: 36px;
      padding: 42px 0;
    }

    .introducao { animation: entrar .6s both; }

    .etiqueta {
      color: var(--laranja);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    h1 {
      font: 800 clamp(55px, 8vw, 90px)/.98 "Outfit", sans-serif;
      letter-spacing: -4px;
      margin: 25px 0;
    }

    h1 span { color: var(--laranja); }

    .descricao {
      max-width: 330px;
      color: var(--suave);
      line-height: 1.8;
      font-size: 15px;
    }

    .regras {
      padding: 22px 0;
      margin-top: 30px;
      border-top: 1px solid var(--linha);
      border-bottom: 1px solid var(--linha);
      max-width: 330px;
    }

    .regra {
      display: flex;
      gap: 15px;
      align-items: baseline;
      margin: 12px 0;
      font-size: 13px;
      color: var(--suave);
    }

    .regra b { color: var(--laranja); font-size: 11px; }

    .area-jogo { min-width: 0; animation: entrar .6s .12s both; }

    .placar {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 22px;
    }

    .placar span {
      display: block;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--suave);
      margin-bottom: 6px;
    }

    .placar strong {
      font-size: 27px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
    }

    .tabuleiro {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    .carta {
      position: relative;
      aspect-ratio: 1;
      border: 0;
      padding: 0;
      border-radius: 7px;
      background: transparent;
      perspective: 700px;
      transition: transform .2s;
    }

    .carta:hover:not(:disabled) { transform: translateY(-4px); }
    .carta:active:not(:disabled) { transform: scale(.96); }

    .interior {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      transition: transform .4s;
    }

    .carta.aberta .interior,
    .carta.encontrada .interior { transform: rotateY(180deg); }

    .face {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      border-radius: 7px;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    .verso {
      background:
        repeating-linear-gradient(45deg, transparent 0 12px, #ffffff0b 12px 13px),
        var(--laranja);
      border: 1px solid #ad3b1a;
      color: #fff4dd;
    }

    .verso span {
      font-family: "Outfit", sans-serif;
      font-size: clamp(30px, 5vw, 49px);
      font-weight: 600;
    }

    .frente {
      background: #fffdf7;
      border: 1px solid var(--linha);
      transform: rotateY(180deg);
      font-size: clamp(28px, 5vw, 44px);
      color: var(--laranja);
    }

    .carta.encontrada .frente {
      background: #e1e9d9;
      border-color: #adc0a5;
      color: var(--verde);
    }

    .barra {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    #mensagem {
      font-size: 12px;
      color: var(--suave);
      line-height: 1.6;
      margin: 0;
    }

    .reiniciar {
      flex-shrink: 0;
      padding: 12px 16px;
      border: 1px solid var(--texto);
      border-radius: 4px;
      background: transparent;
      color: var(--texto);
      font-size: 12px;
      transition: background .2s, color .2s, transform .2s;
    }

    .reiniciar:hover { background: var(--texto); color: var(--fundo); }
    .reiniciar:active { transform: scale(.96); }

    footer {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding: 22px 0;
      border-top: 1px solid var(--linha);
      color: var(--suave);
      font-size: 11px;
      line-height: 1.6;
    }

    @keyframes entrar {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (min-width: 850px) {
      main {
        grid-template-columns: 1fr 1.25fr;
        gap: 80px;
        align-items: center;
        padding: 65px 0;
      }
    }

    @media (max-width: 480px) {
      .edicao { font-size: 9px; letter-spacing: 1px; }
      h1 { font-size: 60px; margin: 18px 0; }
      .regras { display: none; }
      .descricao { max-width: none; }
      main { padding: 28px 0; gap: 24px; }
      .tabuleiro { gap: 8px; }
      footer { flex-direction: column; gap: 4px; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="pagina">
    <header>
      <div class="marca">duplo<span>®</span></div>
      <div class="edicao">Uma pausa para a sua memória</div>
    </header>

    <main>
      <section class="introducao">
        <div class="etiqueta">Jogo da memória / 01</div>
        <h1>Olhe.<br>Lembre.<br><span>Combine.</span></h1>
        <p class="descricao">
          Doze cartas, seis pares e um pequeno desafio.
          Encontre os símbolos iguais com o menor número de jogadas.
        </p>

        <div class="regras">
          <div class="regra"><b>01</b> Vire duas cartas por vez.</div>
          <div class="regra"><b>02</b> Símbolos iguais ficam abertos.</div>
          <div class="regra"><b>03</b> Encontre os seis pares para vencer.</div>
        </div>
      </section>

      <section class="area-jogo" aria-label="Jogo da memória">
        <div class="placar">
          <div><span>Jogadas</span><strong id="jogadas">00</strong></div>
          <div><span>Pares</span><strong id="pares">0 / 6</strong></div>
          <div><span>Tempo</span><strong id="tempo">00:00</strong></div>
        </div>

        <div class="tabuleiro" id="tabuleiro" aria-label="Cartas"></div>

        <div class="barra">
          <p id="mensagem" role="status" aria-live="polite">
            Vire uma carta para começar.
          </p>
          <button class="reiniciar" id="reiniciar" type="button">Novo jogo ↻</button>
        </div>
      </section>
    </main>

    <footer>
      <span>Feito com HTML, CSS e JavaScript.</span>
      <span>Teclado: Tab para navegar · Enter ou Espaço para virar.</span>
    </footer>
  </div>

  <script>
    const tabuleiro = document.getElementById("tabuleiro");
    const jogadasTexto = document.getElementById("jogadas");
    const paresTexto = document.getElementById("pares");
    const tempoTexto = document.getElementById("tempo");
    const mensagem = document.getElementById("mensagem");

    const simbolos = [
      { desenho: "✦", nome: "estrela" },
      { desenho: "●", nome: "círculo" },
      { desenho: "▲", nome: "triângulo" },
      { desenho: "♥", nome: "coração" },
      { desenho: "◆", nome: "losango" },
      { desenho: "✿", nome: "flor" }
    ];

    let primeira = null;
    let bloqueado = false;
    let jogadas = 0;
    let pares = 0;
    let inicio = null;
    let intervalo = null;
    let espera = null;

    function embaralhar(lista) {
      for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
      }
      return lista;
    }

    function atualizarTempo() {
      const segundos = inicio === null
        ? 0
        : Math.floor((Date.now() - inicio) / 1000);

      const minutos = Math.floor(segundos / 60);
      tempoTexto.textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundos % 60).padStart(2, "0");
    }

    function abrir(carta) {
      carta.classList.add("aberta");
      carta.setAttribute(
        "aria-label",
        `Carta ${carta.dataset.posicao}: ${carta.dataset.nome}`
      );
      carta.setAttribute("aria-pressed", "true");
    }

    function fechar(carta) {
      carta.classList.remove("aberta");
      carta.setAttribute(
        "aria-label",
        `Carta ${carta.dataset.posicao}, virada para baixo`
      );
      carta.setAttribute("aria-pressed", "false");
    }

    function virarCarta(carta) {
      if (
        bloqueado ||
        carta === primeira ||
        carta.classList.contains("encontrada")
      ) return;

      if (inicio === null) {
        inicio = Date.now();
        intervalo = setInterval(atualizarTempo, 250);
      }

      abrir(carta);

      if (primeira === null) {
        primeira = carta;
        mensagem.textContent = "Agora procure o par dessa carta.";
        return;
      }

      jogadas++;
      jogadasTexto.textContent = String(jogadas).padStart(2, "0");
      const anterior = primeira;
      primeira = null;

      if (anterior.dataset.simbolo === carta.dataset.simbolo) {
        pares++;
        paresTexto.textContent = `${pares} / 6`;

        [anterior, carta].forEach(item => {
          item.classList.add("encontrada");
          item.disabled = true;
          item.setAttribute(
            "aria-label",
            `Carta ${item.dataset.posicao}: ${item.dataset.nome}, par encontrado`
          );
        });

        mensagem.textContent = "Boa! Você encontrou um par.";

        if (pares === 6) {
          clearInterval(intervalo);
          atualizarTempo();
          mensagem.textContent =
            `Você venceu! ${jogadas} jogadas em ${tempoTexto.textContent}. 🎉`;
        }
      } else {
        bloqueado = true;
        mensagem.textContent = "Não foi dessa vez. Memorize os símbolos!";

        espera = setTimeout(() => {
          fechar(anterior);
          fechar(carta);
          bloqueado = false;
          mensagem.textContent = "Escolha mais duas cartas.";
        }, 1100);
      }
    }

    function novoJogo() {
      clearInterval(intervalo);
      clearTimeout(espera);

      primeira = null;
      bloqueado = false;
      jogadas = 0;
      pares = 0;
      inicio = null;

      jogadasTexto.textContent = "00";
      paresTexto.textContent = "0 / 6";
      tempoTexto.textContent = "00:00";
      mensagem.textContent = "Vire uma carta para começar.";
      tabuleiro.replaceChildren();

      const cartas = embaralhar([...simbolos, ...simbolos]);

      cartas.forEach((simbolo, indice) => {
        const carta = document.createElement("button");
        carta.type = "button";
        carta.className = "carta";
        carta.dataset.simbolo = simbolo.nome;
        carta.dataset.nome = simbolo.nome;
        carta.dataset.posicao = indice + 1;
        carta.setAttribute(
          "aria-label",
          `Carta ${indice + 1}, virada para baixo`
        );
        carta.setAttribute("aria-pressed", "false");

        carta.innerHTML = `
          <span class="interior" aria-hidden="true">
            <span class="face verso"><span>↔</span></span>
            <span class="face frente">${simbolo.desenho}</span>
          </span>
        `;

        carta.addEventListener("click", () => virarCarta(carta));
        tabuleiro.appendChild(carta);
      });
    }

    document.getElementById("reiniciar").addEventListener("click", novoJogo);
    novoJogo();
  </script>
</body>
</html>