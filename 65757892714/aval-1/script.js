
function adicionarTarefa() {
  const campo = document.getElementById("tarefa");
  const texto = campo.value.trim();

  if (texto === "") {
    alert("Digite uma tarefa primeiro!");
    return;
  }

  const item = document.createElement("li");
  item.textContent = texto;

  document.getElementById("lista").appendChild(item);
  campo.value = "";
}
