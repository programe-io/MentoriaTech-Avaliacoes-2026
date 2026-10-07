/* ==========================================
   MAISON ÉLISE - JAVASCRIPT ENGINE PRO
   ========================================== */

let tasks = [
    {
        id: 101,
        title: "Vestido de Noiva Coleção Inverno",
        description: "Revisar bordados em pérolas taitianas e conferir simetria do corpete com renda francesa.",
        category: "Vestido de Noiva",
        priority: "Alta",
        budget: 4500.00,
        date: "2026-10-15",
        status: "progress"
    },
    {
        id: 102,
        title: "Reposição de Renda Guipure Paris",
        description: "Aquisição de 25 metros de tecido importado para os novos modelos de gala.",
        category: "Alta-Costura",
        priority: "Média",
        budget: 1800.50,
        date: "2026-10-18",
        status: "todo"
    },
    {
        id: 103,
        title: "Capa de Veludo com Cristais Swarovski",
        description: "Aplicação manual de cristais e acabamento acetinado nas barras.",
        category: "Bordado a Mão",
        priority: "Baixa",
        budget: 2200.00,
        date: "2026-10-25",
        status: "done"
    }
];

let systemLogs = [];

// Sistema de Auditoria de Ações do DOM
function logAction(msg) {
    const time = new Date().toLocaleTimeString();
    systemLogs.unshift(`[${time}] ${msg}`);
    document.getElementById('logCount').innerText = systemLogs.length;
}

// ==========================================
// MOTOR FÍSICO DE PARTÍCULAS EM CANVAS (HTML5)
// ==========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.speedY = (Math.random() - 0.5) * 0.35;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(236, 72, 153, 0.35)'; // Partículas em Rosa
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 45; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ==========================================
// GESTÃO DO KANBAN E RENDERIZAÇÃO
// ==========================================
const colTodo = document.getElementById('colTodo');
const colProgress = document.getElementById('colProgress');
const colDone = document.getElementById('colDone');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priorityFilter = document.getElementById('priorityFilter');
const sortFilter = document.getElementById('sortFilter');
const taskModal = document.getElementById('taskModal');
const modalContainer = document.getElementById('modalContainer');
const taskForm = document.getElementById('taskForm');

document.addEventListener('DOMContentLoaded', () => {
    renderKanban();
    logAction("Sistema Atelier Maison Élise inicializado com sucesso.");
});

document.getElementById('btnNewTask').addEventListener('click', () => openModal("Nova Demanda de Peça"));
document.getElementById('btnCloseModal').addEventListener('click', closeModal);
document.getElementById('btnCancelModal').addEventListener('click', closeModal);

document.getElementById('btnLogs').addEventListener('click', () => {
    const container = document.getElementById('logsContainer');
    container.innerHTML = systemLogs.length ? systemLogs.map(l => `<div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">${l}</div>`).join('') : '<p class="text-slate-400">Nenhum log registrado até o momento.</p>';
    document.getElementById('logsModal').classList.remove('hidden');
    setTimeout(() => document.getElementById('logsModal').classList.remove('opacity-0'), 10);
});

function closeLogsModal() {
    document.getElementById('logsModal').classList.add('opacity-0');
    setTimeout(() => document.getElementById('logsModal').classList.add('hidden'), 300);
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveTaskData();
});

searchInput.addEventListener('input', renderKanban);
categoryFilter.addEventListener('change', renderKanban);
priorityFilter.addEventListener('change', renderKanban);
sortFilter.addEventListener('change', renderKanban);

