
const CHAVE = "gerenciador_tarefas";

const form = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");
const buscaInput = document.getElementById("busca");
const filtroInput = document.getElementById("filtro");
const lista = document.getElementById("listaTarefas");
const resumo = document.getElementById("resumo");
const btnSalvar = document.getElementById("btnSalvar");

let tarefas = carregarTarefas();
let tarefaEditando = null;

function carregarTarefas() {
  try {
    const dados = localStorage.getItem(CHAVE);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

function salvarTarefas() {
  localStorage.setItem(CHAVE, JSON.stringify(tarefas));
}

function gerarId() {
  return Date.now().toString() +
    Math.random().toString(16).slice(2);
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const titulo = tituloInput.value.trim();
  const descricao = descricaoInput.value.trim();

  if (!titulo) {
    alert("Informe o título da tarefa.");
    return;
  }

  if (tarefaEditando) {
    const tarefa = tarefas.find(
      t => t.id === tarefaEditando
    );

    if (tarefa) {
      tarefa.titulo = titulo;
      tarefa.descricao = descricao;
    }

    tarefaEditando = null;
    btnSalvar.textContent = "Adicionar tarefa";
  } else {
    tarefas.push({
      id: gerarId(),
      titulo,
      descricao,
      concluida: false,
      criadaEm: new Date().toISOString()
    });
  }

  salvarTarefas();
  form.reset();
  renderizarTarefas();
});

function excluirTarefa(id) {
  const confirmar = confirm(
    "Deseja realmente excluir esta tarefa?"
  );

  if (!confirmar) return;

  tarefas = tarefas.filter(t => t.id !== id);

  if (tarefaEditando === id) {
    cancelarEdicao();
  }

  salvarTarefas();
  renderizarTarefas();
}

function concluirTarefa(id) {
  const tarefa = tarefas.find(t => t.id === id);

  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    salvarTarefas();
    renderizarTarefas();
  }
}

function editarTarefa(id) {
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) return;

  tituloInput.value = tarefa.titulo;
  descricaoInput.value = tarefa.descricao;
  tarefaEditando = id;
  btnSalvar.textContent = "Salvar alterações";
  tituloInput.focus();
}

function cancelarEdicao() {
  tarefaEditando = null;
  form.reset();
  btnSalvar.textContent = "Adicionar tarefa";
}

function renderizarTarefas() {
  const termo = buscaInput.value.toLowerCase().trim();
  const filtro = filtroInput.value;

  const filtradas = tarefas.filter(tarefa => {
    const correspondeBusca =
      tarefa.titulo.toLowerCase().includes(termo) ||
      tarefa.descricao.toLowerCase().includes(termo);

    const correspondeFiltro =
      filtro === "todas" ||
      (filtro === "pendentes" && !tarefa.concluida) ||
      (filtro === "concluidas" && tarefa.concluida);

    return correspondeBusca && correspondeFiltro;
  });

  const concluidas = tarefas.filter(
    t => t.concluida
  ).length;

  resumo.textContent =
    `${tarefas.length} tarefa(s) | ` +
    `${concluidas} concluída(s) | ` +
    `${tarefas.length - concluidas} pendente(s)`;

  lista.innerHTML = "";

  if (filtradas.length === 0) {
    lista.innerHTML =
      '<p class="vazio">Nenhuma tarefa encontrada.</p>';
    return;
  }

  filtradas.forEach(tarefa => {
    const artigo = document.createElement("article");
    artigo.className = "tarefa";

    if (tarefa.concluida) {
      artigo.classList.add("concluida");
    }

    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = tarefa.descricao;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnConcluir = document.createElement("button");
    btnConcluir.className = "btn-concluir";
    btnConcluir.textContent = tarefa.concluida
      ? "Reabrir"
      : "Concluir";
    btnConcluir.addEventListener("click", () => {
      concluirTarefa(tarefa.id);
    });

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => {
      editarTarefa(tarefa.id);
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn-excluir";
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", () => {
      excluirTarefa(tarefa.id);
    });

    acoes.append(btnConcluir, btnEditar, btnExcluir);
    artigo.append(titulo, descricao, acoes);
    lista.appendChild(artigo);
  });
}

buscaInput.addEventListener("input", renderizarTarefas);
filtroInput.addEventListener("change", renderizarTarefas);

renderizarTarefas();
