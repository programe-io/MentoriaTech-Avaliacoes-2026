
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const filtro = document.getElementById("filtro");

// Salvar tarefas no navegador
function salvarTarefas() {
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

// Adicionar uma nova tarefa
function adicionarTarefa(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prazo = document.getElementById("prazo").value;
    const prioridade = document.getElementById("prioridade").value;

    if (!titulo || !prazo) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        descricao: descricao,
        prazo: prazo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(tarefa);

    salvarTarefas();
    mostrarTarefas();

    formulario.reset();

    alert("Tarefa adicionada com sucesso!");
}

// Exibir tarefas
function mostrarTarefas() {
    lista.innerHTML = "";

    const tipoFiltro = filtro.value;

    const tarefasFiltradas = tarefas.filter(tarefa =>
        tipoFiltro === "Todas" ||
        tarefa.status === tipoFiltro
    );

    if (tarefasFiltradas.length === 0) {
        lista.textContent = "Nenhuma tarefa encontrada.";
    }

    tarefasFiltradas.forEach(tarefa => {
        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.status === "Concluída") {
            div.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = tarefa.descricao;

        const prazo = document.createElement("p");
        prazo.textContent = "Prazo: " + tarefa.prazo;

        const prioridade = document.createElement("p");
        prioridade.className = "prioridade";
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade;

        const status = document.createElement("p");
        status.textContent = "Status: " + tarefa.status;

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = "concluir";
        botaoConcluir.textContent =
            tarefa.status === "Concluída"
                ? "Reabrir"
                : "Concluir";

        botaoConcluir.addEventListener("click", () => {
            alterarStatus(tarefa.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", () => {
            excluirTarefa(tarefa.id);
        });

        acoes.append(botaoConcluir, botaoExcluir);

        div.append(
            titulo,
            descricao,
            prazo,
            prioridade,
            status,
            acoes
        );

        lista.appendChild(div);
    });

    atualizarResumo();
}

// Alterar status da tarefa
function alterarStatus(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.status =
                tarefa.status === "Pendente"
                    ? "Concluída"
                    : "Pendente";
        }

        return tarefa;
    });

    salvarTarefas();
    mostrarTarefas();
}

// Excluir tarefa
function excluirTarefa(id) {
    if (confirm("Deseja excluir esta tarefa?")) {
        tarefas = tarefas.filter(
            tarefa => tarefa.id !== id
        );

        salvarTarefas();
        mostrarTarefas();
    }
}

// Atualizar resumo
function atualizarResumo() {
    document.getElementById("total").textContent =
        tarefas.length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(
            tarefa => tarefa.status === "Pendente"
        ).length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(
            tarefa => tarefa.status === "Concluída"
        ).length;
}

// Eventos
formulario.addEventListener(
    "submit",
    adicionarTarefa
);

filtro.addEventListener(
    "change",
    mostrarTarefas
);

// Carregar tarefas ao abrir o sistema
mostrarTarefas();
