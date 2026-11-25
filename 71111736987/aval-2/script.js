
const campoTitulo = document.getElementById("tituloTarefa");
const campoPrioridade = document.getElementById("prioridadeTarefa");
const selecionarTarefa = document.getElementById("selecionarTarefa");

const listaTarefas = document.getElementById("listaTarefas");
const contadorTarefas = document.getElementById("contadorTarefas");

document.getElementById("btAdicionar").onclick = cadastrarTarefa;
document.getElementById("btStatus").onclick = alterarStatus;
document.getElementById("btPrioridade").onclick = alterarPrioridade;

let tarefas = [];
let proximoCodigo = 1;

function validarTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return false;
    }

    if (![1, 2, 3].includes(Number(prioridade))) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return false;
    }

    return true;
}

function cadastrarTarefa() {

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (!validarTarefa(titulo, prioridade)) {
        campoTitulo.focus();
        return;
    }

    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    campoTitulo.value = "";
    campoPrioridade.value = "2";

    exibirTarefas(novaTarefa.codigo);

    campoTitulo.focus();
}

function exibirTarefas(codigoSelecionado = selecionarTarefa.value) {

    listaTarefas.innerHTML = "";
    selecionarTarefa.innerHTML = "";

    const opcaoInicial = document.createElement("option");
    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione uma tarefa";

    selecionarTarefa.appendChild(opcaoInicial);

    if (tarefas.length === 0) {

        const mensagem = document.createElement("li");
        mensagem.className = "empty";
        mensagem.textContent = "Nenhuma tarefa cadastrada ainda.";

        listaTarefas.appendChild(mensagem);

    } else {

        tarefas.forEach((tarefa) => {

            const item = document.createElement("li");

            item.className = tarefa.concluida
                ? "item-tarefa concluida"
                : "item-tarefa";

            const informacoes = document.createElement("div");
            informacoes.className = "task-info";

            const titulo = document.createElement("strong");
            titulo.textContent = `${tarefa.codigo}. ${tarefa.titulo}`;

            const detalhes = document.createElement("span");
            detalhes.className = "task-details";

            detalhes.textContent =
                `Prioridade: ${textoPrioridade(tarefa.prioridade)} | ` +
                `Status: ${tarefa.concluida ? "Concluída" : "Pendente"}`;

            informacoes.append(titulo, detalhes);
            item.appendChild(informacoes);

            listaTarefas.appendChild(item);

            const opcao = document.createElement("option");

            opcao.value = tarefa.codigo;
            opcao.textContent = `${tarefa.codigo} - ${tarefa.titulo}`;

            selecionarTarefa.appendChild(opcao);

        });

    }

    if (tarefas.some(tarefa => tarefa.codigo === Number(codigoSelecionado))) {
        selecionarTarefa.value = codigoSelecionado;
    }

    const total = tarefas.length;

    contadorTarefas.textContent =
        `${total} ${total === 1 ? "tarefa" : "tarefas"}`;
}

function textoPrioridade(prioridade) {

    if (prioridade === 1) {
        return "1 - Alta";
    }

    if (prioridade === 2) {
        return "2 - Média";
    }

    return "3 - Baixa";
}

function alterarStatus() {

    const codigo = Number(selecionarTarefa.value);

    const tarefa = tarefas.find(item => item.codigo === codigo);

    if (!tarefa) {
        alert("Selecione uma tarefa.");
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    exibirTarefas(codigo);
}

function alterarPrioridade() {

    const codigo = Number(selecionarTarefa.value);

    const tarefa = tarefas.find(item => item.codigo === codigo);

    if (!tarefa) {
        alert("Selecione uma tarefa.");
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
        String(tarefa.prioridade)
    );

    if (novaPrioridade === null) {
        return;
    }

    const prioridade = Number(novaPrioridade.trim());

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida. Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = prioridade;

    exibirTarefas(codigo);
}

campoTitulo.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {
        cadastrarTarefa();
    }

});

exibirTarefas();
