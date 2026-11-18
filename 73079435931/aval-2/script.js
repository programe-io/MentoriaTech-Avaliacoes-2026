
// ==========================================
// 1. ARMAZENAMENTO DAS TAREFAS
// ==========================================

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let codigoAtual = Number(localStorage.getItem("codigoAtual"));

if (!Number.isSafeInteger(codigoAtual) || codigoAtual < 1) {
    codigoAtual = tarefas.reduce(
        (maior, tarefa) => Math.max(maior, tarefa.codigo),
        0
    ) + 1;
}

let filtroAtual = "todas";


// ==========================================
// 2. SALVAR DADOS
// ==========================================

function salvarDados() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    localStorage.setItem(
        "codigoAtual",
        codigoAtual
    );
}


// ==========================================
// 3. VALIDAR DADOS DA TAREFA
// ==========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (
        typeof titulo !== "string" ||
        titulo.trim().length < 5
    ) {
        throw new Error(
            "O título deve possuir no mínimo cinco caracteres."
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


// ==========================================
// 4. CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    const novaTarefa = {

        codigo: codigoAtual,

        titulo: titulo.trim(),

        prioridade: prioridade,

        status: true

    };

    tarefas.push(novaTarefa);

    codigoAtual++;

    salvarDados();

    atualizarSistema();

    return novaTarefa;
}


// ==========================================
// 5. LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    return tarefas;
}


// ==========================================
// 6. BUSCAR TAREFA PELO CÓDIGO
// ==========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        (item) => item.codigo === codigo
    );

    if (!tarefa) {

        throw new Error(
            "Tarefa não encontrada."
        );

    }

    return tarefa;
}


// ==========================================
// 7. CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {

        throw new Error(
            "Esta tarefa já foi concluída."
        );

    }

    tarefa.status = false;

    salvarDados();

    atualizarSistema();

    return tarefa;
}


// ==========================================
// 8. ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    salvarDados();

    atualizarSistema();

    return tarefa;
}


// ==========================================
// 9. EXCLUIR TAREFA
// ==========================================

function excluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    const confirmar = confirm(
        `Deseja excluir a tarefa "${tarefa.titulo}"?`
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(
        item => item.codigo !== codigo
    );

    salvarDados();

    atualizarSistema();
}


// ==========================================
// 10. FORMATAR PRIORIDADE
// ==========================================

function formatarPrioridade(prioridade) {

    const prioridades = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    return prioridades[prioridade];
}


// ==========================================
// 11. EXIBIR TAREFAS NA TELA
// ==========================================

function exibirTarefas() {

    const lista = document.getElementById("listaTarefas");

    const mensagem = document.getElementById("mensagemVazia");

    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .trim()
        .toLowerCase();

    lista.replaceChildren();

    let tarefasFiltradas = listarTarefas();

    // FILTRAR PELO STATUS

    if (filtroAtual === "pendentes") {

        tarefasFiltradas = tarefasFiltradas.filter(
            tarefa => tarefa.status === true
        );

    }

    if (filtroAtual === "concluidas") {

        tarefasFiltradas = tarefasFiltradas.filter(
            tarefa => tarefa.status === false
        );

    }

    // PESQUISAR PELO TÍTULO OU CÓDIGO

    tarefasFiltradas = tarefasFiltradas.filter(tarefa =>

        tarefa.titulo.toLowerCase().includes(pesquisa) ||

        String(tarefa.codigo).includes(pesquisa)

    );

    // MENSAGEM QUANDO NÃO EXISTIR RESULTADO

    mensagem.style.display =
        tarefasFiltradas.length === 0 ? "block" : "none";

    if (tarefas.length > 0) {
        mensagem.querySelector("h3").textContent =
            "Nenhuma tarefa encontrada";

        mensagem.querySelector("p").textContent =
            "Tente alterar a pesquisa ou o filtro.";
    }

    // CRIAR CARTÕES DAS TAREFAS

    tarefasFiltradas.forEach(tarefa => {

        const card = document.createElement("article");

        card.className = "task";

        if (!tarefa.status) {
            card.classList.add("completed");
        }

        // INFORMAÇÕES

        const informacoes = document.createElement("div");

        informacoes.className = "task-info";

        const titulo = document.createElement("h3");

        titulo.textContent = tarefa.titulo;

        const meta = document.createElement("div");

        meta.className = "task-meta";

        const codigo = document.createElement("span");

        codigo.className = "task-code";

        codigo.textContent = `Código: ${tarefa.codigo}`;

        const prioridade = document.createElement("span");

        prioridade.className =
            `priority priority-${tarefa.prioridade}`;

        prioridade.textContent =
            `Prioridade ${formatarPrioridade(tarefa.prioridade)}`;

        const status = document.createElement("span");

        status.className = "task-status";

        if (tarefa.status) {

            status.classList.add("status-pending");

            status.textContent = "Pendente";

        } else {

            status.classList.add("status-done");

            status.textContent = "Concluída";

        }

        meta.append(codigo, prioridade, status);

        informacoes.append(titulo, meta);


        // BOTÕES DE AÇÃO

        const acoes = document.createElement("div");

        acoes.className = "task-actions";

        if (tarefa.status) {

            acoes.appendChild(
                criarBotao(
                    "Concluir",
                    "btn-complete",
                    "concluir",
                    tarefa.codigo
                )
            );

        }

        acoes.appendChild(
            criarBotao(
                "Prioridade",
                "btn-priority",
                "prioridade",
                tarefa.codigo
            )
        );

        acoes.appendChild(
            criarBotao(
                "Excluir",
                "btn-delete",
                "excluir",
                tarefa.codigo
            )
        );

        card.append(informacoes, acoes);

        lista.appendChild(card);

    });

}


