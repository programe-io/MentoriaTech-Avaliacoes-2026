// Estado inicial da aplicação
let tasks = JSON.parse(localStorage.getItem('taskflow_tasks')) || [
  {
    id: crypto.randomUUID(),
    title: 'Revisar planejamento semanal',
    description: 'Definir prioridades e metas principais da semana.',
    priority: 'alta',
    category: 'Trabalho',
    dueDate: new Date().toISOString().split('T')[0],
    status: 'pendente'
  },
  {
    id: crypto.randomUUID(),
    title: 'Estudar JavaScript moderno',
    description: 'Praticar manipulação de DOM e LocalStorage.',
    priority: 'media',
    category: 'Estudos',
    dueDate: '',
    status: 'andamento'
  }
];

let currentView = 'list'; // 'list' ou 'kanban'
let deletedTaskCache = null;
let toastTimeout = null;

// Elementos do DOM
const tasksContainer = document.getElementById('tasks-container');
const quickAddForm = document.getElementById('quick-add-form');
const searchInput = document.getElementById('search-input');
const filterStatus = document.getElementById('filter-status');
const filterPriority = document.getElementById('filter-priority');
const viewListBtn = document.getElementById('view-list-btn');
const viewKanbanBtn = document.getElementById('view-kanban-btn');

// Modal
const modal = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelModalBtn = document.getElementById('cancel-modal-btn');

// Tema
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Inicialização
function init() {
  loadTheme();
  render();
  lucide.createIcons();
}

function saveTasks() {
  localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
}

// Tema Claro / Escuro
function loadTheme() {
  const savedTheme = localStorage.getItem('taskflow_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeIcon.setAttribute('data-lucide', 'sun');
  }
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('taskflow_theme', isDark ? 'dark' : 'light');
  themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  lucide.createIcons();
});

// Verificar se tarefa está atrasada
function isOverdue(task) {
  if (!task.dueDate || task.status === 'concluida') return false;
  const today = new Date().toISOString().split('T')[0];
  return task.dueDate < today;
}

// Atualizar Dashboard e Barra de Progresso
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'concluida').length;
  const open = total - done;
  const overdue = tasks.filter(t => isOverdue(t)).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-open').textContent = open;
  document.getElementById('stat-done').textContent = done;
  document.getElementById('stat-overdue').textContent = overdue;

  document.getElementById('progress-text').textContent = `${percent}%`;
  document.getElementById('progress-bar-fill').style.width = `${percent}%`;
}

