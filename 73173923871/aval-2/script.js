let tarefas = [];
let proximoCodigo = 1; 

svg

function cadastrarTarefa(titulo, prioridade) {
if (!titulo || titulo.trim().length < 5) {
return { sucesso: false, mensagem: "Erro: O título deve ter no mínimo 5 caracteres." };
}
const p = parseInt(prioridade);
if (isNaN(p) || p < 1 || p > 3) {
return { sucesso: false, mensagem: "Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)." };
} 

svg

const novaTarefa = {
codigo: proximoCodigo++,
titulo: titulo.trim(),
prioridade: p,
concluida: false
}; 

svg

tarefas.push(novaTarefa);
return { sucesso: true, mensagem: `Tarefa "${novaTarefa.titulo}" cadastrada com sucesso!` };
} 

svg

function renderizarTarefas() {
const ul = document.getElementById("listaTarefas");
if (!ul) return; 

svg

ul.innerHTML = ""; 

svg

if (tarefas.length === 0) {
ul.innerHTML = "Nenhuma tarefa cadastrada. 

svg