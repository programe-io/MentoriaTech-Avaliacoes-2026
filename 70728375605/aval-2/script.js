
const nomeTarefa = document.getElementById("nomeTarefa");
const prioridade = document.getElementById("prioridade");
const selecionarTarefa = document.getElementById("selecionarTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const contadorTarefas = document.getElementById("contadorTarefas");

const btAdicionar = document.getElementById("btAdicionar");
const btStatus = document.getElementById("btStatus");
const btPrioridade = document.getElementById("btPrioridade");

let tarefas = [];
let proximoCodigo = 1;

btAdicionar.addEventListener("click", cadastrarTarefa);
btStatus.addEventListener("click", alterarStatus);
btPrioridade.addEventListener("click", alterarPrioridade);

function cadastrarTarefa() {
    const nome = nomeTarefa.value.trim();
    const nivel = Number(prioridade.value);

    if (nome.length < 5) {
        alert("Digite uma tarefa com pelo menos 5 caracteres.");
        nomeTarefa.focus();
        return;
    }

    if (![1, 2, 3].includes(nivel)) {
        alert("Selecione uma prioridade válida.");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        nome: nome,
        prioridade: nivel,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    nomeTarefa.value = "";
    prioridade.value = "1";

    exibirTarefas(String(tarefa.codigo));
    nomeTarefa.focus();
}

function alterarStatus() {
    const codigo = Number(selecionarTarefa.value);

    if (!codigo) {
        alert("Selecione uma tarefa primeiro.");
        return;
    }

    const tarefa = tarefas.find(item => item.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    exibirTarefas(String(codigo));
}

function alterarPrioridade() {
    const codigo = Number(selecionarTarefa.value);

    if (!codigo) {
        alert("Selecione uma tarefa primeiro.");
        return;
    }

    const tarefa = tarefas.find(item => item.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const resposta = prompt(
        "Escolha a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
        String(tarefa.prioridade)
    );

    if (resposta === null) {
        return;
    }

    const novaPrioridade = Number(resposta);

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    exibirTarefas(String(codigo));
}

function textoPrioridade(nivel) {
    if (nivel === 1) return "Alta";
    if (nivel === 2) return "Média";
    return "Baixa";
}

function exibirTarefas(codigoSelecionado = selecionarTarefa.value) {
    listaTarefas.innerHTML = "";
    selecionarTarefa.innerHTML = "";

    if (tarefas.length === 0) {
        selecionarTarefa.innerHTML = '<option value="">Nenhuma tarefa cadastrada</option>';
        listaTarefas.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        contadorTarefas.textContent = "Total de tarefas: 0";
        return;
    }

    const opcaoInicial = document.createElement("option");
    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione uma tarefa";
    selecionarTarefa.appendChild(opcaoInicial);

    tarefas.forEach(tarefa => {
        const opcao = document.createElement("option");
        opcao.value = tarefa.codigo;
        opcao.textContent = tarefa.nome;
        selecionarTarefa.appendChild(opcao);

        const item = document.createElement("div");
        item.className = tarefa.concluida ? "tarefa concluida" : "tarefa";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.nome;

        const estado = document.createElement("p");
        estado.textContent = tarefa.concluida ? "Status: Concluída" : "Status: Pendente";

        const nivel = document.createElement("p");
        nivel.textContent = "Prioridade: " + textoPrioridade(tarefa.prioridade);

        item.appendChild(titulo);
        item.appendChild(estado);
        item.appendChild(nivel);

        listaTarefas.appendChild(item);
    });

    const existeSelecionada = tarefas.some(
        tarefa => String(tarefa.codigo) === String(codigoSelecionado)
    );

    selecionarTarefa.value = existeSelecionada ? String(codigoSelecionado) : "";

    contadorTarefas.textContent = "Total de tarefas: " + tarefas.length;
}

exibirTarefas();
