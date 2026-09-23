// Estado da aplicação
let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];
let currentFilter = 'all';

// Elementos do DOM
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskCategoryInput = document.getElementById('task-category');
const taskPrioritySelect = document.getElementById('task-priority');
const taskDueDateInput = document.getElementById('task-due-date');

const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

const progressBarFill = document.getElementById('progress-bar-fill');
const progressText = document.getElementById('progress-text');

// --- EVENTOS ---
document.addEventListener('DOMContentLoaded', renderApp);
taskForm.addEventListener('submit', handleAddTask);
searchInput.addEventListener('input', renderTasks);

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    renderTasks();
  });
});

// --- FUNÇÕES PRINCIPAIS ---

function handleAddTask(e) {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const category = taskCategoryInput.value.trim() || 'Geral';
  const priority = taskPrioritySelect.value;
  const dueDate = taskDueDateInput.value;

  if (!title) return;

  const newTask = {
    id: Date.now().toString(),
    title,
    category,
    priority,
    dueDate,
    completed: false
  };

  tasks.unshift(newTask); // Adiciona a nova tarefa no início
  saveToLocalStorage();
  taskForm.reset();
  renderApp();
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveToLocalStorage();
  renderApp();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveToLocalStorage();
  renderApp();
}

function renderApp() {
  renderTasks();
  updateProgress();
}

function renderTasks() {
  const searchTerm = searchInput.value.toLowerCase();
  taskList.innerHTML = '';

  // Filtrar por status
  let filteredTasks = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  // Filtrar por termo de busca
  filteredTasks = filteredTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm) ||
    task.category.toLowerCase().includes(searchTerm)
  );

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<li class="empty-msg">Nenhuma tarefa encontrada.</li>';
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;

    const formattedDate = task.dueDate ? formatDate(task.dueDate) : 'Sem data';

    li.innerHTML = `
      <div class="task-left">
        <input 
          type="checkbox" 
          ${task.completed ? 'checked' : ''} 
          onchange="toggleTask('${task.id}')"
        >
        <div class="task-details">
          <span class="task-title">${escapeHTML(task.title)}</span>
          <div class="task-meta">
            <span>🏷️ ${escapeHTML(task.category)}</span>
            <span>📅 ${formattedDate}</span>
          </div>
        </div>
      </div>
      <button class="btn-delete" onclick="deleteTask('${task.id}')" title="Excluir">🗑️</button>
    `;

    taskList.appendChild(li);
  });
}

function updateProgress() {
  const total = tasks.length;
  if (total === 0) {
    progressBarFill.style.width = '0%';
    progressText.textContent = '0% (0/0)';
    return;
  }

  const completedCount = tasks.filter(task => task.completed).length;
  const percentage = Math.round((completedCount / total) * 100);

  progressBarFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}% (${completedCount}/${total})`;
}

function saveToLocalStorage() {
  localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

// Auxiliares
function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}