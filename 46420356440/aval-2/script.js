
let tarefas = [];
let proximoCodigo = 1;

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Cadastra uma nova tarefa
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validação do título
    if (titulo.length < 5) {
        mensagem.textContent =
            "Erro: o título deve ter pelo menos 5 caracteres.";
        mensagem.style.color = "#dc2626";
        return;
    }

    // Validação da prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mensagem.textContent =
            "Erro: a prioridade deve ser 1, 2 ou 3.";
        mensagem.style.color = "#dc2626";
        return;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "#15803d";

    formulario.reset();
    campoPrioridade.value = "2";

    listarTarefas();
});

// Retorna o nome da prioridade
function nomePrioridade(prioridade) {
    if (prioridade === 1) return "Alta";
    if (prioridade === 2) return "Média";
    return "Baixa";
}

// Lista todas as tarefas cadastradas
function listarTarefas() {
    listaTarefas.replaceChildren();

    if (tarefas.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "vazio";
        vazio.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(vazio);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const cartao = document.createElement("article");
        cartao.className = "tarefa";

        if (tarefa.concluida) {
            cartao.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = `Código: ${tarefa.codigo}`;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            `Prioridade: ${tarefa.prioridade} - ` +
            nomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão para concluir a tarefa
        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = "btn-concluir";
        botaoConcluir.textContent = tarefa.concluida
            ? "Tarefa concluída"
            : "Marcar como concluída";

        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        // Botão para alterar a prioridade
        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.className = "btn-prioridade";
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.append(botaoConcluir, botaoPrioridade);
        cartao.append(titulo, codigo, prioridade, status, acoes);
        listaTarefas.appendChild(cartao);
    });
}

// Marca uma tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Altera a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) return;

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    // Permite cancelar sem modificar a tarefa
    if (novaPrioridade === null) return;

    const valor = novaPrioridade.trim();

    if (!["1", "2", "3"].includes(valor)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = Number(valor);
    listarTarefas();
}

// Exibe a lista inicial
listarTarefas();
