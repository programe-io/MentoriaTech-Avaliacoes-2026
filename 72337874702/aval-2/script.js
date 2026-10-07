// Banco de Dados Inicial de Tarefas
let tasks = [
    {
        id: 1,
        title: "Ajustar Vestido de Noiva Coleção Inverno",
        description: "Revisar bordados em pérolas e conferir medidas do busto.",
        priority: "Alta",
        date: "2026-10-15",
        status: "progress"
    },
    {
        id: 2,
        title: "Repor Estoque de Renda Francesa",
        description: "Comprar mais 15 metros do fornecedor oficial de Paris.",
        priority: "Média",
        date: "2026-10-18",
        status: "todo"
    },
    {
        id: 3,
        title: "Campanha Fotográfica Novo Catálogo",
        description: "Organizar cenário e agendar modelos para o ensaio.",
        priority: "Baixa",
        date: "2026-10-25",
        status: "done"
    }
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderKanban();
});

// Alternar Dark Mode
function toggleDarkMode() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        themeIcon.className = "fa-solid fa-moon";
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        themeIcon.className = "fa-solid fa-sun";
    }
}

// Renderizar Quadro Kanban e KPIs
function renderKanban() {
    const colTodo = document.getElementById('colTodo');
    const colProgress = document.getElementById('colProgress');
    const colDone = document.getElementById('colDone');

    colTodo.innerHTML = '';
    colProgress.innerHTML = '';
    colDone.innerHTML = '';

    const query = document.getElementById('searchInput').value.toLowerCase();
    const priority = document.getElementById('priorityFilter').value;

    const filtered = tasks.filter(t => {
        const matchesQuery = t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query);
        const matchesPriority = priority === "" || t.priority === priority;
        return matchesQuery && matchesPriority;
    });

    let countT = 0, countP = 0, countD = 0;

    filtered.forEach(t => {
        if (t.status === 'todo') countT++;
        if (t.status === 'progress') countP++;
        if (t.status === 'done') countD++;

        const card = document.createElement('div');
        card.className = "bg-white dark:bg-zinc-900 p-4 rounded-xl border border-rose-100 dark:border-zinc-800 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all group relative";
        card.setAttribute('draggable', 'true');
        card.dataset.id = t.id;

        // Eventos de Arrastar e Soltar (Drag & Drop)
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', t.id);
            card.classList.add('dragging');
        });
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });

        let priorityColor = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
        if (t.priority === 'Média') priorityColor = "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
        if (t.priority === 'Alta') priorityColor = "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

        card.innerHTML = `
            <div class="flex items-start justify-between gap-2 mb-2">
                <h4 class="font-bold text-sm text-zinc-800 dark:text-zinc-100">${t.title}</h4>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${priorityColor}">${t.priority}</span>
            </div>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">${t.description}</p>
            <div class="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-rose-50 dark:border-zinc-800">
                <span class="flex items-center"><i class="fa-regular fa-calendar mr-1"></i> ${formatDate(t.date)}</span>
                <div class="space-x-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button onclick="editTask(${t.id})" class="p-1 hover:text-rose-600" title="Editar"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="deleteTask(${t.id})" class="p-1 hover:text-red-500" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;

        if (t.status === 'todo') colTodo.appendChild(card);
        if (t.status === 'progress') colProgress.appendChild(card);
        if (t.status === 'done') colDone.appendChild(card);
    });

    // Atualizar Contadores e KPIs
    document.getElementById('countTodo').innerText = countT;
    document.getElementById('countProgress').innerText = countP;
    document.getElementById('countDone').innerText = countD;

    document.getElementById('kpiTotal').innerText = tasks.length;
    document.getElementById('kpiProgress').innerText = tasks.filter(t => t.status === 'progress').length;
    document.getElementById('kpiCompleted').innerText = tasks.filter(t => t.status === 'done').length;
}

// Funções de Drag & Drop
function allowDrop(event) {
    event.preventDefault();
}

function dropTask(event, newStatus) {
    event.preventDefault();
    const id = Number(event.dataTransfer.getData('text/plain'));
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = newStatus;
        renderKanban();
        showToast(`Tarefa movida com sucesso!`, "fa-arrows-split-up-and-left");
    }
}

// Formatar Data
function formatDate(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Controle de Modais
function openNewTaskModal() {
    document.getElementById('modalTitle').innerText = "Nova Tarefa do Atelier";
    document.getElementById('taskForm').reset();
    document.getElementById('taskId').value = '';

    const modal = document.getElementById('taskModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('modalContainer').classList.remove('scale-95');
    }, 10);
}

function closeTaskModal() {
    const modal = document.getElementById('taskModal');
    modal.classList.add('opacity-0');
    document.getElementById('modalContainer').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Salvar Tarefa (Criar ou Atualizar)
function saveTask(event) {
    event.preventDefault();
    const id = document.getElementById('taskId').value;
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;
    const priority = document.getElementById('taskPriority').value;
    const date = document.getElementById('taskDate').value;

    if (id) {
        const task = tasks.find(t => t.id == id);
        if (task) {
            task.title = title;
            task.description = description;
            task.priority = priority;
            task.date = date;
            showToast("Tarefa atualizada com sucesso!", "fa-circle-check");
        }
    } else {
        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            date,
            status: 'todo'
        };
        tasks.push(newTask);
        showToast("Nova tarefa criada com sucesso!", "fa-circle-plus");
    }

    closeTaskModal();
    renderKanban();
}

// Editar Tarefa
function editTask(id) {
    const t = tasks.find(item => item.id === id);
    if (!t) return;

    document.getElementById('modalTitle').innerText = "Editar Tarefa";
    document.getElementById('taskId').value = t.id;
    document.getElementById('taskTitle').value = t.title;
    document.getElementById('taskDesc').value = t.description;
    document.getElementById('taskPriority').value = t.priority;
    document.getElementById('taskDate').value = t.date;

    const modal = document.getElementById('taskModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('modalContainer').classList.remove('scale-95');
    }, 10);
}

// Excluir Tarefa
function deleteTask(id) {
    if (confirm("Deseja realmente remover esta tarefa?")) {
        tasks = tasks.filter(t => t.id !== id);
        renderKanban();
        showToast("Tarefa removida.", "fa-trash");
    }
}

// Notificações Toast
function showToast(message, iconClass) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').innerText = message;
    document.getElementById('toastIcon').innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}