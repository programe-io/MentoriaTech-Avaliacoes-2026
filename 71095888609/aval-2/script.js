
let tarefas = [];

const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    const tarefa = {
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    formulario.reset();

    listarTarefas();
});

// Listar tarefas cadastradas
function listarTarefas() {
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach((tarefa, indice) => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const informacoes = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("p");
        prioridade.className = `prioridade-${tarefa.prioridade}`;

        const nomesPrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent =
            "Prioridade: " + nomesPrioridade[tarefa.prioridade];

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        informacoes.appendChild(titulo);
        informacoes.appendChild(prioridade);
        informacoes.appendChild(status);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão concluir
        const botaoConcluir = document.createElement("button");

        botaoConcluir.textContent = tarefa.concluida
            ? "Desmarcar"
            : "Concluir";

        botaoConcluir.className = "btn-concluir";

        botaoConcluir.onclick = function() {
            concluirTarefa(indice);
        };

        // Botão alterar prioridade
        const botaoAlterar = document.createElement("button");

        botaoAlterar.textContent = "Alterar prioridade";
        botaoAlterar.className = "btn-alterar";

        botaoAlterar.onclick = function() {
            alterarPrioridade(indice);
        };

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoAlterar);

        div.appendChild(informacoes);
        div.appendChild(acoes);

        lista.appendChild(div);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(indice) {
    tarefas[indice].concluida = !tarefas[indice].concluida;

    listarTarefas();
}

// Alterar prioridade da tarefa
function alterarPrioridade(indice) {
    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null) {
        return;
    }

    const prioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefas[indice].prioridade = prioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}
