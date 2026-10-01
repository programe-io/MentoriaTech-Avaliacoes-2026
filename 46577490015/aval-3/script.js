const OBJETOS = [
  { n: "Clipe de papel", e: "📎", g: 1 },
  { n: "Moeda de 1 real", e: "🪙", g: 7 },
  { n: "Ovo de galinha", e: "🥚", g: 60 },
  { n: "Maçã", e: "🍎", g: 180 },
  { n: "Celular", e: "📱", g: 190 },
  { n: "Garrafa de água de 500 ml (cheia)", e: "🧴", g: 530 },
  { n: "Notebook", e: "💻", g: 1800 },
  { n: "Tijolo maciço", e: "🧱", g: 2500 },
  { n: "Gato doméstico", e: "🐈", g: 4000 },
  { n: "Melancia", e: "🍉", g: 8000 },
  { n: "Bicicleta", e: "🚲", g: 12000 },
  { n: "Botijão de gás P13 (cheio)", e: "🛢️", g: 26000 },
  { n: "Cachorro labrador", e: "🐕", g: 30000 },
  { n: "Geladeira", e: "🧊", g: 70000 },
  { n: "Moto de 150 cc", e: "🏍️", g: 120000 },
  { n: "Carro popular", e: "🚗", g: 1000000 },
  { n: "Elefante africano", e: "🐘", g: 5000000 }
];

const RODADAS = 5;
const MAX_ERRO = 1.5;

// Seleciona elementos do HTML
const $ = id => document.getElementById(id);

const chute = $("chute");
const acao = $("acao");

// Variáveis do jogo
let fila = [];
let i = 0;
let pontos = 0;
let revelado = false;


// Formata números no padrão brasileiro
function num(x) {
  return x.toLocaleString("pt-BR", {
    maximumFractionDigits: 2
  });
}


// Converte gramas para uma unidade mais fácil de ler
function fmt(g) {
  if (g < 1000) {
    return `${num(g)} g`;
  }

  if (g < 1000000) {
    return `${num(g / 1000)} kg`;
  }

  return `${num(g / 1000000)} t`;
}


// Arredonda o valor do palpite
function arred(x) {
  return Number(x.toPrecision(2));
}


// Obtém o valor escolhido na régua
function valorChute() {
  return Math.pow(10, Number(chute.value));
}


// Inicia ou reinicia o jogo
function iniciar() {

  fila = [...OBJETOS]
    .sort(() => Math.random() - 0.5)
    .slice(0, RODADAS);

  i = 0;
  pontos = 0;

  $("tela-fim").hidden = true;
  $("tela-jogo").hidden = false;

  carregar();
}


// Carrega o objeto da rodada atual
function carregar() {

  const objeto = fila[i];

  revelado = false;

  $("rodada").textContent =
    `Objeto ${i + 1} de ${RODADAS}`;

  $("emoji").textContent = objeto.e;

  $("nome").textContent = objeto.n;

  $("resultado").innerHTML =
    "Arraste a régua até o peso que você acha.";

  $("marca").hidden = true;

  $("placar").textContent =
    `${pontos} ponto${pontos === 1 ? "" : "s"}`;

  chute.disabled = false;

  chute.value = 3.5;

  acao.textContent = "Confirmar palpite";

  atualizarLeitura();
}


// Atualiza o valor mostrado acima da régua
function atualizarLeitura() {

  $("leitura").textContent =
    "≈ " + fmt(arred(valorChute()));
}


// Confirma o palpite do jogador
function confirmar() {

  const real = fila[i].g;
  const g = valorChute();

  // Calcula a diferença entre o palpite e o peso real
  const erro = Math.abs(
    Math.log10(g / real)
  );

  // Calcula os pontos
  const pts = Math.round(
    Math.max(0, 1 - erro / MAX_ERRO) * 100
  );

  pontos += pts;
  revelado = true;


  // Define uma mensagem de acordo com o erro
  let rotulo;

  if (erro < 0.1) {
    rotulo = "Quase exato!";
  } else if (erro < 0.3) {
    rotulo = "Chegou perto.";
  } else if (erro < 0.7) {
    rotulo = "Ficou longe.";
  } else {
    rotulo = "Passou bem longe.";
  }


  // Mostra o resultado
  $("resultado").innerHTML =
    `<strong>${rotulo} +${pts} pontos</strong>
     Você chutou ${fmt(arred(g))}.
     O peso real é de cerca de ${fmt(real)}.`;


  // Posiciona a marca no peso real
  $("marca").style.left =
    (Math.log10(real) / 7 * 100) + "%";

  $("marca").hidden = false;


  // Atualiza o placar
  $("placar").textContent =
    `${pontos} ponto${pontos === 1 ? "" : "s"}`;


  // Bloqueia a régua
  chute.disabled = true;


  // Altera o texto do botão
  if (i < RODADAS - 1) {
    acao.textContent = "Próximo objeto";
  } else {
    acao.textContent = "Ver resultado";
  }
}


// Mostra a tela final
function fim() {

  const max = RODADAS * 100;

  $("tela-jogo").hidden = true;
  $("tela-fim").hidden = false;

  $("total").textContent =
    `${pontos} / ${max}`;


  // Mensagem final de acordo com a pontuação
  if (pontos >= max * 0.8) {

    $("mensagem").textContent =
      "Você tem uma balança nas mãos.";

  } else if (pontos >= max * 0.5) {

    $("mensagem").textContent =
      "Bom olho para peso.";

  } else if (pontos >= max * 0.2) {

    $("mensagem").textContent =
      "Dá para melhorar. Tente de novo.";

  } else {

    $("mensagem").textContent =
      "Os pesos ainda te enganam. Tente de novo.";
  }
}


// Atualiza o valor enquanto o jogador movimenta a régua
chute.addEventListener(
  "input",
  atualizarLeitura
);


// Botão principal
acao.addEventListener("click", () => {

  // Primeiro clique: confirma o palpite
  if (!revelado) {
    confirmar();
    return;
  }

  // Segundo clique: vai para a próxima rodada
  i++;

  if (i < RODADAS) {
    carregar();
  } else {
    fim();
  }
});


// Botão "Jogar de novo"
$("reiniciar").addEventListener(
  "click",
  iniciar
);


// Inicia o jogo automaticamente
iniciar();
