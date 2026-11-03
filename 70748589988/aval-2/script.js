// Array para o banco de dados de tarefas
const tarefas = [];

// Seleção de elementos da DOM
const formTarefa = document.getElementById('form-tarefa');
const tabelaCorpo = document.getElementById('tabela-corpo');
const listaVazia = document.getElementById('lista-vazia');
const toastBox = document.getElementById('toast-mensagem');

// Contadores de estatísticas
const statTotal = document.getElementById('stat-total');
const statPendentes = document.getElementById('stat-pendentes');
const statConcluidas = document.getElementById('stat-concluidas');

// Exibe notificações dinâmicas (Toast)
function mostrarNotificacao(mensagem, tipo = 'success') {
  toastBox.textContent = mensagem;
  toastBox.className = `toast toast-${tipo}`;
  toastBox.style.display = 'block';

  setTimeout(() => {
    toastBox.style.display = 'none';
  }, 3500);
}

// Atualiza o painel de estatísticas no topo
function atualizarEstatisticas() {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const pendentes = total - concluidas;

  statTotal.textContent = total;
  statPendentes.textContent = pendentes;
  statConcluidas.textContent = concluidas;
}

// 1. Cadastrar uma nova tarefa
formTarefa.addEventListener('submit', (event) => {
  event.preventDefault();

  const codigo = document.getElementById('codigo').value.trim();
  const titulo = document.getElementById('titulo').value.trim();
  const prioridade = parseInt(document.getElementById('prioridade').value, 10);

  // Validação: Código único
  if (tarefas.some(t => t.codigo.toLowerCase() === codigo.toLowerCase())) {
    mostrarNotificacao(`Código "${codigo}" já cadastrado.`, 'error');
    return;
  }

  // Validação: Título mínimo de 5 caracteres
  if (titulo.length < 5) {
    mostrarNotificacao('O título deve conter pelo menos 5 caracteres.', 'error');
    return;
  }

  // Validação: Prioridade entre 1 e 3
  if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
    mostrarNotificacao('A prioridade deve ser entre 1 (Alta) e 3 (Baixa).', 'error');
    return;
  }

  // Adiciona novo objeto à lista
  tarefas.push({
    codigo,
    titulo,
    prioridade,
    concluida: false
  });

  mostrarNotificacao(`Tarefa "${codigo}" cadastrada com sucesso!`, 'success');
  formTarefa.reset();
  listarTarefas();
});

// 2. Listar as tarefas cadastrais
function listarTarefas() {
  tabelaCorpo.innerHTML = '';

  if (tarefas.length === 0) {
    listaVazia.style.display = 'block';
    atualizarEstatisticas();
    return;
  }

  listaVazia.style.display = 'none';

  // Ordenação automática por nível de prioridade (1 a 3)
  const tarefasOrdenadas = [...tarefas].sort((a, b) => a.prioridade - b.prioridade);

  tarefasOrdenadas.forEach(tarefa => {
    const tr = document.createElement('tr');

    // Coluna Código
    const tdCodigo = document.createElement('td');
    tdCodigo.innerHTML = `<code>${tarefa.codigo}</code>`;

    // Coluna Título
    const tdTitulo = document.createElement('td');
    tdTitulo.textContent = tarefa.titulo;
    if (tarefa.concluida) {
      tdTitulo.classList.add('text-strikethrough');
    }

    // Coluna Prioridade (Badge)
    const tdPrioridade = document.createElement('td');
    const rotulos = { 1: '1 - Alta', 2: '2 - Média', 3: '3 - Baixa' };
    tdPrioridade.innerHTML = `<span class="badge badge-p${tarefa.prioridade}">${rotulos[tarefa.prioridade]}</span>`;

    // Coluna Status
    const tdStatus = document.createElement('td');
    const statusTexto = tarefa.concluida ? 'Concluída' : 'Pendente';
    const statusClasse = tarefa.concluida ? 'badge-status-done' : 'badge-status-pending';
    tdStatus.innerHTML = `<span class="badge ${statusClasse}">${statusTexto}</span>`;

    // Coluna Ações
    const tdAcoes = document.createElement('td');

    const btnConcluir = document.createElement('button');
    btnConcluir.className = 'btn btn-action btn-check';
    btnConcluir.textContent = tarefa.concluida ? 'Reabrir' : 'Concluir';
    btnConcluir.addEventListener('click', () => alternarStatus(tarefa.codigo));

    const btnPrioridade = document.createElement('button');
    btnPrioridade.className = 'btn btn-action';
    btnPrioridade.textContent = 'Alterar Prioridade';
    btnPrioridade.addEventListener('click', () => alterarPrioridade(tarefa.codigo));

    tdAcoes.appendChild(btnConcluir);
    tdAcoes.appendChild(btnPrioridade);

    tr.appendChild(tdCodigo);
    tr.appendChild(tdTitulo);
    tr.appendChild(tdPrioridade);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAcoes);

    tabelaCorpo.appendChild(tr);
  });

  atualizarEstatisticas();
}

// 3. Marcar uma tarefa como concluída / reabrir
function alternarStatus(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) return;

  tarefa.concluida = !tarefa.concluida;
  const acao = tarefa.concluida ? 'concluída' : 'reaberta';
  mostrarNotificacao(`Tarefa "${tarefa.codigo}" ${acao}.`, 'success');
  listarTarefas();
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) return;

  const entrada = prompt(
    `Alterar prioridade de "${tarefa.titulo}"\n` +
    `1 = Alta | 2 = Média | 3 = Baixa\n` +
    `Prioridade Atual: ${tarefa.prioridade}`
  );

  if (entrada === null || entrada.trim() === '') return;

  const novaPrioridade = parseInt(entrada, 10);

  // Validação rigorosa: aceitar apenas 1, 2 ou 3
  if (isNaN(novaPrioridade) || novaPrioridade < 1 || novaPrioridade > 3) {
    mostrarNotificacao('Prioridade inválida! Digite um valor de 1 a 3.', 'error');
    return;
  }

  tarefa.prioridade = novaPrioridade;
  mostrarNotificacao(`Prioridade da tarefa "${tarefa.codigo}" atualizada para ${novaPrioridade}.`, 'success');
  listarTarefas();
}

// Carregamento inicial da tela
listarTarefas();