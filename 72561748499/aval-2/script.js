// Array para armazenar as tarefas na memória
let tarefas = [];
let proximoCodigo = 1;

// Seleção de elementos do DOM
const formTarefa = document.getElementById('form-tarefa');
const inputTitulo = document.getElementById('titulo');
const selectPrioridade = document.getElementById('prioridade');
const tabelaBody = document.getElementById('lista-tarefas');
const mensagemErro = document.getElementById('mensagem-erro');

// Mapeamento das prioridades
const textoPrioridade = {
    1: '1 - Alta',
    2: '2 - Média',
    3: '3 - Baixa'
};

// Evento de envio do formulário (Cadastrar Tarefa)
formTarefa.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const titulo = inputTitulo.value.trim();
    const prioridade = parseInt(selectPrioridade.value, 10);

    // Validação das regras do projeto
    if (titulo.length < 5) {
        exibirErro('O título deve ter no mínimo 5 caracteres.');
        return;
    }

    if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
        exibirErro('A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).');
        return;
    }

    exibirErro(''); // Limpa erros anteriores

    // Objeto Tarefa
    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    formTarefa.reset();
    renderizarTarefas();
});

// Exibe mensagem de erro na tela
function exibirErro(mensagem) {
    mensagemErro.textContent = mensagem;
}

// Alternar status de conclusão
function alternarStatus(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        renderizarTarefas();
    }
}

// Alterar a prioridade da tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
        const novaPrioridadeStr = prompt('Digite a nova prioridade (1 = Alta, 2 = Média, 3 = Baixa):', tarefa.prioridade);
        
        if (novaPrioridadeStr === null) return; // Se cancelar o prompt

        const novaPrioridade = parseInt(novaPrioridadeStr, 10);

        if (isNaN(novaPrioridade) || novaPrioridade < 1 || novaPrioridade > 3) {
            alert('Prioridade inválida! Deve ser um número entre 1 e 3.');
            return;
        }

        tarefa.prioridade = novaPrioridade;
        renderizarTarefas();
    }
}

// Atualizar a listagem de tarefas no HTML
function renderizarTarefas() {
    tabelaBody.innerHTML = '';

    if (tarefas.length === 0) {
        tabelaBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #777;">Nenhuma tarefa cadastrada.</td>
            </tr>
        `;
        return;
    }

    tarefas.forEach(tarefa => {
        const tr = document.createElement('tr');
        if (tarefa.concluida) {
            tr.classList.add('concluida');
        }

        tr.innerHTML = `
            <td>#${tarefa.codigo}</td>
            <td>${escapeHTML(tarefa.titulo)}</td>
            <td>
                <span class="badge-prioridade p-${tarefa.prioridade}">
                    ${textoPrioridade[tarefa.prioridade]}
                </span>
            </td>
            <td>${tarefa.concluida ? 'Concluída' : 'Pendente'}</td>
            <td>
                <button class="btn-status" onclick="alternarStatus(${tarefa.codigo})">
                    ${tarefa.concluida ? 'Reabrir' : 'Concluir'}
                </button>
                <button class="btn-prioridade" onclick="alterarPrioridade(${tarefa.codigo})">
                    Mudar Prioridade
                </button>
            </td>
        `;

        tabelaBody.appendChild(tr);
    });
}

// Função utilitária para evitar injeção de HTML
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Renderização inicial
renderizarTarefas();