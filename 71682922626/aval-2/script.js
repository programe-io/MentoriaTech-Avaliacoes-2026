// =============================================
// GERENCIADOR DE TAREFAS
// =============================================


// Lista principal
let tarefas = [];


// Código da próxima tarefa
let proximoCodigo = 1;


// =============================================
// PEGAR ELEMENTOS DO HTML
// =============================================

const form = document.getElementById("formTarefa");

const tituloInput = document.getElementById("titulo");

const prioridadeInput = document.getElementById("prioridade");

const listaTarefas = document.getElementById("listaTarefas");

const mensagem = document.getElementById("mensagem");

const buscarInput = document.getElementById("buscar");

const filtroStatus = document.getElementById("filtroStatus");

const filtroPrioridade = document.getElementById("filtroPrioridade");

const btnLimparTudo = document.getElementById("btnLimparTudo");

const totalTarefas = document.getElementById("totalTarefas");

const totalPendentes = document.getElementById("totalPendentes");

const totalConcluidas = document.getElementById("totalConcluidas");


// =============================================
// CARREGAR DADOS SALVOS
// =============================================

function carregarTarefas() {

    const dados = localStorage.getItem("gerenciadorTarefas");

    if (dados) {

        tarefas = JSON.parse(dados);

        if (tarefas.length > 0) {

            proximoCodigo =
                Math.max(...tarefas.map(tarefa => tarefa.codigo)) + 1;

        }

    }

}


// =============================================
// SALVAR TAREFAS
// =============================================

function salvarTarefas() {

    localStorage.setItem(
        "gerenciadorTarefas",
        JSON.stringify(tarefas)
    );

}


// =============================================
// MOSTRAR MENSAGEM
// =============================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = tipo;


    setTimeout(function () {

        mensagem.textContent = "";

        mensagem.className = "";

    }, 3000);

}


// =============================================
// CADASTRAR TAREFA
// =============================================

form.addEventListener("submit", function (event) {

    // Impede a página de recarregar
    event.preventDefault();


    // Pega os valores
    const titulo = tituloInput.value.trim();

    const prioridade = Number(
        prioridadeInput.value
    );


    // =========================================
    // VALIDAR TÍTULO
    // =========================================

    if (titulo.length < 5) {

        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );

        tituloInput.focus();

        return;
    }


    // =========================================
    // VALIDAR PRIORIDADE
    // =========================================

    if (
        prioridade !== 1 &&
        prioridade !== 2 &&
        prioridade !== 3
    ) {

        mostrarMensagem(
            "Selecione uma prioridade válida.",
            "erro"
        );

        return;
    }


    // =========================================
    // CRIAR OBJETO DA TAREFA
    // =========================================

    const novaTarefa = {

        codigo: proximoCodigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    // =========================================
    // ADICIONAR NA LISTA
    // =========================================

    tarefas.push(novaTarefa);


    // Próximo código
    proximoCodigo++;


    // Salvar
    salvarTarefas();


    // Atualizar tela
    mostrarTarefas();


    // Limpar formulário
    form.reset();


    // Voltar prioridade para Alta
    prioridadeInput.value = "1";


    // Mensagem de sucesso
    mostrarMensagem(
        "✓ Tarefa cadastrada com sucesso!",
        "sucesso"
    );

});


// =============================================
// MOSTRAR TAREFAS
// =============================================

function mostrarTarefas() {

    listaTarefas.innerHTML = "";


    // Texto da busca
    const busca = buscarInput.value
        .toLowerCase()
        .trim();


    // Status selecionado
    const statusSelecionado =
        filtroStatus.value;


    // Prioridade selecionada
    const prioridadeSelecionada =
        filtroPrioridade.value;


    // =========================================
    // FILTRAR TAREFAS
    // =========================================

    const tarefasFiltradas = tarefas.filter(
        function (tarefa) {


            // Busca pelo título
            const correspondeBusca =
                tarefa.titulo
                    .toLowerCase()
                    .includes(busca);


            // Filtro de status
            let correspondeStatus = true;


            if (statusSelecionado === "pendente") {

                correspondeStatus =
                    tarefa.concluida === false;

            }


            if (statusSelecionado === "concluida") {

                correspondeStatus =
                    tarefa.concluida === true;

            }


            // Filtro de prioridade
            let correspondePrioridade = true;


            if (prioridadeSelecionada !== "todas") {

                correspondePrioridade =
                    tarefa.prioridade ===
                    Number(prioridadeSelecionada);

            }


            return (
                correspondeBusca &&
                correspondeStatus &&
                correspondePrioridade
            );

        }
    );


    // =========================================
    // NENHUMA TAREFA
    // =========================================

    if (tarefasFiltradas.length === 0) {

        listaTarefas.innerHTML = `

            <div class="vazio">

                <strong>
                    Nenhuma tarefa encontrada
                </strong>

                <span>
                    Cadastre uma tarefa ou altere os filtros.
                </span>

            </div>

        `;

    }


    // =========================================
    // MOSTRAR CADA TAREFA
    // =========================================

    tarefasFiltradas.forEach(
        function (tarefa) {

            const elemento =
                criarTarefaHTML(tarefa);

            listaTarefas.appendChild(elemento);

        }
    );


    atualizarEstatisticas();

}


// =============================================
// CRIAR HTML DA TAREFA
// =============================================

