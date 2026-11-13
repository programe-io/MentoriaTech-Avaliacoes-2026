
let tarefas = [];

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const lista = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validar o título
    if (titulo.length < 5) {
        mensagem.textContent =
            "O título deve ter no mínimo 5 caracteres!";
        return;
    }

    // Validar a prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mensagem.textContent =
            "A prioridade deve ser 1, 2 ou 3!";
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    mensagem.textContent = "";

    campoTitulo.value = "";
    campoPrioridade.value = "2";

    listarTarefas();
});

// Listar todas as tarefas
function listarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        const item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const informacoes = document.createElement("div");

        const titulo = document.createElement("span");
        titulo.className = "titulo-tarefa";
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("p");

        const nomes = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent =
            "Prioridade: " + nomes[tarefa.prioridade];

        informacoes.append(titulo, prioridade);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Alterar prioridade
        const seletor = document.createElement("select");

        for (let i = 1; i <= 3; i++) {
            const opcao = document.createElement("option");

            opcao.value = i;
            opcao.textContent = i + " - " + nomes[i];

            seletor.appendChild(opcao);
        }

        seletor.value = tarefa.prioridade;

        seletor.addEventListener("change", function() {
            alterarPrioridade(tarefa.id, Number(seletor.value));
        });

        // Marcar como concluída
        const botao = document.createElement("button");

        botao.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        botao.addEventListener("click", function() {
            concluirTarefa(tarefa.id);
        });

        acoes.append(seletor, botao);

        item.append(informacoes, acoes);

        lista.appendChild(item);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(id) {
    tarefas = tarefas.map(function(tarefa) {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }

        return tarefa;
    });

    listarTarefas();
}

// Alterar prioridade de uma tarefa
function alterarPrioridade(id, novaPrioridade) {
    if (![1, 2, 3].includes(novaPrioridade)) {
        mensagem.textContent = "Prioridade inválida!";
        return;
    }

    tarefas = tarefas.map(function(tarefa) {
        if (tarefa.id === id) {
            tarefa.prioridade = novaPrioridade;
        }

        return tarefa;
    });

    listarTarefas();
}
