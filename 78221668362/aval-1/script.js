const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');

// 1. Carregar tarefas ao iniciar
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
renderTasks();

// 2. Adicionar nova tarefa
function addTask() {
    if (input.value.trim() === '') return;

    const newTask = {
        id: Date.now(),
        text: input.value,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    input.value = '';
}

// 3. Alternar status (concluído ou não)
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveAndRender();
}

// 4. Deletar tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

// 5. Salvar no LocalStorage e atualizar tela
function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

// 6. Criar o HTML da lista
function renderTasks() {
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">
                ${task.text}
            </span>
            <span class="delete-btn" onclick="deleteTask(${task.id})">✕</span>
        `;
        list.appendChild(li);
    });
}