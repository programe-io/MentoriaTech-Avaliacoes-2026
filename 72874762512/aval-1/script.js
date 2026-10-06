document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const taskCounter = document.getElementById('taskCounter');
  const clearAllBtn = document.getElementById('clearAllBtn');

  // Carrega as tarefas salvas ao iniciar a página
  let tasks = JSON.parse(localStorage.getItem('my_tasks')) || [];

  function saveTasks() {
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
  }

  function updateCounter() {
    const pendingTasks = tasks.filter(t => !t.completed).length;
    taskCounter.textContent = `${pendingTasks} tarefa(s) pendente(s)`;
  }

  function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      if (task.completed) li.classList.add('completed');

      const span = document.createElement('span');
      span.textContent = task.text;
      
      // Clique no texto marca/desmarca como concluída
      span.addEventListener('click', () => {
        tasks[index].completed = !tasks[index].completed;
        saveAndRender();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✕';
      deleteBtn.classList.add('delete-btn');
      
      // Clique no botão exclui a tarefa
      deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveAndRender();
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });

    updateCounter();
  }

  function saveAndRender() {
    saveTasks();
    renderTasks();
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
      tasks.push({ text: text, completed: false });
      taskInput.value = '';
      saveAndRender();
    }
  }

  // Eventos de clique e tecla Enter
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Limpar tarefas concluídas
  clearAllBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    saveAndRender();
  });

  // Renderização inicial
  renderTasks();
});