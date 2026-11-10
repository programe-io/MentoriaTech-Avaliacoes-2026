
let tarefas = [];
let geradorDeCodigo = 0;

// VALIDAR DADOS DA TAREFA

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return false;
    }

    if (prioridade < 1 || prioridade > 3 ||
        !Number.isInteger(prioridade)) {
        alert("A prioridade deve ser entre 1 e 3!");
        return false;
    }

    return true;
}

// CADASTRAR TAREFA

function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (document.getElementById("prioridade").value === "" ||
        !validarDadosDaTarefa(titulo, prioridade)) {
        return;
    }

    let tarefa = {
        codigo: ++geradorDeCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: false
    };

    tarefas.push(tarefa);

    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
}

// LISTAR TAREFAS

function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {

        let status = tarefas[i].status
            ? "Concluída"
            : "Pendente";

        let classe = tarefas[i].status
            ? "concluida"
            : "pendente";

        let prioridade = "";

        if (tarefas[i].prioridade === 1) {
            prioridade = "Alta";
        } else if (tarefas[i].prioridade === 2) {
            prioridade = "Média";
        } else {
            prioridade = "Baixa";
        }

        lista.innerHTML += `
            <tr>
                <td>${tarefas[i].codigo}</td>
                <td>${tarefas[i].titulo}</td>
                <td>${prioridade}</td>
                <td class="${classe}">${status}</td>

                <td>
                    <button onclick="concluirTarefa(${tarefas[i].codigo})">
                        Concluir
                    </button>

                    <button onclick="alterarPrioridade(${tarefas[i].codigo})">
                        Alterar prioridade
                    </button>
                </td>
            </tr>
        `;
    }
}

// BUSCAR TAREFA

function buscarTarefa(codigo) {

    return tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });
}

// CONCLUIR TAREFA

function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.status = true;

    listarTarefas();

    alert("Tarefa concluída com sucesso!");
}

// ALTERAR PRIORIDADE

function alterarPrioridade(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade (1, 2 ou 3):")
    );

    if (!validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    )) {
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}
