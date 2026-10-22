
const tarefas = [];
let proximoCodigo = 0;

const formTarefa = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Valida o título e a prioridade.
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
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

// Cadastra uma nova tarefa.
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    return tarefa;
}

// Retorna todas as tarefas cadastradas.
function listarTarefas() {
    return tarefas;
}

// Busca uma tarefa pelo código.
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === Number(codigo)
    );

    if (!tarefa) {
        throw new Error("Código da tarefa não encontrado.");
    }

    return tarefa;
}

// Marca uma tarefa como concluída.
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;
}

// Altera a prioridade de uma tarefa.
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;
}

// Exibe mensagens para o usuário.
function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("erro", erro);
}

// Atualiza a listagem na tela.
function renderizarTarefas() {
    listaTarefas.replaceChildren();

    const total = tarefas.length;
    const concluidas = tarefas.filter(
        tarefa => !tarefa.status
    ).length;
    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent =
        `Total: ${total}`;

    document.getElementById("tarefasPendentes").textContent =
        `Pendentes: ${pendentes}`;

    document.getElementById("tarefasConcluidas").textContent =
        `Concluídas: ${concluidas}`;

    if (total === 0) {
        const vazio = document.createElement("p");
        vazio.className = "vazio";
        vazio.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(vazio);
        return;
    }

    listarTarefas().forEach(tarefa => {
        const card = document.createElement("article");
        card.className = "tarefa";

        if (!tarefa.status) {
            card.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = `Código: ${tarefa.codigo}`;

        const prioridade = document.createElement("p");
        const nomesPrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent =
            `Prioridade: ${tarefa.prioridade} - ` +
            nomesPrioridade[tarefa.prioridade];

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Em andamento"
            : "Status: Concluída";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = tarefa.status
            ? "btn-concluir"
            : "btn-desabilitado";

        botaoConcluir.textContent = tarefa.status
            ? "Concluir tarefa"
            : "Tarefa concluída";

        botaoConcluir.disabled = !tarefa.status;

        botaoConcluir.addEventListener("click", () => {
            try {
                concluirTarefa(tarefa.codigo);
                mostrarMensagem("Tarefa concluída com sucesso!");
                renderizarTarefas();
            } catch (erro) {
                mostrarMensagem(erro.message, true);
            }
        });

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.className = "btn-prioridade";
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", () => {
            const resposta = prompt(
                "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
            );

            if (resposta === null) {
                return;
            }

            try {
                const novaPrioridade = Number(resposta);

                alterarPrioridade(
                    tarefa.codigo,
                    novaPrioridade
                );

                mostrarMensagem("Prioridade alterada com sucesso!");
                renderizarTarefas();
            } catch (erro) {
                mostrarMensagem(erro.message, true);
            }
        });

        acoes.append(botaoConcluir, botaoPrioridade);

        card.append(
            titulo,
            codigo,
            prioridade,
            status,
            acoes
        );

        listaTarefas.appendChild(card);
    });
}

// Evento de cadastro do formulário.
formTarefa.addEventListener("submit", event => {
    event.preventDefault();

    const titulo = campoTitulo.value;
    const prioridade = Number(campoPrioridade.value);

    try {
        cadastrarTarefa(titulo, prioridade);

        mostrarMensagem("Tarefa cadastrada com sucesso!");
        formTarefa.reset();
        campoPrioridade.value = "2";

        renderizarTarefas();
        campoTitulo.focus();
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

// Exibe a lista inicial vazia.
renderizarTarefas();
