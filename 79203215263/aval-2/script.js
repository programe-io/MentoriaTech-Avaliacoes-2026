use strict";

/* =========================================
   1. DADOS DO SISTEMA
========================================= */

// Array central que armazena todas as tarefas.
const tarefas = [];

// Gerador automático e independente de códigos.
let proximoCodigo = 0;

/* =========================================
   2. ELEMENTOS HTML
========================================= */

const formTarefa = document.getElementById("form-tarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const filtroStatus = document.getElementById("filtroStatus");

const listaTarefas = document.getElementById("lista-tarefas");
const mensagem = document.getElementById("mensagem");

const totalTarefas = document.getElementById("totalTarefas");
const tarefasPendentes = document.getElementById("tarefasPendentes");
const tarefasConcluidas = document.getElementById("tarefasConcluidas");
const contadorLista = document.getElementById("contadorLista");

/* =========================================
   3. VALIDAÇÃO DOS DADOS
========================================= */

/**
 * Valida o título e a prioridade da tarefa.
 * Lança um erro quando os dados são inválidos.
 */
function validarDadosDaTarefa(titulo, prioridade) {
    if (
        typeof titulo !== "string" ||
        titulo.trim().length < 5
    ) {
        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
        );
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error(
            "A prioridade deve ser um número inteiro entre 1 e 3."
        );
    }
}

/* =========================================
   4. CADASTRO DE TAREFAS
========================================= */

/**
 * Cria uma tarefa e adiciona o objeto ao array.
 * O código e o status são definidos pelo sistema.
 */
function cadastrarTarefa(titulo, prioridade) {
    const tituloValidado = titulo.trim();

    validarDadosDaTarefa(tituloValidado, prioridade);

    const novaTarefa = {
        codigo: ++proximoCodigo,
        titulo: tituloValidado,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}

/* =========================================
   5. LISTAGEM DE TAREFAS
========================================= */

/**
 * Retorna todas as tarefas cadastradas.
 */
function listarTarefas() {
    return tarefas;
}

/* =========================================
   6. BUSCA POR CÓDIGO
========================================= */

/**
 * Procura uma tarefa pelo código usando find().
 */
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        (item) => item.codigo === codigo
    );

    if (!tarefa) {
        throw new Error(
            `Nenhuma tarefa foi encontrada com o código ${codigo}.`
        );
    }

    return tarefa;
}

/* =========================================
   7. CONCLUSÃO DE TAREFAS
========================================= */

/**
 * Marca uma tarefa como concluída.
 * true = em andamento.
 * false = concluída.
 */
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error(
            "Esta tarefa já foi concluída."
        );
    }

    tarefa.status = false;

    return tarefa;
}

/* =========================================
   8. ALTERAÇÃO DE PRIORIDADE
========================================= */

/**
 * Altera a prioridade de uma tarefa existente.
 */
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    // Reutiliza a validação dos dados.
    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}

/* =========================================
   9. MENSAGENS DA INTERFACE
========================================= */

/**
 * Exibe mensagens de sucesso ou erro.
 */
function exibirMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    mensagem.hidden = false;
}

/* =========================================
   10. CRIAÇÃO DE ELEMENTOS HTML
========================================= */

/**
 * Cria um elemento HTML com texto seguro.
 */
function criarElemento(tag, classe, texto = "") {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    elemento.textContent = texto;

    return elemento;
}

/**
 * Cria uma opção para um select.
 */
function criarOpcao(valor, texto) {
    const opcao = document.createElement("option");

    opcao.value = String(valor);
    opcao.textContent = texto;

    return opcao;
}

/* =========================================
   11. CARTÃO DE CADA TAREFA
========================================= */

/**
 * Cria a representação visual de uma tarefa.
 */
function criarCartaoTarefa(tarefa) {
    const cartao = criarElemento(
        "article",
        tarefa.status
            ? "tarefa"
            : "tarefa tarefa-concluida"
    );

    // Cabeçalho do cartão.
    const topo = criarElemento("div", "tarefa-topo");

    const identificacao = criarElemento(
        "div",
        "tarefa-identificacao"
    );

    const codigo = criarElemento(
        "span",
        "tarefa-codigo",
        `Código: ${tarefa.codigo}`
    );

    const titulo = criarElemento(
        "h3",
        "tarefa-titulo",
        tarefa.titulo
    );

    identificacao.append(codigo, titulo);

    // Etiqueta da prioridade.
    const nomesPrioridade = ["Alta", "Média", "Baixa"];

    const etiquetaPrioridade = criarElemento(
        "span",
        `etiqueta prioridade-${tarefa.prioridade}`,
        `Prioridade ${tarefa.prioridade} - ${
            nomesPrioridade[tarefa.prioridade - 1]
        }`
    );

    topo.append(identificacao, etiquetaPrioridade);

    // Detalhes e ações.
    const detalhes = criarElemento(
        "div",
        "tarefa-detalhes"
    );

    const etiquetaStatus = criarElemento(
        "span",
        tarefa.status
            ? "etiqueta status-pendente"
            : "etiqueta status-concluida",
        tarefa.status
            ? "Em andamento"
            : "Concluída"
    );

    detalhes.appendChild(etiquetaStatus);

    // Campo para selecionar uma nova prioridade.
    const controle = criarElemento(
        "div",
        "controle-prioridade"
    );

    const label = document.createElement("label");
    const idSelect = `prioridade-${tarefa.codigo}`;

    label.htmlFor = idSelect;
    label.textContent = "Nova prioridade:";

    const select = document.createElement("select");
    select.id = idSelect;

    select.setAttribute(
        "aria-label",
        `Nova prioridade da tarefa ${tarefa.codigo}`
    );

    nomesPrioridade.forEach((nome, indice) => {
        const prioridade = indice + 1;

        const opcao = criarOpcao(
            prioridade,
            `${prioridade} - ${nome}`
        );

        if (prioridade === tarefa.prioridade) {
            opcao.selected = true;
        }

        select.appendChild(opcao);
    });

    const botaoAlterar = criarElemento(
        "button",
        "botao botao-secundario",
        "Alterar"
    );

    botaoAlterar.type = "button";
    botaoAlterar.dataset.acao = "alterar";
    botaoAlterar.dataset.codigo = String(tarefa.codigo);

    controle.append(label, select, botaoAlterar);
    detalhes.appendChild(controle);

    // Botão de conclusão.
    const botaoConcluir = criarElemento(
        "button",
        "botao botao-concluir",
        tarefa.status
            ? "Concluir tarefa"
            : "Tarefa concluída"
    );

    botaoConcluir.type = "button";
    botaoConcluir.dataset.acao = "concluir";
    botaoConcluir.dataset.codigo = String(tarefa.codigo);
    botaoConcluir.disabled = !tarefa.status;

    detalhes.appendChild(botaoConcluir);

    cartao.append(topo, detalhes);

    return cartao;
}