// Filtrar Tarefas
function getFilteredTasks() {
  const query = searchInput.value.toLowerCase();
  const statusVal = filterStatus.value;
  const priorityVal = filterPriority.value;

  return tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      (task.description && task.description.toLowerCase().includes(query));

    const matchesStatus =
      statusVal === 'todas' ||
      (statusVal === 'concluidas' && task.status === 'concluida') ||
      (statusVal === 'abertas' && task.status !== 'concluida');

    const matchesPriority =
      priorityVal === 'todas' || task.priority === priorityVal;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

// Renderização Principal
function render() {
  updateStats();
  const filtered = getFilteredTasks();

  if (currentView === 'list') {
    renderList(filtered);
  } else {
    renderKanban(filtered);
  }

  lucide.createIcons();
}

// Renderizar em Lista
function renderList(list) {
  if (list.length === 0) {
    tasksContainer.innerHTML = `<div class="empty-state">Nenhuma tarefa encontrada. Crie uma nova acima!</div>`;
    return;
  }

  tasksContainer.innerHTML = `<div class="task-list">
    ${list.map(task => {
      const done = task.status === 'concluida';
      const overdue = isOverdue(task);
      return `
        <div class="task-card ${done ? 'completed' : ''}">
          <div class="task-left">
            <input type="checkbox" class="task-checkbox" ${done ? 'checked' : ''} onchange="toggleComplete('${task.id}')" />
            <div>
              <div class="task-title">${escapeHTML(task.title)}</div>
              ${task.description ? `<div class="task-desc">${escapeHTML(task.description)}</div>` : ''}
              <div class="task-meta">
                <span class="badge badge-${task.priority}">${task.priority.toUpperCase()}</span>
                <span class="badge badge-cat">${escapeHTML(task.category)}</span>
                ${task.dueDate ? `<span class="badge ${overdue ? 'badge-overdue' : 'badge-cat'}">📅 ${formatDate(task.dueDate)}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="task-actions">
            <button class="icon-action" onclick="openEditModal('${task.id}')" title="Editar">
              <i data-lucide="edit-2"></i>
            </button>
            <button class="icon-action" onclick="deleteTask('${task.id}')" title="Excluir">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      `;
    }).join('')}
  </div>`;
}

// Renderizar em Kanban com Drag & Drop
function renderKanban(list) {
  const columns = [
    { id: 'pendente', title: 'A Fazer' },
    { id: 'andamento', title: 'Em Andamento' },
    { id: 'concluida', title: 'Concluída' }
  ];

  tasksContainer.innerHTML = `<div class="kanban-board">
    ${columns.map(col => {
      const colTasks = list.filter(t => t.status === col.id);
      return `
        <div class="kanban-column" ondragover="allowDrop(event)" ondrop="dropTask(event, '${col.id}')">
          <div class="kanban-header">
            <span>${col.title}</span>
            <span class="kanban-count">${colTasks.length}</span>
          </div>
          <div class="kanban-list">
            ${colTasks.map(task => `
              <div class="kanban-card" draggable="true" ondragstart="dragTask(event, '${task.id}')">
                <div class="task-title">${escapeHTML(task.title)}</div>
                ${task.description ? `<div class="task-desc">${escapeHTML(task.description)}</div>` : ''}
                <div class="task-meta" style="margin-top:8px; justify-content: space-between;">
                  <span class="badge badge-${task.priority}">${task.priority.toUpperCase()}</span>
                  <div>
                    <button class="icon-action" onclick="openEditModal('${task.id}')"><i data-lucide="edit-2"></i></button>
                    <button class="icon-action" onclick="deleteTask('${task.id}')"><i data-lucide="trash-2"></i></button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('')}
  </div>`;
}

// Drag & Drop Kanban
function dragTask(event, id) {
  event.dataTransfer.setData('text/plain', id);
}

function allowDrop(event) {
  event.preventDefault();
}

function dropTask(event, newStatus) {
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = newStatus;
    saveTasks();
    render();
  }
}

// Adição Rápida
quickAddForm.addEventListener('submit', e => {
  e.preventDefault();
  const titleInput = document.getElementById('quick-title');
  const priorityInput = document.getElementById('quick-priority');

  tasks.unshift({
    id: crypto.randomUUID(),
    title: titleInput.value.trim(),
    description: '',
    priority: priorityInput.value,
    category: 'Pessoal',
    dueDate: '',
    status: 'pendente'
  });

  titleInput.value = '';
  saveTasks();
  render();
});

// Alternar Concluída
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = task.status === 'concluida' ? 'pendente' : 'concluida';
    saveTasks();
    render();
  }
}

// Excluir + Desfazer (Toast)
function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index > -1) {
    deletedTaskCache = { task: tasks[index], index };
    tasks.splice(index, 1);
    saveTasks();
    render();
    showToast();
  }
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
    deletedTaskCache = null;
  }, 5000);
}

document.getElementById('undo-btn').addEventListener('click', () => {
  if (deletedTaskCache) {
    tasks.splice(deletedTaskCache.index, 0, deletedTaskCache.task);
    deletedTaskCache = null;
    document.getElementById('toast').classList.add('hidden');
    saveTasks();
    render();
  }
});

// Controle do Modal (Criar / Editar)
openModalBtn.addEventListener('click', () => {
  document.getElementById('modal-title').textContent = 'Nova Tarefa';
  taskForm.reset();
  document.getElementById('task-id').value = '';
  modal.classList.remove('hidden');
});

function openEditModal(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  document.getElementById('modal-title').textContent = 'Editar Tarefa';
  document.getElementById('task-id').value = task.id;
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-desc').value = task.description || '';
  document.getElementById('task-priority').value = task.priority;
  document.getElementById('task-category').value = task.category;
  document.getElementById('task-date').value = task.dueDate || '';
  document.getElementById('task-status').value = task.status;

  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('task-id').value;
  const data = {
    title: document.getElementById('task-title').value.trim(),
    description: document.getElementById('task-desc').value.trim(),
    priority: document.getElementById('task-priority').value,
    category: document.getElementById('task-category').value,
    dueDate: document.getElementById('task-date').value,
    status: document.getElementById('task-status').value
  };

  if (id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index > -1) tasks[index] = { ...tasks[index], ...data };
  } else {
    tasks.unshift({ id: crypto.randomUUID(), ...data });
  }

  saveTasks();
  closeModal();
  render();
});

// Alternar Lista / Kanban
viewListBtn.addEventListener('click', () => {
  currentView = 'list';
  viewListBtn.classList.add('active');
  viewKanbanBtn.classList.remove('active');
  render();
});

viewKanbanBtn.addEventListener('click', () => {
  currentView = 'kanban';
  viewKanbanBtn.classList.add('active');
  viewListBtn.classList.remove('active');
  render();
});

// Eventos de Filtro
searchInput.addEventListener('input', render);
filterStatus.addEventListener('change', render);
filterPriority.addEventListener('change', render);

// Exportar JSON
document.getElementById('export-btn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'minhas-tarefas.json';
  a.click();
  URL.revokeObjectURL(url);
});

// Utilitários
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&',
    '<': '<',
    '>': '>',
    "'": ''',
    '"': '"'
  }[tag]));
}

init();



