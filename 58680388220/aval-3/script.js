const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const categoria = document.getElementById("categoria");
const prioridade = document.getElementById("prioridade");
const taskList = document.getElementById("taskList");
const pesquisa = document.getElementById("pesquisa");
const vazio = document.getElementById("vazio");
const filtros = document.querySelectorAll(".filtro");
const aviso = document.getElementById("aviso");

let filtroAtual = "Todas";
let tarefas = [];
let proximoId = 1;
let avisoTimer;

try {
  const salvas = JSON.parse(localStorage.getItem("taskflow-tarefas"));
  if (Array.isArray(salvas)) {
    tarefas = salvas.filter(t =>
      t &&
      typeof t.id === "number" &&
      typeof t.texto === "string" &&
      typeof t.concluida === "boolean"
    );
    proximoId = tarefas.reduce(
      (maior, tarefa) => Math.max(maior, tarefa.id),
      0
    ) + 1;
  }
} catch (error) {
  tarefas = [];
}

function salvarTarefas() {
  try {
    localStorage.setItem("taskflow-tarefas", JSON.stringify(tarefas));
  } catch (error) {
    mostrarAviso("Não foi possível salvar os dados neste navegador.");
  }
}

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.style.display = "block";

  clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => {
    aviso.style.display = "none";
  }, 2500);
}

function atualizarResumo() {
  const concluidas = tarefas.filter(t => t.concluida).length;

  document.getElementById("total").textContent = tarefas.length;
  document.getElementById("concluidas").textContent = concluidas;
  document.getElementById("pendentes").textContent =
    tarefas.length - concluidas;
}

function criarElementoTarefa(tarefa) {
  const article = document.createElement("article");
  article.className = "tarefa";
  if (tarefa.concluida) article.classList.add("concluida");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = tarefa.concluida;
  checkbox.setAttribute("aria-label", "Marcar tarefa como concluída");

  checkbox.addEventListener("change", () => {
    tarefa.concluida = checkbox.checked;
    salvarTarefas();
    renderizar();
    mostrarAviso(
      tarefa.concluida ? "Tarefa concluída! 🎉" : "Tarefa reaberta."
    );
  });

  const info = document.createElement("div");
  info.className = "tarefa-info";

  const titulo = document.createElement("h3");
  titulo.textContent = tarefa.texto;

  const detalhes = document.createElement("p");
  detalhes.textContent = "📁 " + tarefa.categoria;

  const etiqueta = document.createElement("span");
  etiqueta.className = "etiqueta-prioridade";

  if (tarefa.prioridade === "Alta") {
    etiqueta.classList.add("alta");
  } else if (tarefa.prioridade === "Baixa") {
    etiqueta.classList.add("baixa");
  }

  etiqueta.textContent = "Prioridade: " + tarefa.prioridade;

  info.append(titulo, detalhes, etiqueta);

  const excluir = document.createElement("button");
  excluir.className = "btn-excluir";
  excluir.textContent = "🗑️";
  excluir.setAttribute("aria-label", "Excluir tarefa");

  excluir.addEventListener("click", () => {
    tarefas = tarefas.filter(t => t.id !== tarefa.id);
    salvarTarefas();
    renderizar();
    mostrarAviso("Tarefa excluída.");
  });

  article.append(checkbox, info, excluir);
  return article;
}

function renderizar() {
  taskList.replaceChildren();

  const termo = pesquisa.value.toLowerCase().trim();

  const filtradas = tarefas.filter(tarefa => {
    const combinaPesquisa =
      tarefa.texto.toLowerCase().includes(termo) ||
      tarefa.categoria.toLowerCase().includes(termo);

    const combinaFiltro =
      filtroAtual === "Todas" ||
      (filtroAtual === "Pendentes" && !tarefa.concluida) ||
      (filtroAtual === "Concluidas" && tarefa.concluida);

    return combinaPesquisa && combinaFiltro;
  });

  filtradas.forEach(tarefa => {
    taskList.appendChild(criarElementoTarefa(tarefa));
  });

  vazio.hidden = filtradas.length > 0;
  atualizarResumo();
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const texto = taskInput.value.trim();
  if (!texto) {
    mostrarAviso("Digite o nome da tarefa.");
    return;
  }

  tarefas.unshift({
    id: proximoId++,
    texto,
    categoria: categoria.value,
    prioridade: prioridade.value,
    concluida: false
  });

  salvarTarefas();
  form.reset();
  renderizar();
  mostrarAviso("Tarefa adicionada com sucesso! ✅");
  taskInput.focus();
});

filtros.forEach(botao => {
  botao.addEventListener("click", () => {
    filtros.forEach(item => item.classList.remove("ativo"));
    botao.classList.add("ativo");
    filtroAtual = botao.dataset.filter;
    renderizar();
  });
});

pesquisa.addEventListener("input", renderizar);

document.getElementById("limparConcluidas").addEventListener("click", () => {
  const quantidade = tarefas.filter(t => t.concluida).length;

  if (quantidade === 0) {
    mostrarAviso("Não há tarefas concluídas para limpar.");
    return;
  }

  tarefas = tarefas.filter(t => !t.concluida);
  salvarTarefas();
  renderizar();
  mostrarAviso("Tarefas concluídas removidas.");
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const escuro = document.body.classList.contains("dark");
  document.getElementById("themeBtn").textContent = escuro ? "☀️" : "🌙";

  try {
    localStorage.setItem("taskflow-tema", escuro ? "escuro" : "claro");
  } catch (error) {
    // O tema continua funcionando nesta página.
  }
});

try {
  if (localStorage.getItem("taskflow-tema") === "escuro") {
    document.body.classList.add("dark");
    document.getElementById("themeBtn").textContent = "☀️";
  }
} catch (error) {
  // O projeto continua funcionando sem armazenamento de tema.
}

renderizar();