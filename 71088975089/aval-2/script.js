// ==========================================
// GERENCIADOR DE TAREFAS
// ==========================================


// ==========================================
// ARRAY PRINCIPAL
// ==========================================

// Array responsável por armazenar todas as tarefas
const tarefas = [];


// ==========================================
// GERADOR DE CÓDIGO
// ==========================================

// O código começa em zero.
// A cada nova tarefa, ele será incrementado.
let geradorCodigo = 0;


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const formTarefa = document.getElementById("formTarefa");

const tituloInput = document.getElementById("titulo");

const prioridadeInput =
    document.getElementById("prioridade");

const listaTarefas =
    document.getElementById("listaTarefas");

const mensagem =
    document.getElementById("mensagem");

const filtro =
    document.getElementById("filtro");

const totalTarefas =
    document.getElementById("totalTarefas");

const tarefasPendentes =
    document.getElementById("tarefasPendentes");

const tarefasConcluidas =
    document.getElementById("tarefasConcluidas");

const contador =
    document.getElementById("contador");


// ==========================================
// 1. VALIDAR DADOS DA TAREFA
// ==========================================

function validarDadosDaTarefa(titulo, prioridade) {

    // Remove espaços do início e do final
    titulo = titulo.trim();


    // --------------------------------------
    // VALIDAÇÃO DO TÍTULO
    // --------------------------------------

    if (titulo.length < 5) {

        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
        );

    }


    // --------------------------------------
    // CONVERTE PRIORIDADE PARA NÚMERO
    // --------------------------------------

    prioridade = Number(prioridade);


    // --------------------------------------
    // VALIDAÇÃO DA PRIORIDADE
    // --------------------------------------

    if (prioridade < 1 || prioridade > 3) {

        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );

    }


    return true;
}


// ==========================================
// 2. CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa(titulo, prioridade) {

    // Primeiro valida os dados
    validarDadosDaTarefa(
        titulo,
        prioridade
    );


    // Gera um novo código
    geradorCodigo++;


    // Cria o objeto da tarefa
    const novaTarefa = {

        codigo: geradorCodigo,

        titulo: titulo.trim(),

        prioridade: Number(prioridade),

        // true = pendente
        // false = concluída
        status: true

    };


    // Adiciona a tarefa ao array
    tarefas.push(novaTarefa);


    // Retorna a tarefa criada
    return novaTarefa;
}


// ==========================================
// 3. LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    return tarefas;

}


// ==========================================
// 4. BUSCAR TAREFA
// ==========================================

function buscarTarefa(codigo) {

    // Procura a tarefa pelo código
    const tarefa = tarefas.find(

        tarefa =>
            tarefa.codigo === Number(codigo)

    );


    // Se não encontrar a tarefa
    if (!tarefa) {

        throw new Error(
            `A tarefa com código ${codigo} não foi encontrada.`
        );

    }


    // Retorna a tarefa encontrada
    return tarefa;
}


// ==========================================
// 5. CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    // Procura a tarefa
    const tarefa = buscarTarefa(codigo);


    // Verifica se já está concluída
    if (!tarefa.status) {

        throw new Error(
            "Esta tarefa já foi concluída."
        );

    }


    // Altera o status
    tarefa.status = false;


    return tarefa;
}


// ==========================================
// 6. ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(
    codigo,
    novaPrioridade
) {

    // Procura a tarefa
    const tarefa = buscarTarefa(codigo);


    // Valida a nova prioridade
    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );


    // Atualiza a prioridade
    tarefa.prioridade =
        Number(novaPrioridade);


    return tarefa;
}


// ==========================================
// 7. EXCLUIR TAREFA
// ==========================================

function excluirTarefa(codigo) {

    // Procura a tarefa
    const tarefa = buscarTarefa(codigo);


    // Confirma exclusão
    const confirmou = confirm(
        `Deseja excluir a tarefa "${tarefa.titulo}"?`
    );


    if (!confirmou) {

        return;

    }


    // Localiza o índice da tarefa
    const indice = tarefas.findIndex(

        tarefa =>
            tarefa.codigo === Number(codigo)

    );


    // Remove uma tarefa
    tarefas.splice(indice, 1);


    mostrarMensagem(
        "Tarefa excluída com sucesso!",
        "sucesso"
    );


    // Atualiza a tela
    renderizarTarefas();
}


