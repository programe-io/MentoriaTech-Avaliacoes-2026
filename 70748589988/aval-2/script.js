// Array para armazenar as tarefas
const tarefas = [];

// Elementos da DOM
const formTarefa = document.getElementById('form-tarefa');
const tabelaCorpo = document.getElementById('tabela-corpo');
const listaVazia = document.getElementById('lista-vazia');
const mensagemBox = document.getElementById('mensagem');

const totalEl = document.getElementById('total-tarefas');
const pendentesEl = document.getElementById('pendentes-tarefas');
const concluidasEl = document.getElementById('concluidas-tarefas');

// Exibe mensagens de feedback
function exibirMensagem(texto, tipo = 'success') {
  mensagemBox.textContent = texto;
  mensagemBox.className = `alert alert-${tipo}`;
  mensagemBox.style.display = 'block';

  setTimeout(() => {
    mensagemBox.style.display = 'none';
  }, 3500);
}

// Atualiza o painel de contadores
function atualizarContadores() {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const pendentes = total - concluidas;

  totalEl.textContent = total;
  pendentesEl.textContent = pendentes;
  concluidasEl.textContent = concluidas;
}

// 1. Cadastrar uma nova tarefa com validações
formTarefa.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigo = document.getElementById('codigo').value.trim();
  const titulo = document.getElementById('titulo').value.trim();
  const prioridade = parseInt(document.getElementById('prioridade').value, 10);

  // Validação: Código único
  if (tarefas.some(t => t.codigo.toLowerCase() === codigo.toLowerCase())) {
    exibirMensagem(`Erro: O código "${codigo}" já está em uso.`, 'error');
    return;
  }

  // Validação: Título com no mínimo 5 caracteres
  if (titulo.length < 5) {
    exibirMensagem('Erro: O título deve ter no mínimo 5 caracteres.', 'error');
    return;
  }

  // Validação: Prioridade entre 1 (alta) e 3 (baixa)
  if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
    exibirMensagem('Erro: A prioridade deve ser um valor entre 1 (Alta) e 3 (Baixa).', 'error');
    return;
  }

  tarefas.push({
    codigo,
    titulo,
    prioridade,
    concluida: false
  });

  exibirMensagem(`Tarefa "${titulo}" cadastrada com sucesso!`, 'success');
  formTarefa.reset();
  listarTarefas();
});

// 2. Listar as tarefas cadastradas
function listarTarefas() {
  tabelaCorpo.innerHTML = '';

  if (tarefas.length === 0) {
    listaVazia.style.display = 'block';
    atualizarContadores();
    return;
  }

  listaVazia.style.display = 'none';

  // Ordenação por prioridade (1 = Alta, 2 = Média, 3 = Baixa)
  const tarefasOrdenadas = [...tarefas].sort((a, b) => a.prioridade - b.prioridade);

  tarefasOrdenadas.forEach(tarefa => {
    const tr = document.createElement('tr');

    const tdCodigo = document.createElement('td');
    tdCodigo.innerHTML = `<strong>${tarefa.codigo}</strong>`;

    const tdTitulo = document.createElement('td');
    tdTitulo.textContent = tarefa.titulo;
    if (tarefa.concluida) {
      tdTitulo.classList.add('concluido');
    }

    const tdPrioridade = document.createElement('td');
    const rotulos = { 1: '1 - Alta', 2: '2 - Média', 3: '3 - Baixa' };
    tdPrioridade.innerHTML = `<span class="badge badge-p${tarefa.prioridade}">${rotulos[tarefa.prioridade]}</span>`;

    const tdStatus = document.createElement('td');
    const statusTexto = tarefa.concluida ? 'Concluída' : 'Pendente';
    const statusClasse = tarefa.concluida ? 'badge-status-done' : 'badge-status-pending';
    tdStatus.innerHTML = `<span class="badge ${statusClasse}">${statusTexto}</span>`;

    const tdAcoes = document.createElement('td');

    const btnStatus = document.createElement('button');
    btnStatus.className = 'btn btn-action';
    btnStatus.textContent = tarefa.concluida ? 'Reabrir' : 'Concluir';
    btnStatus.addEventListener('click', () => alternarStatus(tarefa.codigo));

    const btnPrioridade = document.createElement('button');
    btnPrioridade.className = 'btn btn-action';
    btnPrioridade.textContent = 'Alterar Prioridade';
    btnPrioridade.addEventListener('click', () => alterarPrioridade(tarefa.codigo));

    tdAcoes.appendChild(btnStatus);
    tdAcoes.appendChild(btnPrioridade);

    tr.appendChild(tdCodigo);
    tr.appendChild(tdTitulo);
    tr.appendChild(tdPrioridade);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAcoes);

    tabelaCorpo.appendChild(tr);
  });

  atualizarContadores();
}

// 3. Marcar uma tarefa como concluída (ou reabrir)
function alternarStatus(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) return;

  tarefa.concluida = !tarefa.concluida;
  const acao = tarefa.concluida ? 'concluída' : 'reaberta';
  exibirMensagem(`Tarefa "${tarefa.titulo}" foi ${acao}.`, 'success');
  listarTarefas();
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) return;

  const entrada = prompt(`Nova prioridade para "${tarefa.titulo}"\n(1 = Alta, 2 = Média, 3 = Baixa)\nAtual: ${tarefa.prioridade}`);
  if (entrada === null || entrada.trim() === '') return;

  const novaPrioridade = parseInt(entrada, 10);

  // Validação: Prioridade entre 1 e 3
  if (isNaN(novaPrioridade) || novaPrioridade < 1 || novaPrioridade > 3) {
    exibirMensagem('Erro: A prioridade deve ser 1 (Alta), 2 (Média) ou 3 (Baixa).', 'error');
    return;
  }

  tarefa.prioridade = novaPrioridade;
  exibirMensagem(`Prioridade de "${tarefa.titulo}" alterada para ${novaPrioridade}.`, 'success');
  listarTarefas();
}

// Inicializa a listagem ao carregar a página
listarTarefas();