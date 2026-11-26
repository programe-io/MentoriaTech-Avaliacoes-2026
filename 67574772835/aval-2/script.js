
// Lista que armazenará as tarefas
let tarefas = [];


// FUNÇÃO 1: CADASTRAR UMA NOVA TAREFA
function cadastrarTarefa() {

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Verificar se os campos estão preenchidos
    if (codigo === "" || titulo === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Validar o tamanho do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar a prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar se o código já existe
    const existe = tarefas.some(tarefa => tarefa.codigo === codigo);

    if (existe) {
        alert("Esse código já está cadastrado!");
        return;
    }

    // Criar a nova tarefa
    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar à lista
    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    // Limpar os campos
    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "1";

    listarTarefas();
}


// FUNÇÃO 2: LISTAR AS TAREFAS
function listarTarefas() {

    const tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = tarefa.codigo;

        const titulo = document.createElement("td");
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("td");

        const nomesPrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent =
            tarefa.prioridade + " - " + nomesPrioridade[tarefa.prioridade];

        const status = document.createElement("td");

        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        status.className = tarefa.concluida
            ? "concluida"
            : "pendente";

        const acoes = document.createElement("td");

        // Botão para concluir tarefa
        const botaoConcluir = document.createElement("button");

        botaoConcluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Concluir";

        botaoConcluir.className = "concluir";
        botaoConcluir.dataset.action = "concluir";
        botaoConcluir.dataset.index = index;
        botaoConcluir.disabled = tarefa.concluida;

        // Botão para alterar prioridade
        const botaoEditar = document.createElement("button");

        botaoEditar.textContent = "Alterar prioridade";
        botaoEditar.className = "editar";
        botaoEditar.dataset.action = "editar";
        botaoEditar.dataset.index = index;

        acoes.append(botaoConcluir, botaoEditar);

        linha.append(
            codigo,
            titulo,
            prioridade,
            status,
            acoes
        );

        tabela.appendChild(linha);
    });
}


// FUNÇÃO 3 E 4: CONCLUIR TAREFA E ALTERAR PRIORIDADE
document.getElementById("listaTarefas").addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-action]");

    if (!botao) return;

    const index = Number(botao.dataset.index);
    const tarefa = tarefas[index];

    if (!tarefa) return;

    // Marcar tarefa como concluída
    if (botao.dataset.action === "concluir") {

        tarefa.concluida = true;

        alert("Tarefa concluída com sucesso!");
    }

    // Alterar prioridade
    else if (botao.dataset.action === "editar") {

        const novaPrioridade = prompt(
            "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
        );

        if (novaPrioridade === null || novaPrioridade.trim() === "") {
            return;
        }

        const prioridade = Number(novaPrioridade);

        if (![1, 2, 3].includes(prioridade)) {
            alert("Prioridade inválida! Escolha 1, 2 ou 3.");
            return;
        }

        tarefa.prioridade = prioridade;

        alert("Prioridade alterada com sucesso!");
    }

    listarTarefas();
});
