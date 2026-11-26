let tarefas = JSON.parse(localStorage.getItem('gerenciador_tarefas')) || [];
let filtroAtual = 'todas';

const form = document.getElementById('form-tarefa');
const listaTarefasEl = document.getElementById('lista-tarefas');
const inputBusca = document.getElementById('busca');
const totalPendentesEl = document.getElementById('total-pendentes');
const totalConcluidasEl = document.getElementById('total-concluidas');
const botoesFiltro = document.querySelectorAll('.filtro-btn');

function salvarERenderizar() {
    localStorage.setItem('gerenciador_tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
}

function formatarData(dataIso) {
    if (!dataIso) return '';
    const [ano, mes, dia] = dataIso.split('-');
    return `${dia}/${mes}/${ano}`;
}

function estaAtrasada(tarefa) {
    if (!tarefa.prazo || tarefa.concluida) return false;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const [ano, mes, dia] = tarefa.prazo.split('-').map(Number);
    const dataPrazo = new Date(ano, mes - 1, dia);
    return dataPrazo < hoje;
}

function atualizarResumo() {
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = tarefas.length - concluidas;

    totalPendentesEl.textContent = pendentes;
    totalConcluidasEl.textContent = concluidas;
}

function renderizarTarefas() {
    const termoBusca = inputBusca.value.trim().toLowerCase();
    listaTarefasEl.innerHTML = '';

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroAtual === 'pendentes' && tarefa.concluida) return false;
        if (filtroAtual === 'concluidas' && !tarefa.concluida) return false;
        if (termoBusca && !tarefa.titulo.toLowerCase().includes(termoBusca)) return false;
        return true;
    });

    if (tarefasFiltradas.length === 0) {
        listaTarefasEl.innerHTML = '<li class="vazio">Nenhuma tarefa encontrada.</li>';
    } else {
        tarefasFiltradas.forEach(tarefa => {
            const li = document.createElement('li');
            li.className = `tarefa-item ${tarefa.concluida ? 'concluida' : ''}`;

            const atrasada = estaAtrasada(tarefa);
            const prazoHtml = tarefa.prazo
                ? `<span class="prazo ${atrasada ? 'atrasada' : ''}">📅 ${formatarData(tarefa.prazo)}${atrasada ? ' (Atrasada)' : ''}</span>`
                : '';

            li.innerHTML = `
                <div class="tarefa-principal">
                    <input
                        type="checkbox"
                        ${tarefa.concluida ? 'checked' : ''}
                        onchange="alternarConclusao(${tarefa.id})"
                        aria-label="Marcar tarefa como concluída"
                    >
                    <div class="tarefa-info">
                        <span class="tarefa-titulo">${tarefa.titulo}</span>
                        <span class="badge badge-${tarefa.prioridade}">${tarefa.prioridade}</span>
                        ${prazoHtml}
                    </div>
                </div>
                <button class="btn-del" onclick="removerTarefa(${tarefa.id})" title="Excluir tarefa">🗑️</button>
            `;

            listaTarefasEl.appendChild(li);
        });
    }

    atualizarResumo();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const tituloInput = document.getElementById('titulo');
    const prioridadeInput = document.getElementById('prioridade');
    const prazoInput = document.getElementById('prazo');

    const titulo = tituloInput.value.trim();
    if (!titulo) return;

    const novaTarefa = {
        id: Date.now(),
        titulo,
        prioridade: prioridadeInput.value,
        prazo: prazoInput.value,
        concluida: false
    };

    tarefas.unshift(novaTarefa);
    form.reset();
    prioridadeInput.value = 'media';
    salvarERenderizar();
});

function alternarConclusao(id) {
    tarefas = tarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    salvarERenderizar();
}

function removerTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    salvarERenderizar();
}

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
        botao.classList.add('ativo');
        filtroAtual = botao.dataset.filtro;
        renderizarTarefas();
    });
});

inputBusca.addEventListener('input', renderizarTarefas);

renderizarTarefas();