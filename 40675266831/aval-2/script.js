let tasks = JSON.parse(localStorage.getItem('tarefas_v2')) || [];
let editandoTaskId = null;

const formTask = document.getElementById('form-task');
const listaTask = document.getElementById('lista-task');
const filtroStatus = document.getElementById('filtro-status');
const ordenacaoEl = document.getElementById('ordenacao');

const pesoPrioridade = { alta: 3, media: 2, baixa: 1 };

function salvarTasks() {
    localStorage.setItem('tarefas_v2', JSON.stringify(tasks));
    renderTasks();
}

function atualizarProgresso() {
    const feitas = tasks.filter(t => t.feita).length;
    const total = tasks.length;
    document.getElementById('progresso-texto').textContent = `${feitas} de ${total} concluídas`;
    const pct = total > 0 ? Math.round((feitas / total) * 100) : 0;
    document.getElementById('barra-fill').style.width = `${pct}%`;
}

function renderTasks() {
    let lista = tasks.filter(t => {
        if (filtroStatus.value === 'abertas') return !t.feita;
        if (filtroStatus.value === 'feitas') return t.feita;
        return true;
    });

    const ordem = ordenacaoEl.value;
    if (ordem === 'prioridade') {
        lista.sort((a, b) => pesoPrioridade[b.prioridade] - pesoPrioridade[a.prioridade]);
    } else if (ordem === 'prazo') {
        lista.sort((a, b) => {
            if (!a.prazo) return 1;
            if (!b.prazo) return -1;
            return a.prazo.localeCompare(b.prazo);
        });
    } else {
        lista.sort((a, b) => b.id - a.id);
    }

    listaTask.innerHTML = '';

    if (lista.length === 0) {
        listaTask.innerHTML = '<li style="color:#6b7280; text-align:center; padding:20px;">Nada por aqui.</li>';
    } else {
        lista.forEach(t => {
            const li = document.createElement('li');
            li.className = `task-card ${t.feita ? 'feita' : ''}`;
            const prazoFmt = t.prazo ? t.prazo.split('-').reverse().join('/') : 'Sem prazo';

            li.innerHTML = `
                <div class="task-esq">
                    <input type="checkbox" ${t.feita ? 'checked' : ''} onchange="toggleTask(${t.id})">
                    <span class="titulo-task">${t.titulo}</span>
                    <span class="tag-p p-${t.prioridade}">${t.prioridade}</span>
                    <small style="color:#6b7280;">📅 ${prazoFmt}</small>
                </div>
                <div class="task-dir">
                    <button class="btn-mini btn-edit-task" onclick="editarTask(${t.id})">Editar</button>
                    <button class="btn-mini btn-del-task" onclick="excluirTask(${t.id})">Excluir</button>
                </div>
            `;
            listaTask.appendChild(li);
        });
    }

    atualizarProgresso();
}

formTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('task-titulo').value.trim();
    const prioridade = document.getElementById('task-prio').value;
    const prazo = document.getElementById('task-data').value;
    if (!titulo) return;

    if (editandoTaskId) {
        tasks = tasks.map(t => t.id === editandoTaskId ? { ...t, titulo, prioridade, prazo } : t);
        editandoTaskId = null;
        document.getElementById('btn-task-submit').textContent = 'Criar';
    } else {
        tasks.push({ id: Date.now(), titulo, prioridade, prazo, feita: false });
    }

    formTask.reset();
    document.getElementById('task-prio').value = 'media';
    salvarTasks();
});

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, feita: !t.feita } : t);
    salvarTasks();
}

function editarTask(id) {
    const t = tasks.find(item => item.id === id);
    if (!t) return;
    editandoTaskId = id;
    document.getElementById('task-titulo').value = t.titulo;
    document.getElementById('task-prio').value = t.prioridade;
    document.getElementById('task-data').value = t.prazo;
    document.getElementById('btn-task-submit').textContent = 'Salvar';
}

function excluirTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    salvarTasks();
}

document.getElementById('btn-limpar-concluidas').addEventListener('click', () => {
    tasks = tasks.filter(t => !t.feita);
    salvarTasks();
});

filtroStatus.addEventListener('change', renderTasks);
ordenacaoEl.addEventListener('change', renderTasks);

renderTasks();