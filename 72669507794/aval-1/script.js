const formTarefa = document.getElementById("formTarefa");
const inputTarefa = document.getElementById("inputTarefa");
const selectPrioridade = document.getElementById("selectPrioridade");
const listaTarefas = document.getElementById("listaTarefas");
const resumoTarefas = document.getElementById("resumoTarefas");
const btnLimparConcluidas = document.getElementById("btnLimparConcluidas");

function atualizarResumo() {
  let todos = listaTarefas.querySelectorAll("li");
  let concluidos = listaTarefas.querySelectorAll("li.concluida").length;
  let pendentes = todos.length - concluidos;

  resumoTarefas.textContent = pendentes + " pendentes / " + concluidos + " concluídas";
}

function criarItemTarefa(texto, prioridade) {
  let li = document.createElement("li");
  li.classList.add(prioridade);

  let span = document.createElement("span");
  span.className = "titulo-tarefa";
  span.textContent = texto + " [" + prioridade + "]";

  let divBotoes = document.createElement("div");
  divBotoes.className = "acoes-tarefa";

  let btnConcluir = document.createElement("button");
  btnConcluir.type = "button";
  btnConcluir.textContent = "Concluir";
  btnConcluir.addEventListener("click", function () {
    li.classList.toggle("concluida");
    atualizarResumo();
  });

  let btnExcluir = document.createElement("button");
  btnExcluir.type = "button";
  btnExcluir.textContent = "Excluir";
  btnExcluir.className = "btn-excluir";
  btnExcluir.addEventListener("click", function () {
    li.remove();
    atualizarResumo();
  });

  span.addEventListener("click", function () {
    li.classList.toggle("concluida");
    atualizarResumo();
  });

  divBotoes.appendChild(btnConcluir);
  divBotoes.appendChild(btnExcluir);
  li.appendChild(span);
  li.appendChild(divBotoes);

  return li;
}

formTarefa.addEventListener("submit", function (evento) {
  evento.preventDefault();

  let texto = inputTarefa.value.trim();
  let prioridade = selectPrioridade.value;

  if (texto === "") {
    alert("Digite uma tarefa antes de salvar.");
    return;
  }

  let novoItem = criarItemTarefa(texto, prioridade);
  listaTarefas.appendChild(novoItem);

  inputTarefa.value = "";
  inputTarefa.focus();
  atualizarResumo();
});

btnLimparConcluidas.addEventListener("click", function () {
  let concluidos = listaTarefas.querySelectorAll("li.concluida");
  for (let i = 0; i < concluidos.length; i++) {
    concluidos[i].remove();
  }
  atualizarResumo();
});

atualizarResumo();