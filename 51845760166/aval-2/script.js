const inputTarefa = document.getElementById('inputTarefa');
const selectCategoria = document.getElementById('selectCategoria');
const selectPrioridade = document.getElementById('selectPrioridade');
const inputData = document.getElementById('inputData');
const inputBusca = document.getElementById('inputBusca');
const listaTarefas = document.getElementById('listaTarefas');

let tarefas = JSON.parse(localStorage.getItem('taskpro_dados')) || [];
let filtroAtual = 'todas';

document.addEventListener('DOMContentLoaded', () => {
  carregarTema();
  renderizarTarefas();
});

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();
  const categoria = selectCategoria.value;
  const prioridade = selectPrioridade.value;
  const data = inputData.value;

  if (texto === '') {
    alert('Digite o nome da tarefa!');
    return;
  }

  const novaTarefa = {
    id: Date.now(),
    texto: texto,
    categoria: categoria,
    prioridade: prioridade,
    data: data,
    concluida: false
  };

  tarefas.unshift(novaTarefa); // Adiciona no topo da lista
  salvarEAtualizar();

  inputTarefa.value = '';
  inputData.value = '';
  inputTarefa.focus();
}

function alternarConclusao(id) {
  tarefas = tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t);
  salvarEAtualizar();
}

function editarTarefa(id) {
  const tarefaAlvo = tarefas.find(t => t.id === id);
  if (!tarefaAlvo) return;

  const novoTexto = prompt('Editar tarefa:', tarefaAlvo.texto);
  if (novoTexto !== null && novoTexto.trim() !== '') {
    tarefas = tarefas.map(t => t.id === id ? { ...t, texto: novoTexto.trim() } : t);
    salvarEAtualizar();
  }
}

function removerTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarEAtualizar();
}

function limparConcluidas() {
  const temConcluidas = tarefas.some(t => t.concluida);
  if (!temConcluidas) return;

  if (confirm('Deseja apagar todas as tarefas concluídas?')) {
    tarefas = tarefas.filter(t => !t.concluida);
    salvarEAtualizar();
  }
}

function filtrarTarefas(filtro, botaoClicado) {
  filtroAtual = filtro;
  document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('ativo'));
  botaoClicado.classList.add('ativo');
  renderizarTarefas();
}

function verificarAtraso(dataISO, concluida) {
  if (!dataISO || concluida) return false;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const [ano, mes, dia] = dataISO.split('-');
  const dataPrazo = new Date(ano, mes - 1, dia);
  return dataPrazo < hoje;
}

function formatarData(dataISO) {
  if (!dataISO) return 'Sem prazo';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

function atualizarProgresso() {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  document.getElementById('textoProgresso').textContent = `${concluidas} de ${total} concluídas`;
  document.getElementById('porcentagemProgresso').textContent = `${porcentagem}%`;
  document.getElementById('barraPreenchimento').style.width = `${porcentagem}%`;
}

function renderizarTarefas() {
  listaTarefas.innerHTML = '';
  const termoBusca = inputBusca.value.toLowerCase();

  const tarefasFiltradas = tarefas.filter(tarefa => {
    const bateFiltro =
      filtroAtual === 'todas' ||
      (filtroAtual === 'pendentes' && !tarefa.concluida) ||
      (filtroAtual === 'concluidas' && tarefa.concluida);

    const bateBusca = tarefa.texto.toLowerCase().includes(termoBusca) ||
                      tarefa.categoria.toLowerCase().includes(termoBusca);

    return bateFiltro && bateBusca;
  });

  tarefasFiltradas.forEach(tarefa => {
    const li = document.createElement('li');
    li.classList.add(`prioridade-${tarefa.prioridade}`);
    if (tarefa.concluida) li.classList.add('concluida');

    const atrasada = verificarAtraso(tarefa.data, tarefa.concluida);

    li.innerHTML = `
      <div class="info-tarefa" onclick="alternarConclusao(${tarefa.id})">
        <span class="texto-tarefa">${tarefa.texto}</span>
        <div class="detalhes-tarefa">
          <span class="tag-categoria">${tarefa.categoria}</span>
          <span class="${atrasada ? 'atrasada' : ''}">
            📅 ${formatarData(tarefa.data)} ${atrasada ? '(Atrasada!)' : ''}
          </span>
        </div>
      </div>
      <div class="acoes-item">
        <button onclick="editarTarefa(${tarefa.id})" title="Editar">✏️</button>
        <button onclick="removerTarefa(${tarefa.id})" title="Excluir">🗑️</button>
      </div>
    `;

    listaTarefas.appendChild(li);
  });

  atualizarProgresso();
}

function salvarEAtualizar() {
  localStorage.setItem('taskpro_dados', JSON.stringify(tarefas));
  renderizarTarefas();
}

// Gerenciamento de Tema (Claro / Escuro)
function alternarTema() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById('btnTema').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('taskpro_tema', isDark ? 'escuro' : 'claro');
}

function carregarTema() {
  const temaSalvo = localStorage.getItem('taskpro_tema');
  if (temaSalvo === 'escuro') {
    document.body.classList.add('dark-mode');
    document.getElementById('btnTema').textContent = '☀️';
  }
}

inputTarefa.addEventListener('keypress', e => {
  if (e.key === 'Enter') adicionarTarefa();
});
