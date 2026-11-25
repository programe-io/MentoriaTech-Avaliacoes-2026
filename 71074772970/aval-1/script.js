let tarefas = [];
let codigoAtual = 1;

const form = document.getElementById('formTarefa');
const listaTarefas = document.getElementById('listaTarefas');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = form.titulo.value.trim();
  const prioridade = parseInt(form.prioridade.value);

  // Validação do título
  if (titulo.length < 5) {
    alert('O título deve ter no mínimo 5 caracteres.');
    return;
  }

  // Validação da prioridade
  if (!(prioridade >= 1 && prioridade <= 3)) {
    alert('A prioridade deve ser um valor entre 1 e 3.');
    return;
  }

  // Adiciona tarefa nova
  tarefas.push({ codigo: codigoAtual++, titulo, prioridade, concluida: false });
  form.reset();
  renderizarTarefas();
});

function renderizarTarefas() {
  listaTarefas.innerHTML = '';

  if (tarefas.length === 0) {
    listaTarefas.innerHTML = '<p>Nenhuma tarefa cadastrada.</p>';
    return;
  }

  tarefas.forEach(tarefa => {
    const div = document.createElement('div');
    div.className = 'tarefa' + (tarefa.concluida ? ' concluida' : '');

    div.innerHTML = `
      <strong>[${tarefa.codigo}] ${tarefa.titulo}</strong><br />
      Prioridade: ${tarefa.prioridade} <br />
      Status: ${tarefa.concluida ? 'Concluída' : 'Pendente'}<br /><br />
      <button onclick="marcarConcluida(${tarefa.codigo})">Marcar como Concluída</button>
      <label for="prio-${tarefa.codigo}">Alterar Prioridade:</label>
      <select id="prio-${tarefa.codigo}" onchange="alterarPrioridade(${tarefa.codigo}, this.value)">
        <option value="1" ${tarefa.prioridade == 1 ? 'selected' : ''}>1 - Alta</option>
        <option value="2" ${tarefa.prioridade == 2 ? 'selected' : ''}>2 - Média</option>
        <option value="3" ${tarefa.prioridade == 3 ? 'selected' : ''}>3 - Baixa</option>
      </select>
    `;

    listaTarefas.appendChild(div);
  });
}

function marcarConcluida(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (tarefa) {
    tarefa.concluida = true;
    renderizarTarefas();
  }
}

function alterarPrioridade(codigo, novaPrioridade) {
  const prioridadeNum = parseInt(novaPrioridade);
  if (prioridadeNum >= 1 && prioridadeNum <= 3) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
      tarefa.prioridade = prioridadeNum;
      renderizarTarefas();
    }
  } else {
    alert('Prioridade inválida, deve ser entre 1 e 3.');
  }
}

// Inicializa lista ao carregar
renderizarTarefas();
