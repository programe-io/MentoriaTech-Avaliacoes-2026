// Dados iniciais e estado da aplicação
let tasks = JSON.parse(localStorage.getItem('task_manager_items')) || [
  { id: '1', title: 'Reunião de alinhamento com equipe', description: 'Definir prioridades da semana e metas de entregas.', category: 'Trabalho', priority: 'alta', completed: false, dueDate: '2026-11-05' },
  { id: '2', title: 'Estudar conceitos de JavaScript Avançado', description: 'Revisar Closures, Async/Await e Manipulação de DOM.', category: 'Estudos', priority: 'media', completed: true, dueDate: '2026-11-04' },
  { id: '3', title: 'Comprar mantimentos no mercado', description: 'Frutas, vegetais e grãos para a semana.', category: 'Pessoal', priority: 'baixa', completed: false, dueDate: '2026-11-06' }
];

let activeStatusFilter = 'all';

// Elementos do DOM
const taskListContainer = document.getElementById('taskListContainer');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

const totalTasksCount = document.getElementById('totalTasksCount');
const pendingTasksCount = document.getElementById('pendingTasksCount');
const completedTasksCount = document.getElementById('completedTasksCount');

const modal = document.getElementById('taskModal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const taskForm = document.getElementById('taskForm');

const btnOpenAddModal = document.getElementById('btnOpenAddModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');
const filterTabs = document.querySelectorAll('.filter-tab');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  initLucideIcons();
});

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function saveData() {
  localStorage.setItem('task_manager_items', JSON.stringify(tasks));
}

// Renderização Geral
function renderApp() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm) || 
                          task.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesStatus = activeStatusFilter === 'all' || 
                          (activeStatusFilter === 'pending' && !task.completed) ||
                          (activeStatusFilter === 'completed' && task.completed);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  updateCategoryDropdown();
  updateMetrics();
  renderTaskList(filteredTasks);
}

function updateCategoryDropdown() {
  const categories = [...new Set(tasks.map(t => t.category))];
  const currentValue = categoryFilter.value;

  categoryFilter.innerHTML = '<option value="all">Todas Categorias</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    if (cat === currentValue) option.selected = true;
    categoryFilter.appendChild(option);
  });
}

function updateMetrics() {
  const total = tasks.length;
  const pending = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;

  totalTasksCount.textContent = total;
  pendingTasksCount.textContent = pending;
  completedTasksCount.textContent = completed;
}

function renderTaskList(data) {
  taskListContainer.innerHTML = '';

  if (data.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  data.forEach(task => {
    const item = document.createElement('div');
    item.className = `task-item bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition ${task.completed ? 'completed' : ''}`;

    const priorityBadges = {
      baixa: 'bg-emerald-100 text-emerald-800',
      media: 'bg-amber-100 text-amber-800',
      alta: 'bg-rose-100 text-rose-800'
    };

    item.innerHTML = `
      <button onclick="toggleTask('${task.id}')" class="mt-0.5 text-gray-400 hover:text-indigo-600 transition">
        <i data-lucide="${task.completed ? 'check-circle-2' : 'circle'}" class="w-6 h-6 ${task.completed ? 'text-emerald-500 fill-emerald-50' : ''}"></i>
      </button>

      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <h4 class="task-title font-semibold text-gray-900 text-base">${task.title}</h4>
          <span class="text-xs px-2.5 py-0.5 rounded-full font-medium ${priorityBadges[task.priority] || 'bg-gray-100'}">
            Prioridade ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <span class="text-xs px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
            ${task.category}
          </span>
        </div>

        ${task.description ? `<p class="text-sm text-gray-500 mb-2 leading-relaxed">${task.description}</p>` : ''}

        ${task.dueDate ? `
          <div class="flex items-center gap-1.5 text-xs text-gray-400">
            <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
            <span>Vence em: ${task.dueDate}</span>
          </div>
        ` : ''}
      </div>

      <div class="flex items-center gap-1">
        <button onclick="editTask('${task.id}')" class="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Editar">
          <i data-lucide="edit-2" class="w-4 h-4"></i>
        </button>
        <button onclick="deleteTask('${task.id}')" class="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Excluir">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    taskListContainer.appendChild(item);
  });

  initLucideIcons();
}

// Modal
function openModal(isEdit = false) {
  modalTitle.textContent = isEdit ? 'Editar Tarefa' : 'Nova Tarefa';
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modalContent.classList.remove('scale-95');
  }, 10);
}

function closeModal() {
  modal.classList.add('opacity-0');
  modalContent.classList.add('scale-95');
  setTimeout(() => {
    modal.classList.add('hidden');
    taskForm.reset();
    document.getElementById('taskId').value = '';
  }, 250);
}

// Salvar / Editar
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('taskId').value;
  const title = document.getElementById('taskTitle').value.trim();
  const description = document.getElementById('taskDescription').value.trim();
  const category = document.getElementById('taskCategory').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const dueDate = document.getElementById('taskDueDate').value;

  if (id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], title, description, category, priority, dueDate };
    }
  } else {
    tasks.push({
      id: Date.now().toString(),
      title,
      description,
      category,
      priority,
      dueDate,
      completed: false
    });
  }

  saveData();
  renderApp();
  closeModal();
});

// Ações
window.toggleTask = function(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveData();
    renderApp();
  }
};

window.editTask = function(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  document.getElementById('taskId').value = task.id;
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDescription').value = task.description;
  document.getElementById('taskCategory').value = task.category;
  document.getElementById('taskPriority').value = task.priority;
  document.getElementById('taskDueDate').value = task.dueDate;

  openModal(true);
};

window.deleteTask = function(id) {
  if (confirm('Deseja excluir esta tarefa permanentemente?')) {
    tasks = tasks.filter(t => t.id !== id);
    saveData();
    renderApp();
  }
};

// Filtro de Status
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => {
      t.classList.remove('bg-white', 'shadow-sm', 'text-gray-700');
      t.classList.add('text-gray-500');
    });

    tab.classList.add('bg-white', 'shadow-sm', 'text-gray-700');
    tab.classList.remove('text-gray-500');

    activeStatusFilter = tab.dataset.filter;
    renderApp();
  });
});

// Event Listeners Adicionais
btnOpenAddModal.addEventListener('click', () => openModal(false));
btnCloseModal.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);
searchInput.addEventListener('input', renderApp);
categoryFilter.addEventListener('change', renderApp);