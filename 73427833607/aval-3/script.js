
const formTarefa = document.querySelector("#formTarefa");
const textoTarefa = document.querySelector("#textoTarefa");
const listaTarefas = document.querySelector("#tarefas");
const mensagemTarefa = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");

let totalTarefas = 0;

function atualizarContador() {
  contador.textContent = `Tarefas: ${totalTarefas}`;
}

formTarefa.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = textoTarefa.value.trim();

  if (texto === "") {
    mensagemTarefa.textContent = "Digite uma tarefa antes de adicionar.";
    return;
  }

  const item = document.createElement("li");
  const descricao = document.createElement("span");
  const botaoRemover = document.createElement("button");

  descricao.textContent = texto;
  botaoRemover.textContent = "Remover";
  botaoRemover.type = "button";
  botaoRemover.className = "remover";

  botaoRemover.addEventListener("click", function () {
    item.remove();
    totalTarefas--;
    atualizarContador();
    mensagemTarefa.textContent = "Tarefa removida.";
  });

  item.append(descricao, botaoRemover);
  listaTarefas.appendChild(item);

  totalTarefas++;
  atualizarContador();

  mensagemTarefa.textContent = "Tarefa adicionada!";
  formTarefa.reset();
  textoTarefa.focus();
});