function criarTarefaHTML(tarefa) {

    const div = document.createElement("div");


    div.classList.add("tarefa");


    // Se estiver concluída
    if (tarefa.concluida) {

        div.classList.add("concluida");

    }


    // Nome da prioridade
    let nomePrioridade;


    if (tarefa.prioridade === 1) {

        nomePrioridade = "ALTA";

    } else if (tarefa.prioridade === 2) {

        nomePrioridade = "MÉDIA";

    } else {

        nomePrioridade = "BAIXA";

    }


    // Status
    const statusTexto =
        tarefa.concluida
            ? "✓ Concluída"
            : "○ Pendente";


    // HTML
    div.innerHTML = `

        <div class="info-tarefa">

            <div class="codigo">
                TAREFA #${tarefa.codigo}
            </div>

            <div class="titulo-tarefa">
                ${escaparHTML(tarefa.titulo)}
            </div>

            <div class="status">
                Status: ${statusTexto}
            </div>

        </div>


        <div class="prioridade prioridade-${tarefa.prioridade}">

            ${tarefa.prioridade}
            -
            ${nomePrioridade}

        </div>


        <div class="acoes">

            <button
                class="btn-concluir"
                type="button"
                data-acao="concluir"
                data-codigo="${tarefa.codigo}"
            >
                ${tarefa.concluida ? "Reabrir" : "Concluir"}
            </button>


            <button
                class="btn-prioridade"
                type="button"
                data-acao="prioridade"
                data-codigo="${tarefa.codigo}"
            >
                Prioridade
            </button>


            <button
                class="btn-excluir"
                type="button"
                data-acao="excluir"
                data-codigo="${tarefa.codigo}"
            >
                Excluir
            </button>

        </div>

    `;


    return div;

}


// =============================================
// EVITAR HTML INJETADO NO TÍTULO
// =============================================

function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


// =============================================
// CONCLUIR / REABRIR
// =============================================

function alternarConclusao(codigo) {

    const tarefa = tarefas.find(
        function (item) {

            return item.codigo === codigo;

        }
    );


    if (!tarefa) {

        return;

    }


    tarefa.concluida =
        !tarefa.concluida;


    salvarTarefas();

    mostrarTarefas();

}


// =============================================
// ALTERAR PRIORIDADE
// =============================================

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(
        function (item) {

            return item.codigo === codigo;

        }
    );


    if (!tarefa) {

        return;

    }


    const novaPrioridade =
        prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa",
            tarefa.prioridade
        );


    if (novaPrioridade === null) {

        return;

    }


    const valor =
        Number(novaPrioridade);


    if (
        valor !== 1 &&
        valor !== 2 &&
        valor !== 3
    ) {

        mostrarMensagem(
            "Digite somente 1, 2 ou 3.",
            "erro"
        );

        return;

    }


    tarefa.prioridade = valor;


    salvarTarefas();

    mostrarTarefas();


    mostrarMensagem(
        "✓ Prioridade alterada!",
        "sucesso"
    );

}


// =============================================
// EXCLUIR TAREFA
// =============================================

function excluirTarefa(codigo) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta tarefa?"
        );


    if (!confirmar) {

        return;

    }


    tarefas = tarefas.filter(
        function (tarefa) {

            return tarefa.codigo !== codigo;

        }
    );


    salvarTarefas();

    mostrarTarefas();


    mostrarMensagem(
        "Tarefa excluída.",
        "sucesso"
    );

}


// =============================================
// LIMPAR TODAS AS TAREFAS
// =============================================

btnLimparTudo.addEventListener(
    "click",
    function () {


        if (tarefas.length === 0) {

            mostrarMensagem(
                "Não existem tarefas para excluir.",
                "erro"
            );

            return;

        }


        const confirmar =
            confirm(
                "Tem certeza que deseja apagar TODAS as tarefas?"
            );


        if (!confirmar) {

            return;

        }


        tarefas = [];

        proximoCodigo = 1;


        salvarTarefas();

        mostrarTarefas();


        mostrarMensagem(
            "Todas as tarefas foram excluídas.",
            "sucesso"
        );

    }
);


// =============================================
// BOTÕES DAS TAREFAS
// =============================================

listaTarefas.addEventListener(
    "click",
    function (event) {


        const botao =
            event.target.closest("button");


        if (!botao) {

            return;

        }


        const codigo =
            Number(botao.dataset.codigo);


        const acao =
            botao.dataset.acao;


        if (acao === "concluir") {

            alternarConclusao(codigo);

        }


        if (acao === "prioridade") {

            alterarPrioridade(codigo);

        }


        if (acao === "excluir") {

            excluirTarefa(codigo);

        }

    }
);


// =============================================
// BUSCA
// =============================================

buscarInput.addEventListener(
    "input",
    mostrarTarefas
);


// =============================================
// FILTRO STATUS
// =============================================

filtroStatus.addEventListener(
    "change",
    mostrarTarefas
);


// =============================================
// FILTRO PRIORIDADE
// =============================================

filtroPrioridade.addEventListener(
    "change",
    mostrarTarefas
);


// =============================================
// ESTATÍSTICAS
// =============================================

function atualizarEstatisticas() {

    const total =
        tarefas.length;


    const concluidas =
        tarefas.filter(
            function (tarefa) {

                return tarefa.concluida;

            }
        ).length;


    const pendentes =
        total - concluidas;


    totalTarefas.textContent =
        total;


    totalPendentes.textContent =
        pendentes;


    totalConcluidas.textContent =
        concluidas;

}


// =============================================
// INICIAR SISTEMA
// =============================================

carregarTarefas();

mostrarTarefas();