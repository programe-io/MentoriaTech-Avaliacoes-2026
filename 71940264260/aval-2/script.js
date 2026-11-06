
let tarefas = [];
let geradorCodigo = 0;


// VALIDAR DADOS DA TAREFA

function validarDadosTarefa(titulo, prioridade) {

    if (titulo === "") {
        throw new Error("Título da tarefa obrigatório");
    }

    if (prioridade < 1 || prioridade > 5) {
        throw new Error("Prioridade deve ser entre 1 e 5");
    }
}


// CADASTRAR TAREFA

function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    };

    tarefas.push(tarefa);
}


// LISTAR TAREFAS

function listarTarefas() {
    return tarefas;
}


// BUSCAR TAREFA

function buscarTarefa(codigo) {

    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    return tarefa;
}


// CONCLUIR TAREFA

function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Tarefa já estava como concluída");
    }

    tarefa.status = false;
}


// ALTERAR PRIORIDADE

function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    if (novaPrioridade < 1 || novaPrioridade > 5) {
        throw new Error("Prioridade inválida");
    }

    tarefa.prioridade = novaPrioridade;
}


// FUNÇÕES PARA CONECTAR COM O HTML

function cadastrarTarefaHTML() {

    try {

        let titulo = document.getElementById("titulo").value;

        let prioridade = Number(
            document.getElementById("prioridade").value
        );

        cadastrarTarefa(titulo, prioridade);

        document.getElementById("titulo").value = "";
        document.getElementById("prioridade").value = "";

        mostrarTarefas();

        mensagem("Tarefa cadastrada com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
}


function concluirTarefaHTML() {

    try {

        let codigo = Number(
            document.getElementById("codigoConcluir").value
        );

        concluirTarefa(codigo);

        mostrarTarefas();

        mensagem("Tarefa concluída com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
}


function alterarPrioridadeHTML() {

    try {

        let codigo = Number(
            document.getElementById("codigoAlterar").value
        );

        let novaPrioridade = Number(
            document.getElementById("novaPrioridade").value
        );

        alterarPrioridade(codigo, novaPrioridade);

        mostrarTarefas();

        mensagem("Prioridade alterada com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
}


function buscarTarefaHTML() {

    try {

        let codigo = Number(
            document.getElementById("codigoBuscar").value
        );

        let tarefa = buscarTarefa(codigo);

        alert(
            "Código: " + tarefa.codigo +
            "\nTítulo: " + tarefa.titulo +
            "\nPrioridade: " + tarefa.prioridade +
            "\nStatus: " + tarefa.status
        );

    } catch (erro) {
        alert(erro.message);
    }
}


// MOSTRAR TAREFAS NA TABELA

function mostrarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    listarTarefas().forEach(function(tarefa) {

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${tarefa.prioridade}</td>
                <td>${tarefa.status ? "Pendente" : "Concluída"}</td>
            </tr>
        `;

    });
}


// MENSAGEM NA TELA

function mensagem(texto) {

    document.getElementById("mensagem").innerText = texto;

}

