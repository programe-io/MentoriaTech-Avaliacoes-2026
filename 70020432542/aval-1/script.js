
let tarefas = [];
let proximoCodigo = 0;
let filtroAtual = "todas";

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Valida o título e a prioridade da tarefa.
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir pelo menos cinco caracteres."
        );
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}

// Cadastra uma nova tarefa.
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    listarTarefas();
    atualizarResumo();

    return novaTarefa;
}

// Retorna todas as tarefas cadastradas.
function listarTarefas() {
    return tarefas;
}

// Busca uma tarefa pelo código.
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        throw new Error("Código da tarefa não encontrado.");
    }

    return tarefa;
}

// Marca uma tarefa como concluída.
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    listarTarefas();
    atualizarResumo();
}

// Altera a prioridade de uma tarefa.
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
    atualizarResumo();
}

// Exibe mensagens para o usuário.
function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("erro", erro);
}

// Retorna o nome da prioridade.
function nomePrioridade(prioridade) {
    const nomes = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    return nomes[prioridade];
}

// Atualiza os números do painel.
function atualizarResumo() {
    const concluidas = tarefas.filter(function(tarefa) {
        return tarefa.status === false;
    }).length;

    const pendentes = tarefas.filter(function(tarefa) {
        return tarefa.status === true;
    }).length;

    document.getElementById("totalTarefas").textContent =
        tarefas.length;

    document.getElementById("totalPendentes").textContent =
        pendentes;

    document.getElementById("totalConcluidas").textContent =
        concluidas;
}

// Cria um botão com ação.
function criarBotao(texto, classe, acao) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.className = "botao-acao " + classe;

    botao.addEventListener("click", acao);

    return botao;
}

// Mostra as tarefas na tela.
function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {
        tarefasFiltradas = tarefas.filter(function(tarefa) {
            return tarefa.status === true;
        });
    }

    if (filtroAtual === "concluidas") {
        tarefasFiltradas = tarefas.filter(function(tarefa) {
            return tarefa.status === false;
        });
    }

    if (tarefasFiltradas.length === 0) {
        const vazio = document.createElement("div");
        vazio.className = "vazio";

        const icone = document.createElement("div");
        icone.className = "vazio-icone";
        icone.textContent = "☰";

        const titulo = document.createElement("p");
        titulo.textContent = "Nenhuma tarefa encontrada.";

        const descricao = document.createElement("span");
        descricao.textContent =
            "Cadastre uma tarefa ou escolha outro filtro.";

        vazio.append(icone, titulo, descricao);
        listaTarefas.appendChild(vazio);

        return;
    }

    tarefasFiltradas.forEach(function(tarefa) {
        const item = document.createElement("article");

        item.className = "tarefa";

        if (!tarefa.status) {
            item.classList.add("concluida");
        }

        const informacoes = document.createElement("div");
        informacoes.className = "tarefa-info";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "check";
        checkbox.checked = !tarefa.status;
        checkbox.setAttribute(
            "aria-label",
            "Concluir " + tarefa.titulo
        );

        checkbox.disabled = !tarefa.status;

        checkbox.addEventListener("change", function() {
            try {
                concluirTarefa(tarefa.codigo);
                mostrarMensagem("Tarefa concluída com sucesso!");
            } catch (erro) {
                mostrarMensagem(erro.message, true);
            }
        });

        const texto = document.createElement("div");
        texto.className = "tarefa-texto";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const detalhes = document.createElement("div");
        detalhes.className = "detalhes";

        const prioridade = document.createElement("span");
        prioridade.className = "prioridade";

        if (tarefa.prioridade === 1) {
            prioridade.classList.add("alta");
        } else if (tarefa.prioridade === 2) {
            prioridade.classList.add("media");
        } else {
            prioridade.classList.add("baixa");
        }

        prioridade.textContent =
            "Prioridade " + nomePrioridade(tarefa.prioridade);

        const status = document.createElement("span");
        status.className = "status-tarefa";
        status.textContent = tarefa.status
            ? "Pendente"
            : "Concluída";

        detalhes.append(prioridade, status);
        texto.append(titulo, detalhes);
        informacoes.append(checkbox, texto);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            const botaoAlterar = criarBotao(
                "Alterar prioridade",
                "botao-prioridade",
                function() {
                    const entrada = prompt(
                        "Digite a nova prioridade:\n" +
                        "1 - Alta\n2 - Média\n3 - Baixa",
                        String(tarefa.prioridade)
                    );

                    if (entrada === null) return;

                    const valor = entrada.trim() === ""
                        ? NaN
                        : Number(entrada);

                    try {
                        alterarPrioridade(tarefa.codigo, valor);
                        mostrarMensagem(
                            "Prioridade alterada com sucesso!"
                        );
                    } catch (erro) {
                        mostrarMensagem(erro.message, true);
                    }
                }
            );

            acoes.appendChild(botaoAlterar);
        }

        item.append(informacoes, acoes);
        listaTarefas.appendChild(item);
    });
}

// Atualiza a listagem e o painel.
function atualizarTela() {
    renderizarTarefas();
    atualizarResumo();
}

// Atualiza a função de listagem visual.
function listarTarefasNaTela() {
    atualizarTela();
}

// Recebe o formulário de cadastro.
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value;
    const prioridade = Number(campoPrioridade.value);

    try {
        cadastrarTarefa(titulo, prioridade);

        formulario.reset();
        campoPrioridade.value = "2";

        mostrarMensagem("Tarefa cadastrada com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

// Configura os filtros da listagem.
document.querySelectorAll(".filtro").forEach(function(botao) {
    botao.addEventListener("click", function() {
        filtroAtual = botao.dataset.filtro;

        document.querySelectorAll(".filtro").forEach(function(item) {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        renderizarTarefas();
    });
});

// Prepara a tela inicial.
listarTarefasNaTela();
