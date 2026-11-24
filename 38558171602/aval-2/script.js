
// Array que armazena as tarefas
const tarefas = [];

// Gerador automático de códigos
let proximoCodigo = 0;

// Função para validar os dados
function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    const numeroPrioridade = Number(prioridade);

    if (
        numeroPrioridade < 1 ||
        numeroPrioridade > 3 ||
        !Number.isInteger(numeroPrioridade)
    ) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

// Função para cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}

// Função para listar tarefas
function listarTarefas() {
    return tarefas;
}

// Função para buscar tarefa pelo código
function buscarTarefa(codigo) {

    const tarefa = tarefas.find(function(item) {
        return item.codigo === Number(codigo);
    });

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Função para concluir tarefa
function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Essa tarefa já está concluída.");
    }

    tarefa.status = false;

    return tarefa;
}

// Função para alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = Number(novaPrioridade);

    return tarefa;
}

// Elementos do HTML
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const resumo = document.getElementById("resumo");
const contador = document.getElementById("contador");

// Mostrar mensagens na tela
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = "mensagem " + tipo;
}

// Nome da prioridade
function nomePrioridade(valor) {
    const nomes = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    return nomes[valor];
}

// Atualizar a lista na tela
function atualizarTela() {

    const dados = listarTarefas();

    const concluidas = dados.filter(
        tarefa => tarefa.status === false
    ).length;

    contador.textContent =
        dados.length + (dados.length === 1 ? " tarefa" : " tarefas");

    resumo.textContent = dados.length === 0
        ? "Nenhuma tarefa cadastrada."
        : `${dados.length} cadastrada(s) • ${concluidas} concluída(s) • ${dados.length - concluidas} em andamento`;

    if (dados.length === 0) {
        listaTarefas.className = "lista-vazia";
        listaTarefas.textContent = "Suas tarefas aparecerão aqui.";
        return;
    }

    listaTarefas.className = "lista";
    listaTarefas.replaceChildren();

    dados.forEach(tarefa => {

        const cartao = document.createElement("article");

        cartao.className = "tarefa" +
            (tarefa.status ? "" : " concluida");

        const informacoes = document.createElement("div");

        const titulo = document.createElement("p");
        titulo.className = "nome-tarefa";
        titulo.textContent = tarefa.titulo;

        const detalhes = document.createElement("div");
        detalhes.className = "detalhes";

        const codigo = document.createElement("span");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("span");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade +
            " - " + nomePrioridade(tarefa.prioridade);

        const status = document.createElement("span");
        status.textContent = tarefa.status
            ? "Em andamento"
            : "Concluída";

        detalhes.append(codigo, prioridade, status);
        informacoes.append(titulo, detalhes);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão para alterar prioridade
        const botaoPrioridade = document.createElement("button");

        botaoPrioridade.className = "botao-secundario";
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", () => {

            const resposta = prompt(
                "Digite a nova prioridade: 1 (Alta), 2 (Média) ou 3 (Baixa).",
                String(tarefa.prioridade)
            );

            if (resposta === null) return;

            try {
                alterarPrioridade(tarefa.codigo, Number(resposta));

                atualizarTela();

                mostrarMensagem(
                    "Prioridade atualizada!",
                    "sucesso"
                );

            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        acoes.append(botaoPrioridade);

        // Botão para concluir tarefa
        if (tarefa.status) {

            const botaoConcluir = document.createElement("button");

            botaoConcluir.textContent = "Concluir";

            botaoConcluir.addEventListener("click", () => {

                try {
                    concluirTarefa(tarefa.codigo);

                    atualizarTela();

                    mostrarMensagem(
                        "Tarefa concluída com sucesso!",
                        "sucesso"
                    );

                } catch (erro) {
                    mostrarMensagem(erro.message, "erro");
                }
            });

            acoes.append(botaoConcluir);
        }

        cartao.append(informacoes, acoes);

        listaTarefas.append(cartao);
    });
}

// Evento de cadastro
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    try {

        cadastrarTarefa(
            campoTitulo.value,
            Number(campoPrioridade.value)
        );

        formulario.reset();

        campoPrioridade.value = "2";

        atualizarTela();

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "sucesso"
        );

        campoTitulo.focus();

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");
    }
});

// Exibir a tela inicial
atualizarTela();
