// Coleção central de tarefas (array de objetos).
let tarefas = [];
let codigoAtual = 0;

const form = document.getElementById('taskForm');
const titleInput = document.getElementById('taskTitle');
const priorityInput = document.getElementById('taskPriority');
const message = document.getElementById('formMessage');
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');

// Mantém os dados após recarregar a página e conserva a sequência dos códigos.
function carregarDados() {
  try {
    const dados = JSON.parse(localStorage.getItem('taskflowDados'));
    if (dados && Array.isArray(dados.tarefas)) {
      tarefas = dados.tarefas;
      codigoAtual = Number(dados.codigoAtual) || 0;
    }
    // Ajusta o contador para não repetir códigos caso dados anteriores estejam incompletos.
    codigoAtual = Math.max(codigoAtual, ...tarefas.map(t => Number(t.codigo) || 0), 0);
  } catch (erro) {
    tarefas = [];
    codigoAtual = 0;
  }
}

function salvarDados() {
  localStorage.setItem('taskflowDados', JSON.stringify({ tarefas, codigoAtual }));
}

function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== 'string' || titulo.trim().length < 5) {
    throw new Error('O título deve possuir pelo menos cinco caracteres.');
  }
  const valorPrioridade = Number(prioridade);
  if (!Number.isInteger(valorPrioridade) || valorPrioridade < 1 || valorPrioridade > 3) {
    throw new Error('A prioridade deve ser um número entre 1 e 3.');
  }
  return true;
}
