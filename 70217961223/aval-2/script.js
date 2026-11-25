
// Recuperar tarefas salvas no navegador
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Elementos HTML
const form = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const pesquisa = document.getElementById("pesquisa");

// Salvar tarefas no LocalStorage
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Retornar nome da prioridade
function nomePrioridade(valor) {
    if (valor === 1) return "Alta";
    if (valor === 2) return "Média";
    return "Baixa";
}

// Retornar classe CSS da prioridade
function classePrioridade(valor) {
    if (valor === 1) return "alta";
    if (valor === 2) return "media";
    return "baixa";
}

// Atualizar os indicadores
function atualizarResumo() {

    const total = tarefas.length;

    const totalConcluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const totalPendentes = total - totalConcluidas;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("concluidas").textContent =
        totalConcluidas;

    document.getElementById("pendentes").textContent =
        totalPendentes;
}

// Cadastrar uma nova tarefa
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const novoTitulo = titulo.value.trim();
    const novaPrioridade = Number(prioridade.value);

    // REGRA 1: título com no mínimo 5 caracteres
    if (novoTitulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        titulo.focus();
        return;
    }

    // REGRA 2: prioridade entre 1 e 3
    if (
        !Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {
        alert("A prioridade deve ser um valor entre 1 e 3!");
        return;
    }

    // Criar objeto da tarefa
    const novaTarefa = {
        id: Date.now(),
        titulo: novoTitulo,
        prioridade: novaPrioridade,
        concluida: false
    };

    // Adicionar tarefa ao array
    tarefas.push(novaTarefa);

    // Salvar e atualizar a tela
    salvarTarefas();
    renderizarTarefas();

    // Limpar formulário
    form.reset();

    alert("Tarefa cadastrada com sucesso!");

});

// Listar tarefas
function renderizarTarefas(filtro = "") {

    listaTarefas.innerHTML = "";

    const tarefasFiltradas = tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    document.getElementById("mensagemVazia").hidden =
        tarefasFiltradas.length > 0;

    tarefasFiltradas.forEach(tarefa => {

        const div = document.createElement("div");
        div.className = "tarefa";

        // Informações
        const info = document.createElement("div");
        info.className = "info";

        if (tarefa.concluida) {
            info.classList.add("concluida");
        }

        const h3 = document.createElement("h3");
        h3.textContent = tarefa.titulo;

        const p = document.createElement("p");
        p.className = classePrioridade(tarefa.prioridade);

        p.textContent =
            "Prioridade: " +
            tarefa.prioridade +
            " - " +
            nomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.className = "status";

        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        info.append(h3, p, status);

        // Botões de ações
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnConcluir = document.createElement("button");
        btnConcluir.className = "btnConcluir";

        btnConcluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        btnConcluir.addEventListener("click", function() {
            marcarConcluida(tarefa.id);
        });

        const btnPrioridade = document.createElement("button");
        btnPrioridade.className = "btnPrioridade";
        btnPrioridade.textContent = "Prioridade";

        btnPrioridade.addEventListener("click", function() {
            alterarPrioridade(tarefa.id);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "btnExcluir";
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.id);
        });

        acoes.append(
            btnConcluir,
            btnPrioridade,
            btnExcluir
        );

        div.append(info, acoes);

        listaTarefas.appendChild(div);

    });

    atualizarResumo();
}

// Marcar tarefa como concluída
function marcarConcluida(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;

        salvarTarefas();
        renderizarTarefas(pesquisa.value);
    }

}

// Alterar prioridade
function alterarPrioridade(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (novaPrioridade === null) return;

    const valor = Number(novaPrioridade.trim());

    if (
        !["1", "2", "3"].includes(novaPrioridade.trim()) ||
        !Number.isInteger(valor)
    ) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = valor;

    salvarTarefas();
    renderizarTarefas(pesquisa.value);

    alert("Prioridade alterada com sucesso!");

}

// Excluir tarefa
function excluirTarefa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (confirmar) {

        tarefas = tarefas.filter(tarefa => tarefa.id !== id);

        salvarTarefas();
        renderizarTarefas(pesquisa.value);

        alert("Tarefa excluída com sucesso!");
    }

}

// Pesquisar tarefas
pesquisa.addEventListener("input", function() {
    renderizarTarefas(pesquisa.value);
});

// Inicializar sistema
renderizarTarefas();
