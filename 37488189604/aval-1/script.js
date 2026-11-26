let itens = JSON.parse(localStorage.getItem('estoque_v2')) || [];
let editandoId = null;

const formEst = document.getElementById('form-estoque');
const gridProd = document.getElementById('grid-produtos');
const filtroEst = document.getElementById('filtro-estoque');
const apenasBaixoEl = document.getElementById('apenas-baixo');

function moeda(v) {
    return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function salvar() {
    localStorage.setItem('estoque_v2', JSON.stringify(itens));
    renderizar();
}

function renderizar() {
    const termo = filtroEst.value.trim().toLowerCase();
    const soBaixo = apenasBaixoEl.checked;

    let unidades = 0;
    let valorTotal = 0;
    let qtdBaixo = 0;

    itens.forEach(item => {
        unidades += item.qtd;
        valorTotal += item.qtd * item.preco;
        if (item.qtd <= item.minimo) qtdBaixo++;
    });

    document.getElementById('m-unidades').textContent = unidades;
    document.getElementById('m-valor').textContent = moeda(valorTotal);
    document.getElementById('m-baixo').textContent = qtdBaixo;

    const filtrados = itens.filter(item => {
        const matchTexto = item.nome.toLowerCase().includes(termo) ||
                           item.categoria.toLowerCase().includes(termo);
        const matchBaixo = !soBaixo || item.qtd <= item.minimo;
        return matchTexto && matchBaixo;
    });

    gridProd.innerHTML = '';

    if (filtrados.length === 0) {
        gridProd.innerHTML = '<p style="color:#94a3b8;">Nenhum item encontrado.</p>';
        return;
    }

    filtrados.forEach(item => {
        const estaBaixo = item.qtd <= item.minimo;
        const card = document.createElement('div');
        card.className = `card-prod ${estaBaixo ? 'baixo' : ''}`;

        card.innerHTML = `
            <div>
                <div class="card-topo">
                    <h3>${item.nome}</h3>
                    <span class="tag-cat">${item.categoria}</span>
                </div>
                <p style="margin-top:8px; color:#94a3b8; font-size:0.85rem;">
                    Unit.: ${moeda(item.preco)} | Mín.: ${item.minimo}
                </p>
                <p class="qtd-destaque" style="margin-top:8px;">
                    ${item.qtd} un. ${estaBaixo ? '• Baixo' : ''}
                </p>
                <p style="font-size:0.85rem; color:#cbd5e1;">
                    Total: ${moeda(item.qtd * item.preco)}
                </p>
            </div>
            <div class="card-acoes">
                <button class="btn-ajuste" onclick="mudarQtd(${item.id}, 1)">+1</button>
                <button class="btn-ajuste" onclick="mudarQtd(${item.id}, -1)">-1</button>
                <button class="btn-editar" onclick="prepararEdicao(${item.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirItem(${item.id})">Excluir</button>
            </div>
        `;
        gridProd.appendChild(card);
    });
}

formEst.addEventListener('submit', (e) => {
    e.preventDefault();

    const dados = {
        id: editandoId || Date.now(),
        nome: document.getElementById('prod-nome').value.trim(),
        categoria: document.getElementById('prod-cat').value.trim(),
        qtd: parseInt(document.getElementById('prod-qtd').value, 10),
        minimo: parseInt(document.getElementById('prod-min').value, 10),
        preco: parseFloat(document.getElementById('prod-preco').value)
    };

    if (editandoId) {
        itens = itens.map(i => i.id === editandoId ? dados : i);
        editandoId = null;
        document.getElementById('btn-submit').textContent = 'Salvar item';
    } else {
        itens.push(dados);
    }

    formEst.reset();
    document.getElementById('prod-min').value = 5;
    salvar();
});

function prepararEdicao(id) {
    const item = itens.find(i => i.id === id);
    if (!item) return;

    editandoId = id;
    document.getElementById('prod-nome').value = item.nome;
    document.getElementById('prod-cat').value = item.categoria;
    document.getElementById('prod-qtd').value = item.qtd;
    document.getElementById('prod-min').value = item.minimo;
    document.getElementById('prod-preco').value = item.preco;
    document.getElementById('btn-submit').textContent = 'Atualizar';
}

function mudarQtd(id, delta) {
    itens = itens.map(item => {
        if (item.id === id) {
            return { ...item, qtd: Math.max(0, item.qtd + delta) };
        }
        return item;
    });
    salvar();
}

function excluirItem(id) {
    itens = itens.filter(i => i.id !== id);
    if (editandoId === id) {
        editandoId = null;
        formEst.reset();
        document.getElementById('btn-submit').textContent = 'Salvar item';
    }
    salvar();
}

document.getElementById('btn-csv').addEventListener('click', () => {
    const linhas = ['ID;Produto;Categoria;Quantidade;Minimo;Preco;Subtotal'];
    itens.forEach(i => {
        linhas.push(`${i.id};"${i.nome}";"${i.categoria}";${i.qtd};${i.minimo};${i.preco};${(i.qtd * i.preco).toFixed(2)}`);
    });
    const blob = new Blob([linhas.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estoque.csv';
    a.click();
    URL.revokeObjectURL(url);
});

filtroEst.addEventListener('input', renderizar);
apenasBaixoEl.addEventListener('change', renderizar);

renderizar();let tasks = JSON.parse(localStorage.getItem('tarefas_v2')) || [];
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

renderTasks();let tasks = JSON.parse(localStorage.getItem('tarefas_v2')) || [];
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