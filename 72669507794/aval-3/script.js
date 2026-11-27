const CHAVE_STORAGE = "fichas_anamnese_mentoria_2serie";

const formFicha = document.getElementById("formFicha");
const nomePaciente = document.getElementById("nomePaciente");
const idadePaciente = document.getElementById("idadePaciente");
const queixaPaciente = document.getElementById("queixaPaciente");
const historicoPaciente = document.getElementById("historicoPaciente");
const msgErro = document.getElementById("msgErro");
const contadorFichas = document.getElementById("contadorFichas");
const buscarFicha = document.getElementById("buscarFicha");
const containerFichas = document.getElementById("containerFichas");
const botoesStatus = document.querySelectorAll("[data-status]");

let fichas = carregarFichas();
let filtroAtual = "todas";

function carregarFichas() {
  let dados = localStorage.getItem(CHAVE_STORAGE);
  if (!dados) {
    return [];
  }
  return JSON.parse(dados);
}

function salvarFichas() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(fichas));
}

function mostrarErro(texto) {
  msgErro.textContent = texto;
  msgErro.hidden = false;
}

function limparErro() {
  msgErro.textContent = "";
  msgErro.hidden = true;
}

function renderizar() {
  let busca = buscarFicha.value.trim().toLowerCase();
  containerFichas.innerHTML = "";

  let filtradas = fichas.filter(function (ficha) {
    let passaStatus =
      filtroAtual === "todas" || ficha.status === filtroAtual;

    let passaBusca =
      busca === "" ||
      ficha.nome.toLowerCase().includes(busca) ||
      ficha.queixa.toLowerCase().includes(busca);

    return passaStatus && passaBusca;
  });

  contadorFichas.textContent = filtradas.length;

  if (filtradas.length === 0) {
    containerFichas.innerHTML = "<p>Nenhuma ficha encontrada.</p>";
    return;
  }

  filtradas.forEach(function (ficha) {
    let card = document.createElement("div");
    card.className = "card-ficha";
    if (ficha.status === "concluida") {
      card.classList.add("concluida");
    }

    let textoStatus =
      ficha.status === "concluida" ? "Concluida" : "Ativa";

    let info = document.createElement("div");
    info.innerHTML =
      "<strong>" + ficha.nome + "</strong> (" + ficha.idade + " anos)" +
      "<span class='tag-status'>" + textoStatus + "</span><br>" +
      "<small><strong>Queixa:</strong> " + ficha.queixa + "</small><br>" +
      "<small><strong>Historico:</strong> " + (ficha.historico || "Nao informado") + "</small>";

    let acoes = document.createElement("div");
    acoes.className = "botoes-ficha";

    let btnStatus = document.createElement("button");
    btnStatus.type = "button";
    btnStatus.className = "btn-status";
    btnStatus.dataset.id = ficha.id;
    btnStatus.dataset.acao = "status";
    btnStatus.textContent =
      ficha.status === "concluida" ? "Reabrir" : "Concluir";

    let btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.className = "btn-excluir";
    btnExcluir.dataset.id = ficha.id;
    btnExcluir.dataset.acao = "excluir";
    btnExcluir.textContent = "Excluir";

    acoes.appendChild(btnStatus);
    acoes.appendChild(btnExcluir);
    card.appendChild(info);
    card.appendChild(acoes);
    containerFichas.appendChild(card);
  });
}

formFicha.addEventListener("submit", function (e) {
  e.preventDefault();

  let nome = nomePaciente.value.trim();
  let idade = parseInt(idadePaciente.value, 10);
  let queixa = queixaPaciente.value.trim();
  let historico = historicoPaciente.value.trim();

  if (nome.length < 2) {
    mostrarErro("Digite o nome do paciente.");
    return;
  }

  if (isNaN(idade) || idade <= 0 || idade > 120) {
    mostrarErro("Digite uma idade valida.");
    return;
  }

  if (queixa === "") {
    mostrarErro("Informe a queixa principal.");
    return;
  }

  limparErro();

  fichas.push({
    id: Date.now(),
    nome: nome,
    idade: idade,
    queixa: queixa,
    historico: historico,
    status: "ativa"
  });

  salvarFichas();
  renderizar();
  formFicha.reset();
});

containerFichas.addEventListener("click", function (e) {
  let botao = e.target.closest("button");
  if (!botao) return;

  let id = Number(botao.dataset.id);
  let acao = botao.dataset.acao;

  if (acao === "status") {
    let ficha = fichas.find(function (item) {
      return item.id === id;
    });
    if (ficha) {
      ficha.status = ficha.status === "concluida" ? "ativa" : "concluida";
      salvarFichas();
      renderizar();
    }
  }

  if (acao === "excluir") {
    fichas = fichas.filter(function (item) {
      return item.id !== id;
    });
    salvarFichas();
    renderizar();
  }
});

botoesStatus.forEach(function (btn) {
  btn.addEventListener("click", function () {
    botoesStatus.forEach(function (item) {
      item.classList.remove("filtro-ativo");
    });
    btn.classList.add("filtro-ativo");
    filtroAtual = btn.dataset.status;
    renderizar();
  });
});

buscarFicha.addEventListener("input", function () {
  renderizar();
});

renderizar();