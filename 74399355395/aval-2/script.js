let tarefas = [];
let geradorCodigo = 1;

function validarDadosTarefa(titulo, prioridade) {
  if (!titulo || titulo.trim() === "") {
    throw new Error("O título da tarefa não pode estar vazio.");
  }
  if (!prioridade || prioridade < 1) {
    throw new Error("Prioridade inválida.");
  }
}

function buscarTarefa(codigo) {
  let tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Código de tarefa não encontrado!");
  }
  return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosTarefa(titulo, prioridade);

  let tarefa = {
    codigo: geradorCodigo++,
    titulo: titulo,
    prioridade: Number(prioridade),
    status: true
  };

  tarefas.push(tarefa);
  return tarefa;
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  let tarefa = buscarTarefa(codigo);
  if (tarefa.status === false) {
    throw new Error("Tarefa já estava como concluída");
  }
  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
  let tarefa = buscarTarefa(codigo);
  validarDadosTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = Number(novaPrioridade);
}

// Interação com o HTML
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const btnSearch = document.getElementById("btn-search");
const btnComplete = document.getElementById("btn-complete");
const btnList = document.getElementById("btn-list");

function renderizarTarefas(lista) {
  taskList.innerHTML = "";
  lista.forEach(t => {
    const li = document.createElement("li");
    if (!t.status) li.classList.add("done");
    
    const statusTexto = t.status ? "Pendente" : "Concluída";
    li.textContent = `[#${t.codigo}] ${t.titulo} | Prioridade: ${t.prioridade} (${statusTexto})`;
    taskList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("task-title").value;
  const prioridade = document.getElementById("task-priority").value;

  try {
    cadastrarTarefa(titulo, prioridade);
    renderizarTarefas(listarTarefas());
    form.reset();
  } catch (error) {
    alert(error.message);
  }
});

btnSearch.addEventListener("click", () => {
  const codigo = Number(document.getElementById("search-code").value);
  try {
    const tarefa = buscarTarefa(codigo);
    renderizarTarefas([tarefa]);
  } catch (error) {
    alert(error.message);
  }
});

btnComplete.addEventListener("click", () => {
  const codigo = Number(document.getElementById("search-code").value);
  try {
    concluirTarefa(codigo);
    renderizarTarefas(listarTarefas());
  } catch (error) {
    alert(error.message);
  }
});

btnList.addEventListener("click", () => {
  renderizarTarefas(listarTarefas());
});