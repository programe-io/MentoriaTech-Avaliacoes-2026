const botaoAdicionar = document.getElementById("adicionar");
const inputTarefa = document.getElementById("tarefa");
const lista = document.getElementById("lista");

botaoAdicionar.addEventListener("click", () => {
  const texto = inputTarefa.value.trim();

  if (texto !== "") {
    const item = document.createElement("li");

    item.innerHTML = `
      ${texto}
      <button class="remover">X</button>
    `;

    item.querySelector(".remover").addEventListener("click", () => {
      item.remove();
    });

    lista.appendChild(item);
    inputTarefa.value = "";
  }
});