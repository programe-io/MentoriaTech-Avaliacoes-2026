
// Array que armazena as tarefas
const tarefas = [];

let proximoCodigo = 0;

// Função para validar os dados
function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error("O título precisa ter pelo menos 5 caracteres!");
    }

    if (prioridade < 1 || prioridade > 3 ||
        !Number.isInteger(prioridade)) {
        throw new Error("A prioridade deve ser 1, 2 ou 3!");
    }
}

// Função para cadastrar uma tarefa
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

    return novaTarefa;
}

// Função para listar as tarefas
function listarTarefas() {
    return tarefas;
}

// Função para buscar uma tarefa pelo código
function buscarTarefa(codigo) {

    const tarefa = tarefas.find(function(item) {
        return item.codigo === Number(codigo);
    });

    if (!tarefa) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefa;
}

// Função para concluir uma tarefa
function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Essa tarefa já foi concluída!");
    }

    tarefa.status = false;

    return tarefa;
}

// Função para alterar a prioridade
function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}

// Mostrar as tarefas na tela
function mostrarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const nome = document.createElement("strong");
        nome.className = "nome";
        nome.textContent =
            "Código: " + tarefa.codigo +
            " - " + tarefa.titulo;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            "Prioridade: " + tarefa.prioridade +
            " | Status: " +
            (tarefa.status ? "Em execução" : "Concluída");

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.disabled = !tarefa.status;

        botaoConcluir.onclick = function() {
            executarAcao(function() {
                concluirTarefa(tarefa.codigo);
            });
        };

        const botaoAlterar = document.createElement("button");
        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.onclick = function() {

            const nova = prompt(
                "Digite 1 para Alta, 2 para Média ou 3 para Baixa:"
            );

            if (nova === null || nova.trim() === "") {
                return;
            }

            executarAcao(function() {
                alterarPrioridade(
                    tarefa.codigo,
                    Number(nova)
                );
            });
        };

        acoes.append(botaoConcluir, botaoAlterar);
        div.append(nome, detalhes, acoes);

        lista.appendChild(div);
    });
}

// Executar uma ação e tratar possíveis erros
function executarAcao(acao) {

    try {
        acao();

        document.getElementById("mensagem").textContent =
            "Operação realizada com sucesso!";

        mostrarTarefas();

    } catch (erro) {

        document.getElementById("mensagem").textContent =
            erro.message;
    }
}

// Evento do formulário de cadastro
document.getElementById("formTarefa")
.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const titulo =
        document.getElementById("titulo").value;

    const prioridade =
        Number(document.getElementById("prioridade").value);

    executarAcao(function() {
        cadastrarTarefa(titulo, prioridade);
    });

    if (document.getElementById("mensagem").textContent
        === "Operação realizada com sucesso!") {
        this.reset();
    }
});

// Buscar tarefa pela tela
function buscarNaTela() {

    const codigo =
        document.getElementById("codigoBusca").value;

    const resultado =
        document.getElementById("resultadoBusca");

    try {

        if (codigo.trim() === "") {
            throw new Error("Digite um código!");
        }

        const tarefa = buscarTarefa(codigo);

        resultado.textContent =
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " +
            (tarefa.status ? "Em execução" : "Concluída");

    } catch (erro) {

        resultado.textContent = erro.message;
    }
}

// Exibir lista inicialmente
mostrarTarefas();
