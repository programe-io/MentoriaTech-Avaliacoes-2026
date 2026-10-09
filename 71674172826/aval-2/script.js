const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const listaVazia = document.getElementById("listaVazia");
const mensagem = document.getElementById("mensagem");

let tarefas = [];
let proximoId = 1;
let filtroAtual = "todas";

const nomesPrioridade = {
    1: "Alta",
    2: "Média",
    3: "Baixa"
};

const classesPrioridade = {
    1: "alta",
    2: "media",
    3: "baixa"
};

// Cadastrar tarefa
form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validar título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );
        campoTitulo.focus();
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );
        return;
    }

    const tarefa = {
        id: proximoId++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    form.reset();
    campoPrioridade.value = "2";

    mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");
    renderizarTarefas();
});

// Exibir mensagens
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Listar tarefas
function renderizarTarefas() {
    listaTarefas.replaceChildren();

    const tarefasFiltradas = tarefas.filter(function (tarefa) {
        if (filtroAtual === "pendentes") {
            return !tarefa.concluida;
        }

        if (filtroAtual === "concluidas") {
            return tarefa.concluida;
        }

        return true;
    });

    const pendentes = tarefas.filter(
        tarefa => !tarefa.concluida
    ).length;

    contador.textContent =
        `${tarefas.length} tarefa(s) • ${pendentes} pendente(s)`;

    listaVazia.hidden = tarefasFiltradas.length > 0;

    if (tarefasFiltradas.length === 0) {
        listaVazia.textContent =
            filtroAtual === "pendentes"
                ? "Nenhuma tarefa pendente."
                : filtroAtual === "concluidas"
                    ? "Nenhuma tarefa concluída."
                    : "Nenhuma tarefa cadastrada.";
    }

    tarefasFiltradas.forEach(function (tarefa) {
        const item = document.createElement("li");
        item.className = "tarefa";

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const info = document.createElement("div");
        info.className = "tarefa-info";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const prioridade = document.createElement("span");
        prioridade.className =
            `prioridade ${classesPrioridade[tarefa.prioridade]}`;
        prioridade.textContent =
            `Prioridade: ${nomesPrioridade[tarefa.prioridade]}`;

        info.append(titulo, status, prioridade);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnConcluir = criarBotao(
            tarefa.concluida ? "Reabrir" : "Concluir",
            "btn-acao btn-concluir",
            function () {
                tarefa.concluida = !tarefa.concluida;
                renderizarTarefas();
            }
        );

        const btnEditar = criarBotao(
            "Prioridade",
            "btn-acao btn-editar",
            function () {
                alterarPrioridade(tarefa);
            }
        );

        const btnExcluir = criarBotao(
            "Excluir",
            "btn-acao btn-excluir",
            function () {
                excluirTarefa(tarefa.id);
            }
        );

        acoes.append(btnConcluir, btnEditar, btnExcluir);
        item.append(info, acoes);
        listaTarefas.appendChild(item);
    });
}

// Criar botões com eventos
function criarBotao(texto, classe, acao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    botao.className = classe;
    botao.addEventListener("click", acao);

    return botao;
}

// Alterar prioridade
function alterarPrioridade(tarefa) {
    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
        String(tarefa.prioridade)
    );

    if (novaPrioridade === null) {
        return;
    }

    const valor = novaPrioridade.trim();

    if (!["1", "2", "3"].includes(valor)) {
        alert("Prioridade inválida! Escolha 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = Number(valor);
    renderizarTarefas();
}

// Excluir tarefa
function excluirTarefa(id) {
    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) {
        return;
    }

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    renderizarTarefas();
}

// Filtros de tarefas
document.querySelectorAll(".filtro").forEach(function (botao) {
    botao.addEventListener("click", function () {
        filtroAtual = botao.dataset.filtro;

        document.querySelectorAll(".filtro").forEach(function (filtro) {
            filtro.classList.remove("ativo");
        });

        botao.classList.add("ativo");
        renderizarTarefas();
    });
});

// Inicializar a lista
renderizarTarefas();