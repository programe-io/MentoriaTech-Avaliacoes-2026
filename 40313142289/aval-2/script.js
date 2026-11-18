let tasks = JSON.parse(
    localStorage.getItem('mineTasks') || '[]'
);

let currentFilter = 'Todas';

function save() {
    localStorage.setItem(
        'mineTasks',
        JSON.stringify(tasks)
    );

    render();
}

function addTask() {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('priority');

    if (!input.value.trim()) {
        alert('Digite o nome da sua missão!');
        return;
    }

    tasks.push({
        id: Date.now(),
        name: input.value.trim(),
        priority: priority.value,
        done: false
    });

    input.value = '';
    save();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);

    if (task) {
        task.done = !task.done;
    }

    save();
}

function deleteTask(id) {
    if (confirm('Deseja abandonar esta missão?')) {
        tasks = tasks.filter(t => t.id !== id);
        save();
    }
}

function filterTasks(filter) {
    currentFilter = filter;
    render();
}

function render() {
    const list = document.getElementById('taskList');

    const total = tasks.length;

    const completed = tasks.filter(
        t => t.done
    ).length;

    const xp = completed * 50;

    const percent = total
        ? (completed / total) * 100
        : 0;

    const level = Math.floor(xp / 200) + 1;

    document.getElementById('total').textContent = total;
    document.getElementById('completed').textContent = completed;
    document.getElementById('xp').textContent = xp;

    document.getElementById('progress').style.width =
        percent + '%';

    document.getElementById('level').textContent =
        `Nível ${level} - ${
            level === 1
                ? 'Iniciante'
                : level < 5
                ? 'Explorador'
                : 'Mestre Mineiro'
        }`;

    let filtered = tasks.filter(task => {
        if (currentFilter === 'Pendentes') {
            return !task.done;
        }

        if (currentFilter === 'Concluídas') {
            return task.done;
        }

        return true;
    });

    if (!filtered.length) {
        list.innerHTML = `
            <div class="empty">
                🧱 Nenhuma missão encontrada!
                <br><br>
                Que tal criar uma?
            </div>
        `;
        return;
    }

    const priorities = {
        Alta: 0,
        Média: 1,
        Baixa: 2
    };

    filtered.sort((a, b) =>
        Number(a.done) - Number(b.done) ||
        priorities[a.priority] - priorities[b.priority]
    );

    list.innerHTML = '';

    filtered.forEach(task => {
        const item = document.createElement('div');

        item.className = 'task' +
            (task.done ? ' done' : '');

        const checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.checked = task.done;

        checkbox.style.cssText = `
            width: 22px;
            height: 22px;
            margin: 0;
            flex-shrink: 0;
            cursor: pointer;
        `;

        checkbox.addEventListener('change', () => {
            toggleTask(task.id);
        });

        const info = document.createElement('div');
        info.className = 'task-info';

        const name = document.createElement('div');
        name.className = 'task-name';
        name.textContent = task.name;

        const meta = document.createElement('div');
        meta.className = 'task-meta';

        meta.textContent =
            'Prioridade: ' + task.priority +
            (task.done ? ' • +50 XP' : '');

        info.append(name, meta);

        const del = document.createElement('button');

        del.className = 'delete';
        del.textContent = '✕';
        del.title = 'Excluir missão';

        del.addEventListener('click', () => {
            deleteTask(task.id);
        });

        item.append(checkbox, info, del);

        list.appendChild(item);
    });
}

document.getElementById('addBtn')
    .addEventListener('click', addTask);

document.getElementById('taskInput')
    .addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

document.querySelectorAll('[data-filter]')
    .forEach(button => {
        button.addEventListener('click', () => {
            filterTasks(button.dataset.filter);
        });
    });

render();
