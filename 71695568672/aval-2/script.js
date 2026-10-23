// 3. Armazenamento das tarefas com array
let tarefas = [];
let proximoId = 1; // 7. Geração automática de códigos

// Elementos do DOM
const formTarefa = document.getElementById('form-tarefa');
const inputId = document.getElementById('tarefa-id');
const inputDescricao = document.getElementById('descricao');
const selectPrioridade = document.getElementById('prioridade');
const listaTarefasElement = document.getElementById('lista-tarefas');
const btnCancelar = document.getElementById('btn-cancelar');

// 5. Validação dos dados da tarefa
function validarTarefa(descricao, prioridade) {
    if (!descricao.trim()) {
        alert("Erro: A descrição da tarefa é obrigatória.");
        return false;
    }
    if (!prioridade) {
        alert("Erro: Selecione uma prioridade válida (Baixa, Média ou Alta).");
        return false;
    }
    return true;
}

// 6. Cadastro e modelagem de uma tarefa
function cadastrarTarefa(descricao, prioridade) {
    if (!validarTarefa(descricao, prioridade)) return;

    const novaTarefa = {
        id: proximoId++, // ID incremental automático
        descricao: descricao.trim(),
        prioridade: prioridade,
        concluida: false // Status inicial pendente
    };

    tarefas.push(novaTarefa);
    limparFormulario();
    renderizarTarefas();
}

// 9. Busca de tarefas com find
function buscarTarefaPorId(id) {
    return tarefas.find(t => t.id === parseInt(id));
}

// 10. Conclusão de uma tarefa
function alternarConclusao(id) {
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida; // Chaveia entre true e false
        renderizarTarefas();
    }
}

// 11. Alteração da prioridade / Edição completa
function prepararEdicao(id) {
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        inputId.value = tarefa.id;
        inputDescricao.value = tarefa.descricao;
        selectPrioridade.value = tarefa.prioridade;
        btnCancelar.style.display = 'inline-block';
    }
}

function salvarEdicao(id, novaDescricao, novaPrioridade) {
    if (!validarTarefa(novaDescricao, novaPrioridade)) return;

    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        tarefa.descricao = novaDescricao.trim();
        tarefa.prioridade = novaPrioridade;
        limparFormulario();
        renderizarTarefas();
    }
}

// 8. Listagem das tarefas cadastradas (Renderização dinâmina)
function renderizarTarefas() {
    listaTarefasElement.innerHTML = '';

    tarefas.forEach(tarefa => {
        const tr = document.createElement('tr');
        if (tarefa.concluida) {
            tr.classList.add('tarefa-concluida');
        }

        const badgeClass = `badge-${tarefa.prioridade.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;

        tr.innerHTML = `
            <td>#${tarefa.id}</td>
            <td>${tarefa.concluida ? '✅ Concluída' : '⏳ Pendente'}</td>
            <td>${tarefa.descricao}</td>
            <td><span class="badge ${badgeClass}">${tarefa.prioridade}</span></td>
            <td class="td-acoes">
                <button class="btn btn-success" onclick="alternarConclusao(${tarefa.id})">
                    ${tarefa.concluida ? 'Reabrir' : 'Concluir'}
                </button>
                <button class="btn btn-warning" onclick="prepararEdicao(${tarefa.id})">Editar</button>
            </td>
        `;
        listaTarefasElement.appendChild(tr);
    });
}

// Funções de utilidade e controle de interface
function limparFormulario() {
    inputId.value = '';
    inputDescricao.value = '';
    selectPrioridade.value = '';
    btnCancelar.style.display = 'none';
}

// Event Listeners (Controladores de Fluxo)
formTarefa.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = inputId.value;
    const desc = inputDescricao.value;
    const prioridade = selectPrioridade.value;

    if (id) {
        salvarEdicao(id, desc, prioridade);
    } else {
        cadastrarTarefa(desc, prioridade);
    }
});

btnCancelar.addEventListener('click', limparFormulario);