// ==========================================
// 8. MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(
    texto,
    tipo
) {

    mensagem.textContent = texto;

    mensagem.className =
        `mensagem ${tipo}`;


    // Remove a mensagem depois de 3 segundos
    setTimeout(() => {

        mensagem.textContent = "";

        mensagem.className = "mensagem";

    }, 3000);
}


// ==========================================
// 9. NOME DA PRIORIDADE
// ==========================================

function obterNomePrioridade(
    prioridade
) {

    if (prioridade === 1) {

        return "Alta";

    }


    if (prioridade === 2) {

        return "Média";

    }


    return "Baixa";
}


// ==========================================
// 10. RENDERIZAR TAREFAS
// ==========================================

function renderizarTarefas() {

    // Pega o filtro selecionado
    const filtroSelecionado =
        filtro.value;


    // Começa com todas as tarefas
    let tarefasExibidas =
        listarTarefas();


    // --------------------------------------
    // FILTRO DE PENDENTES
    // --------------------------------------

    if (
        filtroSelecionado ===
        "pendentes"
    ) {

        tarefasExibidas =
            tarefas.filter(

                tarefa =>
                    tarefa.status === true

            );

    }


    // --------------------------------------
    // FILTRO DE CONCLUÍDAS
    // --------------------------------------

    else if (
        filtroSelecionado ===
        "concluidas"
    ) {

        tarefasExibidas =
            tarefas.filter(

                tarefa =>
                    tarefa.status === false

            );

    }


    // --------------------------------------
    // NENHUMA TAREFA
    // --------------------------------------

    if (
        tarefasExibidas.length === 0
    ) {

        listaTarefas.innerHTML = `

            <div class="vazio">

                <div class="icone-vazio">
                    ✓
                </div>

                <h3>
                    Nenhuma tarefa encontrada
                </h3>

                <p>
                    Não existem tarefas para exibir.
                </p>

            </div>

        `;


        atualizarEstatisticas();

        return;
    }


    // Limpa a lista
    listaTarefas.innerHTML = "";


    // --------------------------------------
    // PERCORRE AS TAREFAS
    // --------------------------------------

    tarefasExibidas.forEach(
        tarefa => {

            const elemento =
                document.createElement(
                    "div"
                );


            // Adiciona classe concluida
            if (!tarefa.status) {

                elemento.className =
                    "tarefa concluida";

            } else {

                elemento.className =
                    "tarefa";

            }


            // --------------------------------------
            // CONTEÚDO DA TAREFA
            // --------------------------------------

            elemento.innerHTML = `

                <div class="tarefa-info">

                    <div class="tarefa-codigo">

                        Código:
                        #${tarefa.codigo}

                    </div>


                    <div class="tarefa-titulo">

                        ${tarefa.titulo}

                    </div>


                    <div class="tarefa-detalhes">

                        <span
                            class="
                                prioridade
                                prioridade-${tarefa.prioridade}
                            "
                        >

                            Prioridade
                            ${tarefa.prioridade}

                            -
                            ${obterNomePrioridade(
                                tarefa.prioridade
                            )}

                        </span>


                        <span
                            class="
                                status
                                ${
                                    tarefa.status
                                    ? "status-pendente"
                                    : "status-concluida"
                                }
                            "
                        >

                            ${
                                tarefa.status
                                ? "Pendente"
                                : "Concluída"
                            }

                        </span>

                    </div>

                </div>


                <div class="tarefa-acoes">


                    ${
                        tarefa.status

                        ? `

                            <button
                                class="btn-success"
                                onclick="
                                    concluirTarefaTela(
                                        ${tarefa.codigo}
                                    )
                                "
                            >

                                ✓ Concluir

                            </button>

                        `

                        : ""

                    }


                    <button
                        class="btn-warning"
                        onclick="
                            alterarPrioridadeTela(
                                ${tarefa.codigo}
                            )
                        "
                    >

                        ↕ Prioridade

                    </button>


                    <button
                        class="btn-danger"
                        onclick="
                            excluirTarefa(
                                ${tarefa.codigo}
                            )
                        "
                    >

                        🗑 Excluir

                    </button>


                </div>

            `;


            // Adiciona a tarefa na tela
            listaTarefas.appendChild(
                elemento
            );

        }
    );


    // Atualiza estatísticas
    atualizarEstatisticas();
}


