
let tarefas = [];
let proximoCodigo = 0;

const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const pesquisa = document.getElementById("pesquisa");
const filtroStatus = document.getElementById("filtroStatus");
const mensagem = document.getElementById("mensagem");

// 1. Validar título e prioridade
function validarDadosDaTarefa(titulo, prioridade) {
    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir, no mínimo, cinco caracteres."
        );
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}

// 2. Exibir mensagens na interface
function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("error", erro);
    mensagem.classList.add("show");

    setTimeout(() => {
        mensagem.classList.remove("show");
    }, 3000);
}

// 3. Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    titulo = titulo.trim();

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    atualizarTela();

    mostrarMensagem("Tarefa cadastrada com sucesso!");

    return novaTarefa;
}

// 4. Listar as tarefas cadastradas
function listarTarefas() {
    return tarefas;
}

// 5. Buscar uma tarefa pelo código
function buscarTarefa(codigoTarefa) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigoTarefa
    );

    if (!tarefa) {
        throw new Error("Código da tarefa não encontrado.");
    }

    return tarefa;
}

// 6. Concluir uma tarefa
function concluirTarefa(codigoTarefa) {
    const tarefa = buscarTarefa(codigoTarefa);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    atualizarTela();

    mostrarMensagem("Tarefa concluída com sucesso!");
}

// 7. Alterar a prioridade
function alterarPrioridade(codigoTarefa, novaPrioridade) {
    const tarefa = buscarTarefa(codigoTarefa);

    // Reutiliza a validação original
    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    atualizarTela();

    mostrarMensagem("Prioridade alterada com sucesso!");
}

// 8. Evitar que títulos sejam interpretados como HTML
function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// 9. Traduzir a prioridade para texto
function nomePrioridade(prioridade) {
    const nomes = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    return nomes[prioridade];
}

// 10. Atualizar os indicadores
function atualizarIndicadores() {
    const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status === true
    ).length;

    document.getElementById("totalTarefas").textContent =
        tarefas.length;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;
}

// 11. Renderizar as tarefas na tela
function renderizarTarefas() {
    const termo = pesquisa.value.trim().toLowerCase();
    const filtro = filtroStatus.value;

    const tarefasFiltradas = listarTarefas().filter(tarefa => {
        const correspondeBusca =
            tarefa.titulo.toLowerCase().includes(termo) ||
            String(tarefa.codigo).includes(termo);

        const correspondeStatus =
            filtro === "todas" ||
            (filtro === "pendentes" && tarefa.status === true) ||
            (filtro === "concluidas" && tarefa.status === false);

        return correspondeBusca && correspondeStatus;
    });

    if (tarefasFiltradas.length === 0) {
        listaTarefas.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">✓</div>
                <h4>Nenhuma tarefa encontrada</h4>
                <p>
                    Cadastre uma tarefa ou altere os filtros da pesquisa.
                </p>
            </div>
        `;
    } else {
        listaTarefas.innerHTML = tarefasFiltradas.map(tarefa => `
            <article class="task-card ${tarefa.status ? "" : "completed"}">

                <button
                    type="button"
                    class="task-check ${tarefa.status ? "" : "done"}"
                    data-acao="concluir"
                    data-codigo="${tarefa.codigo}"
                    aria-label="${
                        tarefa.status
                            ? "Concluir tarefa"
                            : "Tarefa concluída"
                    }"
                    title="${
                        tarefa.status
                            ? "Marcar como concluída"
                            : "Já concluída"
                    }"
                    ${tarefa.status ? "" : "disabled"}
                >${tarefa.status ? "" : "✓"}</button>

                <div class="task-info">
                    <h4 class="task-title">
                        ${escaparHTML(tarefa.titulo)}
                    </h4>

                    <div class="task-meta">
                        <span>Código #${tarefa.codigo}</span>

                        <span class="priority priority-${tarefa.prioridade}">
                            Prioridade ${tarefa.prioridade} -
                            ${nomePrioridade(tarefa.prioridade)}
                        </span>

                        <span>
                            ${tarefa.status ? "Pendente" : "Concluída"}
                        </span>
                    </div>
                </div>

                <div class="task-actions">
                    ${
                        tarefa.status
                        ? `
                            <button
                                type="button"
                                class="btn-action"
                                data-acao="prioridade"
                                data-codigo="${tarefa.codigo}"
                            >
                                Alterar prioridade
                            </button>
                        `
                        : `
                            <span class="priority priority-3">
                                Finalizada
                            </span>
                        `
                    }
                </div>

            </article>
        `).join("");
    }

    document.getElementById("contador").textContent =
        `${tarefasFiltradas.length} ${
            tarefasFiltradas.length === 1 ? "tarefa" : "tarefas"
        }`;
}

// 12. Atualizar toda a interface
function atualizarTela() {
    atualizarIndicadores();
    renderizarTarefas();
}

// 13. Receber os dados do formulário
formTarefa.addEventListener("submit", evento => {
    evento.preventDefault();

    try {
        const titulo = document.getElementById("titulo").value;

        const prioridade = Number(
            document.getElementById("prioridade").value
        );

        cadastrarTarefa(titulo, prioridade);

        formTarefa.reset();

        document.getElementById("prioridade").value = "2";
        document.getElementById("titulo").focus();

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

// 14. Pesquisar e filtrar tarefas
pesquisa.addEventListener("input", renderizarTarefas);
filtroStatus.addEventListener("change", renderizarTarefas);

// 15. Identificar as ações realizadas na lista
listaTarefas.addEventListener("click", evento => {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);
    const acao = botao.dataset.acao;

    try {
        if (acao === "concluir") {
            concluirTarefa(codigo);
        }

        if (acao === "prioridade") {
            const tarefa = buscarTarefa(codigo);

            const entrada = prompt(
                `Tarefa: ${tarefa.titulo}\n\n` +
                "Escolha a nova prioridade:\n" +
                "1 - Alta\n" +
                "2 - Média\n" +
                "3 - Baixa"
            );

            if (entrada === null) return;

            const novaPrioridade = entrada.trim() === ""
                ? NaN
                : Number(entrada);

            alterarPrioridade(codigo, novaPrioridade);
        }

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

// Iniciar a interface
atualizarTela();
