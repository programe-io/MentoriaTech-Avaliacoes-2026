let tarefas = [];

let geradorCodigo = 0;


function validarDadosTarefas(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres"
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "Informe uma prioridade entre 1 e 3"
        );
    }
}


function buscarTarefas(codigoTarefas) {

    const tarefaBuscada = tarefas.find(
        tarefa => tarefa.codigo === codigoTarefas
    );

    if (!tarefaBuscada) {
        throw new Error(
            "Código de tarefa não encontrado"
        );
    }

    return tarefaBuscada;
}


function cadastrarTarefas(titulo, prioridade) {

    validarDadosTarefas(titulo, prioridade);

    let novaTarefa = {

        codigo: ++geradorCodigo,

        titulo: titulo,

        prioridade: prioridade,

        status: true
    };

    tarefas.push(novaTarefa);

    listarTarefasTela();
}


function ListarTarefas() {

    return tarefas;
}


function concluirTarefas(codigo) {

    let tarefa = buscarTarefas(codigo);

    if (tarefa.status === false) {

        throw new Error(
            "Tarefa já estava como concluída"
        );
    }

    tarefa.status = false;

    listarTarefasTela();
}


function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefas(codigo);

    validarDadosTarefas(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    listarTarefasTela();
}


/* =========================
   INTERFACE HTML
========================= */


document
    .getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        try {

            const titulo =
                document.getElementById("titulo").value;

            const prioridade =
                Number(
                    document.getElementById("prioridade").value
                );

            cadastrarTarefas(
                titulo,
                prioridade
            );

            mostrarMensagem(
                "Tarefa cadastrada com sucesso!"
            );

            document.getElementById("formTarefa").reset();

        } catch (erro) {

            mostrarMensagem(
                erro.message
            );
        }

    });


function listarTarefasTela() {

    const lista =
        document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const linha =
            document.createElement("tr");

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Baixa";
        }

        if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        }

        if (tarefa.prioridade === 3) {
            prioridadeTexto = "Alta";
        }

        const classePrioridade =
            "prioridade-" + tarefa.prioridade;


        let statusTexto;

        let classeStatus;

        if (tarefa.status === true) {

            statusTexto = "Pendente";

            classeStatus = "status-pendente";

        } else {

            statusTexto = "Concluída";

            classeStatus = "status-concluida";
        }


        linha.innerHTML = `

            <td>
                ${tarefa.codigo}
            </td>

            <td>
                ${tarefa.titulo}
            </td>

            <td class="${classePrioridade}">
                ${prioridadeTexto}
            </td>

            <td class="${classeStatus}">
                ${statusTexto}
            </td>

            <td>

                ${
                    tarefa.status
                    ?
                    `
                    <button
                        class="btn-concluir"
                        onclick="concluirTarefaTela(${tarefa.codigo})"
                    >
                        Concluir
                    </button>
                    `
                    :
                    "Finalizada"
                }

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridadeTela(${tarefa.codigo})"
                >
                    Prioridade
                </button>

            </td>
        `;

        lista.appendChild(linha);

    });


    atualizarContador();
}


function concluirTarefaTela(codigo) {

    try {

        concluirTarefas(codigo);

        mostrarMensagem(
            "Tarefa concluída com sucesso!"
        );

    } catch (erro) {

        mostrarMensagem(
            erro.message
        );
    }
}


function alterarPrioridadeTela(codigo) {

    const novaPrioridade =
        Number(
            prompt(
                "Digite a nova prioridade:\n\n" +
                "1 - Baixa\n" +
                "2 - Média\n" +
                "3 - Alta"
            )
        );

    if (isNaN(novaPrioridade)) {

        mostrarMensagem(
            "Informe uma prioridade válida."
        );

        return;
    }


    try {

        alterarPrioridade(
            codigo,
            novaPrioridade
        );

        mostrarMensagem(
            "Prioridade alterada com sucesso!"
        );

    } catch (erro) {

        mostrarMensagem(
            erro.message
        );
    }
}


function mostrarMensagem(texto) {

    const mensagem =
        document.getElementById("mensagem");

    mensagem.textContent = texto;

    setTimeout(function() {

        mensagem.textContent = "";

    }, 3000);
}


function atualizarContador() {

    const contador =
        document.getElementById("contador");

    const quantidade =
        tarefas.length;

    if (quantidade === 1) {

        contador.textContent =
            "1 tarefa";

    } else {

        contador.textContent =
            quantidade + " tarefas";
    }
}


/* Lista inicialmente vazia */

listarTarefasTela();

