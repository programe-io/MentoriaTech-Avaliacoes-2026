
const tabuleiro = document.getElementById("tabuleiro");
const vezTexto = document.getElementById("vez");
const mensagem = document.getElementById("mensagem");

let casas = [];
let jogador = "vermelho";
let selecionada = null;
let movimentos = [];
let jogoAtivo = true;
let capturaObrigatoria = false;
let capturaContinua = false;

function iniciarJogo() {
  casas = Array.from({ length: 8 }, () => Array(8).fill(null));

  jogador = "vermelho";
  selecionada = null;
  movimentos = [];
  jogoAtivo = true;
  capturaObrigatoria = false;
  capturaContinua = false;

  for (let linha = 0; linha < 3; linha++) {
    for (let coluna = 0; coluna < 8; coluna++) {
      if ((linha + coluna) % 2 === 1) {
        casas[linha][coluna] = {
          cor: "preto",
          dama: false
        };
      }
    }
  }

  for (let linha = 5; linha < 8; linha++) {
    for (let coluna = 0; coluna < 8; coluna++) {
      if ((linha + coluna) % 2 === 1) {
        casas[linha][coluna] = {
          cor: "vermelho",
          dama: false
        };
      }
    }
  }

  desenhar();
}

function desenhar() {
  tabuleiro.innerHTML = "";

  for (let linha = 0; linha < 8; linha++) {
    for (let coluna = 0; coluna < 8; coluna++) {

      const casa = document.createElement("div");

      casa.className = "casa " +
        ((linha + coluna) % 2 === 0 ? "clara" : "escura");

      casa.dataset.linha = linha;
      casa.dataset.coluna = coluna;

      const peca = casas[linha][coluna];

      if (peca) {
        const elemento = document.createElement("div");

        elemento.className = "peca " +
          (peca.cor === "vermelho"
            ? "vermelha-peca"
            : "preta-peca");

        if (peca.dama) elemento.classList.add("dama");

        if (
          selecionada &&
          selecionada.linha === linha &&
          selecionada.coluna === coluna
        ) {
          elemento.classList.add("selecionada");
        }

        casa.appendChild(elemento);
      }

      const movimento = movimentos.find(m =>
        m.linha === linha && m.coluna === coluna
      );

      if (movimento) {
        const ponto = document.createElement("div");

        ponto.className = "movimento";

        if (movimento.captura) {
          ponto.classList.add("captura");
        }

        casa.appendChild(ponto);
      }

      casa.addEventListener("click", () => clicarCasa(linha, coluna));

      tabuleiro.appendChild(casa);
    }
  }

  atualizarInformacoes();
}

function direcoes(peca) {
  if (peca.dama) {
    return [
      [-1, -1], [-1, 1],
      [1, -1], [1, 1]
    ];
  }

  return peca.cor === "vermelho"
    ? [[-1, -1], [-1, 1]]
    : [[1, -1], [1, 1]];
}

function movimentosDaPeca(linha, coluna, somenteCapturas = false) {
  const peca = casas[linha][coluna];
  const resultado = [];

  if (!peca) return resultado;

  for (const [dl, dc] of direcoes(peca)) {
    const novaLinha = linha + dl;
    const novaColuna = coluna + dc;

    if (!dentro(novaLinha, novaColuna)) continue;

    const alvo = casas[novaLinha][novaColuna];

    if (!alvo && !somenteCapturas) {
      resultado.push({
        linha: novaLinha,
        coluna: novaColuna,
        captura: false
      });
    }

    if (alvo && alvo.cor !== peca.cor) {
      const destinoLinha = linha + dl * 2;
      const destinoColuna = coluna + dc * 2;

      if (
        dentro(destinoLinha, destinoColuna) &&
        !casas[destinoLinha][destinoColuna]
      ) {
        resultado.push({
          linha: destinoLinha,
          coluna: destinoColuna,
          captura: true,
          capturada: {
            linha: novaLinha,
            coluna: novaColuna
          }
        });
      }
    }
  }

  return resultado;
}

function dentro(linha, coluna) {
  return linha >= 0 && linha < 8 &&
         coluna >= 0 && coluna < 8;
}

