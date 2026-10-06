const tarefaInput = document.getElementById("tarefaInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const listaTarefas = document.getElementById("listaTarefas");

function adicionarTarefa() {
const texto = tarefaInput.value.trim();

if (texto === "") {
alert("Digite uma tarefa antes de adicionar.");
return;
}

const li = document.createElement("li");

const span = document.createElement("span");
span.textContent = texto;

const removerBtn = document.createElement("button");
removerBtn.textContent = "Remover";
removerBtn.classList.add("remover");

span.addEventListener("click", function () {
li.classList.toggle("concluida");
});

removerBtn.addEventListener("click", function () {
li.remove();
});

li.appendChild(span);
li.appendChild(removerBtn);
listaTarefas.appendChild(li);

tarefaInput.value = "";
tarefaInput.focus();
}

adicionarBtn.addEventListener("click", adicionarTarefa);

tarefaInput.addEventListener("keypress", function (event) {
if (event.key === "Enter") {
adicionarTarefa();
}
});