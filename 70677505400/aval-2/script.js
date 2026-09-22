// Array que armazenará todas as tarefas
const tarefas = [];

// Gerador de códigos
let geradorCodigo = 0;


// --------------------------------------------------
// VALIDAÇÃO
// --------------------------------------------------

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


// --------------------------------------------------
// BUSCAR TAREFA
// --------------------------------------------------

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error(
            "Tarefa não encontrada."
        );
    }

    return tarefa;
}


// --------------------------------------------------
// CADASTRAR TAREFA
// --------------------------------------------------

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    geradorCodigo++;

    const novaTarefa = {
        codigo: geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}


// --------------------------------------------------
// LISTAR TAREFAS
// --------------------------------------------------

function listarTarefas() {

    return tarefas;
}


// --------------------------------------------------
// CONCLUIR TAREFA
// --------------------------------------------------

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error(
            "Essa tarefa já está concluída."
        );
    }

    tarefa.status = false;

    return tarefa;
}


// --------------------------------------------------
// ALTERAR PRIORIDADE
// --------------------------------------------------

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    // Reutiliza a função de validação
    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}


// --------------------------------------------------
// ELEMENTOS DO HTML
// --------------------------------------------------

const formTarefa =
    document.getElementById("formTarefa");

const formPrioridade =
    document.getElementById("formPrioridade");

const tituloInput =
    document.getElementById("titulo");

const prioridadeInput =
    document.getElementById("prioridade");

const codigoAlterar =
    document.getElementById("codigoAlterar");

const novaPrioridade =
    document.getElementById("novaPrioridade");

const listaTarefas =
    document.getElementById("listaTarefas");

const mensagem =
    document.getElementById("mensagem");

const contador =
    document.getElementById("contador");


// --------------------------------------------------
// CADASTRO PELO FORMULÁRIO
// --------------------------------------------------

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    try {

        const titulo = tituloInput.value.trim();

        const prioridade =
            Number(prioridadeInput.value);

        cadastrarTarefa(
            titulo,
            prioridade
        );

        mensagem.textContent =
            "Tarefa cadastrada com sucesso!";

        mensagem.style.color = "#16a34a";

        formTarefa.reset();

        renderizarTarefas();

    } catch (erro) {

        mensagem.textContent =
            erro.message;

        mensagem.style.color = "#dc2626";
    }
});


// --------------------------------------------------
// ALTERAÇÃO DE PRIORIDADE
// --------------------------------------------------

formPrioridade.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        try {

            const codigo =
                Number(codigoAlterar.value);

            const prioridade =
                Number(novaPrioridade.value);

            alterarPrioridade(
                codigo,
                prioridade
            );

            mensagem.textContent =
                "Prioridade alterada com sucesso!";

            mensagem.style.color =
                "#16a34a";

            formPrioridade.reset();

            renderizarTarefas();

        } catch (erro) {

            mensagem.textContent =
                erro.message;

            mensagem.style.color =
                "#dc2626";
        }
    }
);


// --------------------------------------------------
// RENDERIZAR TAREFAS NA TELA
// --------------------------------------------------

function renderizarTarefas() {

    listaTarefas.innerHTML = "";

    const lista = listarTarefas();

    contador.textContent =
        `${lista.length} ${
            lista.length === 1
                ? "tarefa"
                : "tarefas"
        }`;


    if (lista.length === 0) {

        listaTarefas.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }


    lista.forEach(function(tarefa) {

        const elemento = document.createElement("div");

        elemento.classList.add("tarefa");


        const textoPrioridade =
            obterNomePrioridade(tarefa.prioridade);


        elemento.innerHTML = `

            <div class="informacoes">

                <span class="codigo">
                    Código: ${tarefa.codigo}
                </span>

                <h3>
                    ${tarefa.titulo}
                </h3>

                <p>
                    <span class="prioridade prioridade-${tarefa.prioridade}">
                        Prioridade ${tarefa.prioridade} - ${textoPrioridade}
                    </span>
                </p>

                <p class="status ${
                    tarefa.status
                        ? "status-andamento"
                        : "status-concluida"
                }">

                    ${
                        tarefa.status
                            ? "Em andamento"
                            : "Concluída"
                    }

                </p>

            </div>

            <button
                class="btn-concluir"
                onclick="finalizarTarefa(${tarefa.codigo})"
                ${!tarefa.status ? "disabled" : ""}
            >
                ${
                    tarefa.status
                        ? "Concluir"
                        : "Concluída"
                }
            </button>

        `;


        listaTarefas.appendChild(elemento);
    });
}


// --------------------------------------------------
// NOME DA PRIORIDADE
// --------------------------------------------------

function obterNomePrioridade(prioridade) {

    if (prioridade === 1) {
        return "Alta";
    }

    if (prioridade === 2) {
        return "Média";
    }

    return "Baixa";
}


// --------------------------------------------------
// FINALIZAR TAREFA
// --------------------------------------------------

function finalizarTarefa(codigo) {

    try {

        concluirTarefa(codigo);

        mensagem.textContent =
            "Tarefa concluída com sucesso!";

        mensagem.style.color =
            "#16a34a";

        renderizarTarefas();

    } catch (erro) {

        mensagem.textContent =
            erro.message;

        mensagem.style.color =
            "#dc2626";
    }
}


// --------------------------------------------------
// PRIMEIRA EXIBIÇÃO
// --------------------------------------------------

renderizarTarefas();
