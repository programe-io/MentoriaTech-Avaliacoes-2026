let tarefas = [];
let filtroAtual = 'all';

const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');

const totalEl = document.getElementById('total-tarefas');
const concluidasEl = document.getElementById('tarefas-concluidas');
const pendentesEl = document.getElementById('tarefas-pendentes');
const filterBtns = document.querySelectorAll('.filter-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = input.value.trim();

  if (texto) {
    tarefas.push({
      id: Date.now(),
      texto: texto,
      concluida: false
    });
    input.value = '';
    renderizar();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtroAtual = btn.dataset.filter;
    renderizar();
  });
});

function alternarTarefa(id) {
  tarefas = tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t);
  renderizar();
}

function removerTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  renderizar();
}

function renderizar() {
  // Filtragem
  const tarefasFiltradas = tarefas.filter(t => {
    if (filtroAtual === 'pending') return !t.concluida;
    if (filtroAtual === 'completed') return t.concluida;
    return true;
  });

  // Renderizar Lista
  taskList.innerHTML = '';
  if (tarefasFiltradas.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';

    tarefasFiltradas.forEach(t => {
      const li = document.createElement('li');
      li.className = `task-item ${t.concluida ? 'completed' : ''}`;
      li.innerHTML = `
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" ${t.concluida ? 'checked' : ''} onchange="alternarTarefa(${t.id})">
          <span>${t.texto}</span>
        </label>
        <button onclick="removerTarefa(${t.id})" style="background: transparent; color: red; width: auto; padding: 4px;">Excluir</button>
      `;
      taskList.appendChild(li);
    });
  }

  // Contadores Gerais
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const pendentes = total - concluidas;

  totalEl.textContent = total;
  concluidasEl.textContent = concluidas;
  pendentesEl.textContent = pendentes;
}