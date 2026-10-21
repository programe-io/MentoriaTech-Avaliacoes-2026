
const tarefas = [];

const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");

// Cadastrar tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Informe um código inteiro positivo.");
        return;
    }

    if (titulo.length < 5) {
        alert("O título precisa ter pelo menos 5 caracteres.");
        return;
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    const codigoExiste = tarefas.some(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (codigoExiste) {
        alert("Esse código já está sendo utilizado.");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    formulario.reset();
    document.getElementById("prioridade").value = "2";

    exibirTarefas();
});

// Retornar o nome da prioridade
function nomePrioridade(prioridade) {
    if (prioridade === 1) return "Alta";
    if (prioridade === 2) return "Média";
    return "Baixa";
}

// Retornar a classe CSS da prioridade
function classePrioridade(prioridade) {
    if (prioridade === 1) return "alta";
    if (prioridade === 2) return "media";
    return "baixa";
}

// Listar tarefas em cartões
function exibirTarefas() {
    lista.replaceChildren();

    if (tarefas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "vazio";
        mensagem.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(mensagem);
    }

    tarefas.forEach(function(tarefa) {
        const cartao = document.createElement("article");

        cartao.className = "cartao " +
            classePrioridade(tarefa.prioridade);

        if (tarefa.concluida) {
            cartao.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade +
            " - " + nomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        status.className = tarefa.concluida
            ? "status-concluida"
            : "status-pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = tarefa.concluida
            ? "btn-desativado"
            : "btn-concluir";

        botaoConcluir.textContent = tarefa.concluida
            ? "Tarefa concluída"
            : "Marcar como concluída";

        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.className = "btn-prioridade";
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.append(botaoConcluir, botaoPrioridade);

        cartao.append(
            titulo,
            codigo,
            prioridade,
            status,
            acoes
        );

        lista.appendChild(cartao);
    });

    document.getElementById("totalTarefas").textContent =
        "Total: " + tarefas.length;

    const concluidas = tarefas.filter(function(tarefa) {
        return tarefa.concluida;
    }).length;

    document.getElementById("totalConcluidas").textContent =
        "Concluídas: " + concluidas;
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    if (tarefa.concluida) {
        alert("Essa tarefa já foi concluída.");
        return;
    }

    tarefa.concluida = true;

    exibirTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const resposta = prompt(
        "Escolha a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (resposta === null || resposta.trim() === "") {
        return;
    }

    const novaPrioridade = Number(resposta);

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Prioridade inválida. Escolha 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    exibirTarefas();
}
