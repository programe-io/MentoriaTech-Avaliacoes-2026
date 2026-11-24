// Seleciona os elementos principais do HTML
const formTarefa = document.getElementById('form-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const botoesFiltro = document.querySelectorAll('.btn-filtro');

const elTotal = document.getElementById('total-tarefas');
const elPendentes = document.getElementById('tarefas-pendentes');
const elConcluidas = document.getElementById('tarefas-concluidas');

let filtroAtual = 'todas';

// Atualiza os contadores no topo e aplica o filtro selecionado
function atualizarTela() {
  const itens = listaTarefas.querySelectorAll('.tarefa-item');
  let total = itens.length;
  let concluidas = 0;

  itens.forEach(item => {
    const estaConcluida = item.classList.contains('concluida');
    if (estaConcluida) {
      concluidas++;
    }

    // Mostra ou esconde conforme o filtro ativo
    if (filtroAtual === 'todas') {
      item.style.display = 'flex';
    } else if (filtroAtual === 'pendentes') {
      item.style.display = estaConcluida ? 'none' : 'flex';
    } else if (filtroAtual === 'concluidas') {
      item.style.display = estaConcluida ? 'flex' : 'none';
    }
  });

  elTotal.textContent = total;
  elConcluidas.textContent = concluidas;
  elPendentes.textContent = total - concluidas;
}

// Adiciona uma nova tarefa ao enviar o formulário
formTarefa.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const prioridade = document.getElementById('prioridade').value;
  const prazo = document.getElementById('prazo').value;

  const textoPrazo = prazo ? `Prazo: ${prazo}` : 'Sem prazo';

  const novaTarefa = document.createElement('li');
  novaTarefa.className = 'tarefa-item';
  novaTarefa.setAttribute('data-status', 'pendente');

  novaTarefa.innerHTML = `
    <div class="tarefa-info">
      <input type="checkbox" class="check-tarefa">
      <div>
        <strong>${titulo}</strong>
        <small>Prioridade: ${prioridade} • ${textoPrazo}</small>
      </div>
    </div>
    <button type="button" class="btn-remover">Remover</button>
  `;

  listaTarefas.prepend(novaTarefa);
  formTarefa.reset();
  atualizarTela();
});

// Controla cliques no checkbox (concluir) e no botão Remover
listaTarefas.addEventListener('click', function(evento) {
  const alvo = evento.target;
  const item = alvo.closest('.tarefa-item');
  if (!item) return;

  // Marcar ou desmarcar como concluída
  if (alvo.classList.contains('check-tarefa')) {
    if (alvo.checked) {
      item.classList.add('concluida');
      item.setAttribute('data-status', 'concluida');
    } else {
      item.classList.remove('concluida');
      item.setAttribute('data-status', 'pendente');
    }
    atualizarTela();
  }

  // Excluir a tarefa da lista
  if (alvo.classList.contains('btn-remover')) {
    item.remove();
    atualizarTela();
  }
});

// Alterna entre os filtros Todas, Pendentes e Concluídas
botoesFiltro.forEach(botao => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    filtroAtual = botao.getAttribute('data-filtro');
    atualizarTela();
  });
});

// Inicializa os contadores ao carregar a página
atualizarTela();