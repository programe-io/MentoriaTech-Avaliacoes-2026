/* STATE MANAGEMENT */
let tasks = [];
let userStats = {
    xp: 0,
    level: 1,
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    pomoMinutes: 0,
    unlockedBadges: []
};
let schedule = {};
let currentViewMode = 'kanban';
let currentModalSubtasks = [];
let soundEnabled = true;

// Pomodoro State
let pomoTimerInterval = null;
let pomoSecondsLeft = 25 * 60;
let pomoTotalSeconds = 25 * 60;
let pomoIsRunning = false;
let pomoMode = 'work'; // 'work', 'shortBreak', 'longBreak'

// Chart Reference
let subjectChartInstance = null;

// Available Badges Definition
const ALL_BADGES = [
    { id: 'first_task', name: 'Primeiro Passo', desc: 'Conclua sua 1ª tarefa', icon: 'check-circle' },
    { id: 'task_5', name: 'Estudante Focado', desc: 'Conclua 5 tarefas', icon: 'award' },
    { id: 'task_20', name: 'Mestre dos Deveres', desc: 'Conclua 20 tarefas', icon: 'trophy' },
    { id: 'pomo_1', name: 'Concentração Absoluta', desc: 'Complete 1 ciclo Pomodoro', icon: 'timer' },
    { id: 'streak_3', name: 'Em Chamas', desc: 'Mantenha 3 dias seguidos de estudo', icon: 'flame' },
    { id: 'level_5', name: 'Nível Avançado', desc: 'Alcance o Nível 5 de Estudante', icon: 'zap' }
];

/* INITIALIZATION */
document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorageData();
    checkDailyStreak();
    initLucideIcons();
    renderTasks();
    updateGamificationUI();
    populateScheduleGrid();
    initDefaultGrades();
    updatePomoTaskSelect();
});

function initLucideIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

/* LOCALSTORAGE PERSISTENCE */
function loadLocalStorageData() {
    const savedTasks = localStorage.getItem('edutask_tasks');
    const savedStats = localStorage.getItem('edutask_stats');
    const savedSchedule = localStorage.getItem('edutask_schedule');

    if (savedTasks) tasks = JSON.parse(savedTasks);
    else {
        // Initial Sample Data
        tasks = [
            {
                id: '1',
                title: 'Exercícios de Geometria Plana',
                subject: 'Matemática',
                type: 'Dever de Casa',
                priority: 'Alta',
                dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
                description: 'Páginas 45 e 46 do livro didático. Exercícios do 1 ao 10.',
                status: 'todo',
                subtasks: [{ id: 's1', text: 'Exercícios 1 a 5', completed: true }, { id: 's2', text: 'Exercícios 6 a 10', completed: false }]
            },
            {
                id: '2',
                title: 'Resumo sobre a Revolução Industrial',
                subject: 'História',
                type: 'Trabalho',
                priority: 'Urgente',
                dueDate: new Date(Date.now() + 172800000).toISOString().slice(0, 16),
                description: 'Elaborar resumo de 2 páginas com fotos e tópicos principais.',
                status: 'in_progress',
                subtasks: []
            }
        ];
    }

    if (savedStats) userStats = JSON.parse(savedStats);
    if (savedSchedule) schedule = JSON.parse(savedSchedule);
}

function saveData() {
    localStorage.setItem('edutask_tasks', JSON.stringify(tasks));
    localStorage.setItem('edutask_stats', JSON.stringify(userStats));
    localStorage.setItem('edutask_schedule', JSON.stringify(schedule));
}

/* SOUND EFFECTS (WEB AUDIO API) */
function playSound(type) {
    if (!soundEnabled) return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'complete') {
            osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'levelUp') {
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        }
    } catch (e) { console.log(e); }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundIcon = document.getElementById('sound-icon');
    if (soundEnabled) {
        soundIcon.setAttribute('data-lucide', 'volume-2');
    } else {
        soundIcon.setAttribute('data-lucide', 'volume-x');
    }
    initLucideIcons();
}

/* DARK MODE TOGGLE */
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
}

