// Gerenciador de tarefas - conceitos: arrays, objetos, funções, find, push e validação.
const tarefas = [];
let proximoCodigo = 0;

const form = document.getElementById('taskForm');
const tituloInput = document.getElementById('taskTitle');
const prioridadeInput = document.getElementById('taskPriority');
const lista = document.getElementById('taskList');
const buscaInput = document.getElementById('searchInput');
const filtroStatus = document.getElementById('statusFilter');
const filtroPrioridade = document.getElementById('priorityFilter');
const mensagem = document.getElementById('formMessage');
const emptyState = document.getElementById('emptyState');

function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== 'string' || titulo.trim().length < 5) {
    throw new Error('O título deve possuir no mínimo 5 caracteres.');
  }
  const numeroPrioridade = Number(prioridade);
  if (![1, 2, 3].includes(numeroPrioridade)) {
    throw new Error('A prioridade deve estar entre 1 e 3.');
  }
  return true;
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  proximoCodigo++;
  const novaTarefa = {
    codigo: proximoCodigo,
    titulo: titulo.trim(),
    prioridade: Number(prioridade),
    status: true // true = em andamento; false = concluída
  };
  tarefas.push(novaTarefa);
  renderizarTarefas();
  return novaTarefa;
}

function listarTarefas() {
  return tarefas;
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find(item => item.codigo === Number(codigo));
  if (!tarefa) throw new Error('Tarefa não encontrada.');
  return tarefa;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (tarefa.status === false) throw new Error('Essa tarefa já foi concluída.');
  tarefa.status = false;
  renderizarTarefas();
  return tarefa;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = Number(novaPrioridade);
  renderizarTarefas();
  return tarefa;
}

function prioridadeTexto(valor) {
  return ({1: 'Alta', 2: 'Média', 3: 'Baixa'})[valor];
}

function renderizarTarefas() {
  const termo = buscaInput.value.trim().toLowerCase();
  const statusSelecionado = filtroStatus.value;
  const prioridadeSelecionada = filtroPrioridade.value;

  const filtradas = listarTarefas().filter(tarefa => {
    const correspondeBusca = String(tarefa.codigo).includes(termo) ||
      tarefa.titulo.toLowerCase().includes(termo);
    const correspondeStatus = statusSelecionado === 'all' ||
      (statusSelecionado === 'pending' && tarefa.status) ||
      (statusSelecionado === 'done' && !tarefa.status);
    const correspondePrioridade = prioridadeSelecionada === 'all' ||
      tarefa.prioridade === Number(prioridadeSelecionada);
    return correspondeBusca && correspondeStatus && correspondePrioridade;
  });

  lista.innerHTML = '';
  filtradas.forEach(tarefa => {
    const linha = document.createElement('tr');

    const codigo = document.createElement('td');
    codigo.className = 'code';
    codigo.textContent = `#${String(tarefa.codigo).padStart(3, '0')}`;

    const nome = document.createElement('td');
    nome.className = 'task-name';
    nome.textContent = tarefa.titulo;

    const prioridade = document.createElement('td');
    const prioridadeBadge = document.createElement('span');
    prioridadeBadge.className = `priority priority-${tarefa.prioridade}`;
    prioridadeBadge.textContent = `${prioridadeTexto(tarefa.prioridade)} · ${tarefa.prioridade}`;
    prioridade.appendChild(prioridadeBadge);

    const status = document.createElement('td');
    const statusBadge = document.createElement('span');
    statusBadge.className = `status ${tarefa.status ? 'status-pending' : 'status-done'}`;
    statusBadge.textContent = tarefa.status ? '● Em andamento' : '✓ Concluída';
    status.appendChild(statusBadge);

    const acoes = document.createElement('td');
    const grupo = document.createElement('div');
    grupo.className = 'action-group';

    const concluir = document.createElement('button');
    concluir.className = 'action-btn complete';
    concluir.textContent = '✓ Concluir';
    concluir.disabled = !tarefa.status;
    concluir.addEventListener('click', () => executarAcao(() => {
      concluirTarefa(tarefa.codigo);
      mostrarToast('Tarefa concluída com sucesso!');
    }));

    const alterar = document.createElement('button');
    alterar.className = 'action-btn';
    alterar.textContent = 'Prioridade';
    alterar.addEventListener('click', () => abrirAlteracaoPrioridade(tarefa.codigo));

    grupo.append(concluir, alterar);
    acoes.appendChild(grupo);
    linha.append(codigo, nome, prioridade, status, acoes);
    lista.appendChild(linha);
  });

  emptyState.style.display = filtradas.length ? 'none' : 'block';
  document.getElementById('visibleCount').textContent =
    `${filtradas.length} ${filtradas.length === 1 ? 'tarefa' : 'tarefas'}`;
  atualizarResumo();
}

function atualizarResumo() {
  document.getElementById('totalCount').textContent = tarefas.length;
  document.getElementById('pendingCount').textContent =
    tarefas.filter(tarefa => tarefa.status).length;
  document.getElementById('doneCount').textContent =
    tarefas.filter(tarefa => !tarefa.status).length;
}

function executarAcao(acao) {
  try {
    acao();
  } catch (erro) {
    mostrarToast(erro.message);
  }
}

function abrirAlteracaoPrioridade(codigo) {
  try {
    const tarefa = buscarTarefa(codigo);
    const resposta = prompt(
      `Nova prioridade para "${tarefa.titulo}":\\n1 - Alta\\n2 - Média\\n3 - Baixa`,
      String(tarefa.prioridade)
    );
    if (resposta === null) return;
    alterarPrioridade(codigo, resposta);
    mostrarToast('Prioridade atualizada!');
  } catch (erro) {
    mostrarToast(erro.message);
  }
}

let toastTimer;
function mostrarToast(texto) {
  const toast = document.getElementById('toast');
  toast.textContent = texto;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

form.addEventListener('submit', evento => {
  evento.preventDefault();
  mensagem.textContent = '';
  try {
    cadastrarTarefa(tituloInput.value, prioridadeInput.value);
    form.reset();
    prioridadeInput.value = '2';
    tituloInput.focus();
    mostrarToast('Tarefa cadastrada com sucesso!');
  } catch (erro) {
    mensagem.textContent = erro.message;
  }
});

[buscaInput, filtroStatus, filtroPrioridade].forEach(controle => {
  controle.addEventListener('input', renderizarTarefas);
});

document.getElementById('today').textContent = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
}).format(new Date());

// Exemplos iniciais para demonstrar o funcionamento. Podem ser removidos.
cadastrarTarefa('Estudar JavaScript', 1);
cadastrarTarefa('Organizar os materiais do projeto', 2);
cadastrarTarefa('Revisar atividades da semana', 3);
"""

(base / "index.html").write_text(html, encoding="utf-8")
(base / "style.css").write_text(css, encoding="utf-8")
(base / "script.js").write_text(js, encoding="utf-8")

zip_path = Path("/mnt/data/gerenciador_tarefas_site.zip")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
    for p in base.iterdir():
        z.write(p, arcname=p.name)

print("Arquivos criados:", ", ".join(p.name for p in base.iterdir()))
print("ZIP:", zip_path)