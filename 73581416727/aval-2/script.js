// Seleção de elementos do DOM
const formTarefa = document.getElementById('form-tarefa');
const inputTarefa = document.getElementById('input-tarefa');
const selectPrioridade = document.getElementById('select-prioridade');
const listaTarefas = document.getElementById('lista-tarefas');
const contadorTarefas = document.getElementById('contador-tarefas');
const botoesFiltro = document.querySelectorAll('.btn-filtro');
const btnLimparConcluidas = document.getElementById('btn-limpar-concluidas');

// Estado da aplicação (carrega do localStorage ou inicia vazio)
let tarefas = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];
let filtroAtual = 'todas';

// Salva as tarefas no navegador
function salvarTarefas() {
    localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas));
}

// Atualiza o texto de contagem de tarefas pendentes
function atualizarContador() {
    const pendentes = tarefas.filter(tarefa => !tarefa.concluida).length;
    contadorTarefas.textContent = `${pendentes} ${pendentes === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
}

// Renderiza a lista na tela com base no filtro ativo
function renderizarTarefas() {
    listaTarefas.innerHTML = '';

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroAtual === 'pendentes') return !tarefa.concluida;
        if (filtroAtual === 'concluidas') return tarefa.concluida;
        return true;
    });

    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `item-tarefa ${tarefa.prioridade} ${tarefa.concluida ? 'concluida' : ''}`;

        // Área clicável (checkbox + texto)
        const divConteudo = document.createElement('div');
        divConteudo.className = 'conteudo-tarefa';
        divConteudo.addEventListener('click', () => alternarConclusao(tarefa.id));

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;

        const spanTexto = document.createElement('span');
        spanTexto.className = 'texto-tarefa';
        spanTexto.textContent = tarefa.texto;

        divConteudo.appendChild(checkbox);
        divConteudo.appendChild(spanTexto);

        // Botão de excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.className = 'btn-excluir';
        btnExcluir.innerHTML = '&times;';
        btnExcluir.title = 'Excluir tarefa';
        btnExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));

        li.appendChild(divConteudo);
        li.appendChild(btnExcluir);
        listaTarefas.appendChild(li);
    });

    atualizarContador();
}

// Adiciona uma nova tarefa
function adicionarTarefa(evento) {
    evento.preventDefault();
    const texto = inputTarefa.value.trim();

    if (texto === '') return;

    const novaTarefa = {
        id: Date.now(), // Gera um ID único baseado no timestamp
        texto: texto,
        prioridade: selectPrioridade.value,
        concluida: false
    };

    tarefas.unshift(novaTarefa); // Adiciona no topo da lista
    salvarTarefas();
    renderizarTarefas();

    inputTarefa.value = '';
    inputTarefa.focus();
}

// Marca ou desmarca tarefa como concluída
function alternarConclusao(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            return { ...tarefa, concluida: !tarefa.concluida };
        }
        return tarefa;
    });

    salvarTarefas();
    renderizarTarefas();
}

// Remove uma tarefa específica
function excluirTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    salvarTarefas();
    renderizarTarefas();
}

// Remove todas as tarefas já concluídas
function limparConcluidas() {
    tarefas = tarefas.filter(tarefa => !tarefa.concluida);
    salvarTarefas();
    renderizarTarefas();
}

// Eventos
formTarefa.addEventListener('submit', adicionarTarefa);
btnLimparConcluidas.addEventListener('click', limparConcluidas);

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        // Atualiza visual do botão ativo
        botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
        botao.classList.add('ativo');

        // Aplica o filtro
        filtroAtual = botao.getAttribute('data-filtro');
        renderizarTarefas();
    });
});

// Inicializa a interface ao carregar a página
renderizarTarefas();