/* NAVIGATION TABS */
function switchTab(tabId) {
    const tabs = ['tasks', 'pomodoro', 'schedule', 'calculator', 'stats'];
    tabs.forEach(t => {
        const view = document.getElementById(`view-${t}`);
        const btn = document.getElementById(`tab-btn-${t}`);
        if (t === tabId) {
            view.classList.remove('hidden');
            btn.className = 'tab-active py-3 px-5 font-semibold text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap';
        } else {
            view.classList.add('hidden');
            btn.className = 'tab-inactive py-3 px-5 font-medium text-sm flex items-center gap-2 border-b-2 transition whitespace-nowrap';
        }
    });

    if (tabId === 'stats') {
        renderSubjectChart();
        renderBadges();
    }
}

/* TASK MANAGER RENDERING & FILTERS */
function setViewMode(mode) {
    currentViewMode = mode;
    const kanbanView = document.getElementById('kanban-view');
    const listView = document.getElementById('list-view');
    const btnKanban = document.getElementById('btn-view-kanban');
    const btnList = document.getElementById('btn-view-list');

    if (mode === 'kanban') {
        kanbanView.classList.remove('hidden');
        listView.classList.add('hidden');
        btnKanban.className = 'p-1.5 rounded-lg text-pastel-700 dark:text-pastel-200 bg-white dark:bg-slate-600 shadow-sm';
        btnList.className = 'p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-pastel-700 transition';
    } else {
        kanbanView.classList.add('hidden');
        listView.classList.remove('hidden');
        btnList.className = 'p-1.5 rounded-lg text-pastel-700 dark:text-pastel-200 bg-white dark:bg-slate-600 shadow-sm';
        btnKanban.className = 'p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-pastel-700 transition';
    }
}

function filterTasks() {
    renderTasks();
}

function getFilteredTasks() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const subject = document.getElementById('filter-subject').value;
    const priority = document.getElementById('filter-priority').value;

    return tasks.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(search) || (t.description && t.description.toLowerCase().includes(search));
        const matchesSubject = subject === 'ALL' || t.subject === subject;
        const matchesPriority = priority === 'ALL' || t.priority === priority;
        return matchesSearch && matchesSubject && matchesPriority;
    });
}

function renderTasks() {
    const filtered = getFilteredTasks();

    if (currentViewMode === 'kanban') {
        const cols = { todo: [], in_progress: [], review: [], completed: [] };
        filtered.forEach(t => { if (cols[t.status]) cols[t.status].push(t); });

        Object.keys(cols).forEach(status => {
            const container = document.getElementById(`col-${status}`);
            const countEl = document.getElementById(`count-${status}`);
            countEl.textContent = cols[status].length;
            container.innerHTML = cols[status].map(t => createTaskCardHTML(t)).join('');
        });
    }

    // Render List View
    const tbody = document.getElementById('list-table-body');
    tbody.innerHTML = filtered.map(t => createTaskListRowHTML(t)).join('');

    initLucideIcons();
    updatePomoTaskSelect();
}

