// Carrega as tarefas salvas ou inicia lista vazia
let tarefas = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];
let filtroAtual = 'todas';

// Elementos do DOM
const form = document.getElementById('form-tarefa');
const lista = document.getElementById('lista-tarefas');
const botoesFiltro = document.querySelectorAll('.filtro-btn');
const btnLimparConcluidas = document.getElementById('limpar-concluidas');

// Salva no navegador e atualiza a interface
function salvarERenderizar() {
    localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
    atualizarContadores();
}

// Atualiza os números no topo
function atualizarContadores() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;

    document.getElementById('total-tarefas').innerText = total;
    document.getElementById('tarefas-pendentes').innerText = pendentes;
    document.getElementById('tarefas-concluidas').innerText = concluidas;
}

// Formata a data de YYYY-MM-DD para DD/MM/YYYY
function formatarData(dataISO) {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `📅 ${dia}/${mes}/${ano}`;
}

// Renderiza a lista conforme o filtro selecionado
function renderizarTarefas() {
    lista.innerHTML = '';

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroAtual === 'pendentes') return !tarefa.concluida;
        if (filtroAtual === 'concluidas') return tarefa.concluida;
        return true;
    });

    if (tarefasFiltradas.length === 0) {
        lista.innerHTML = `<li style="text-align:center; color:#64748b; padding: 20px;">Nenhuma tarefa nesta visualização.</li>`;
        return;
    }

    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `tarefa-item prioridade-${tarefa.prioridade} ${tarefa.concluida ? 'concluida' : ''}`;

        li.innerHTML = `
            <div class="tarefa-info">
                <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} onchange="alternarStatus(${tarefa.id})">
                <div class="tarefa-detalhes">
                    <span class="tarefa-texto">${tarefa.titulo}</span>
                    <div class="tarefa-meta">
                        <span class="badge badge-${tarefa.prioridade}">${tarefa.prioridade}</span>
                        <span>${formatarData(tarefa.data)}</span>
                    </div>
                </div>
            </div>
            <button class="btn-excluir" onclick="excluirTarefa(${tarefa.id})" title="Excluir tarefa">🗑️</button>
        `;

        lista.appendChild(li);
    });
}

// Adiciona nova tarefa
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const tituloInput = document.getElementById('titulo-tarefa');
    const prioridadeInput = document.getElementById('prioridade-tarefa');
    const dataInput = document.getElementById('data-tarefa');

    const novaTarefa = {
        id: Date.now(),
        titulo: tituloInput.value.trim(),
        prioridade: prioridadeInput.value,
        data: dataInput.value,
        concluida: false
    };

    tarefas.unshift(novaTarefa); // Adiciona no topo da lista
    form.reset();
    salvarERenderizar();
});

// Marca ou desmarca tarefa como concluída
function alternarStatus(id) {
    tarefas = tarefas.map(t => {
        if (t.id === id) {
            return { ...t, concluida: !t.concluida };
        }
        return t;
    });
    salvarERenderizar();
}

// Exclui uma tarefa específica
function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvarERenderizar();
}

// Gerencia os botões de filtro
botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
        botoesFiltro.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtroAtual = btn.dataset.filtro;
        renderizarTarefas();
    });
});

// Remove todas as tarefas já concluídas
btnLimparConcluidas.addEventListener('click', () => {
    const temConcluidas = tarefas.some(t => t.concluida);
    if (!temConcluidas) return;

    if (confirm('Deseja remover todas as tarefas concluídas?')) {
        tarefas = tarefas.filter(t => !t.concluida);
        salvarERenderizar();
    }
});

// Inicializa a aplicação
salvarERenderizar();