
let tarefas = [];
let proximoCodigo = 0;

// Validar título e prioridade
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres."
        );
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error(
            "A prioridade deve ser 1, 2 ou 3."
        );
    }
}

// Cadastrar uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    const novaTarefa = {
        codigo: ++proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);
    return novaTarefa;
}

// Retornar as tarefas cadastradas
function listarTarefas() {
    return tarefas;
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;
}

// Exibir as tarefas na página
function exibirTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.replaceChildren();

    const dados = listarTarefas();

    if (dados.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "vazio";
        mensagem.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(mensagem);
    }

    dados.forEach(function(tarefa) {
        const cartao = document.createElement("article");
        cartao.className = "tarefa";

        if (tarefa.status === false) {
            cartao.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent =
            tarefa.codigo + " - " + tarefa.titulo;

        const prioridade = document.createElement("p");
        const nomesPrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent =
            "Prioridade: " +
            tarefa.prioridade +
            " - " +
            nomesPrioridade[tarefa.prioridade];

        const status = document.createElement("p");
        status.className = "status";
        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        const botoes = document.createElement("div");
        botoes.className = "botoes";

        const btnConcluir = document.createElement("button");
        btnConcluir.className = "btn-concluir";
        btnConcluir.textContent = tarefa.status
            ? "Concluir tarefa"
            : "Tarefa concluída";

        btnConcluir.disabled = !tarefa.status;

        btnConcluir.addEventListener("click", function() {
            executarAcao(function() {
                concluirTarefa(tarefa.codigo);
            });
        });

        const btnPrioridade = document.createElement("button");
        btnPrioridade.className = "btn-prioridade";
        btnPrioridade.textContent = "Alterar prioridade";

        btnPrioridade.addEventListener("click", function() {
            const resposta = prompt(
                "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
                String(tarefa.prioridade)
            );

            if (resposta === null || resposta.trim() === "") {
                return;
            }

            const novaPrioridade = Number(resposta);

            executarAcao(function() {
                alterarPrioridade(
                    tarefa.codigo,
                    novaPrioridade
                );
            });
        });

        botoes.append(btnConcluir, btnPrioridade);
        cartao.append(titulo, prioridade, status, botoes);
        lista.appendChild(cartao);
    });

    document.getElementById("totalTarefas").textContent =
        dados.length;

    document.getElementById("totalPendentes").textContent =
        dados.filter(function(tarefa) {
            return tarefa.status === true;
        }).length;

    document.getElementById("totalConcluidas").textContent =
        dados.filter(function(tarefa) {
            return tarefa.status === false;
        }).length;
}

// Executar uma ação e mostrar possíveis erros
function executarAcao(acao) {
    try {
        acao();
        exibirTarefas();
    } catch (erro) {
        alert(erro.message);
    }
}

// Evento do formulário
document.getElementById("formTarefa").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const titulo =
            document.getElementById("titulo").value;

        const prioridade =
            Number(document.getElementById("prioridade").value);

        executarAcao(function() {
            cadastrarTarefa(titulo, prioridade);
        });

        // Limpar formulário somente se o cadastro for válido
        // e tiver sido realizado.
        // A verificação é feita pelo código da tarefa criada.
    }
);

// Mostrar a lista inicial
exibirTarefas();