// ==========================================
// 12. CRIAR BOTÕES
// ==========================================

function criarBotao(texto, classe, acao, codigo) {

    const botao = document.createElement("button");

    botao.textContent = texto;

    botao.className = `btn-action ${classe}`;

    botao.dataset.acao = acao;

    botao.dataset.codigo = codigo;

    return botao;
}


// ==========================================
// 13. ATUALIZAR DASHBOARD
// ==========================================

function atualizarDashboard() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status === true
    ).length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    document.getElementById("totalTarefas").textContent =
        total;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;
}


// ==========================================
// 14. ATUALIZAR SISTEMA
// ==========================================

function atualizarSistema() {

    atualizarDashboard();

    exibirTarefas();

}


// ==========================================
// 15. CADASTRO PELO FORMULÁRIO
// ==========================================

document
    .getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo = document
            .getElementById("titulo")
            .value;

        const prioridade = Number(
            document.getElementById("prioridade").value
        );

        try {

            cadastrarTarefa(titulo, prioridade);

            alert("Tarefa cadastrada com sucesso!");

            this.reset();

            document.getElementById("titulo").focus();

        } catch (erro) {

            alert(erro.message);

        }

    });


// ==========================================
// 16. AÇÕES DOS BOTÕES
// ==========================================

document
    .getElementById("listaTarefas")
    .addEventListener("click", function(event) {

        const botao = event.target.closest("button[data-acao]");

        if (!botao) return;

        const codigo = Number(botao.dataset.codigo);

        const acao = botao.dataset.acao;

        try {

            if (acao === "concluir") {

                concluirTarefa(codigo);

                alert("Tarefa concluída com sucesso!");

            }

            else if (acao === "prioridade") {

                const tarefa = buscarTarefa(codigo);

                const resposta = prompt(
                    `Tarefa: ${tarefa.titulo}\n\n` +
                    "Digite a nova prioridade:\n" +
                    "1 - Alta\n" +
                    "2 - Média\n" +
                    "3 - Baixa"
                );

                if (resposta === null || resposta.trim() === "") {
                    return;
                }

                const novaPrioridade = Number(resposta);

                alterarPrioridade(codigo, novaPrioridade);

                alert("Prioridade alterada com sucesso!");

            }

            else if (acao === "excluir") {

                excluirTarefa(codigo);

            }

        } catch (erro) {

            alert(erro.message);

        }

    });


// ==========================================
// 17. PESQUISAR TAREFAS
// ==========================================

document
    .getElementById("pesquisa")
    .addEventListener("input", function() {

        exibirTarefas();

    });


// ==========================================
// 18. FILTRAR TAREFAS
// ==========================================

document
    .querySelectorAll(".filter")
    .forEach(botao => {

        botao.addEventListener("click", function() {

            filtroAtual = this.dataset.filtro;

            // REMOVER CLASSE ACTIVE

            document
                .querySelectorAll(".filter")
                .forEach(item => {

                    item.classList.remove("active");

                });

            // ADICIONAR CLASSE ACTIVE

            this.classList.add("active");

            exibirTarefas();

        });

    });


// ==========================================
// 19. INICIALIZAR SISTEMA
// ==========================================

atualizarSistema();

salvarDados();
