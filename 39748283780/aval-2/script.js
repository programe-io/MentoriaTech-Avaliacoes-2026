// Armazena as tarefas e o contador de código
let tarefas = [];
let proximoCodigo = 1;

// Elementos do DOM
const formTarefa = document.getElementById('formTarefa');
const tituloInput = document.getElementById('titulo');
const prioridadeSelect = document.getElementById('prioridade');
const listaTarefas = document.getElementById('listaTarefas');
const mensagemDiv = document.getElementById('mensagem');

// Exibir mensagens para o usuário
function exibirMensagem(texto, tipo) {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem ${tipo}`;
    
    setTimeout(() => {
        mensagemDiv.className = 'mensagem';
    }, 4000);
}

// Retorna o nome da prioridade
function getNomePrioridade(valor) {
    const nomes = { 1: 'Alta', 2: 'Média', 3: 'Baixa' };
    return nomes[valor];
}

// Cadastrar nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    // Validação do título
    if (!titulo || titulo.length < 5) {
        exibirMensagem('❌ Erro: O título deve ter no mínimo 5 caracteres.', 'erro');
        return false;
    }

    // Validação da prioridade
    if (![1, 2, 3].includes(prioridade)) {
        exibirMensagem('❌ Erro: A prioridade deve ser 1 (alta), 2 (média) ou 3 (baixa).', 'erro');
        return false;
    }

    // Criar objeto da tarefa
    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    exibirMensagem(`✅ Tarefa cadastrada com sucesso! Código: ${novaTarefa.codigo}`, 'sucesso');
    return true;
}

// Listar todas as tarefas na interface
function listarTarefas() {
    if (tarefas.length === 0) {
        listaTarefas.innerHTML = '<p class="sem-tarefas">Nenhuma tarefa cadastrada ainda.</p>';
        return;
    }

    listaTarefas.innerHTML = '';

    tarefas.forEach(tarefa => {
        const card = document.createElement('div');
        card.className = `tarefa-card tarefa-prioridade-${tarefa.prioridade} ${tarefa.concluida ? 'concluida' : ''}`;
        card.innerHTML = `
            <div class="tarefa-codigo">#${tarefa.codigo}</div>
            <div class="tarefa-titulo">${tarefa.titulo}</div>
            <div class="tarefa-info">
                <strong>Prioridade:</strong> ${getNomePrioridade(tarefa.prioridade)} (${tarefa.prioridade}) | 
                <strong>Status:</strong> ${tarefa.concluida ? '✅ Concluída' : '⏳ Pendente'}
            </div>
            <div class="tarefa-acoes">
                ${!tarefa.concluida 
                    ? `<button class="btn btn-success" onclick="marcarComoConcluida(${tarefa.codigo})">✓ Concluir</button>` 
                    : ''}
                <select class="prioridade-select" onchange="alterarPrioridade(${tarefa.codigo}, this.value)">
                    <option value="1" ${tarefa.prioridade === 1 ? 'selected' : ''}>🔴 Alta</option>
                    <option value="2" ${tarefa.prioridade === 2 ? 'selected' : ''}>🟡 Média</option>
                    <option value="3" ${tarefa.prioridade === 3 ? 'selected' : ''}>🟢 Baixa</option>
                </select>
            </div>
        `;
        listaTarefas.appendChild(card);
    });
}

// Marcar tarefa como concluída
function marcarComoConcluida(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
        tarefa.concluida = true;
        exibirMensagem(`✅ Tarefa ${codigo} marcada como concluída!`, 'sucesso');
        listarTarefas();
    }
}

// Alterar prioridade da tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    const prioridadeNum = parseInt(novaPrioridade);
    const tarefa = tarefas.find(t => t.codigo === codigo);
    
    if (tarefa && [1, 2, 3].includes(prioridadeNum)) {
        tarefa.prioridade = prioridadeNum;
        exibirMensagem(`✅ Prioridade da tarefa ${codigo} alterada para ${getNomePrioridade(prioridadeNum)}!`, 'sucesso');
        listarTarefas();
    }
}

// Evento: Formulário de cadastro
formTarefa.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const titulo = tituloInput.value.trim();
    const prioridade = parseInt(prioridadeSelect.value);

    if (cadastrarTarefa(titulo, prioridade)) {
        formTarefa.reset();
        listarTarefas();
    }
});

// Carregar tarefas ao iniciar
listarTarefas();