/* CARD & LIST TEMPLATES */
function createTaskCardHTML(task) {
    const priorityColors = {
        'Urgente': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 animate-pulse',
        'Alta': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200',
        'Média': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 border-sky-200',
        'Baixa': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200'
    };

    const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : 'Sem prazo';

    const totalSub = task.subtasks ? task.subtasks.length : 0;
    const doneSub = task.subtasks ? task.subtasks.filter(s => s.completed).length : 0;

    return `
        <div draggable="true" ondragstart="handleDragStart(event, '${task.id}')" class="bg-white dark:bg-slate-700 p-4 rounded-2xl border border-pastel-100 dark:border-slate-600 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing space-y-3">
            <div class="flex items-start justify-between gap-2">
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-pastel-100 dark:bg-slate-600 text-pastel-800 dark:text-pastel-200">${task.subject}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md border ${priorityColors[task.priority] || ''}">${task.priority}</span>
            </div>

            <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100 ${task.status === 'completed' ? 'line-through text-slate-400 dark:text-slate-500' : ''}">${task.title}</h4>

            ${task.description ? `<p class="text-xs text-slate-500 dark:text-slate-300 line-clamp-2">${task.description}</p>` : ''}

            ${totalSub > 0 ? `
                <div class="space-y-1">
                    <div class="flex justify-between text-[10px] text-slate-500 font-semibold">
                        <span>Checklist</span>
                        <span>${doneSub}/${totalSub}</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-slate-600 rounded-full h-1.5 overflow-hidden">
                        <div class="bg-pastel-500 h-1.5 rounded-full" style="width: ${(doneSub/totalSub)*100}%"></div>
                    </div>
                </div>
            ` : ''}

            <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-600 text-xs text-slate-500 dark:text-slate-400">
                <div class="flex items-center gap-1 text-[11px]" title="Data de Entrega">
                    <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                    <span>${formattedDate}</span>
                </div>

                <div class="flex items-center gap-1">
                    ${task.status !== 'completed' ? `
                        <button onclick="quickCompleteTask('${task.id}')" class="p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-600 rounded-lg transition" title="Concluir Rápido">
                            <i data-lucide="check" class="w-4 h-4"></i>
                        </button>
                    ` : ''}
                    <button onclick="openEditTaskModal('${task.id}')" class="p-1 hover:bg-pastel-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-lg transition" title="Editar">
                        <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
                    </button>
                    <button onclick="deleteTask('${task.id}')" class="p-1 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 rounded-lg transition" title="Excluir">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createTaskListRowHTML(task) {
    const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : 'Sem prazo';

    return `
        <tr class="hover:bg-pastel-50/50 dark:hover:bg-slate-700/30 transition">
            <td class="p-4">
                <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} onchange="toggleTaskStatusCheckbox('${task.id}')" class="w-4 h-4 rounded text-pastel-500 focus:ring-pastel-400">
            </td>
            <td class="p-4 font-semibold text-slate-800 dark:text-slate-100 ${task.status === 'completed' ? 'line-through text-slate-400' : ''}">${task.title}</td>
            <td class="p-4"><span class="text-xs bg-pastel-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg text-pastel-800 dark:text-pastel-200 font-medium">${task.subject}</span></td>
            <td class="p-4"><span class="text-xs font-bold">${task.priority}</span></td>
            <td class="p-4 text-xs text-slate-500 dark:text-slate-400">${formattedDate}</td>
            <td class="p-4 text-right space-x-1">
                <button onclick="openEditTaskModal('${task.id}')" class="p-1.5 text-slate-500 hover:text-pastel-600 rounded-lg"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                <button onclick="deleteTask('${task.id}')" class="p-1.5 text-slate-500 hover:text-red-500 rounded-lg"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </td>
        </tr>
    `;
}

/* DRAG & DROP HANDLERS FOR KANBAN */
function handleDragStart(e, taskId) {
    e.dataTransfer.setData('text/plain', taskId);
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDrop(e, newStatus) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const taskId = e.dataTransfer.getData('text/plain');
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
        const wasCompleted = task.status === 'completed';
        task.status = newStatus;

        if (newStatus === 'completed' && !wasCompleted) {
            addXP(25);
            triggerConfetti();
            playSound('complete');
        }

        saveData();
        renderTasks();
    }
}

/* TASK MODAL HANDLERS */
function openNewTaskModal() {
    document.getElementById('task-id').value = '';
    document.getElementById('task-title').value = '';
    document.getElementById('task-subject').value = 'Matemática';
    document.getElementById('task-type').value = 'Dever de Casa';
    document.getElementById('task-priority').value = 'Média';
    document.getElementById('task-duedate').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('modal-title').textContent = 'Criar Nova Tarefa Escolar';
    currentModalSubtasks = [];
    renderModalSubtasks();
    document.getElementById('task-modal').classList.remove('hidden');
}

function openEditTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    document.getElementById('task-id').value = task.id;
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-subject').value = task.subject;
    document.getElementById('task-type').value = task.type || 'Dever de Casa';
    document.getElementById('task-priority').value = task.priority;
    document.getElementById('task-duedate').value = task.dueDate || '';
    document.getElementById('task-description').value = task.description || '';
    document.getElementById('modal-title').textContent = 'Editar Tarefa Escolar';
    currentModalSubtasks = task.subtasks ? [...task.subtasks] : [];
    renderModalSubtasks();
    document.getElementById('task-modal').classList.remove('hidden');
}

function closeTaskModal() {
    document.getElementById('task-modal').classList.add('hidden');
}

function addModalSubtask() {
    const input = document.getElementById('subtask-input');
    const text = input.value.trim();
    if (text) {
        currentModalSubtasks.push({ id: 'sub_' + Date.now(), text, completed: false });
        input.value = '';
        renderModalSubtasks();
    }
}

function removeModalSubtask(id) {
    currentModalSubtasks = currentModalSubtasks.filter(s => s.id !== id);
    renderModalSubtasks();
}

function renderModalSubtasks() {
    const list = document.getElementById('modal-subtask-list');
    list.innerHTML = currentModalSubtasks.map(s => `
        <li class="flex items-center justify-between bg-pastel-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg text-xs">
            <span class="text-slate-700 dark:text-slate-200">${s.text}</span>
            <button type="button" onclick="removeModalSubtask('${s.id}')" class="text-red-400 hover:text-red-600"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
        </li>
    `).join('');
    initLucideIcons();
}

function saveTask(e) {
    e.preventDefault();
    const id = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value;
    const subject = document.getElementById('task-subject').value;
    const type = document.getElementById('task-type').value;
    const priority = document.getElementById('task-priority').value;
    const dueDate = document.getElementById('task-duedate').value;
    const description = document.getElementById('task-description').value;

    if (id) {
        // Edit
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.title = title;
            task.subject = subject;
            task.type = type;
            task.priority = priority;
            task.dueDate = dueDate;
            task.description = description;
            task.subtasks = currentModalSubtasks;
        }
    } else {
        // New
        const newTask = {
            id: Date.now().toString(),
            title,
            subject,
            type,
            priority,
            dueDate,
            description,
            status: 'todo',
            subtasks: currentModalSubtasks
        };
        tasks.push(newTask);
    }

    saveData();
    renderTasks();
    closeTaskModal();
}

function quickCompleteTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = 'completed';
        addXP(25);
        triggerConfetti();
        playSound('complete');
        saveData();
        renderTasks();
    }
}

function toggleTaskStatusCheckbox(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        if (task.status === 'completed') {
            task.status = 'todo';
        } else {
            task.status = 'completed';
            addXP(25);
            triggerConfetti();
            playSound('complete');
        }
        saveData();
        renderTasks();
    }
}

function deleteTask(taskId) {
    if (confirm('Deseja realmente excluir esta tarefa?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveData();
        renderTasks();
    }
}

/* POMODORO TIMER LOGIC */
function setPomodoroMode(mode) {
    pomoMode = mode;
    pomoIsRunning = false;
    clearInterval(pomoTimerInterval);

    const btnWork = document.getElementById('pomo-mode-work');
    const btnShort = document.getElementById('pomo-mode-short');
    const btnLong = document.getElementById('pomo-mode-long');
    const label = document.getElementById('pomo-status-label');

    btnWork.className = 'px-5 py-2 rounded-xl font-semibold text-sm transition text-slate-600 dark:text-slate-300 hover:bg-pastel-100';
    btnShort.className = 'px-5 py-2 rounded-xl font-semibold text-sm transition text-slate-600 dark:text-slate-300 hover:bg-pastel-100';
    btnLong.className = 'px-5 py-2 rounded-xl font-semibold text-sm transition text-slate-600 dark:text-slate-300 hover:bg-pastel-100';

    if (mode === 'work') {
        pomoSecondsLeft = 25 * 60;
        btnWork.className = 'px-5 py-2 rounded-xl font-semibold text-sm transition bg-pastel-500 text-white shadow';
        label.textContent = 'Hora de Focar!';
    } else if (mode === 'shortBreak') {
        pomoSecondsLeft = 5 * 60;
        btnShort.className = 'px-5 py-2 rounded-xl font-semibold text-sm transition bg-emerald-500 text-white shadow';
        label.textContent = 'Pausa Curta - Descanse a Mente';
    } else if (mode === 'longBreak') {
        pomoSecondsLeft = 15 * 60;
        btnLong.className = 'px-5 py-2 rounded-xl font-semibold text-sm transition bg-indigo-500 text-white shadow';
        label.textContent = 'Pausa Longa - Recarregue as Energias';
    }

    pomoTotalSeconds = pomoSecondsLeft;
    updatePomodoroDisplay();
    updatePomoStartBtn();
}

function togglePomodoroTimer() {
    if (pomoIsRunning) {
        clearInterval(pomoTimerInterval);
        pomoIsRunning = false;
    } else {
        pomoIsRunning = true;
        pomoTimerInterval = setInterval(() => {
            pomoSecondsLeft--;
            updatePomodoroDisplay();

            if (pomoSecondsLeft <= 0) {
                clearInterval(pomoTimerInterval);
                pomoIsRunning = false;
                playSound('complete');
                triggerConfetti();

                if (pomoMode === 'work') {
                    addXP(15);
                    userStats.pomoMinutes += 25;
                    checkBadges();
                    saveData();
                }

                alert('Sessão concluída! Excelente trabalho!');
                setPomodoroMode('shortBreak');
            }
        }, 1000);
    }
    updatePomoStartBtn();
}

function resetPomodoroTimer() {
    setPomodoroMode(pomoMode);
}

function updatePomodoroDisplay() {
    const mins = Math.floor(pomoSecondsLeft / 60).toString().padStart(2, '0');
    const secs = (pomoSecondsLeft % 60).toString().padStart(2, '0');
    document.getElementById('pomo-timer-display').textContent = `${mins}:${secs}`;

    // Update Circle Progress
    const circle = document.getElementById('pomo-progress-circle');
    const circumference = 2 * Math.PI * 110; // 691
    const offset = circumference - (pomoSecondsLeft / pomoTotalSeconds) * circumference;
    circle.style.strokeDashoffset = offset;
}

function updatePomoStartBtn() {
    const text = document.getElementById('pomo-btn-text');
    const icon = document.getElementById('pomo-btn-icon');
    if (pomoIsRunning) {
        text.textContent = 'Pausar';
        icon.setAttribute('data-lucide', 'pause');
    } else {
        text.textContent = 'Iniciar';
        icon.setAttribute('data-lucide', 'play');
    }
    initLucideIcons();
}

function updatePomoTaskSelect() {
    const select = document.getElementById('pomo-task-select');
    if (!select) return;
    const uncompleted = tasks.filter(t => t.status !== 'completed');
    select.innerHTML = '<option value="">Nenhuma (Estudo Geral)</option>' +
        uncompleted.map(t => `<option value="${t.id}">${t.subject} - ${t.title}</option>`).join('');
}

/* GAMIFICATION & BADGES SYSTEM */
function addXP(amount) {
    userStats.xp += amount;
    const nextLevelXP = userStats.level * 100;
    if (userStats.xp >= nextLevelXP) {
        userStats.xp -= nextLevelXP;
        userStats.level += 1;
        playSound('levelUp');
        alert(`🎉 PARABÉNS! Você subiu para o Nível ${userStats.level} de Estudante!`);
    }
    checkBadges();
    saveData();
    updateGamificationUI();
}

function updateGamificationUI() {
    document.getElementById('streak-counter').textContent = `${userStats.streak} Dia${userStats.streak > 1 ? 's' : ''}`;
    document.getElementById('level-display').textContent = `Nível ${userStats.level}`;
    const nextXP = userStats.level * 100;
    document.getElementById('xp-text').textContent = `${userStats.xp}/${nextXP} XP`;
    const pct = Math.min(100, (userStats.xp / nextXP) * 100);
    document.getElementById('xp-bar-fill').style.width = `${pct}%`;

    // Stats View UI
    const completedCount = tasks.filter(t => t.status === 'completed').length;
    document.getElementById('stat-completed-count').textContent = completedCount;
    document.getElementById('stat-pomo-minutes').textContent = `${userStats.pomoMinutes} min`;
    const totalXPAccumulated = (userStats.level - 1) * 100 + userStats.xp;
    document.getElementById('stat-total-xp').textContent = `${totalXPAccumulated} XP`;
}

function checkDailyStreak() {
    const today = new Date().toISOString().split('T')[0];
    const last = userStats.lastActiveDate;

    if (last !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (last === yesterday) {
            userStats.streak += 1;
        } else {
            userStats.streak = 1;
        }
        userStats.lastActiveDate = today;
        saveData();
    }
}

function checkBadges() {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const unlock = (id) => {
        if (!userStats.unlockedBadges.includes(id)) {
            userStats.unlockedBadges.push(id);
            alert(`🏅 CONQUISTA DESBLOQUEADA: ${ALL_BADGES.find(b => b.id === id).name}!`);
        }
    };

    if (completedTasks >= 1) unlock('first_task');
    if (completedTasks >= 5) unlock('task_5');
    if (completedTasks >= 20) unlock('task_20');
    if (userStats.pomoMinutes >= 25) unlock('pomo_1');
    if (userStats.streak >= 3) unlock('streak_3');
    if (userStats.level >= 5) unlock('level_5');
}

function renderBadges() {
    const container = document.getElementById('badges-grid');
    container.innerHTML = ALL_BADGES.map(b => {
        const unlocked = userStats.unlockedBadges.includes(b.id);
        return `
            <div class="p-4 rounded-2xl border text-center transition ${unlocked ? 'bg-pastel-50 dark:bg-slate-700/60 border-pastel-300 dark:border-pastel-500 shadow-sm' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-50 grayscale'}">
                <div class="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${unlocked ? 'bg-pastel-500 text-white shadow' : 'bg-slate-300 dark:bg-slate-600 text-slate-500'}">
                    <i data-lucide="${b.icon}" class="w-5 h-5"></i>
                </div>
                <div class="font-bold text-xs text-slate-800 dark:text-slate-100">${b.name}</div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">${b.desc}</div>
            </div>
        `;
    }).join('');
    initLucideIcons();
}

/* WEEKLY SCHEDULE LOGIC */
function populateScheduleGrid() {
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const container = document.getElementById('schedule-grid');

    container.innerHTML = days.map(day => `
        <div class="bg-pastel-50/60 dark:bg-slate-700/40 p-4 rounded-2xl border border-pastel-100 dark:border-slate-600">
            <h4 class="font-bold text-sm text-pastel-900 dark:text-pastel-200 mb-3 border-b border-pastel-200 dark:border-slate-600 pb-1.5">${day}</h4>
            <div class="space-y-2">
                ${[1,2,3,4,5].map(period => `
                    <div>
                        <span class="text-[10px] text-slate-400 font-medium">${period}º Horário</span>
                        <input type="text" data-day="${day}" data-period="${period}" value="${schedule[`${day}-${period}`] || ''}" placeholder="Matéria..." class="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-pastel-200 dark:border-slate-600 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-pastel-400">
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function saveSchedule() {
    const inputs = document.querySelectorAll('#schedule-grid input');
    inputs.forEach(input => {
        const day = input.getAttribute('data-day');
        const period = input.getAttribute('data-period');
        schedule[`${day}-${period}`] = input.value.trim();
    });
    saveData();
    alert('Grade horária salva com sucesso!');
}

/* GRADE CALCULATOR LOGIC */
function initDefaultGrades() {
    const container = document.getElementById('grades-container');
    container.innerHTML = '';
    addGradeRow('Prova 1', 7.5, 1);
    addGradeRow('Trabalho Grupo', 9.0, 1);
    addGradeRow('Prova Final', '', 2);
}

function addGradeRow(name = '', grade = '', weight = 1) {
    const container = document.getElementById('grades-container');
    const div = document.createElement('div');
    div.className = 'flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2';
    div.innerHTML = `
        <input type="text" placeholder="Nome da Avaliação" value="${name}" class="flex-2 w-full px-3 py-2 bg-pastel-50 dark:bg-slate-700 border border-pastel-200 dark:border-slate-600 rounded-xl text-sm">
        <input type="number" step="0.1" max="10" min="0" placeholder="Nota" value="${grade}" class="grade-val w-24 px-3 py-2 bg-pastel-50 dark:bg-slate-700 border border-pastel-200 dark:border-slate-600 rounded-xl text-sm font-semibold text-center">
        <input type="number" step="1" min="1" placeholder="Peso" value="${weight}" class="grade-weight w-20 px-3 py-2 bg-pastel-50 dark:bg-slate-700 border border-pastel-200 dark:border-slate-600 rounded-xl text-sm text-center">
        <button onclick="this.parentElement.remove()" class="p-2 text-red-400 hover:text-red-600"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
    `;
    container.appendChild(div);
    initLucideIcons();
}

function calculateGrades() {
    const rows = document.querySelectorAll('#grades-container > div');
    let totalWeightedGrade = 0;
    let totalWeight = 0;

    rows.forEach(row => {
        const valInput = row.querySelector('.grade-val').value;
        const weightInput = parseFloat(row.querySelector('.grade-weight').value) || 1;

        if (valInput !== '') {
            const val = parseFloat(valInput);
            totalWeightedGrade += val * weightInput;
            totalWeight += weightInput;
        }
    });

    const resultBox = document.getElementById('grade-result-box');
    const avgDisplay = document.getElementById('calculated-average');
    const statusMsg = document.getElementById('grade-status-message');
    const minPassing = parseFloat(document.getElementById('min-passing-grade').value) || 7.0;

    if (totalWeight === 0) {
        alert('Por favor, insira pelo menos uma nota válida.');
        return;
    }

    const avg = totalWeightedGrade / totalWeight;
    avgDisplay.textContent = avg.toFixed(1);
    resultBox.classList.remove('hidden');

    if (avg >= minPassing) {
        statusMsg.textContent = `🎉 Você está acima da média necessária (${minPassing})! Mantenha o ritmo.`;
        statusMsg.className = 'text-sm font-semibold text-emerald-600 dark:text-emerald-400';
    } else {
        const needed = (minPassing * (totalWeight + 1)) - totalWeightedGrade;
        statusMsg.textContent = `⚠️ Média abaixo de ${minPassing}. Se a próxima avaliação tiver peso 1, você precisará tirar pelo menos ${Math.min(10, Math.max(0, needed)).toFixed(1)}.`;
        statusMsg.className = 'text-sm font-semibold text-amber-600 dark:text-amber-400';
    }
}

/* STATS CHART RENDERING */
function renderSubjectChart() {
    const ctx = document.getElementById('subjectChart').getContext('2d');
    const counts = {};

    tasks.forEach(t => {
        counts[t.subject] = (counts[t.subject] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    if (subjectChartInstance) {
        subjectChartInstance.destroy();
    }

    subjectChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.length ? labels : ['Sem dados'],
            datasets: [{
                data: data.length ? data : [1],
                backgroundColor: [
                    '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#7dd3fc',
                    '#f59e0b', '#10b981', '#6366f1', '#ec4899', '#8b5cf6'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

/* BACKUP EXPORT & IMPORT */
function exportData() {
    const exportObj = { tasks, userStats, schedule };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `edutask_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function importData(e) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        try {
            const imported = JSON.parse(event.target.result);
            if (imported.tasks && imported.userStats) {
                tasks = imported.tasks;
                userStats = imported.userStats;
                if (imported.schedule) schedule = imported.schedule;
                saveData();
                renderTasks();
                updateGamificationUI();
                populateScheduleGrid();
                alert('Dados importados com sucesso!');
            }
        } catch (err) {
            alert('Erro ao carregar o arquivo JSON.');
        }
    };
    fileReader.readAsText(e.target.files[0]);
}

/* CELEBRATION EFFECTS */
function triggerConfetti() {
    if (window.confetti) {
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 }
        });
    }
}