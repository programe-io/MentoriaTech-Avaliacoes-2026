
// Lista de tarefas
let tarefas = [];
let proximoCodigo = 1;

// Elementos do HTML
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const lista = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Exibir mensagens
function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "#dc3545" : "#198754";
}

// 1. Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validar título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            true
        );
        return;
    }

    // Validar prioridade
    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            true
        );
        return;
    }

    // Criar tarefa
    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    formulario.reset();
    campoPrioridade.value = "2";

    mostrarMensagem("Tarefa cadastrada com sucesso!");
    listarTarefas();
});

// 2. Listar as tarefas
function listarTarefas() {
    lista.replaceChildren();

    if (tarefas.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "vazio";
        vazio.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(vazio);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const card = document.createElement("div");
        card.className = "tarefa" +
            (tarefa.concluida ? " concluida" : "");

        const titulo = document.createElement("h3");
        titulo.textContent =
            tarefa.codigo + " - " + tarefa.titulo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " +
            ["", "Alta", "Média", "Baixa"][tarefa.prioridade];

        prioridade.className =
            ["", "alta", "media", "baixa"][tarefa.prioridade];

        const status = document.createElement("p");
        status.textContent = "Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão para concluir
        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = "concluir";
        botaoConcluir.textContent = tarefa.concluida
            ? "Já concluída"
            : "Concluir tarefa";
        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        // Seletor para alterar prioridade
        const seletor = document.createElement("select");
        seletor.setAttribute(
            "aria-label",
            "Prioridade da tarefa " + tarefa.codigo
        );

        const opcoes = [
            { valor: 1, texto: "1 - Alta" },
            { valor: 2, texto: "2 - Média" },
            { valor: 3, texto: "3 - Baixa" }
        ];

        opcoes.forEach(function(opcao) {
            const item = document.createElement("option");
            item.value = opcao.valor;
            item.textContent = opcao.texto;
            seletor.appendChild(item);
        });

        seletor.value = String(tarefa.prioridade);

        seletor.addEventListener("change", function() {
            alterarPrioridade(
                tarefa.codigo,
                Number(seletor.value)
            );
        });

        // Botão para excluir
        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.codigo);
        });

        acoes.append(
            botaoConcluir,
            seletor,
            botaoExcluir
        );

        card.append(
            titulo,
            prioridade,
            status,
            acoes
        );

        lista.appendChild(card);
    });
}

// 3. Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.", true);
        return;
    }

    tarefa.concluida = true;

    mostrarMensagem("Tarefa concluída com sucesso!");
    listarTarefas();
}

// 4. Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 || novaPrioridade > 3) {
        mostrarMensagem("Prioridade inválida.", true);
        return;
    }

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.", true);
        return;
    }

    tarefa.prioridade = novaPrioridade;

    mostrarMensagem("Prioridade alterada com sucesso!");
    listarTarefas();
}

// Função extra: excluir tarefa
function excluirTarefa(codigo) {
    tarefas = tarefas.filter(
        tarefa => tarefa.codigo !== codigo
    );

    mostrarMensagem("Tarefa excluída com sucesso!");
    listarTarefas();
}

// Exibir a lista inicial
listarTarefas();
