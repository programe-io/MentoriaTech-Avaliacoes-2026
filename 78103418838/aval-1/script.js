// O MUNDINHO DA LUA — VERSÃO 3.9
// Jogo de pet virtual com expressões e animações.

const $ = (id) => document.getElementById(id);

const lua = $("lua");
const fala = $("fala");
const emojiFala = $("emoji-fala");
const efeito = $("efeito");

const comida = $("comida");
const brinquedo = $("brinquedo");
const agua = $("agua");

const botaoAcordar = $("botao-acordar");

const estadoInicial = {
  fome: 80,
  sede: 80,
  energia: 80,
  higiene: 80,
  felicidade: 80,
  carinho: 0,
  experiencia: 0,
  dormindo: false
};

let estado;

try {
  const salvo = JSON.parse(localStorage.getItem("mundinhoLua39"));

  estado = {
    ...estadoInicial,
    ...(salvo || {})
  };
} catch {
  estado = { ...estadoInicial };
}

// Evita valores inválidos no carregamento.
for (const chave of [
  "fome",
  "sede",
  "energia",
  "higiene",
  "felicidade",
  "carinho",
  "experiencia"
]) {
  const valor = Number(estado[chave]);

  estado[chave] = Number.isFinite(valor)
    ? Math.max(0, Math.min(999999, valor))
    : estadoInicial[chave];
}

estado.dormindo = Boolean(estado.dormindo);

let temporizadorExpressao;
let temporizadorEfeito;
let temporizadorComida;
let temporizadorBrinquedo;
let temporizadorAgua;

let ultimaAcao = "parada";

// ------------------------------
// FRASES DA LUA
// ------------------------------

const frases = {
  comer: [
    "Nhac, nhac! Que comidinha gostosa! 🍗",
    "Miau! Eu estava com fome!",
    "Hummm! Adoro a hora da comida!"
  ],

  beber: [
    "Glup, glup! Água fresquinha! 💧",
    "Miau! Que sede eu estava!",
    "Agora estou hidratada!"
  ],

  banho: [
    "Plim, plim! Estou ficando limpinha!",
    "Um banhinho para ficar cheirosa! 🛁",
    "Miau! Até gosto de ficar limpinha!"
  ],

  brincar: [
    "Oba! Vamos brincar mais!",
    "Pega a bolinha! 🧶",
    "Miau! Essa é a minha brincadeira favorita!"
  ],

  dormir: [
    "Boa noite... Zzz... 🌙",
    "Vou tirar uma sonequinha...",
    "Miau... estou com soninho..."
  ],

  carinho: [
    "Miaaau! Gosto muito de carinho!",
    "Que gostoso! Mais um pouquinho!",
    "Purrrr... estou muito feliz!"
  ],

  acordar: [
    "Bom dia! Dormi tão bem!",
    "Miau! Estou pronta para brincar!",
    "Já acordei! Vamos nos divertir?"
  ]
};

// ------------------------------
// SALVAR O JOGO
// ------------------------------

function salvarJogo() {
  try {
    localStorage.setItem(
      "mundinhoLua39",
      JSON.stringify(estado)
    );
  } catch (erro) {
    console.warn("Não foi possível salvar o jogo.", erro);
  }
}

// ------------------------------
// ATUALIZAR NECESSIDADES
// ------------------------------

function atualizarBarra(nome) {
  const valor = Math.round(estado[nome]);

  $(`${nome}-num`).textContent = `${valor}%`;
  $(`${nome}-barra`).style.width = `${valor}%`;
}

function atualizarTela() {
  for (const nome of [
    "fome",
    "sede",
    "energia",
    "higiene",
    "felicidade"
  ]) {
    atualizarBarra(nome);
  }

  $("carinho").textContent = estado.carinho;

  $("nivel").textContent =
    Math.floor(estado.experiencia / 100) + 1;

  botaoAcordar.hidden = !estado.dormindo;

  document.querySelectorAll("[data-acao]").forEach((botao) => {
    botao.disabled =
      estado.dormindo && botao.dataset.acao !== "acordar";
  });

  if (estado.dormindo) {
    lua.classList.add("dormindo");
    return;
  }

  lua.classList.remove("dormindo");

  // As expressões de fome e cansaço aparecem
  // quando a Lua não está realizando outra ação.
  if (ultimaAcao === "parada") {
    if (estado.fome < 25 || estado.sede < 25) {
      expressao("triste");
      atualizarFala("Estou precisando de cuidados! 🥺", "😿");
    } else if (estado.energia < 25) {
      expressao("cansada");
      atualizarFala("Estou ficando com soninho...", "😴");
    } else if (estado.felicidade < 25) {
      expressao("triste");
      atualizarFala("Quero brincar com você!", "🥺");
    }
  }
}