function renderKanban() {
    colTodo.innerHTML = '';
    colProgress.innerHTML = '';
    colDone.innerHTML = '';

    const query = searchInput.value.toLowerCase();
    const catVal = categoryFilter.value;
    const priorityVal = priorityFilter.value;
    const sortVal = sortFilter.value;

    let filtered = tasks.filter(t => {
        const matchesQuery = t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query) || t.id.toString().includes(query) || t.category.toLowerCase().includes(query);
        const matchesCategory = catVal === "" || t.category === catVal;
        const matchesPriority = priorityVal === "" || t.priority === priorityVal;
        return matchesQuery && matchesCategory && matchesPriority;
    });

    if (sortVal === 'date') {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortVal === 'budget') {
        filtered.sort((a, b) => b.budget - a.budget);
    } else if (sortVal === 'priority') {
        const weight = { 'Alta': 3, 'Média': 2, 'Baixa': 1 };
        filtered.sort((a, b) => weight[b.priority] - weight[a.priority]);
    }

    let countT = 0, countP = 0, countD = 0, countU = 0, totalBudgetCalc = 0;

    filtered.forEach(t => {
        if (t.status === 'todo') countT++;
        if (t.status === 'progress') countP++;
        if (t.status === 'done') countD++;
        if (t.priority === 'Alta') countU++;
        totalBudgetCalc += Number(t.budget || 0);

        const card = document.createElement('div');
        card.className = "kanban-card bg-white p-4 rounded-xl border border-slate-200 shadow-xs cursor-grab active:cursor-grabbing relative group";
        card.setAttribute('draggable', 'true');
        card.dataset.id = t.id;

        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', t.id);
            card.classList.add('dragging');
        });
        card.addEventListener('dragend', () => card.classList.remove('dragging'));

        let priorityBadge = "bg-emerald-50 text-emerald-700 border-emerald-200";
        if (t.priority === 'Média') priorityBadge = "bg-amber-50 text-amber-700 border-amber-200";
        if (t.priority === 'Alta') priorityBadge = "bg-pink-50 text-pink-700 border-pink-200";

        card.innerHTML = `
            <div class="flex items-start justify-between gap-2 mb-2">
                <h4 class="font-bold text-sm text-slate-900 tracking-wide group-hover:text-blue-600 transition-colors">${t.title}</h4>
                <span class="text-[10px] px-2.5 py-0.5 rounded-full uppercase font-mono font-bold border ${priorityBadge}">${t.priority}</span>
            </div>
            <div class="mb-2">
                <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-pink-50 text-pink-600 border border-pink-100 font-bold"><i class="fa-solid fa-tag text-pink-500 mr-1"></i> ${t.category}</span>
            </div>
            <p class="text-xs font-medium text-slate-600 mb-3 line-clamp-2 leading-relaxed">${t.description}</p>
            <div class="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-100">
                <span class="text-blue-600 font-bold"><i class="fa-solid fa-wallet mr-1"></i> R$ ${Number(t.budget).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                <span class="flex items-center"><i class="fa-regular fa-calendar mr-1 text-pink-500"></i> ${formatDate(t.date)}</span>
            </div>
            <div class="flex items-center justify-end space-x-1 mt-2 pt-2 border-t border-slate-50">
                <button class="btn-edit p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors" title="Editar" data-id="${t.id}"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-delete p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-pink-600 transition-colors" title="Excluir" data-id="${t.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        card.querySelector('.btn-edit').addEventListener('click', () => openEditModal(t.id));
        card.querySelector('.btn-delete').addEventListener('click', () => removeTask(t.id));

        if (t.status === 'todo') colTodo.appendChild(card);
        if (t.status === 'progress') colProgress.appendChild(card);
        if (t.status === 'done') colDone.appendChild(card);
    });

    document.getElementById('countTodo').innerText = countT;
    document.getElementById('countProgress').innerText = countP;
    document.getElementById('countDone').innerText = countD;
    document.getElementById('kpiTotal').innerText = tasks.length;
    document.getElementById('kpiProgress').innerText = tasks.filter(t => t.status === 'progress').length;
    document.getElementById('kpiCompleted').innerText = tasks.filter(t => t.status === 'done').length;
    document.getElementById('kpiUrgent').innerText = countU;
    document.getElementById('kpiBudget').innerText = `R$ ${totalBudgetCalc.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

// Drag & Drop Handlers
function allowDrop(event) { event.preventDefault(); }
function dropTask(event, newStatus) {
    event.preventDefault();
    const id = Number(event.dataTransfer.getData('text/plain'));
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = newStatus;
        logAction(`Peça #${task.id} movida para coluna: ${newStatus.toUpperCase()}`);
        renderKanban();
        showToast(`Demanda movida para ${newStatus.toUpperCase()}!`, 'fa-arrows-split-up-and-left');
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const p = dateString.split('-');
    return `${p[2]}/${p[1]}/${p[0]}`;
}

// Modal Controllers
function openModal(titleText, task = null) {
    document.getElementById('modalTitle').innerHTML = `<i class="fa-solid fa-pen-nib text-pink-500"></i> ${titleText}`;
    taskForm.reset();
    document.getElementById('taskId').value = '';

    if (task) {
        document.getElementById('taskId').value = task.id;
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDesc').value = task.description;
        document.getElementById('taskCategory').value = task.category;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskBudget').value = task.budget;
        document.getElementById('taskDate').value = task.date;
    }

    taskModal.classList.remove('hidden');
    setTimeout(() => {
        taskModal.classList.remove('opacity-0');
        modalContainer.classList.remove('scale-95');
    }, 10);
}

function closeModal() {
    taskModal.classList.add('opacity-0');
    modalContainer.classList.add('scale-95');
    setTimeout(() => taskModal.classList.add('hidden'), 300);
}

function saveTaskData() {
    const id = document.getElementById('taskId').value;
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;
    const category = document.getElementById('taskCategory').value;
    const priority = document.getElementById('taskPriority').value;
    const budget = Number(document.getElementById('taskBudget').value);
    const date = document.getElementById('taskDate').value;

    if (id) {
        const task = tasks.find(t => t.id == id);
        if (task) {
            task.title = title;
            task.description = description;
            task.category = category;
            task.priority = priority;
            task.budget = budget;
            task.date = date;
            logAction(`Peça #${task.id} editada com sucesso.`);
            showToast("Demanda atualizada com sucesso!", "fa-circle-check");
        }
    } else {
        const newTask = {
            id: Date.now().toString().slice(-4),
            title,
            description,
            category,
            priority,
            budget,
            date,
            status: 'todo'
        };
        tasks.push(newTask);
        logAction(`Nova peça cadastrada: #${newTask.id} - ${title}`);
        showToast("Nova demanda cadastrada no ateliê!", "fa-circle-plus");
    }

    closeModal();
    renderKanban();
}

function openEditModal(id) {
    const task = tasks.find(t => t.id === id);
    if (task) openModal("Editar Demanda", task);
}

function removeTask(id) {
    if (confirm("Deseja realmente remover esta demanda do sistema?")) {
        tasks = tasks.filter(t => t.id !== id);
        logAction(`Peça #${id} removida.`);
        renderKanban();
        showToast("Demanda removida com sucesso.", "fa-trash");
    }
}

// Toast Notificações Customizadas
function showToast(message, iconClass) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').innerText = message;
    document.getElementById('toastIcon').innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

    toast.classList.remove('translate-y-28', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-28', 'opacity-0');
    }, 3000);
}