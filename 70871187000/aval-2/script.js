
// =====================================
// GERENCIADOR DE TAREFAS - JAVASCRIPT
// =====================================

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const form = document.getElementById("formTarefa");

// SALVAR TAREFAS
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    atualizarTela();
}

// VERIFICAR STATUS
function verificarStatus(tarefa) {
    if (tarefa.concluida) {
        return "Concluída";
    }

    if (tarefa.data && tarefa.data < obterDataAtual()) {
        return "Atrasada";
    }

    return "Pendente";
}

// DATA ATUAL
function obterDataAtual() {
    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

// CADASTRAR TAREFA
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    const data = document.getElementById("data").value;

    if (!titulo) {
        alert("Informe o título da tarefa!");
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        descricao: descricao,
        prioridade: prioridade,
        data: data,
        concluida: false
    };

    tarefas.push(tarefa);

    salvarTarefas();

    form.reset();

    alert("Tarefa cadastrada com sucesso!");
});

// LISTAR TAREFAS
function listarTarefas() {
    const lista = document.getElementById("tarefas");

    lista.innerHTML = "";

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const filtro = document.getElementById("filtro").value;

    const resultado = tarefas.filter(tarefa => {

        const texto = (
            tarefa.titulo + " " + tarefa.descricao
        ).toLowerCase();

        return texto.includes(pesquisa) &&
            (
                filtro === "Todas" ||
                verificarStatus(tarefa) === filtro
            );
    });

    resultado.forEach(tarefa => {

        const div = document.createElement("div");
        div.className = "tarefa";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = tarefa.descricao;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade;

        const data = document.createElement("p");
        data.textContent =
            "Data: " + (tarefa.data || "Não definida");

        const status = document.createElement("p");
        status.textContent =
            "Status: " + verificarStatus(tarefa);

        // BOTÃO CONCLUIR
        const btnConcluir = document.createElement("button");

        btnConcluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        btnConcluir.className = "concluir";

        btnConcluir.onclick = function() {
            concluirTarefa(tarefa.id);
        };

        // BOTÃO EDITAR
        const btnEditar = document.createElement("button");

        btnEditar.textContent = "Editar";
        btnEditar.className = "editar";

        btnEditar.onclick = function() {
            editarTarefa(tarefa.id);
        };

        // BOTÃO EXCLUIR
        const btnExcluir = document.createElement("button");

        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "excluir";

        btnExcluir.onclick = function() {
            excluirTarefa(tarefa.id);
        };

        div.append(
            titulo,
            descricao,
            prioridade,
            data,
            status,
            btnConcluir,
            btnEditar,
            btnExcluir
        );

        lista.appendChild(div);
    });

    atualizarDashboard();
}

// CONCLUIR TAREFA
function concluirTarefa(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    salvarTarefas();
}

// EDITAR TAREFA
function editarTarefa(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    const titulo = prompt("Novo título:", tarefa.titulo);

    if (titulo === null || !titulo.trim()) return;

    const descricao = prompt(
        "Nova descrição:",
        tarefa.descricao
    );

    if (descricao === null) return;

    const prioridade = prompt(
        "Prioridade (Baixa, Média ou Alta):",
        tarefa.prioridade
    );

    if (prioridade === null) return;

    if (!["Baixa", "Média", "Alta"].includes(prioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.titulo = titulo.trim();
    tarefa.descricao = descricao;
    tarefa.prioridade = prioridade;

    salvarTarefas();
}

// EXCLUIR TAREFA
function excluirTarefa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(t => t.id !== id);

    salvarTarefas();
}

// ATUALIZAR DASHBOARD
function atualizarDashboard() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        t => t.concluida
    ).length;

    const atrasadas = tarefas.filter(
        t => verificarStatus(t) === "Atrasada"
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent = pendentes;

    document.getElementById("concluidas").textContent = concluidas;

    document.getElementById("atrasadas").textContent = atrasadas;

    // PROGRESSO
    const percentual = total > 0
        ? Math.round((concluidas / total) * 100)
        : 0;

    document.getElementById("barraProgresso")
        .style.width = percentual + "%";

    document.getElementById("percentual")
        .textContent = percentual + "% concluído";
}

// PESQUISAR TAREFAS
document.getElementById("pesquisa")
    .addEventListener("input", listarTarefas);

// FILTRAR TAREFAS
document.getElementById("filtro")
    .addEventListener("change", listarTarefas);

// ATUALIZAR TELA
function atualizarTela() {
    listarTarefas();
}

// INICIALIZAR SISTEMA
atualizarTela();
