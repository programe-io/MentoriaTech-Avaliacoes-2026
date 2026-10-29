
const tarefas = [];
let codigoAtual = 1;

const formulario = document.getElementById("formulario");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");

// Cadastrar tarefa
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (titulo.length < 5) {
        exibirMensagem("O título precisa ter pelo menos 5 caracteres.", true);
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        exibirMensagem("Escolha uma prioridade entre 1 e 3.", true);
        return;
    }

    const tarefa = {
        codigo: codigoAtual,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    codigoAtual++;
    tarefas.push(tarefa);

    formulario.reset();
    campoPrioridade.value = "1";

    exibirMensagem("Tarefa cadastrada com sucesso!", false);
    mostrarTarefas();
});

// Exibir mensagens
function exibirMensagem(texto, erro) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "#d32f2f" : "#2e7d32";
}

// Listar tarefas
function mostrarTarefas() {
    lista.replaceChildren();

    if (tarefas.length === 0) {
        const itemVazio = document.createElement("li");
        itemVazio.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(itemVazio);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const item = document.createElement("li");
        item.className = "item";

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const nome = document.createElement("h3");
        nome.className = "nome";
        nome.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " +
            (tarefa.prioridade === 1 ? "Alta" :
             tarefa.prioridade === 2 ? "Média" : "Baixa");

        const status = document.createElement("p");
        status.textContent =
            "Status: " + (tarefa.concluida ? "Concluída" : "Pendente");

        item.append(codigo, nome, prioridade, status);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        if (!tarefa.concluida) {
            const botaoConcluir = document.createElement("button");
            botaoConcluir.textContent = "Concluir";
            botaoConcluir.className = "concluir";

            botaoConcluir.addEventListener("click", function() {
                concluirTarefa(tarefa.codigo);
            });

            acoes.appendChild(botaoConcluir);
        }

        const botaoAlterar = document.createElement("button");
        botaoAlterar.textContent = "Alterar prioridade";
        botaoAlterar.className = "alterar";

        botaoAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.appendChild(botaoAlterar);
        item.appendChild(acoes);
        lista.appendChild(item);
    });
}

// Concluir tarefa
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        exibirMensagem("Tarefa não encontrada.", true);
        return;
    }

    tarefa.concluida = true;

    exibirMensagem("Tarefa concluída!", false);
    mostrarTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        exibirMensagem("Tarefa não encontrada.", true);
        return;
    }

    const resposta = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (resposta === null || resposta.trim() === "") {
        return;
    }

    const novaPrioridade = Number(resposta);

    if (![1, 2, 3].includes(novaPrioridade)) {
        exibirMensagem("Prioridade inválida! Use 1, 2 ou 3.", true);
        return;
    }

    tarefa.prioridade = novaPrioridade;

    exibirMensagem("Prioridade alterada com sucesso!", false);
    mostrarTarefas();
}

// Exibir a lista inicial
mostrarTarefas();
