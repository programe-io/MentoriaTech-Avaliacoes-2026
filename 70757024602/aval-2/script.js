// ==========================================
// ARRAY DE TAREFAS
// ==========================================

let tarefas = [];


// ==========================================
// GERADOR DE CÓDIGO
// ==========================================

let proximoCodigo = 0;


// ==========================================
// VALIDAR DADOS DA TAREFA
// ==========================================

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


// ==========================================
// CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);


    proximoCodigo++;


    const novaTarefa = {

        codigo: proximoCodigo,

        titulo: titulo,

        prioridade: prioridade,

        status: true
    };


    tarefas.push(novaTarefa);
}


// ==========================================
// LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    return tarefas;
}


// ==========================================
// BUSCAR TAREFA
// ==========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigo;

    });


    if (!tarefa) {

        throw new Error(
            "Tarefa não encontrada."
        );
    }


    return tarefa;
}


// ==========================================
// CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);


    if (!tarefa.status) {

        throw new Error(
            "Essa tarefa já está concluída."
        );
    }


    tarefa.status = false;
}


// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);


    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );


    tarefa.prioridade = novaPrioridade;
}


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const formTarefa =
    document.getElementById("formTarefa");

const formPrioridade =
    document.getElementById("formPrioridade");

const listaTarefas =
    document.getElementById("listaTarefas");

const mensagem =
    document.getElementById("mensagem");

const contador =
    document.getElementById("contador");


// ==========================================
// EXIBIR MENSAGEM
// ==========================================

function exibirMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = tipo;
}


// ==========================================
// DEFINIR TEXTO DA PRIORIDADE
// ==========================================

function textoPrioridade(prioridade) {

    if (prioridade === 1) {
        return "Alta";
    }

    if (prioridade === 2) {
        return "Média";
    }

    return "Baixa";
}


// ==========================================
// DEFINIR CLASSE DA PRIORIDADE
// ==========================================

function classePrioridade(prioridade) {

    if (prioridade === 1) {
        return "prioridade-alta";
    }

    if (prioridade === 2) {
        return "prioridade-media";
    }

    return "prioridade-baixa";
}


// ==========================================
// ATUALIZAR CONTADOR
// ==========================================

function atualizarContador() {

    const quantidade = tarefas.length;


    if (quantidade === 1) {

        contador.textContent =
            "1 tarefa";

    } else {

        contador.textContent =
            `${quantidade} tarefas`;
    }
}


// ==========================================
// EXIBIR TAREFAS NA TABELA
// ==========================================

function atualizarLista() {

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


    tarefasCadastradas.forEach(function(tarefa) {

        const linha =
            document.createElement("tr");


        if (!tarefa.status) {

            linha.classList.add(
                "tarefa-concluida"
            );
        }


        const statusTexto =
            tarefa.status
                ? "Pendente"
                : "Concluída";


        const statusClasse =
            tarefa.status
                ? "status-pendente"
                : "status-concluida";


        const botaoTexto =
            tarefa.status
                ? "Concluir"
                : "Concluída";


        const botaoClasse =
            tarefa.status
                ? "btn-concluir"
                : "btn-concluir btn-desabilitado";


        const botaoDesabilitado =
            tarefa.status
                ? ""
                : "disabled";


        linha.innerHTML = `

            <td>
                ${tarefa.codigo}
            </td>

            <td>
                ${tarefa.titulo}
            </td>

            <td>

                <span class="prioridade ${classePrioridade(tarefa.prioridade)}">

                    ${tarefa.prioridade} -
                    ${textoPrioridade(tarefa.prioridade)}

                </span>

            </td>

            <td>

                <span class="status ${statusClasse}">

                    ${statusTexto}

                </span>

            </td>

            <td>

                <button
                    class="${botaoClasse}"
                    onclick="finalizarTarefa(${tarefa.codigo})"
                    ${botaoDesabilitado}
                >

                    ${botaoTexto}

                </button>

            </td>
        `;


        listaTarefas.appendChild(linha);

    });


    atualizarContador();
}


// ==========================================
// FINALIZAR TAREFA PELA INTERFACE
// ==========================================

function finalizarTarefa(codigo) {

    try {

        concluirTarefa(codigo);


        exibirMensagem(
            "Tarefa concluída com sucesso!",
            "mensagem-sucesso"
        );


        atualizarLista();

    } catch (erro) {

        exibirMensagem(
            erro.message,
            "mensagem-erro"
        );
    }
}


// ==========================================
// FORMULÁRIO DE CADASTRO
// ==========================================

formTarefa.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        try {

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


            cadastrarTarefa(
                titulo,
                prioridade
            );


            exibirMensagem(
                "Tarefa cadastrada com sucesso!",
                "mensagem-sucesso"
            );


            formTarefa.reset();


            atualizarLista();


        } catch (erro) {

            exibirMensagem(
                erro.message,
                "mensagem-erro"
            );
        }

    }
);


// ==========================================
// FORMULÁRIO DE ALTERAÇÃO DE PRIORIDADE
// ==========================================

formPrioridade.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        try {

            const codigo =
                Number(
                    document
                        .getElementById("codigoPrioridade")
                        .value
                );


            const novaPrioridade =
                Number(
                    document
                        .getElementById("novaPrioridade")
                        .value
                );


            alterarPrioridade(
                codigo,
                novaPrioridade
            );


            exibirMensagem(
                "Prioridade alterada com sucesso!",
                "mensagem-sucesso"
            );


            formPrioridade.reset();


            atualizarLista();


        } catch (erro) {

            exibirMensagem(
                erro.message,
                "mensagem-erro"
            );
        }

    }
);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarLista();
