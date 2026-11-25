const inputTarefa = document.getElementById("novaTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const btnLimpar = document.getElementById("btnLimpar");

// Array para armazenar as tarefas
let tarefas = [];

// Função para atualizar a lista na tela usando laço de repetição
function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  for (let i = 0; i < tarefas.length; i++) {
    const li = document.createElement("li");
    li.className = tarefas[i].concluida ? "item concluida" : "item";

    const texto = document.createElement("span");
    texto.textContent = tarefas[i].texto;
    texto.addEventListener("click", function () {
      tarefas[i].concluida = !tarefas[i].concluida;
      renderizarTarefas();
    });

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Excluir";
    btnRemover.className = "btn-remover";
    btnRemover.addEventListener("click", function () {
      tarefas.splice(i, 1);
      renderizarTarefas();
    });

    li.appendChild(texto);
    li.appendChild(btnRemover);
    listaTarefas.appendChild(li);
  }

  contador.textContent = `Total: ${tarefas.length} tarefa(s)`;
}

// Adicionar nova tarefa
btnAdicionar.addEventListener("click", function () {
  const textoDigitado = inputTarefa.value.trim();

  if (textoDigitado === "") {
    alert("Digite uma tarefa antes de adicionar!");
    return;
  }

  tarefas.push({ texto: textoDigitado, concluida: false });
  inputTarefa.value = "";
  renderizarTarefas();
});

// Permitir adicionar pressionando Enter
inputTarefa.addEventListener("keypress", function (evento) {
  if (evento.key === "Enter") {
    btnAdicionar.click();
  }
});

// Limpar todas as tarefas
btnLimpar.addEventListener("click", function () {
  tarefas = [];
  renderizarTarefas();
});