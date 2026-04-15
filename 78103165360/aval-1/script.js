const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 1. Carregar tarefas do LocalStorage ao abrir a página
document.addEventListener('DOMContentLoaded', getTasks);

// 2. Evento de clique para adicionar tarefa
addBtn.addEventListener('click', () => {
    if (taskInput.value === '') return;
    createTaskElement(taskInput.value);
    saveLocalTask(taskInput.value);
    taskInput.value = '';
});

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn" onclick="removeTask(this)">Remover</button>
    `;
    // Clique para marcar como concluída
    li.addEventListener('click', (e) => {
        if(e.target.tagName !== 'BUTTON') li.classList.toggle('completed');
    });
    taskList.appendChild(li);
}

// 3. Salvar no LocalStorage
function saveLocalTask(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 4. Carregar tarefas salvas
function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

// 5. Remover tarefa
function removeTask(btn) {
    const taskText = btn.parentElement.firstChild.textContent;
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    btn.parentElement.remove();
}