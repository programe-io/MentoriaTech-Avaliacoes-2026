let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres"
        );
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {

        throw new Error(
            "Informe uma prioridade entre 1 e 3"
        );
    }
}

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        t => t.codigo === codigo
    );

    if (!tarefa) {
        throw new Error(
            "Código de tarefa não encontrado"
        );
    }

    return tarefa;
}

function cadastrarTarefa() {

    const titulo = document.getElementById("titulo").value;

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {

        validarDadosTarefa(titulo, prioridade);

        const tarefa = {
            codigo: ++geradorCodigo,
            titulo: titulo.trim(),
            prioridade: prioridade,
            status: true
        };

        tarefas.push(tarefa);

        document.getElementById("titulo").value = "";
        document.getElementById("mensagem").textContent = "";

        listarTarefas();

    } catch (erro) {

        document.getElementById("mensagem").textContent =
            erro.message;

    }
}

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        const elemento = document.createElement("div");

        elemento.className = "tarefa";

        const titulo = document.createElement("h3");

        titulo.textContent =
            tarefa.codigo + " - " + tarefa.titulo;

        if (!tarefa.status) {
            titulo.classList.add("concluida");
        }

        const prioridade = document.createElement("p");

        prioridade.textContent =
            "Prioridade: " +
            ["Alta", "Média", "Baixa"][tarefa.prioridade - 1];

        const status = document.createElement("p");

        status.textContent = tarefa.status
            ? "Pendente"
            : "Concluída";

        elemento.appendChild(titulo);
        elemento.appendChild(prioridade);
        elemento.appendChild(status);

        if (tarefa.status) {

            const botao = document.createElement("button");

            botao.textContent = "Concluir tarefa";
            botao.className = "concluir";

            botao.onclick = function() {
                concluirTarefa(tarefa.codigo);
            };

            elemento.appendChild(botao);
        }

        lista.appendChild(elemento);

    });
}

function concluirTarefa(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        tarefa.status = false;

        listarTarefas();

    } catch (erro) {

        document.getElementById("mensagem").textContent =
            erro.message;

    }
}