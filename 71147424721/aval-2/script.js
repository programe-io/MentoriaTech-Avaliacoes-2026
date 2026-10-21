
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres"
        );
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error(
            "Informe uma prioridade entre 1 e 3"
        );
    }
}

function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error("Código de tarefa não encontrado");
    }

    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    const tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
    return tarefa;
}

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Tarefa já estava como concluída");
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// Elementos da página
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Exibe mensagens de erro ou sucesso
function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "#b91c1c" : "#15803d";
}

// Mostra as tarefas na tela
function renderizarTarefas() {
    listaTarefas.replaceChildren();

    if (listarTarefas().length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "vazio";
        vazio.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(vazio);
        return;
    }

    listarTarefas().forEach(tarefa => {
        const card = document.createElement("article");
        card.className = "tarefa";

        if (!tarefa.status) {
            card.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = `${tarefa.codigo}. ${tarefa.titulo}`;

        const prioridade = document.createElement("p");
        const nomesPrioridade = {
            1: "Baixa",
            2: "Média",
            3: "Alta"
        };

        prioridade.textContent =
            `Prioridade: ${nomesPrioridade[tarefa.prioridade]}`;

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            const botaoConcluir = document.createElement("button");
            botaoConcluir.className = "btn-concluir";
            botaoConcluir.textContent = "Concluir";

            botaoConcluir.addEventListener("click", () => {
                try {
                    concluirTarefa(tarefa.codigo);
                    mostrarMensagem("Tarefa concluída com sucesso!");
                    renderizarTarefas();
                } catch (erro) {
                    mostrarMensagem(erro.message, true);
                }
            });

            acoes.appendChild(botaoConcluir);
        }

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.className = "btn-prioridade";
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", () => {
            const resposta = prompt(
                "Digite a nova prioridade:\n1 - Baixa\n2 - Média\n3 - Alta",
                String(tarefa.prioridade)
            );

            if (resposta === null) {
                return;
            }

            try {
                const novaPrioridade = Number(resposta);

                alterarPrioridade(tarefa.codigo, novaPrioridade);
                mostrarMensagem("Prioridade alterada com sucesso!");
                renderizarTarefas();
            } catch (erro) {
                mostrarMensagem(erro.message, true);
            }
        });

        acoes.appendChild(botaoPrioridade);

        card.append(titulo, prioridade, status, acoes);
        listaTarefas.appendChild(card);
    });
}

// Cadastro de uma nova tarefa
formulario.addEventListener("submit", event => {
    event.preventDefault();

    const titulo = campoTitulo.value;
    const prioridade = Number(campoPrioridade.value);

    try {
        cadastrarTarefa(titulo, prioridade);

        formulario.reset();
        campoPrioridade.value = "1";

        mostrarMensagem("Tarefa cadastrada com sucesso!");
        renderizarTarefas();
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

// Inicializa a lista
renderizarTarefas();
