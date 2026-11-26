// Estado da aplicação
let tarefas = [];
let proximoCodigo = 1;

// Referências do DOM
const form = document.getElementById('task-form');
const inputTitulo = document.getElementById('task-title');
const selectPrioridade = document.getElementById('task-priority');
const listaTarefasEl = document.getElementById('task-list');
const emptyStateEl = document.getElementById('empty-state');
const counterEl = document.getElementById('task-counter');
const feedbackEl = document.getElementById('feedback-message');

// --- REGRAS DE VALIDAÇÃO ---
function validarTarefa(titulo, prioridade) {
  const tituloLimpo = titulo.trim();
  
  if (tituloLimpo.length < 5) {
    return { valido: false, erro: 'O título deve ter no mínimo 5 caracteres.' };
  }

  const prioNum = Number(prioridade);
  if (![1, 2, 3].includes(prioNum)) {
    return { valido: false, erro: 'A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).' };
  }

  return { valido: true, titulo: tituloLimpo, prioridade: prioNum };
}

function exibirFeedback(mensagem, tipo = 'success') {
  feedbackEl.textContent = mensagem;
  feedbackEl.className = `feedback ${tipo}`;
  
  setTimeout(() => {
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
  }, 3500);
}

// --- OPERAÇÕES DO SISTEMA ---

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
  const validacao = validarTarefa(titulo, prioridade);

  if (!validacao.valido) {
    exibirFeedback(validacao.erro, 'error');
    return false;
  }

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: validacao.titulo,
    prioridade: validacao.prioridade,
    concluida: false
  };

  tarefas.push(novaTarefa);
  exibirFeedback('Tarefa cadastrada com sucesso!', 'success');
  renderizarTarefas();
  return true;
}

// 2. Marcar tarefa como concluída (alterna status)
function alternarConclusao(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) return;

  tarefa.concluida = !tarefa.concluida;
  renderizarTarefas();
}

// 3. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
  const prioNum = Number(novaPrioridade);
  if (![1, 2, 3].includes(prioNum)) {
    exibirFeedback('Prioridade inválida.', 'error');
    return;
  }

  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) return;

  tarefa.prioridade = prioNum;
  exibirFeedback(`Prioridade da tarefa #${codigo} atualizada.`, 'success');
  renderizarTarefas();
}

// 4. Listar as tarefas cadastradas na interface
function renderizarTarefas() {
  listaTarefasEl.innerHTML = '';

  // Atualiza contador
  const total = tarefas.length;
  counterEl.textContent = `${total} ${total === 1 ? 'tarefa' : 'tarefas'}`;

  // Controla mensagem de lista vazia
  if (total === 0) {
    emptyStateEl.style.display = 'block';
    return;
  }
  emptyStateEl.style.display = 'none';

  // Ordena por prioridade (1 = Alta primeiro) e status (pendentes primeiro)
  const tarefasOrdenadas = [...tarefas].sort((a, b) => {
    if (a.concluida !== b.concluida) return a.concluida ? 1 : -1;
    return a.prioridade - b.prioridade;
  });

  tarefasOrdenadas.forEach(tarefa => {
    const li = document.createElement('li');
    li.className = `task-item prio-${tarefa.prioridade} ${tarefa.concluida ? 'completed' : ''}`;

    // Criação segura dos elementos (evita XSS)
    const infoDiv = document.createElement('div');
    infoDiv.className = 'task-info';

    const codeSpan = document.createElement('span');
    codeSpan.className = 'task-code';
    codeSpan.textContent = `#${String(tarefa.codigo).padStart(3, '0')}`;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'task-title';
    titleSpan.textContent = tarefa.titulo;

    infoDiv.append(codeSpan, titleSpan);

    // Controles de ação
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    // Select para alterar prioridade
    const prioSelect = document.createElement('select');
    prioSelect.className = 'priority-select';
    prioSelect.ariaLabel = 'Alterar prioridade';
    
    const opcoes = [
      { valor: 1, texto: '1 - Alta' },
      { valor: 2, texto: '2 - Média' },
      { valor: 3, texto: '3 - Baixa' }
    ];

    opcoes.forEach(op => {
      const option = document.createElement('option');
      option.value = op.valor;
      option.textContent = op.texto;
      if (tarefa.prioridade === op.valor) option.selected = true;
      prioSelect.appendChild(option);
    });

    prioSelect.addEventListener('change', (e) => {
      alterarPrioridade(tarefa.codigo, e.target.value);
    });

    // Botão de concluir
    const btnConcluir = document.createElement('button');
    btnConcluir.type = 'button';
    btnConcluir.className = `btn-status ${tarefa.concluida ? 'is-done' : ''}`;
    btnConcluir.textContent = tarefa.concluida ? '✓ Concluída' : 'Concluir';
    btnConcluir.addEventListener('click', () => alternarConclusao(tarefa.codigo));

    actionsDiv.append(prioSelect, btnConcluir);
    li.append(infoDiv, actionsDiv);
    listaTarefasEl.appendChild(li);
  });
}

// --- EVENTOS ---
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const sucesso = cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
  
  if (sucesso) {
    inputTitulo.value = '';
    selectPrioridade.value = '2';
    inputTitulo.focus();
  }
});

// Inicialização
renderizarTarefas();
