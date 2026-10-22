
let tarefas = carregarTarefas();
let proximoCodigo = Number(localStorage.getItem("proximoCodigo")) || 1;

function carregarTarefas() {
    try {
        const dados = JSON.parse(localStorage.getItem("tarefas"));
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    localStorage.setItem("proximoCodigo", proximoCodigo);
}

function validarDadosDaTarefa(titulo, prioridade) {
    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve ser 1, 2 ou 3.");
    }
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
    salvarTarefas();
    listarTarefas();

    return tarefa;
}

function listarTarefas() {
    const lista = document.getElementById("lista-tarefas");
    lista.replaceChildren();

    tarefas.forEach(function(tarefa) {
        const card = document.createElement("article");
        card.className = "card-tarefa " +
            (tarefa.status ? "status-pendente" : "status-concluida");

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade +
            " - " + nomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        card.append(titulo, codigo, prioridade, status);

        if (tarefa.status) {
            const botaoConcluir = document.createElement("button");
            botaoConcluir.textContent = "Concluir tarefa";
            botaoConcluir.className = "botao-concluir";
            botaoConcluir.addEventListener("click", function() {
                executarAcao(function() {
                    concluirTarefa(tarefa.codigo);
                });
            });

            card.appendChild(botaoConcluir);
        }

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";
        botaoPrioridade.className = "botao-prioridade";
        botaoPrioridade.addEventListener("click", function() {
            executarAcao(function() {
                solicitarNovaPrioridade(tarefa.codigo);
            });
        });

        card.appendChild(botaoPrioridade);
        lista.appendChild(card);
    });

    atualizarResumo();
}

function nomePrioridade(prioridade) {
    const nomes = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    return nomes[prioridade];
}

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === Number(codigo);
    });

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Essa tarefa já foi concluída.");
    }

    tarefa.status = false;

    salvarTarefas();
    listarTarefas();
    mostrarMensagem("Tarefa concluída com sucesso!");
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    salvarTarefas();
    listarTarefas();
    mostrarMensagem("Prioridade alterada com sucesso!");
}

function solicitarNovaPrioridade(codigo) {
    const resposta = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (resposta === null) {
        return;
    }

    const novaPrioridade = Number(resposta);

    alterarPrioridade(codigo, novaPrioridade);
}

function atualizarResumo() {
    document.getElementById("total").textContent = tarefas.length;

    const pendentes = tarefas.filter(function(tarefa) {
        return tarefa.status;
    }).length;

    const concluidas = tarefas.filter(function(tarefa) {
        return !tarefa.status;
    }).length;

    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
}

function mostrarMensagem(texto, erro = false) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "#dc2626" : "#15803d";
}

function executarAcao(acao) {
    try {
        acao();
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

document.getElementById("form-tarefa").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        executarAcao(function() {
            const titulo = document.getElementById("titulo").value;
            const prioridade = Number(
                document.getElementById("prioridade").value
            );

            cadastrarTarefa(titulo, prioridade);

            document.getElementById("form-tarefa").reset();
            document.getElementById("prioridade").value = "2";

            mostrarMensagem("Tarefa cadastrada com sucesso!");
        });
    }
);

listarTarefas();
