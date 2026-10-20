// Array para armazenar as tarefas na memória
let tasks = [];
let nextId = 1;

// Seleção dos elementos do DOM
const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');

// 1. Cadastrar nova tarefa
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const priority = parseInt(priorityInput.value);

  // Validação conforme as regras descritas no enunciado
  if (title.length < 5) {
    alert('O título deve ter no mínimo 5 caracteres.');
    return;
  }

  if (isNaN(priority) || priority < 1 || priority > 3) {
    alert('A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).');
    return;
  }

  const newTask = {
    id: nextId++,
    title: title,
    priority: priority,
    completed: false
  };

  tasks.push(newTask);
  
  // Limpa os campos do formulário
  titleInput.value = '';
  priorityInput.value = '1';

  renderTasks();
});

// 2. Listar / Renderizar as tarefas na tela
function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<li>Nenhuma tarefa cadastrada.</li>';
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;

    const priorityLabel = task.priority === 1 ? 'Alta' : task.priority === 2 ? 'Média' : 'Baixa';

    li.innerHTML = `
      <div class="task-header">
        <span class="task-code">Código: #${task.id}</span>
        <span class="status-badge">${task.completed ? 'Concluída' : 'Pendente'}</span>
      </div>
      
      <div class="task-title">${task.title}</div>
      
      <div class="task-actions">
        <!-- 3. Marcar/desmarcar tarefa como concluída -->
        <button class="btn-status" onclick="toggleTaskStatus(${task.id})">
          ${task.completed ? 'Reabrir' : 'Concluir'}
        </button>

        <!-- 4. Alterar prioridade da tarefa -->
        <label style="font-size: 0.85rem;">Prioridade:</label>
        <select class="priority-select" onchange="changePriority(${task.id}, this.value)">
          <option value="1" ${task.priority === 1 ? 'selected' : ''}>1 (Alta)</option>
          <option value="2" ${task.priority === 2 ? 'selected' : ''}>2 (Média)</option>
          <option value="3" ${task.priority === 3 ? 'selected' : ''}>3 (Baixa)</option>
        </select>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Alternar status de conclusão
function toggleTaskStatus(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

// Alterar prioridade
function changePriority(id, newPriority) {
  const priorityValue = parseInt(newPriority);
  if (priorityValue >= 1 && priorityValue <= 3) {
    tasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, priority: priorityValue };
      }
      return task;
    });
    renderTasks();
  }
}

// Inicializa a exibição da lista
renderTasks();