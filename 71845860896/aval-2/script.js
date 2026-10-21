
const tarefas = [];
let proximoCodigo = 0;

// Validação dos dados
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

// Cadastro de tarefas
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    const tarefa = {
        codigo: ++proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
    return tarefa;
}

// Listagem de tarefas
function listarTarefas() {
    return tarefas;
}

// Busca pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        item => item.codigo === Number(codigo)
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Conclusão de tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Essa tarefa já foi concluída.");
    }

    tarefa.status = false;
}

// Alteração da prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        Number(novaPrioridade)
    );

    tarefa.prioridade = Number(novaPrioridade);
}

// Exibição das tarefas
function exibirTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(tarefa => {
        const cartao = document.createElement("div");
        cartao.className = "tarefa";

        if (!tarefa.status) {
            cartao.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent =
            `Tarefa ${tarefa.codigo}: ${tarefa.titulo}`;

        const nomes = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        const prioridade = document.createElement("p");
        prioridade.textContent =
            `Prioridade: ${tarefa.prioridade} - ${nomes[tarefa.prioridade]}`;

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Em andamento"
            : "Status: Concluída";

        cartao.append(titulo, prioridade, status);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            const botaoConcluir = document.createElement("button");
            botaoConcluir.className = "concluir";
            botaoConcluir.textContent = "Concluir";

            botaoConcluir.onclick = () => {
                executarAcao(() => concluirTarefa(tarefa.codigo));
            };

            acoes.appendChild(botaoConcluir);
        }

        const botaoAlterar = document.createElement("button");
        botaoAlterar.className = "alterar";
        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.onclick = () => {
            const resposta = prompt(
                "Digite 1 para Alta, 2 para Média ou 3 para Baixa:"
            );

            if (resposta === null) return;

            executarAcao(() => {
                if (!["1", "2", "3"].includes(resposta.trim())) {
                    throw new Error("Digite uma prioridade entre 1 e 3.");
                }

                alterarPrioridade(
                    tarefa.codigo,
                    Number(resposta)
                );
            });
        };

        acoes.appendChild(botaoAlterar);
        cartao.appendChild(acoes);
        lista.appendChild(cartao);
    });
}

// Tratamento de erros
function executarAcao(acao) {
    const mensagem = document.getElementById("mensagem");

    try {
        acao();
        mensagem.style.color = "#15803d";
        mensagem.textContent = "Operação realizada com sucesso!";
    } catch (erro) {
        mensagem.style.color = "#dc2626";
        mensagem.textContent = erro.message;
    }

    exibirTarefas();
}

// Evento de cadastro
document.getElementById("formulario")
    .addEventListener("submit", function(evento) {
        evento.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const prioridade =
            Number(document.getElementById("prioridade").value);

        executarAcao(() => {
            cadastrarTarefa(titulo, prioridade);
            document.getElementById("formulario").reset();
        });
    });

// Inicialização
exibirTarefas();
