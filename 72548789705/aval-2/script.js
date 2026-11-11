
let tarefas = [];
let geradorDeCodigo = 0;

// Validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return false;
    }

    if (![1, 2, 3].includes(Number(prioridade))) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return false;
    }

    return true;
}

// Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {

    if (!validarDadosDaTarefa(titulo, prioridade)) {
        return;
    }

    let tarefa = {
        codigo: ++geradorDeCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    listarTarefas();
}

// Listar tarefas cadastradas
function listarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let prioridadeTexto = {
            1: "Baixa",
            2: "Média",
            3: "Alta"
        };

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${prioridadeTexto[tarefa.prioridade]}</td>
                <td class="${tarefa.concluida ? 'concluida' : 'pendente'}">
                    ${status}
                </td>
                <td class="acoes">
                    <button class="concluir"
                        onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                    </button>

                    <button class="alterar"
                        onclick="alterarPrioridade(${tarefa.codigo})">
                        Alterar prioridade
                    </button>
                </td>
            </tr>
        `;
    });
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {

    return tarefas.find(function(tarefa) {
        return tarefa.codigo === Number(codigo);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa concluída com sucesso!");

    listarTarefas();
}

// Alterar prioridade da tarefa
function alterarPrioridade(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade (1, 2 ou 3):")
    );

    if (!validarDadosDaTarefa(tarefa.titulo, novaPrioridade)) {
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}

// Evento do formulário
document.getElementById("formTarefa").addEventListener("submit", function(event) {

    event.preventDefault();

    let titulo = document.getElementById("titulo").value;
    let prioridade = document.getElementById("prioridade").value;

    cadastrarTarefa(titulo, prioridade);

    if (titulo.trim().length >= 5 &&
        [1, 2, 3].includes(Number(prioridade)) &&
        prioridade !== "") {

        document.getElementById("formTarefa").reset();
    }

});
