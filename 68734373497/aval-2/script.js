
// ========================================
// GERENCIADOR DE TAREFAS
// ========================================

// Array que armazena as tarefas
let tarefas = [];

// Gerador automático de códigos
let proximoCodigo = 0;

// Elementos do HTML
const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const filtro = document.getElementById("filtro");

// ========================================
// 1. VALIDAR DADOS DA TAREFA
// ========================================

function validarDadosDaTarefa(titulo, prioridade) {
    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir pelo menos 5 caracteres."
        );
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}

// ========================================
// 2. CADASTRAR TAREFA
// ========================================

function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    listarNaTela();

    return novaTarefa;
}

// ========================================
// 3. LISTAR TAREFAS
// ========================================

function listarTarefas() {
    return tarefas;
}

// ========================================
// 4. BUSCAR TAREFA PELO CÓDIGO
// ========================================

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// ========================================
// 5. CONCLUIR TAREFA
// ========================================

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    // false significa que a tarefa foi concluída
    tarefa.status = false;

    listarNaTela();

    return tarefa;
}

// ========================================
// 6. ALTERAR PRIORIDADE
// ========================================

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    // Reaproveita a validação dos dados
    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    listarNaTela();

    return tarefa;
}

// ========================================
// 7. EXIBIR MENSAGEM
// ========================================

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// ========================================
// 8. TRADUZIR PRIORIDADE
// ========================================

function nomePrioridade(prioridade) {
    const prioridades = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    return prioridades[prioridade];
}

// ========================================
// 9. ATUALIZAR RESUMO
// ========================================

function atualizarResumo() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;
}

// ========================================
// 10. LISTAR E FILTRAR NA TELA
// ========================================

function listarNaTela() {
    listaTarefas.replaceChildren();

    let tarefasExibidas = listarTarefas();

    if (filtro.value === "pendentes") {
        tarefasExibidas = tarefasExibidas.filter(
            tarefa => tarefa.status === true
        );
    }

    if (filtro.value === "concluidas") {
        tarefasExibidas = tarefasExibidas.filter(
            tarefa => tarefa.status === false
        );
    }

    if (tarefasExibidas.length === 0) {
        const paragrafo = document.createElement("p");
        paragrafo.className = "vazio";
        paragrafo.textContent =
            tarefas.length === 0
                ? "Nenhuma tarefa cadastrada."
                : "Nenhuma tarefa encontrada neste filtro.";

        listaTarefas.appendChild(paragrafo);
        atualizarResumo();
        return;
    }

    tarefasExibidas.forEach(tarefa => {
        const cartao = document.createElement("article");
        cartao.className = "tarefa";

        if (!tarefa.status) {
            cartao.classList.add("concluida");
        }

        // Informações da tarefa
        const informacoes = document.createElement("div");
        informacoes.className = "tarefa-info";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const detalhes = document.createElement("div");
        detalhes.className = "detalhes";

        const codigo = document.createElement("span");
        codigo.textContent = `Código: ${tarefa.codigo}`;

        const prioridade = document.createElement("span");
        prioridade.className =
            `etiqueta prioridade-${tarefa.prioridade}`;

        prioridade.textContent =
            `Prioridade ${nomePrioridade(tarefa.prioridade)}`;

        const status = document.createElement("span");
        status.className = tarefa.status
            ? "etiqueta status-pendente"
            : "etiqueta status-concluida";

        status.textContent = tarefa.status
            ? "Em andamento"
            : "Concluída";

        detalhes.append(codigo, prioridade, status);
        informacoes.append(titulo, detalhes);

        // Botões de ação
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            const botaoConcluir = document.createElement("button");

            botaoConcluir.className =
                "botao-acao botao-concluir";

            botaoConcluir.textContent = "✓ Concluir";

            botaoConcluir.addEventListener("click", function () {
                try {
                    concluirTarefa(tarefa.codigo);

                    mostrarMensagem(
                        "Tarefa concluída com sucesso!",
                        "sucesso"
                    );
                } catch (erro) {
                    mostrarMensagem(erro.message, "erro");
                }
            });

            acoes.appendChild(botaoConcluir);
        }

        const botaoPrioridade = document.createElement("button");

        botaoPrioridade.className =
            "botao-acao botao-prioridade";

        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", function () {
            const entrada = prompt(
                "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
                String(tarefa.prioridade)
            );

            if (entrada === null || entrada.trim() === "") {
                return;
            }

            try {
                const novaPrioridade = Number(entrada);

                alterarPrioridade(
                    tarefa.codigo,
                    novaPrioridade
                );

                mostrarMensagem(
                    "Prioridade alterada com sucesso!",
                    "sucesso"
                );
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        acoes.appendChild(botaoPrioridade);

        cartao.append(informacoes, acoes);
        listaTarefas.appendChild(cartao);
    });

    atualizarResumo();
}

// ========================================
// 11. EVENTO DO FORMULÁRIO
// ========================================

formTarefa.addEventListener("submit", function (evento) {
    evento.preventDefault();

    try {
        const titulo = document.getElementById("titulo").value;
        const prioridade = Number(
            document.getElementById("prioridade").value
        );

        cadastrarTarefa(titulo, prioridade);

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "sucesso"
        );

        formTarefa.reset();

        document.getElementById("titulo").focus();

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// ========================================
// 12. EVENTO DO FILTRO
// ========================================

filtro.addEventListener("change", function () {
    listarNaTela();
});

// Exibe a lista inicial
listarNaTela();