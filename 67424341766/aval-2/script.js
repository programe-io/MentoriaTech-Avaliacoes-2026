// Array que armazena as tarefas em memória
let tarefas = [];

const formTarefa = document.getElementById('form-tarefa');
const tabelaTarefas = document.getElementById('tabela-tarefas');

// Mapa auxiliar para exibir o texto da prioridade
const nomesPrioridade = {
    1: '1 - Alta',
    2: '2 - Média',
    3: '3 - Baixa'
};

// 1. CADASTRAR UMA NOVA TAREFA
formTarefa.addEventListener('submit', function(event) {
    event.preventDefault();

    const codigo = document.getElementById('codigo').value.trim().toUpperCase();
    const titulo = document.getElementById('titulo').value.trim();
    const prioridade = parseInt(document.getElementById('prioridade').value);

    // Validação 1: Código único
    if (tarefas.some(t => t.codigo === codigo)) {
        alert('Erro: Já existe uma tarefa com este código.');
        return;
    }

    // Validação 2: Título com no mínimo 5 caracteres
    if (titulo.length < 5) {
        alert('Erro: O título da tarefa deve ter no mínimo 5 caracteres.');
        return;
    }

    // Validação 3: Prioridade entre 1 e 3
    if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
        alert('Erro: A prioridade deve ser um valor entre 1 (Alta) e 3 (Baixa).');
        return;
    }

    // Cria o objeto tarefa (status inicial sempre falso/pendente)
    const novaTarefa = {
        codigo,
        titulo,
        prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    formTarefa.reset();
    listarTarefas();
});

// 2. LISTAR AS TAREFAS CADASTRADAS
function listarTarefas() {
    tabelaTarefas.innerHTML = '';

    if (tarefas.length === 0) {
        tabelaTarefas.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #64748b;">Nenhuma tarefa cadastrada.</td>
            </tr>
        `;
        return;
    }

    tarefas.forEach(tarefa => {
        const tr = document.createElement('tr');
        if (tarefa.concluida) {
            tr.classList.add('tarefa-concluida');
        }

        const statusTexto = tarefa.concluida ? 'Concluída' : 'Pendente';
        const statusClasse = tarefa.concluida ? 'status-concluida' : 'status-pendente';

        // Só mostra o botão "Concluir" se a tarefa ainda estiver pendente
        const botaoConcluir = !tarefa.concluida 
            ? `<button class="btn-concluir" onclick="concluirTarefa('${tarefa.codigo}')">Concluir</button>` 
            : '';

        tr.innerHTML = `
            <td><strong>${tarefa.codigo}</strong></td>
            <td class="titulo-cell">${tarefa.titulo}</td>
            <td><span class="badge prio-${tarefa.prioridade}">${nomesPrioridade[tarefa.prioridade]}</span></td>
            <td><span class="badge ${statusClasse}">${statusTexto}</span></td>
            <td>
                ${botaoConcluir}
                <button class="btn-prioridade" onclick="alterarPrioridade('${tarefa.codigo}')">Alterar Prioridade</button>
            </td>
        `;

        tabelaTarefas.appendChild(tr);
    });
}

// 3. MARCAR UMA TAREFA COMO CONCLUÍDA
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (!tarefa) return;

    tarefa.concluida = true;
    listarTarefas();
}

// 4. ALTERAR A PRIORIDADE DE UMA TAREFA
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (!tarefa) return;

    const entrada = prompt(`Nova prioridade para "${tarefa.titulo}" (1 = Alta, 2 = Média, 3 = Baixa):`);

    if (entrada !== null && entrada.trim() !== '') {
        const novaPrioridade = parseInt(entrada);

        // Valida a regra de negócio novamente na edição
        if (!isNaN(novaPrioridade) && novaPrioridade >= 1 && novaPrioridade <= 3) {
            tarefa.prioridade = novaPrioridade;
            listarTarefas();
        } else {
            alert('Valor inválido! A prioridade deve ser 1 (Alta), 2 (Média) ou 3 (Baixa).');
        }
    }
}

// Inicializa a listagem ao abrir a página
listarTarefas();