function todasCapturas(cor) {
  const resultado = [];

  for (let l = 0; l < 8; l++) {
    for (let c = 0; c < 8; c++) {
      const peca = casas[l][c];

      if (peca && peca.cor === cor) {
        const opcoes = movimentosDaPeca(l, c, true);

        if (opcoes.length) {
          resultado.push({ linha: l, coluna: c });
        }
      }
    }
  }

  return resultado;
}

function clicarCasa(linha, coluna) {
  if (!jogoAtivo) return;

  const peca = casas[linha][coluna];

  if (selecionada) {
    const movimento = movimentos.find(m =>
      m.linha === linha && m.coluna === coluna
    );

    if (movimento) {
      mover(movimento);
      return;
    }
  }

  if (
    peca &&
    peca.cor === jogador &&
    (!capturaContinua ||
      (selecionada &&
       selecionada.linha === linha &&
       selecionada.coluna === coluna))
  ) {
    const capturas = todasCapturas(jogador);

    if (
      capturaContinua ||
      capturas.length === 0 ||
      capturas.some(p => p.linha === linha && p.coluna === coluna)
    ) {
      selecionada = { linha, coluna };

      movimentos = movimentosDaPeca(
        linha,
        coluna,
        capturaContinua || capturas.length > 0
      );

      desenhar();
      return;
    }
  }

  if (!capturaContinua) {
    selecionada = null;
    movimentos = [];
    desenhar();
  }
}

function mover(movimento) {
  const origem = selecionada;
  const peca = casas[origem.linha][origem.coluna];

  casas[movimento.linha][movimento.coluna] = peca;
  casas[origem.linha][origem.coluna] = null;

  if (movimento.captura) {
    casas[movimento.capturada.linha][movimento.capturada.coluna] = null;
  }

  const virouDama =
    !peca.dama &&
    ((peca.cor === "vermelho" && movimento.linha === 0) ||
     (peca.cor === "preto" && movimento.linha === 7));

  if (virouDama) {
    peca.dama = true;
  }

  selecionada = null;
  movimentos = [];

  if (movimento.captura && !virouDama) {
    const proximas = movimentosDaPeca(
      movimento.linha,
      movimento.coluna,
      true
    );

    if (proximas.length > 0) {
      selecionada = {
        linha: movimento.linha,
        coluna: movimento.coluna
      };

      movimentos = proximas;
      capturaContinua = true;

      mensagem.textContent = "Você precisa continuar capturando!";
      desenhar();
      return;
    }
  }

  capturaContinua = false;

  jogador = jogador === "vermelho" ? "preto" : "vermelho";

  verificarVitoria();

  if (jogoAtivo) {
    vezTexto.textContent = jogador === "vermelho"
      ? "Vez das peças vermelhas"
      : "Vez das peças pretas";

    mensagem.textContent = "Selecione uma peça para jogar.";
  }

  desenhar();
}

function verificarVitoria() {
  const pecas = casas.flat().filter(Boolean);

  const vermelhas = pecas.filter(p => p.cor === "vermelho").length;
  const pretas = pecas.filter(p => p.cor === "preto").length;

  const semJogadas = todasCapturas(jogador).length === 0 &&
    !temMovimento(jogador);

  if (vermelhas === 0 || pretas === 0 || semJogadas) {
    jogoAtivo = false;

    const vencedor = vermelhas === 0
      ? "pretas"
      : pretas === 0
        ? "vermelhas"
        : jogador === "vermelho"
          ? "pretas"
          : "vermelhas";

    vezTexto.textContent = "🏆 Vitória das peças " + vencedor + "!";
    mensagem.textContent = "Fim de jogo! Parabéns ao vencedor!";
  }
}

function temMovimento(cor) {
  for (let l = 0; l < 8; l++) {
    for (let c = 0; c < 8; c++) {
      const peca = casas[l][c];

      if (peca && peca.cor === cor) {
        if (movimentosDaPeca(l, c).length > 0) {
          return true;
        }
      }
    }
  }

  return false;
}

function atualizarInformacoes() {
  const pecas = casas.flat().filter(Boolean);

  document.getElementById("contVermelho").textContent =
    pecas.filter(p => p.cor === "vermelho").length + " peças";

  document.getElementById("contPreto").textContent =
    pecas.filter(p => p.cor === "preto").length + " peças";
}

document.getElementById("reiniciar").addEventListener(
  "click",
  iniciarJogo
);

iniciarJogo();