// ------------------------------
// EXPRESSÕES FACIAIS
// ------------------------------

function limparExpressoes() {
  lua.classList.remove(
    "dormindo",
    "comendo",
    "bebendo",
    "banhando",
    "brincando",
    "carinho",
    "triste",
    "cansada",
    "piscando"
  );
}

function expressao(nome) {
  limparExpressoes();

  if (nome && nome !== "parada") {
    lua.classList.add(nome);
  }

  ultimaAcao = nome || "parada";
}

function atualizarFala(texto, emoji = "😺") {
  fala.textContent = texto;
  emojiFala.textContent = emoji;
}

function mostrarEfeito(texto, duracao = 1600) {
  clearTimeout(temporizadorEfeito);

  efeito.textContent = texto;

  temporizadorEfeito = setTimeout(() => {
    efeito.textContent = "";
  }, duracao);
}

function fraseAleatoria(acao) {
  const lista = frases[acao];
  return lista[Math.floor(Math.random() * lista.length)];
}

// ------------------------------
// MOSTRAR E ESCONDER OBJETOS
// ------------------------------

function esconderObjetos() {
  comida.classList.remove("visivel");
  brinquedo.classList.remove("visivel");
  agua.classList.remove("visivel");

  clearTimeout(temporizadorComida);
  clearTimeout(temporizadorBrinquedo);
  clearTimeout(temporizadorAgua);
}

function mostrarObjeto(elemento, duracao = 1800) {
  esconderObjetos();

  elemento.classList.add("visivel");

  const temporizador = setTimeout(() => {
    elemento.classList.remove("visivel");
  }, duracao);

  if (elemento === comida) {
    temporizadorComida = temporizador;
  } else if (elemento === brinquedo) {
    temporizadorBrinquedo = temporizador;
  } else if (elemento === agua) {
    temporizadorAgua = temporizador;
  }
}

// ------------------------------
// FINALIZAR UMA AÇÃO
// ------------------------------

function finalizarAcao(expressaoFinal = "parada") {
  clearTimeout(temporizadorExpressao);

  temporizadorExpressao = setTimeout(() => {
    if (estado.dormindo) return;

    esconderObjetos();
    expressao(expressaoFinal);
    atualizarTela();
  }, 1800);
}

// ------------------------------
// EXPERIÊNCIA
// ------------------------------

function ganharExperiencia(pontos = 10) {
  const nivelAntigo =
    Math.floor(estado.experiencia / 100) + 1;

  estado.experiencia += pontos;

  const nivelNovo =
    Math.floor(estado.experiencia / 100) + 1;

  if (nivelNovo > nivelAntigo) {
    mostrarEfeito("⭐ SUBIU DE NÍVEL!", 2200);
    atualizarFala(
      `Oba! Cheguei ao nível ${nivelNovo}!`,
      "🎉"
    );
  }
}

// ------------------------------
// REALIZAR AÇÕES
// ------------------------------

function realizarAcao(acao) {
  if (estado.dormindo && acao !== "acordar") {
    atualizarFala("Shhh... a Lua está dormindo!", "😴");
    return;
  }

  if (acao === "dormir") {
    dormir();
    return;
  }

  if (acao === "acordar") {
    acordar();
    return;
  }

  clearTimeout(temporizadorExpressao);
  esconderObjetos();

  switch (acao) {
    case "comer":
      if (estado.fome >= 100) {
        atualizarFala("Já estou de barriguinha cheia!", "😸");
        expressao("carinho");
        finalizarAcao();
        return;
      }

      estado.fome = Math.min(100, estado.fome + 25);
      estado.sede = Math.max(0, estado.sede - 3);
      estado.felicidade = Math.min(100, estado.felicidade + 5);

      expressao("comendo");
      mostrarObjeto(comida, 1800);
      mostrarEfeito("NHAC! NHAC! 🍗");
      atualizarFala(fraseAleatoria("comer"), "😋");
      break;

    case "beber":
      if (estado.sede >= 100) {
        atualizarFala("Não estou com sede agora!", "😺");
        expressao("parada");
        return;
      }

      estado.sede = Math.min(100, estado.sede + 30);

      expressao("bebendo");
      mostrarObjeto(agua, 1800);
      mostrarEfeito("GLUP! 💧");
      atualizarFala(fraseAleatoria("beber"), "💧");
      break;

    case "banho":
      estado.higiene = Math.min(100, estado.higiene + 35);
      estado.felicidade = Math.min(100, estado.felicidade + 4);
      estado.energia = Math.max(0, estado.energia - 4);

      expressao("banhando");
      mostrarEfeito("💦 ✨ 💦");
      atualizarFala(fraseAleatoria("banho"), "🛁");
      break;

    case "brincar":
      if (estado.energia < 15) {
        expressao("cansada");
        atualizarFala(
          "Estou cansadinha! Preciso dormir primeiro.",
          "😴"
        );
        return;
      }

      estado.felicidade = Math.min(100, estado.felicidade + 20);
      estado.energia = Math.max(0, estado.energia - 12);
      estado.fome = Math.max(0, estado.fome - 5);
      estado.higiene = Math.max(0, estado.higiene - 4);

      expressao("brincando");
      mostrarObjeto(brinquedo, 1800);
      mostrarEfeito("🎉 PULA! 🎉");
      atualizarFala(fraseAleatoria("brincar"), "😻");
      break;

    case "carinho":
      estado.felicidade = Math.min(100, estado.felicidade + 12);
      estado.carinho += 1;

      expressao("carinho");
      mostrarEfeito("💖 ♥ 💖");
      atualizarFala(fraseAleatoria("carinho"), "🥰");
      break;

    default:
      return;
  }

  ganharExperiencia(10);
  atualizarTela();
  salvarJogo();
  finalizarAcao();
}

