/* Array que vai guardar o conjunto de todas as tarefas */
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

    if (!tarefaBuscada) {
        throw new Error('Código de tarefa não encontrado');
    }
    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': Number(prioridade),
        'status': true
    };

    tarefas.push(tarefa);
    atualizarTabela();
}

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error('Tarefa já estava como concluída');
    }
    tarefa.status = false;
    atualizarTabela();
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = Number(novaPrioridade);
    atualizarTabela();
}

// Renderização na Interface
function atualizarTabela() {
    const tbody = document.getElementById("tabela-tarefas");
    tbody.innerHTML = "";

    tarefas.forEach(t => {
        const tr = document.createElement("tr");

        const statusTexto = t.status ? "Pendente" : "Concluída";
        const statusClasse = t.status ? "status-pendente" : "status-concluida";

        tr.innerHTML = `
            <td>${t.codigo}</td>
            <td class="${!t.status ? 'status-concluida' : ''}">${t.titulo}</td>
            <td><span class="prio-${t.prioridade}">Nível ${t.prioridade}</span></td>
            <td><span class="${statusClasse}">${statusTexto}</span></td>
            <td>
                ${t.status ? `<button class="btn btn-success" onclick="acaoConcluir(${t.codigo})">Concluir</button>` : ''}
                <button class="btn btn-warning" onclick="acaoAlterarPrioridade(${t.codigo})">Mudar Prioridade</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function acaoConcluir(codigo) {
    try {
        concluirTarefa(codigo);
    } catch (erro) {
        alert(erro.message);
    }
}

function acaoAlterarPrioridade(codigo) {
    const novaPrio = prompt("Digite a nova prioridade (1-Baixa, 2-Média, 3-Alta):");
    if (novaPrio !== null && novaPrio !== "") {
        try {
            alterarPrioridade(codigo, parseInt(novaPrio));
        } catch (erro) {
            alert(erro.message);
        }
    }
}

// Captura do Formulário HTML
document.getElementById("form-tarefa").addEventListener("submit", function(e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridade = parseInt(document.getElementById("prioridade").value);

    try {
        cadastrarTarefa(titulo, prioridade);
        this.reset();
    } catch (erro) {
        alert(erro.message);
    }
});

// Cadastros Iniciais de Teste
cadastrarTarefa('Cadastrar Clientes', 1);
alterarPrioridade(1, 2);