javascript

const formulario = document.getElementById("formulario");
const campo = document.getElementById("tarefa");
const lista = document.getElementById("lista");

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const texto = campo.value.trim();

  if (texto === "") {
    return;
  }

  const item = document.createElement("li");
  const descricao = document.createElement("span");
  const concluir = document.createElement("button");
  const excluir = document.createElement("button");

  descricao.textContent = texto;
  concluir.textContent = "Concluir";
  excluir.textContent = "Excluir";
  excluir.className = "excluir";

  concluir.addEventListener("click", function() {
    item.classList.toggle("concluida");
    concluir.textContent = item.classList.contains("concluida")
      ? "Desfazer"
      : "Concluir";
  });

  excluir.addEventListener("click", function() {
    item.remove();
  });

  item.append(descricao, concluir, excluir);
  lista.appendChild(item);

  campo.value = "";
  campo.focus();
});