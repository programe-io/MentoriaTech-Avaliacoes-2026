
const tarefas = [];
let proximoCodigo = 0;

const formTarefa = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// 1. Valida o título e a prioridade.
function validarDadosDaTarefa(titulo, prioridade) {
    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error("O título deve ter pelo menos 5 caracteres.");
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

// 2. Cadastra uma tarefa.
function cadastrarTarefa(titulo, prioridade) {
    titulo = titulo.trim();

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    return tarefa;
}

// 3. Retorna todas as tarefas.
function listarTarefas() {
    return tarefas;
}

// 4. Busca uma tarefa pelo código.
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        throw new Error("Código de tarefa não encontrado.");
    }

    return tarefa;
}

// 5. Conclui uma tarefa.
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    return tarefa;
}

// 6. Altera a prioridade.
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}

// Exibe mensagens na página.
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Atualiza a lista de tarefas na tela.
function atualizarLista() {
    listaTarefas.replaceChildren();

    const lista = listarTarefas();

    const concluidas = lista.filter(function(tarefa) {
        return tarefa.status === false;
    }).length;

    contador.textContent =
        `${lista.length} tarefa(s) cadastrada(s) | ` +
        `${concluidas} concluída(s)`;

    if (lista.length === 0) {
        listaTarefas.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    lista.forEach(function(tarefa) {
        const card = document.createElement("article");
        card.className = "tarefa";

        if (!tarefa.status) {
            card.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = `Código: ${tarefa.codigo}`;

        const prioridade = document.createElement("p");
        const nomes = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent =
            `Prioridade: ${tarefa.prioridade} - ` +
            nomes[tarefa.prioridade];

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Em andamento"
            : "Status: Concluída";

        card.append(titulo, codigo, prioridade, status);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            const botaoConcluir = document.createElement("button");
            botaoConcluir.type = "button";
            botaoConcluir.className = "btn-concluir";
            botaoConcluir.textContent = "Concluir";

            botaoConcluir.addEventListener("click", function() {
                try {
                    concluirTarefa(tarefa.codigo);
                    atualizarLista();
                    mostrarMensagem(
                        "Tarefa concluída com sucesso!",
                        "sucesso"
                    );
                } catch (erro) {
                    mostrarMensagem(erro.message, "erro");
                }
            });

            acoes.appendChild(botaoConcluir);
        }

        const botaoAlterar = document.createElement("button");
        botaoAlterar.type = "button";
        botaoAlterar.className = "btn-alterar";
        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.addEventListener("click", function() {
            const resposta = prompt(
                "Nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
                String(tarefa.prioridade)
            );

            if (resposta === null) {
                return;
            }

            try {
                if (resposta.trim() === "") {
                    throw new Error("Informe uma prioridade de 1 a 3.");
                }

                alterarPrioridade(
                    tarefa.codigo,
                    Number(resposta)
                );

                atualizarLista();

                mostrarMensagem(
                    "Prioridade alterada com sucesso!",
                    "sucesso"
                );
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        acoes.appendChild(botaoAlterar);
        card.appendChild(acoes);
        listaTarefas.appendChild(card);
    });
}

// Evento do formulário.
formTarefa.addEventListener("submit", function(evento) {
    evento.preventDefault();

    try {
        cadastrarTarefa(
            campoTitulo.value,
            Number(campoPrioridade.value)
        );

        formTarefa.reset();
        atualizarLista();

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "sucesso"
        );
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Exibição inicial.
atualizarLista();
