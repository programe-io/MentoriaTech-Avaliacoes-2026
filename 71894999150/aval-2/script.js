
let tarefas = [];
let codigoAtual = 0;

// 1. Valida os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir no mínimo cinco caracteres."
        );
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}

// 2. Cadastra uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    codigoAtual++;

    const novaTarefa = {
        codigo: codigoAtual,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}

// 3. Retorna a lista de tarefas
function listarTarefas() {
    return tarefas;
}

// 4. Busca uma tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// 5. Conclui uma tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    return tarefa;
}

// 6. Altera a prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}

// Elementos da página
const formTarefa = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const filtroStatus = document.getElementById("filtroStatus");

// Exibe mensagens de sucesso ou erro
function mostrarMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Cria uma célula com texto seguro
function criarCelula(texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
}

// Atualiza os números do resumo
function atualizarResumo() {
    const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    document.getElementById("totalTarefas").textContent =
        tarefas.length;

    document.getElementById("totalConcluidas").textContent =
        concluidas;

    document.getElementById("totalPendentes").textContent =
        tarefas.length - concluidas;
}

// Renderiza a tabela na página
function renderizarTarefas() {
    listaTarefas.replaceChildren();

    const filtro = filtroStatus.value;

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtro === "pendentes") {
            return tarefa.status === true;
        }

        if (filtro === "concluidas") {
            return tarefa.status === false;
        }

        return true;
    });

    if (tarefasFiltradas.length === 0) {
        const linha = document.createElement("tr");
        const celula = criarCelula(
            tarefas.length === 0
                ? "Nenhuma tarefa cadastrada."
                : "Nenhuma tarefa encontrada para este filtro."
        );

        celula.colSpan = 5;
        celula.className = "vazio";

        linha.appendChild(celula);
        listaTarefas.appendChild(linha);
        atualizarResumo();
        return;
    }

    tarefasFiltradas.forEach(tarefa => {
        const linha = document.createElement("tr");

        if (!tarefa.status) {
            linha.classList.add("tarefa-concluida");
        }

        linha.appendChild(criarCelula(tarefa.codigo));
        linha.appendChild(criarCelula(tarefa.titulo));

        const celulaPrioridade = document.createElement("td");
        const etiquetaPrioridade = document.createElement("span");

        etiquetaPrioridade.className =
            `prioridade prioridade-${tarefa.prioridade}`;

        const nomesPrioridade = {
            1: "1 - Alta",
            2: "2 - Média",
            3: "3 - Baixa"
        };

        etiquetaPrioridade.textContent =
            nomesPrioridade[tarefa.prioridade];

        celulaPrioridade.appendChild(etiquetaPrioridade);
        linha.appendChild(celulaPrioridade);

        const celulaStatus = document.createElement("td");
        const etiquetaStatus = document.createElement("span");

        etiquetaStatus.className = tarefa.status
            ? "status status-pendente"
            : "status status-concluida";

        etiquetaStatus.textContent = tarefa.status
            ? "Em andamento"
            : "Concluída";

        celulaStatus.appendChild(etiquetaStatus);
        linha.appendChild(celulaStatus);

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");

        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.type = "button";
        botaoConcluir.className = "btn btn-concluir";
        botaoConcluir.textContent = tarefa.status
            ? "Concluir"
            : "Concluída";
        botaoConcluir.disabled = !tarefa.status;

        botaoConcluir.addEventListener("click", () => {
            try {
                concluirTarefa(tarefa.codigo);
                renderizarTarefas();
                mostrarMensagem("Tarefa concluída com sucesso.");
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.type = "button";
        botaoPrioridade.className = "btn btn-prioridade";
        botaoPrioridade.textContent = "Prioridade";

        botaoPrioridade.addEventListener("click", () => {
            const entrada = prompt(
                "Digite a nova prioridade:\n" +
                "1 - Alta\n2 - Média\n3 - Baixa",
                String(tarefa.prioridade)
            );

            if (entrada === null || entrada.trim() === "") {
                return;
            }

            const novaPrioridade = Number(entrada);

            try {
                alterarPrioridade(tarefa.codigo, novaPrioridade);
                renderizarTarefas();
                mostrarMensagem("Prioridade alterada com sucesso.");
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        acoes.append(botaoConcluir, botaoPrioridade);
        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);

        listaTarefas.appendChild(linha);
    });

    atualizarResumo();
}

// Evento de cadastro
formTarefa.addEventListener("submit", evento => {
    evento.preventDefault();

    const titulo = campoTitulo.value;
    const prioridade = Number(campoPrioridade.value);

    try {
        cadastrarTarefa(titulo, prioridade);

        formTarefa.reset();
        renderizarTarefas();

        mostrarMensagem("Tarefa cadastrada com sucesso.");
        campoTitulo.focus();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Evento do filtro
filtroStatus.addEventListener("change", renderizarTarefas);

// Inicialização da página
renderizarTarefas();
