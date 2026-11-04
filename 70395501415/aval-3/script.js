let tarefas = [];
let proximoCodigo = 1;

const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

function cadastrarTarefa(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        mostrarMensagem("O título deve ter pelo menos 5 caracteres.");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        mostrarMensagem("A prioridade deve ser de 1 a 3.");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    formTarefa.reset();

    listarTarefas();
    mostrarMensagem("Tarefa cadastrada com sucesso!");
}

function listarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td>${tarefa.titulo}</td>
            <td>${nomePrioridade(tarefa.prioridade)}</td>
            <td>${tarefa.concluida ? "Concluída" : "Em andamento"}</td>
            <td>
                ${
                    tarefa.concluida
                    ? "Finalizada"
                    : `<button onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                       </button>`
                }
            </td>
        `;

        listaTarefas.appendChild(linha);
    });
}

function nomePrioridade(prioridade) {
    if (prioridade === 1) {
        return "Alta";
    } else if (prioridade === 2) {
        return "Média";
    } else {
        return "Baixa";
    }
}

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

function concluirTarefa(codigo) {
    try {
        const tarefa = buscarTarefa(codigo);

        tarefa.concluida = true;

        listarTarefas();
        mostrarMensagem("Tarefa concluída!");
    } catch (erro) {
        mostrarMensagem(erro.message);
    }
}

function alterarPrioridadeTela() {
    try {
        const codigo = Number(
            document.getElementById("codigoPrioridade").value
        );

        const novaPrioridade = Number(
            document.getElementById("novaPrioridade").value
        );

        if (codigo <= 0) {
            mostrarMensagem("Digite um código válido.");
            return;
        }

        if (novaPrioridade < 1 || novaPrioridade > 3) {
            mostrarMensagem("A prioridade deve ser de 1 a 3.");
            return;
        }

        alterarPrioridade(codigo, novaPrioridade);

        listarTarefas();
        mostrarMensagem("Prioridade alterada com sucesso!");

    } catch (erro) {
        mostrarMensagem(erro.message);
    }
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    tarefa.prioridade = novaPrioridade;
}

formTarefa.addEventListener("submit", cadastrarTarefa);