Cole no campo JavaScript:


javascript

const formulario = document.getElementById("form-tarefa");
const campoTarefa = document.getElementById("tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = campoTarefa.value.trim();

  if (texto === "") {
    mensagem.textContent = "Digite uma tarefa antes de adicionar.";
    return;
  }

  const item = document.createElement("li");
  const descricao = document.createElement("span");
  const concluir = document.createElement("button");
  const excluir = document.createElement("button");

  descricao.textContent = texto;
  concluir.textContent = "Concluir";
  excluir.textContent = "Excluir";
  excluir.setAttribute("aria-label", "Excluir tarefa: " + texto);

  concluir.addEventListener("click", function () {
    item.classList.toggle("concluida");
    concluir.textContent = item.classList.contains("concluida")
      ? "Desfazer"
      : "Concluir";
  });

  excluir.addEventListener("click", function () {
    item.remove();
    mensagem.textContent = "Tarefa removida.";
  });

  item.append(descricao, concluir, excluir);
  listaTarefas.appendChild(item);

  campoTarefa.value = "";
  mensagem.textContent = "Tarefa adicionada com sucesso!";
  campoTarefa.focus();
});