// ==========================================
// 11. CONCLUIR TAREFA PELA INTERFACE
// ==========================================

function concluirTarefaTela(
    codigo
) {

    try {

        // Conclui a tarefa
        concluirTarefa(codigo);


        // Mensagem
        mostrarMensagem(
            "Tarefa concluída com sucesso!",
            "sucesso"
        );


        // Atualiza a tela
        renderizarTarefas();

    }

    catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );

    }
}


// ==========================================
// 12. ALTERAR PRIORIDADE PELA INTERFACE
// ==========================================

function alterarPrioridadeTela(
    codigo
) {

    try {

        // Busca a tarefa
        const tarefa =
            buscarTarefa(codigo);


        // Pergunta a nova prioridade
        const novaPrioridade =
            prompt(

                `Nova prioridade para "${tarefa.titulo}"\n\n` +

                "1 - Alta\n" +

                "2 - Média\n" +

                "3 - Baixa",

                tarefa.prioridade

            );


        // Se o usuário cancelar
        if (
            novaPrioridade === null
        ) {

            return;

        }


        // Altera a prioridade
        alterarPrioridade(
            codigo,
            novaPrioridade
        );


        // Mostra mensagem
        mostrarMensagem(
            "Prioridade alterada com sucesso!",
            "sucesso"
        );


        // Atualiza tela
        renderizarTarefas();

    }

    catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );

    }
}


// ==========================================
// 13. ATUALIZAR ESTATÍSTICAS
// ==========================================

function atualizarEstatisticas() {

    // Total de tarefas
    const total =
        tarefas.length;


    // Tarefas concluídas
    const concluidas =
        tarefas.filter(

            tarefa =>
                tarefa.status === false

        ).length;


    // Tarefas pendentes
    const pendentes =
        tarefas.filter(

            tarefa =>
                tarefa.status === true

        ).length;


    // Atualiza os números
    totalTarefas.textContent =
        total;

    tarefasConcluidas.textContent =
        concluidas;

    tarefasPendentes.textContent =
        pendentes;


    // --------------------------------------
    // TEXTO DO CONTADOR
    // --------------------------------------

    if (total === 0) {

        contador.textContent =
            "0 tarefas cadastradas";

    }

    else if (total === 1) {

        contador.textContent =
            "1 tarefa cadastrada";

    }

    else {

        contador.textContent =
            `${total} tarefas cadastradas`;

    }
}


// ==========================================
// 14. CADASTRO PELO FORMULÁRIO
// ==========================================

formTarefa.addEventListener(
    "submit",
    function(event) {

        // Impede o recarregamento da página
        event.preventDefault();


        try {

            // Pega o título
            const titulo =
                tituloInput.value;


            // Pega a prioridade
            const prioridade =
                prioridadeInput.value;


            // Cadastra a tarefa
            cadastrarTarefa(
                titulo,
                prioridade
            );


            // Mostra mensagem
            mostrarMensagem(
                "Tarefa cadastrada com sucesso!",
                "sucesso"
            );


            // Limpa os campos
            formTarefa.reset();


            // Atualiza a lista
            renderizarTarefas();

        }

        catch (erro) {

            // Mostra o erro
            mostrarMensagem(
                erro.message,
                "erro"
            );

        }

    }
);


// ==========================================
// 15. FILTRO
// ==========================================

filtro.addEventListener(
    "change",
    function() {

        renderizarTarefas();

    }
);


// ==========================================
// 16. INICIALIZAÇÃO
// ==========================================

// Renderiza a tela quando o sistema inicia
renderizarTarefas();