/* =========================================
   12. ATUALIZAÇÃO DO RESUMO
========================================= */

/**
 * Atualiza os indicadores de tarefas.
 */
function atualizarResumo() {
    const concluidas = tarefas.filter(
        (tarefa) => tarefa.status === false
    ).length;

    const pendentes = tarefas.length - concluidas;

    totalTarefas.textContent = tarefas.length;
    tarefasPendentes.textContent = pendentes;
    tarefasConcluidas.textContent = concluidas;
}

/* =========================================
   13. RENDERIZAÇÃO DA LISTA
========================================= */

/**
 * Atualiza a lista de acordo com o filtro selecionado.
 */
function renderizarTarefas() {
    const todasAsTarefas = listarTarefas();
    const filtro = filtroStatus.value;

    let tarefasExibidas = todasAsTarefas;

    if (filtro === "pendentes") {
        tarefasExibidas = todasAsTarefas.filter(
            (tarefa) => tarefa.status === true
        );
    } else if (filtro === "concluidas") {
        tarefasExibidas = todasAsTarefas.filter(
            (tarefa) => tarefa.status === false
        );
    }

    // Ordena por prioridade e, em seguida, por código.
    tarefasExibidas = [...tarefasExibidas].sort(
        (a, b) =>
            a.prioridade - b.prioridade ||
            a.codigo - b.codigo
    );

    listaTarefas.replaceChildren();

    const quantidade = tarefasExibidas.length;

    contadorLista.textContent =
        `${quantidade} ${
            quantidade === 1 ? "tarefa" : "tarefas"
        }`;

    if (quantidade === 0) {
        const vazio = criarElemento(
            "div",
            "estado-vazio"
        );

        const tituloVazio = criarElemento(
            "strong",
            "",
            todasAsTarefas.length === 0
                ? "Nenhuma tarefa cadastrada"
                : "Nenhuma tarefa encontrada"
        );

        const descricao = criarElemento(
            "p",
            "",
            todasAsTarefas.length === 0
                ? "Cadastre sua primeira tarefa usando o formulário acima."
                : "Não existem tarefas para o filtro selecionado."
        );

        vazio.append(tituloVazio, descricao);
        listaTarefas.appendChild(vazio);
    } else {
        tarefasExibidas.forEach((tarefa) => {
            const cartao = criarCartaoTarefa(tarefa);

            listaTarefas.appendChild(cartao);
        });
    }

    atualizarResumo();
}

/* =========================================
   14. EVENTO DE CADASTRO
========================================= */

formTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();

    try {
        const titulo = campoTitulo.value;
        const prioridade = Number(campoPrioridade.value);

        const tarefa = cadastrarTarefa(
            titulo,
            prioridade
        );

        formTarefa.reset();

        // Restaura a prioridade padrão.
        campoPrioridade.value = "1";

        renderizarTarefas();

        exibirMensagem(
            `Tarefa "${tarefa.titulo}" cadastrada com sucesso!`
        );

        campoTitulo.focus();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

/* =========================================
   15. EVENTOS DOS BOTÕES
========================================= */

// Delegação de eventos para os cartões da lista.
listaTarefas.addEventListener("click", (evento) => {
    const botao = evento.target.closest(
        "button[data-acao]"
    );

    if (!botao || !listaTarefas.contains(botao)) {
        return;
    }

    const codigo = Number(botao.dataset.codigo);

    try {
        if (botao.dataset.acao === "concluir") {
            const tarefa = concluirTarefa(codigo);

            renderizarTarefas();

            exibirMensagem(
                `Tarefa "${tarefa.titulo}" concluída com sucesso!`
            );
        } else if (botao.dataset.acao === "alterar") {
            const cartao = botao.closest(".tarefa");

            const select = cartao.querySelector(
                ".controle-prioridade select"
            );

            const novaPrioridade = Number(select.value);

            const tarefa = alterarPrioridade(
                codigo,
                novaPrioridade
            );

            renderizarTarefas();

            exibirMensagem(
                `Prioridade da tarefa "${tarefa.titulo}" alterada para ${novaPrioridade}.`
            );
        }
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

/* =========================================
   16. FILTRO DE TAREFAS
========================================= */

filtroStatus.addEventListener("change", () => {
    renderizarTarefas();
});

/* =========================================
   17. INICIALIZAÇÃO
========================================= */

// Renderiza a interface ao abrir a página.
renderizarTarefas();
