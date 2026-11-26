Nenhum selecionado

Pular para o conteúdo
Como usar o E-mail de SEDUC - Secretaria de Estado da Educação do Piauí com leitores de tela

1 de 55
AVALIAÇÃO 2
Caixa de entrada
Franco Angelo Pereira Nunes <franco.nunes@professor.edu.pi.gov.br>
Anexos
10:00 (há 0 minuto)
para mim, beatriz.vitalino, deyvide.moura, eva.rozangela, francisco.kaylan.2008, geovana.laisla, iris.brito, italo.martins.2007, jackeline.gualberto, jailane.batista, maria.keylane.2010, maria.santana.moura, micaely.fernanda, otavio.ferreira.2008, pietra.bezerra, rakele.cruz, samira.bezerra, vitoria.alice, yank.gomes, yasmim.silva.soares

Esta mensagem não foi enviada para a caixa de spam devido às configurações de e-mail da sua organização.
Mover para "Spam"
Parece que esta mensagem está em inglês

 3 anexos
  •  Verificados pelo Gmail
JAVASCRIPT.txt
100%
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

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  codigoAtual++;
  const novaTarefa = {
    codigo: codigoAtual,
    titulo: titulo.trim(),
    prioridade: Number(prioridade),
    status: true // true significa em andamento; false significa concluída.
  };
  tarefas.push(novaTarefa);
  salvarDados();
  return novaTarefa;
}

function listarTarefas() {
  return tarefas;
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find(item => item.codigo === Number(codigo));
  if (!tarefa) throw new Error('Tarefa com esse código não foi encontrada.');
  return tarefa;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) throw new Error('Esta tarefa já está concluída.');
  tarefa.status = false;
  salvarDados();
  return tarefa;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = Number(novaPrioridade);
  salvarDados();
  return tarefa;
}

function mostrarMensagem(texto, tipo) {
  message.textContent = texto;
  message.className = `message ${tipo}`;
  if (tipo === 'success') {
    window.setTimeout(() => {
      if (message.textContent === texto) message.textContent = '';
    }, 3500);
  }
}

function renderizarTarefas() {
  const termo = searchInput.value.trim().toLowerCase();
  const filtro = filterSelect.value;
  const lista = listarTarefas().filter(tarefa => {
    const correspondeTermo = String(tarefa.codigo).includes(termo) || tarefa.titulo.toLowerCase().includes(termo);
    const correspondeFiltro = filtro === 'all' || (filtro === 'active' && tarefa.status) || (filtro === 'done' && !tarefa.status);
    return correspondeTermo && correspondeFiltro;
  });

  tasksList.innerHTML = '';
  emptyState.classList.toggle('hidden', lista.length > 0);
  if (lista.length === 0 && (tarefas.length > 0 || termo || filtro !== 'all')) {
    emptyState.querySelector('h3').textContent = 'Nenhuma tarefa encontrada';
    emptyState.querySelector('p').textContent = 'Tente alterar a busca ou o filtro selecionado.';
  } else {
    emptyState.querySelector('h3').textContent = 'Nenhuma tarefa por aqui';
    emptyState.querySelector('p').textContent = 'Cadastre sua primeira tarefa usando o formulário.';
  }

  lista.slice().reverse().forEach(tarefa => {
    const item = document.createElement('article');
    item.className = `task-item ${tarefa.status ? '' : 'completed'}`;

    const check = document.createElement('button');
    check.className = 'task-check';
    check.type = 'button';
    check.title = tarefa.status ? 'Concluir tarefa' : 'Tarefa concluída';
    check.setAttribute('aria-label', check.title);
    check.textContent = tarefa.status ? '' : '✓';
    check.disabled = !tarefa.status;
    check.addEventListener('click', () => executarAcao(() => concluirTarefa(tarefa.codigo), 'Tarefa concluída!'));

    const content = document.createElement('div');
    content.className = 'task-content';
    const titulo = document.createElement('div');
    titulo.className = 'task-title';
    titulo.textContent = tarefa.titulo;
    const meta = document.createElement('div');
    meta.className = 'task-meta';
    const codigo = document.createElement('span');
    codigo.className = 'code-tag';
    codigo.textContent = `#${tarefa.codigo}`;
    const prioridade = document.createElement('span');
    prioridade.className = `priority priority-${tarefa.prioridade}`;
    prioridade.textContent = ['','Alta','Média','Baixa'][tarefa.prioridade];
    meta.append(codigo, prioridade);
    if (!tarefa.status) {
      const status = document.createElement('span');
      status.className = 'status-tag';
      status.textContent = 'Concluída';
      meta.append(status);
    }
    content.append(titulo, meta);

    const actions = document.createElement('div');
    actions.className = 'task-actions';
    if (tarefa.status) {
      const edit = document.createElement('button');
      edit.className = 'action-btn';
      edit.type = 'button';
      edit.textContent = 'Prioridade';
      edit.title = 'Alterar prioridade';
      edit.addEventListener('click', () => solicitarPrioridade(tarefa.codigo));
      actions.append(edit);
    }
    item.append(check, content, actions);
    tasksList.append(item);
  });
  atualizarResumo();
}

function atualizarResumo() {
  document.getElementById('totalCount').textContent = tarefas.length;
  document.getElementById('activeCount').textContent = tarefas.filter(t => t.status).length;
  document.getElementById('doneCount').textContent = tarefas.filter(t => !t.status).length;
}

function executarAcao(acao, sucesso) {
  try {
    acao();
    mostrarMensagem(sucesso, 'success');
    renderizarTarefas();
  } catch (erro) {
    mostrarMensagem(erro.message, 'error');
  }
}

function solicitarPrioridade(codigo) {
  const tarefa = buscarTarefa(codigo);
  const resposta = window.prompt(`Alterar prioridade da tarefa #${codigo}:\n1 - Alta\n2 - Média\n3 - Baixa`, String(tarefa.prioridade));
  if (resposta === null) return;
  executarAcao(() => alterarPrioridade(codigo, resposta), 'Prioridade atualizada com sucesso!');
}

form.addEventListener('submit', event => {
  event.preventDefault();
  try {
    cadastrarTarefa(titleInput.value, priorityInput.value);
    form.reset();
    mostrarMensagem('Tarefa cadastrada com sucesso!', 'success');
    renderizarTarefas();
    titleInput.focus();
  } catch (erro) {
    mostrarMensagem(erro.message, 'error');
  }
});

searchInput.addEventListener('input', renderizarTarefas);
filterSelect.addEventListener('change', renderizarTarefas);

document.getElementById('todayDate').textContent = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date());
carregarDados();
renderizarTarefas();
Exibindo JAVASCRIPT.txt. 