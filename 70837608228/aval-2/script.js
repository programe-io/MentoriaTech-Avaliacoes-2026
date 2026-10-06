let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3");
    }
}

function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(
        tarefa => tarefa.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error("Código de tarefa não encontrado");
    }

    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    const tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    return tarefa;
}

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);
    tarefa.status = false;
}

function executarExemplo() {

    try {
        cadastrarTarefa("Cadastrar Clientes", 1);
        cadastrarTarefa("Limpar banco de dados", 3);

        mostrarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

function mostrarTarefas() {

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    listarTarefas().forEach(tarefa => {

        const div = document.createElement("div");
        div.classList.add("tarefa");

        div.innerHTML = `
            <strong>Código:</strong> ${tarefa.codigo}<br>
            <strong>Título:</strong> ${tarefa.titulo}<br>
            <strong>Prioridade:</strong> ${tarefa.prioridade}<br>
            <strong>Status:</strong> ${tarefa.status ? "Pendente" : "Concluída"}
        `;

        resultado.appendChild(div);
    });
}