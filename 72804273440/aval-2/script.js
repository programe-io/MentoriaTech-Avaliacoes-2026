let tarefas = [];
let contadorCodigo = 0;
const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const mensagemErro = document.getElementById("erro");
function validarDadosDaTarefa(titulo, prioridade) {
if (titulo.trim().length < 5) {
throw new Error("O título deve ter no mínimo cinco caracteres.");
}
if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
throw new Error("A prioridade deve estar entre 1 e 3.");
}
}
function cadastrarTarefa(titulo, prioridade) {
validarDadosDaTarefa(titulo, prioridade);
contadorCodigo++;
const novaTarefa = {
codigo: contadorCodigo,
titulo: titulo.trim(),
prioridade: prioridade,
status: true
};
tarefas.push(novaTarefa);
listarTarefas();
}
function listarTarefas() {
listaTarefas.innerHTML = "";
tarefas.forEach(tarefa => {
const div = document.createElement("div");
div.className = "tarefa";
if (!tarefa.status) {
div.classList.add("concluida");
}
const informacoes = document.createElement("div");
const titulo = document.createElement("h3");
titulo.textContent = tarefa.titulo;
const codigo = document.createElement("p");
codigo.textContent = "Código: " + tarefa.codigo;
const prioridade = document.createElement("p");
const nomes = {
1: "Alta",
2: "Média",
3: "Baixa"
};
prioridade.textContent = "Prioridade: " + nomes[tarefa.prioridade];
prioridade.className = {
1: "alta",
2: "media",
3: "baixa"
}[tarefa.prioridade];
informacoes.append(titulo, codigo, prioridade);
const acoes = document.createElement("div");
const concluir = document.createElement("button");
concluir.textContent = tarefa.status ? "Concluir" : "Concluída";
concluir.disabled = !tarefa.status;
concluir.onclick = () => {
try {
concluirTarefa(tarefa.codigo);
} catch (erro) {
alert(erro.message);
}
};
const alterar = document.createElement("button");
alterar.textContent = "Alterar prioridade";
alterar.onclick = () => {
const nova = Number(prompt("Nova prioridade (1, 2 ou 3):"));
try {
alterarPrioridade(tarefa.codigo, nova);
} catch (erro) {
alert(erro.message);
}
};
const excluir = document.createElement("button");
excluir.textContent = "Excluir";
excluir.className = "excluir";
excluir.onclick = () => {
tarefas = tarefas.filter(t => t.codigo !== tarefa.codigo);
listarTarefas();
};
acoes.append(concluir, alterar, excluir);
div.append(informacoes, acoes);
listaTarefas.appendChild(div);
});
}
function buscarTarefa(codigo) {
const tarefa = tarefas.find(
t => t.codigo === codigo
);
if (!tarefa) {
throw new Error("Tarefa não encontrada.");
}
return tarefa;
}
function concluirTarefa(codigo) {
const tarefa = buscarTarefa(codigo);
if (!tarefa.status) {
throw new Error("Esta tarefa já está concluída.");
}
tarefa.status = false;
listarTarefas();
}
function alterarPrioridade(codigo, novaPrioridade) {
const tarefa = buscarTarefa(codigo);
validarDadosDaTarefa(
tarefa.titulo,
novaPrioridade
);
tarefa.prioridade = novaPrioridade;
listarTarefas();
}
formTarefa.addEventListener("submit", function(event) {
event.preventDefault();
try {
cadastrarTarefa(
document.getElementById("titulo").value,
Number(document.getElementById("prioridade").value)
);
mensagemErro.hidden = true;
formTarefa.reset();
} catch (erro) {
mensagemErro.textContent = erro.message;
mensagemErro.hidden = false;
}
});
listarTarefas(); 3. Ficha d