// ------------------------------
// DORMIR E ACORDAR
// ------------------------------

function dormir() {
  if (estado.dormindo) return;

  clearTimeout(temporizadorExpressao);
  esconderObjetos();

  estado.dormindo = true;

  expressao("dormindo");
  atualizarFala(fraseAleatoria("dormir"), "😴");
  mostrarEfeito("Zzz... 🌙", 3000);

  atualizarTela();
  salvarJogo();
}

function acordar() {
  if (!estado.dormindo) return;

  estado.dormindo = false;
  estado.energia = Math.min(100, estado.energia + 35);

  expressao("carinho");
  atualizarFala(fraseAleatoria("acordar"), "☀️");
  mostrarEfeito("☀️ BOM DIA! ☀️", 2200);

  atualizarTela();
  salvarJogo();

  finalizarAcao();
}

// ------------------------------
// PISCAR OS OLHOS
// ------------------------------

function piscar() {
  if (estado.dormindo || ultimaAcao !== "parada") return;

  expressao("piscando");

  setTimeout(() => {
    if (!estado.dormindo && ultimaAcao === "piscando") {
      expressao("parada");
    }
  }, 180);
}

setInterval(() => {
  if (!estado.dormindo && ultimaAcao === "parada") {
    piscar();
  }
}, 3500);

// ------------------------------
// O TEMPO PASSA NO JOGO
// ------------------------------

setInterval(() => {
  if (estado.dormindo) {
    estado.energia = Math.min(100, estado.energia + 5);
    estado.fome = Math.max(0, estado.fome - 2);
    estado.sede = Math.max(0, estado.sede - 2);
    estado.higiene = Math.max(0, estado.higiene - 1);
  } else {
    estado.fome = Math.max(0, estado.fome - 2);
    estado.sede = Math.max(0, estado.sede - 2);
    estado.energia = Math.max(0, estado.energia - 1);
    estado.higiene = Math.max(0, estado.higiene - 1);

    if (estado.felicidade > 0) {
      estado.felicidade = Math.max(0, estado.felicidade - 1);
    }

    if (estado.fome < 25 || estado.sede < 25) {
      estado.felicidade = Math.max(0, estado.felicidade - 1);
    }
  }

  atualizarTela();
  salvarJogo();
}, 10000);

// ------------------------------
// BOTÕES
// ------------------------------

document.querySelectorAll("[data-acao]").forEach((botao) => {
  botao.addEventListener("click", () => {
    realizarAcao(botao.dataset.acao);
  });
});

$("reiniciar").addEventListener("click", () => {
  const confirmar = confirm(
    "Tem certeza que deseja recomeçar? Todo o progresso da Lua será perdido."
  );

  if (!confirmar) return;

  estado = { ...estadoInicial };

  clearTimeout(temporizadorExpressao);
  clearTimeout(temporizadorEfeito);
  esconderObjetos();

  expressao("parada");
  atualizarFala("Miau! Vamos começar nossa aventura!", "😺");
  efeito.textContent = "";

  atualizarTela();
  salvarJogo();
});

// ------------------------------
// INICIALIZAÇÃO
// ------------------------------

atualizarTela();

if (estado.dormindo) {
  expressao("dormindo");
  atualizarFala("Zzz... a Lua está descansando.", "😴");
} else {
  expressao("parada");
  atualizarFala("Miau! Bem-vinda à minha casinha!", "😺");
}

salvarJogo();