
const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

const totalElement = document.getElementById("total");
const concluidasElement = document.getElementById("concluidas");

// Recupera as tarefas salvas no navegador
let tarefas = [];

try {
    const dadosSalvos = JSON.parse(
        localStorage.getItem("tarefas")
    );

    if (Array.isArray(dadosSalvos)) {
        tarefas = dadosSalvos.filter(tarefa =>
            tarefa &&
            Number.isInteger(tarefa.codigo) &&
            typeof tarefa.titulo === "string" &&
            tarefa.titulo.trim().length >= 5 &&
            [1, 2, 3].includes(Number(tarefa.prioridade)) &&
            typeof tarefa.concluida === "boolean"
        ).map(tarefa => ({
            ...tarefa,
            prioridade: Number(tarefa.prioridade)
        }));
    }
} catch (erro) {
    tarefas = [];
}

// Gera o próximo código da tarefa
function gerarCodigo() {
    return tarefas.reduce(
        (maior, tarefa) => Math.max(maior, tarefa.codigo),
        0
    ) + 1;
}

// Salva as tarefas no navegador
function salvarTarefas() {
    try {
        localStorage.setItem(
            "tarefas",
            JSON.stringify(tarefas)
        );
    } catch (erro) {
        mostrarMensagem(
            "Não foi possível salvar os dados no navegador.",
            "erro"
        );
    }
}

// Exibe mensagens para o usuário
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// 1. Cadastrar uma nova tarefa
form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validação do título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter pelo menos 5 caracteres.",
            "erro"
        );
        campoTitulo.focus();
        return;
    }

    // Validação da prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            "erro"
        );
        return;
    }

    const novaTarefa = {
        codigo: gerarCodigo(),
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    listarTarefas();

    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );

    form.reset();
    campoPrioridade.value = "2";
    campoTitulo.focus();
});

// 2. Listar as tarefas cadastradas
function listarTarefas() {
    listaTarefas.replaceChildren();

    if (tarefas.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "vazio";
        vazio.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(vazio);
    }

    tarefas.forEach(function(tarefa) {
        const cartao = document.createElement("article");
        cartao.className =
            `tarefa prioridade-${tarefa.prioridade}`;

        if (tarefa.concluida) {
            cartao.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent =
            `${tarefa.codigo} - ${tarefa.titulo}`;

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
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão para concluir a tarefa
        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = "concluir";
        botaoConcluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Marcar como concluída";
        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            marcarConcluida(tarefa.codigo);
        });

        // Botão para alterar a prioridade
        const botaoAlterar = document.createElement("button");
        botaoAlterar.className = "alterar";
        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.append(botaoConcluir, botaoAlterar);
        cartao.append(titulo, prioridade, status, acoes);
        listaTarefas.appendChild(cartao);
    });

    // Atualiza os contadores
    totalElement.textContent = `Total: ${tarefas.length}`;

    const quantidadeConcluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    concluidasElement.textContent =
        `Concluídas: ${quantidadeConcluidas}`;
}

// 3. Marcar uma tarefa como concluída
function marcarConcluida(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa || tarefa.concluida) {
        return;
    }

    tarefa.concluida = true;

    salvarTarefas();
    listarTarefas();

    mostrarMensagem(
        `Tarefa ${codigo} marcada como concluída!`,
        "sucesso"
    );
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    // Permite cancelar sem modificar a tarefa
    if (novaPrioridade === null) {
        return;
    }

    const prioridade = novaPrioridade.trim();

    if (!["1", "2", "3"].includes(prioridade)) {
        mostrarMensagem(
            "Prioridade inválida! Digite 1, 2 ou 3.",
            "erro"
        );
        return;
    }

    tarefa.prioridade = Number(prioridade);

    salvarTarefas();
    listarTarefas();

    mostrarMensagem(
        `Prioridade da tarefa ${codigo} alterada com sucesso!`,
        "sucesso"
    );
}

// Exibe as tarefas ao abrir a página
listarTarefas();
