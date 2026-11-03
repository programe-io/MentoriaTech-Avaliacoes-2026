let tasks = [];
let nextId = 1;

const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        const taskHeader = document.createElement('div');
        taskHeader.className = 'task-header';

        const taskTitle = document.createElement('span');
        taskTitle.className = 'task-title';
        taskTitle.textContent = `[#${task.id}] ${task.title}`;

        const taskStatus = document.createElement('span');
        taskStatus.textContent = task.completed ? 'Concluída' : 'Pendente';

        taskHeader.appendChild(taskTitle);
        taskHeader.appendChild(taskStatus);

        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';
        taskInfo.textContent = `Prioridade: ${task.priority}`;

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn-action btn-toggle';
        toggleBtn.textContent = task.completed ? 'Desmarcar' : 'Concluir';
        toggleBtn.onclick = () => toggleTaskStatus(task.id);

        const priorityBtn = document.createElement('button');
        priorityBtn.className = 'btn-action btn-priority';
        priorityBtn.textContent = 'Alterar Prioridade';
        priorityBtn.onclick = () => changePriority(task.id);

        taskActions.appendChild(toggleBtn);
        taskActions.appendChild(priorityBtn);

        li.appendChild(taskHeader);
        li.appendChild(taskInfo);
        li.appendChild(taskActions);

        taskList.appendChild(li);
    });
}

function addTask(title, priority) {
    if (title.length < 5) {
        alert('O título deve ter no mínimo 5 caracteres.');
        return;
    }

    if (priority < 1 || priority > 3 || isNaN(priority)) {
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
    renderTasks();
}

function toggleTaskStatus(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function changePriority(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newPriority = parseInt(prompt('Digite a nova prioridade (1 - Alta, 2 - Média, 3 - Baixa):'), 10);
        if (newPriority >= 1 && newPriority <= 3) {
            task.priority = newPriority;
            renderTasks();
        } else if (newPriority !== null) {
            alert('Prioridade inválida. Digite um número entre 1 e 3.');
        }
    }
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const priority = parseInt(priorityInput.value, 10);

    addTask(title, priority);

    titleInput.value = '';
    priorityInput.value = '1';
});