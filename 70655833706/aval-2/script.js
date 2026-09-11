// ========================================
// ARRAY DE TAREFAS
// ========================================

let tarefas = [];


// ========================================
// GERADOR DE CÓDIGO
// ========================================

let proximoCodigo = 0;


// ========================================
// VALIDAÇÃO
// ========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.length < 5) {

        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
        );

    }


    if (prioridade < 1 || prioridade > 3) {

        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );

    }

}


// ========================================
// CADASTRAR TAREFA
// ========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(
        titulo,
        prioridade
    );


    proximoCodigo++;


    const novaTarefa = {

        codigo: proximoCodigo,

        titulo: titulo,

        prioridade: prioridade,

        status: true

    };


    tarefas.push(novaTarefa);

}


// ========================================
// LISTAR TAREFAS
// ========================================

function listarTarefas() {

    return tarefas;

}


// ========================================
// BUSCAR TAREFA
// ========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        (tarefa) =>
            tarefa.codigo === codigo
    );


    if (!tarefa) {

        throw new Error(
            "Tarefa não encontrada."
        );

    }


    return tarefa;

}


// ========================================
// CONCLUIR TAREFA
// ========================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);


    if (!tarefa.status) {

        throw new Error(
            "Essa tarefa já está concluída."
        );

    }


    tarefa.status = false;

}


// ========================================
// ALTERAR PRIORIDADE
// ========================================

function alterarPrioridade(
    codigo,
    novaPrioridade
) {

    const tarefa = buscarTarefa(codigo);


    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );


    tarefa.prioridade = novaPrioridade;

}


// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const formTarefa =
    document.getElementById(
        "formTarefa"
    );


const mensagem =
    document.getElementById(
        "mensagem"
    );


const listaTarefas =
    document.getElementById(
        "listaTarefas"
    );


const contador =
    document.getElementById(
        "contador"
    );


// ========================================
// EXIBIR MENSAGEM
// ========================================

function mostrarMensagem(
    texto,
    tipo
) {

    mensagem.textContent = texto;

    mensagem.className = tipo;


    setTimeout(function() {

        mensagem.textContent = "";

        mensagem.className = "";

    }, 3000);

}


// ========================================
// DESCRIÇÃO DA PRIORIDADE
// ========================================

function nomePrioridade(prioridade) {

    if (prioridade === 1) {
        return "Alta";
    }

    if (prioridade === 2) {
        return "Média";
    }

    return "Baixa";

}


// ========================================
// ATUALIZAR CONTADOR
// ========================================

function atualizarContador() {

    const quantidade =
        tarefas.length;


    if (quantidade === 1) {

        contador.textContent =
            "1 tarefa";

    } else {

        contador.textContent =
            `${quantidade} tarefas`;

    }

}


// ========================================
// RENDERIZAR TAREFAS
// ========================================

function renderizarTarefas() {

    listaTarefas.innerHTML = "";


    const tarefasCadastradas =
        listarTarefas();


    if (tarefasCadastradas.length === 0) {

        listaTarefas.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhuma tarefa cadastrada.
                </td>
            </tr>
        `;

        atualizarContador();

        return;

    }


    tarefasCadastradas.forEach(
        function(tarefa) {

            const linha =
                document.createElement("tr");


            const classeTitulo =
                tarefa.status
                    ? ""
                    : "tarefa-concluida";


            const statusTexto =
                tarefa.status
                    ? "Pendente"
                    : "Concluída";


            const statusClasse =
                tarefa.status
                    ? "status-pendente"
                    : "status-concluida";


            const botaoClasse =
                tarefa.status
                    ? "btn-concluir"
                    : "btn-concluida";


            const botaoTexto =
                tarefa.status
                    ? "Concluir"
                    : "Concluída";


            linha.innerHTML = `

                <td>
                    ${tarefa.codigo}
                </td>


                <td class="${classeTitulo}">
                    ${tarefa.titulo}
                </td>


                <td>

                    <span
                        class="prioridade prioridade-${tarefa.prioridade}"
                    >
                        ${tarefa.prioridade}
                        -
                        ${nomePrioridade(tarefa.prioridade)}
                    </span>

                </td>


                <td>

                    <span
                        class="status ${statusClasse}"
                    >
                        ${statusTexto}
                    </span>

                </td>


                <td>

                    <button
                        class="${botaoClasse}"
                        onclick="concluirTarefaTela(${tarefa.codigo})"
                        ${!tarefa.status ? "disabled" : ""}
                    >
                        ${botaoTexto}
                    </button>

                </td>

            `;


            listaTarefas.appendChild(linha);

        }
    );


    atualizarContador();

}


// ========================================
// CADASTRO PELA INTERFACE
// ========================================

formTarefa.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const titulo =
            document
                .getElementById("titulo")
                .value
                .trim();


        const prioridade =
            Number(
                document
                    .getElementById("prioridade")
                    .value
            );


        try {

            cadastrarTarefa(
                titulo,
                prioridade
            );


            mostrarMensagem(
                "Tarefa cadastrada com sucesso!",
                "sucesso"
            );


            formTarefa.reset();


            renderizarTarefas();


        } catch (erro) {

            mostrarMensagem(
                erro.message,
                "erro"
            );

        }

    }
);


// ========================================
// CONCLUIR PELA INTERFACE
// ========================================

function concluirTarefaTela(codigo) {

    try {

        concluirTarefa(codigo);


        mostrarMensagem(
            "Tarefa concluída com sucesso!",
            "sucesso"
        );


        renderizarTarefas();


    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );

    }

}


// ========================================
// ALTERAR PRIORIDADE PELA INTERFACE
// ========================================

function alterarPrioridadeTela() {

    const codigo =
        Number(
            document
                .getElementById(
                    "codigoPrioridade"
                )
                .value
        );


    const novaPrioridade =
        Number(
            document
                .getElementById(
                    "novaPrioridade"
                )
                .value
        );


    try {

        alterarPrioridade(
            codigo,
            novaPrioridade
        );


        mostrarMensagem(
            "Prioridade alterada com sucesso!",
            "sucesso"
        );


        document
            .getElementById(
                "codigoPrioridade"
            )
            .value = "";


        document
            .getElementById(
                "novaPrioridade"
            )
            .value = "";


        renderizarTarefas();


    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );

    }

}


// ========================================
// INICIALIZAÇÃO
// ========================================

renderizarTarefas();
