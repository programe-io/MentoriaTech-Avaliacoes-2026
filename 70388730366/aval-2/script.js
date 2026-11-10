// Armazenamento em memória das tarefas
let tarefas = [];
let proximoCodigo = 1;

// Seleção dos elementos do DOM
const inputTitle = document.getElementById('taskTitle');
const selectPriority = document.getElementById('taskPriority');
const tableBody = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');

/**
 * 1. Cadastra uma nova tarefa no sistema
 */
function cadastrarTarefa() {
  const titulo = inputTitle.value.trim();
  const prioridade = parseInt(selectPriority.value, 10);

  // Validação: Título com no mínimo 5 caracteres
  if (titulo.length < 5) {
    exibirErro("O título da tarefa deve ter no mínimo 5 caracteres.");
    return;
  }

  // Validação: Prioridade entre 1 e 3
  if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
    exibirErro("Selecione uma prioridade válida entre 1 (alta) e 3 (baixa).");
    return;
  }

  ocultarErro();

  // Criação do objeto tarefa
  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(novaTarefa);
  
  // Limpeza dos campos
  inputTitle.value = '';
  selectPriority.value = '2';

  listarTarefas();
}

/**
 * 2. Renderiza a lista de tarefas na tabela
 */
function listarTarefas() {
  tableBody.innerHTML = '';

  if (tarefas.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">Nenhuma tarefa cadastrada.</td></tr>';
    return;
  }

  tarefas.forEach(tarefa => {
    const tr = document.createElement('tr');
    const prioridadeTexto = { 1: 'Alta', 2: 'Média', 3: 'Baixa' }[tarefa.prioridade];

    const btnConcluir = !tarefa.concluida 
      ? `<button class="btn-action btn-complete" onclick="marcarConcluida(${tarefa.codigo})">Concluir</button>` 
      : '';

    tr.innerHTML = `
      <td>#${tarefa.codigo}</td>
      <td class="${tarefa.concluida ? 'completed' : ''}">${escapeHtml(tarefa.titulo)}</td>
      <td>
        <span class="badge-priority p-${tarefa.prioridade}">${prioridadeTexto}</span>
      </td>
      <td>${tarefa.concluida ? 'Concluída' : 'Pendente'}</td>
      <td>
        ${btnConcluir}
        <select class="select-priority-inline" onchange="alterarPrioridade(${tarefa.codigo}, this.value)">
          <option value="1" ${tarefa.prioridade === 1 ? 'selected' : ''}>P1 (Alta)</option>
          <option value="2" ${tarefa.prioridade === 2 ? 'selected' : ''}>P2 (Média)</option>
          <option value="3" ${tarefa.prioridade === 3 ? 'selected' : ''}>P3 (Baixa)</option>
        </select>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

/**
 * 3. Marca uma tarefa existente como concluída
 */
function marcarConcluida(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (tarefa) {
    tarefa.concluida = true;
    listarTarefas();
  }
}

/**
 * 4. Altera a prioridade de uma tarefa
 */
function alterarPrioridade(codigo, novaPrioridade) {
  const prioridadeNum = parseInt(novaPrioridade, 10);
  
  if (prioridadeNum >= 1 && prioridadeNum <= 3) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
      tarefa.prioridade = prioridadeNum;
      listarTarefas();
    }
  }
}

// Funções utilitárias
function exibirErro(mensagem) {
  errorMsg.textContent = mensagem;
  errorMsg.style.display = 'block';
}

function ocultarErro() {
  errorMsg.style.display = 'none';
}

function escapeHtml(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Renderização inicial ao carregar a página
listarTarefas();