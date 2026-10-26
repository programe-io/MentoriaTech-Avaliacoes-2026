
// Elementos HTML
const formTarefa = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const campoStatus = document.getElementById("status");
const listaTarefas = document.getElementById("listaTarefas");
const totalTarefas = document.getElementById("totalTarefas");
const mensagem = document.getElementById("mensagem");
const filtroStatus = document.getElementById("filtroStatus");

// Lista que armazena as tarefas cadastradas
let tarefas = [];
let proximoId = 1;

const nomesPrioridade = {
    1: "Alta",
    2: "Média",
    3: "Baixa"
};

// Cadastrar uma nova tarefa
formTarefa.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);
    const status = campoStatus.value;

    // Validar o título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter pelo menos 5 caracteres.",
            "erro"
        );

        campoTitulo.focus();
        return;
    }

    // Validar a prioridade entre 1 e 3
    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );

        campoPrioridade.focus();
        return;
    }

    const novaTarefa = {
        id: proximoId++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: status === "concluida"
    };

    tarefas.push(novaTarefa);

    formTarefa.reset();

    campoPrioridade.value = "2";
    campoStatus.value = "pendente";

    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );

    renderizarTarefas();
    campoTitulo.focus();
});

// Mensagens de sucesso e erro
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = "mensagem " + tipo;
}

// Listar as tarefas
function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    totalTarefas.textContent = tarefas.length;

    const filtro = filtroStatus.value;

    let tarefasFiltradas = tarefas.filter(function(tarefa) {
        if (filtro === "pendente") {
            return !tarefa.concluida;
        }

        if (filtro === "concluida") {
            return tarefa.concluida;
        }

        return true;
    });

    // Prioridades mais altas aparecem primeiro
    tarefasFiltradas.sort(function(a, b) {
        return a.prioridade - b.prioridade;
    });

    if (tarefasFiltradas.length === 0) {
        const vazio = document.createElement("div");
        vazio.className = "vazio";

        const tituloVazio = document.createElement("h3");
        tituloVazio.textContent = tarefas.length === 0
            ? "Nenhuma tarefa cadastrada"
            : "Nenhuma tarefa neste filtro";

        const descricao = document.createElement("p");
        descricao.textContent = tarefas.length === 0
            ? "Adicione sua primeira tarefa usando o formulário acima."
            : "Escolha outro filtro para ver suas tarefas.";

        vazio.append(tituloVazio, descricao);
        listaTarefas.appendChild(vazio);

        return;
    }

    tarefasFiltradas.forEach(function(tarefa) {
        const item = document.createElement("article");

        item.className = "tarefa";

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        // Checkbox para concluir ou reabrir a tarefa
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "check-tarefa";
        checkbox.checked = tarefa.concluida;
        checkbox.setAttribute(
            "aria-label",
            "Marcar tarefa como concluída"
        );

        checkbox.addEventListener("change", function() {
            alternarConclusao(tarefa.id);
        });

        // Conteúdo da tarefa
        const conteudo = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.className = "tarefa-titulo";
        titulo.textContent = tarefa.titulo;

        const metadados = document.createElement("div");
        metadados.className = "metadados";

        const etiquetaPrioridade = document.createElement("span");

        etiquetaPrioridade.className =
            "etiqueta prioridade-" + tarefa.prioridade;

        etiquetaPrioridade.textContent =
            "Prioridade " + tarefa.prioridade +
            ": " + nomesPrioridade[tarefa.prioridade];

        const etiquetaStatus = document.createElement("span");
        etiquetaStatus.className = "etiqueta";

        if (tarefa.concluida) {
            etiquetaStatus.classList.add("status-concluida");
            etiquetaStatus.textContent = "Concluída";
        } else {
            etiquetaStatus.textContent = "Pendente";
        }

        metadados.append(
            etiquetaPrioridade,
            etiquetaStatus
        );

        conteudo.append(titulo, metadados);

        // Ações da tarefa
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Alterar prioridade
        const seletorPrioridade = document.createElement("select");

        seletorPrioridade.setAttribute(
            "aria-label",
            "Alterar prioridade da tarefa"
        );

        [1, 2, 3].forEach(function(valor) {
            const opcao = document.createElement("option");

            opcao.value = valor;
            opcao.textContent = "Prioridade " + valor;
            opcao.selected = tarefa.prioridade === valor;

            seletorPrioridade.appendChild(opcao);
        });

        seletorPrioridade.addEventListener("change", function() {
            alterarPrioridade(
                tarefa.id,
                Number(seletorPrioridade.value)
            );
        });

        // Excluir tarefa
        const botaoExcluir = document.createElement("button");

        botaoExcluir.type = "button";
        botaoExcluir.className = "botao botao-excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.id);
        });

        acoes.append(seletorPrioridade, botaoExcluir);

        item.append(checkbox, conteudo, acoes);

        listaTarefas.appendChild(item);
    });
}

// Marcar tarefa como concluída ou pendente
function alternarConclusao(id) {
    const tarefa = tarefas.find(function(item) {
        return item.id === id;
    });

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    mostrarMensagem(
        tarefa.concluida
            ? "Tarefa marcada como concluída."
            : "Tarefa voltou para pendente.",
        "sucesso"
    );

    renderizarTarefas();
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(id, novaPrioridade) {
    if (
        !Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {
        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );

        return;
    }

    const tarefa = tarefas.find(function(item) {
        return item.id === id;
    });

    if (!tarefa) return;

    tarefa.prioridade = novaPrioridade;

    mostrarMensagem(
        "Prioridade atualizada com sucesso!",
        "sucesso"
    );

    renderizarTarefas();
}

// Excluir uma tarefa da lista
function excluirTarefa(id) {
    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    });

    mostrarMensagem(
        "Tarefa excluída com sucesso!",
        "sucesso"
    );

    renderizarTarefas();
}

// Filtrar tarefas por status
filtroStatus.addEventListener("change", renderizarTarefas);

// Exibir a lista inicial
renderizarTarefas();
