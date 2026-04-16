// Seletores
const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');

// Estado da Aplicação
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateDate();
});

function updateDate() {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.querySelector('#date-display').innerText = new Date().toLocaleDateString('pt-BR', options);
}

// Adicionar Tarefa
addBtn.addEventListener('click', () => {
    if (taskInput.value.trim() === '') return alert('Digite algo!');

    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        priority: document.querySelector('#priority-select').value,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    taskInput.value = '';
});

// Renderizar na Tela
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    
    const filteredTasks = tasks.filter(t => {
        if (filter === 'pending') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div>
                <span class="priority-tag ${task.priority}"></span>
                <span>${task.text}</span>
            </div>
            <div>
                <button onclick="toggleTask(${task.id})">✔️</button>
                <button onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    taskCount.innerText = tasks.length;
}

// Funções de Controle (Escopo Global para o onclick)
window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveAndRender();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
};

function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        renderTasks(e.target.dataset.filter);
    });
});