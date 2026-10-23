
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const counter = document.getElementById('task-counter');
const emptyState = document.getElementById('empty-state');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter');

let tasks = [];

try {
    const savedTasks = JSON.parse(
        localStorage.getItem('minhas-tarefas') || '[]'
    );

    if (Array.isArray(savedTasks)) {
        tasks = savedTasks.filter(task =>
            task &&
            typeof task.id === 'string' &&
            typeof task.text === 'string' &&
            typeof task.completed === 'boolean'
        );
    }
} catch {
    tasks = [];
}

let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('minhas-tarefas', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.replaceChildren();

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'pending') {
            return !task.completed;
        }

        if (currentFilter === 'completed') {
            return task.completed;
        }

        return true;
    });

    const pendingCount = tasks.filter(
        task => !task.completed
    ).length;

    counter.textContent =
        `${pendingCount} pendente${pendingCount !== 1 ? 's' : ''}`;

    emptyState.hidden = filteredTasks.length > 0;

    if (filteredTasks.length === 0) {
        const title = emptyState.querySelector('h2');
        const message = emptyState.querySelector('p');

        if (currentFilter === 'pending' && tasks.length > 0) {
            title.textContent = 'Tudo em dia!';
            message.textContent = 'Você não tem tarefas pendentes.';
        } else if (
            currentFilter === 'completed' &&
            tasks.length > 0
        ) {
            title.textContent = 'Nenhuma tarefa concluída';
            message.textContent =
                'Suas tarefas concluídas aparecerão aqui.';
        } else {
            title.textContent = 'Nenhuma tarefa por aqui';
            message.textContent =
                'Adicione uma tarefa e comece a organizar seu dia.';
        }
    }

    filteredTasks.forEach(task => {
        const item = document.createElement('li');
        item.className = 'task-item';

        if (task.completed) {
            item.classList.add('done');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-check';
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            'aria-label',
            `Concluir tarefa: ${task.text}`
        );

        checkbox.addEventListener('change', () => {
            toggleTask(task.id);
        });

        const text = document.createElement('span');
        text.className = 'task-text';
        text.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.type = 'button';
        deleteButton.textContent = '×';
        deleteButton.setAttribute(
            'aria-label',
            `Excluir tarefa: ${task.text}`
        );

        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
        });

        item.append(checkbox, text, deleteButton);
        taskList.appendChild(item);
    });
}

function addTask(text) {
    const task = {
        id: crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
        text,
        completed: false
    };

    tasks.unshift(task);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) {
        input.focus();
        return;
    }

    addTask(text);
    input.value = '';
    input.focus();
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(filter => {
            const isActive = filter === button;
            filter.classList.toggle('active', isActive);
            filter.setAttribute(
                'aria-pressed',
                String(isActive)
            );
        });

        renderTasks();
    });

    button.setAttribute(
        'aria-pressed',
        String(button.classList.contains('active'))
    );
});

clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

renderTasks();
