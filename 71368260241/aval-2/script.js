
// CARREGAR TAREFAS SALVAS

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";

// ELEMENTOS DO HTML

const formTarefa = document.getElementById("formTarefa");

const listaTarefas = document.getElementById("listaTarefas");

const pesquisa = document.getElementById("pesquisa");

// SALVAR DADOS

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ATUALIZAR RESUMO

function atualizarResumo() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent = pendentes;

    document.getElementById("tarefasConcluidas").textContent = concluidas;
}

// CADASTRAR TAREFA

formTarefa.addEventListener("submit", function(event) {

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

    atualizarSistema();

    formTarefa.reset();

    alert("Tarefa cadastrada com sucesso!");

});

// EXIBIR TAREFAS

function listarTarefas() {

    listaTarefas.innerHTML = "";

    const textoPesquisa = pesquisa.value.toLowerCase();

    let filtradas = tarefas.filter(tarefa => {

        const correspondePesquisa =
            tarefa.titulo.toLowerCase().includes(textoPesquisa) ||
            tarefa.descricao.toLowerCase().includes(textoPesquisa);

        const correspondeFiltro =
            filtroAtual === "todas" ||
            (filtroAtual === "pendentes" && !tarefa.concluida) ||
            (filtroAtual === "concluidas" && tarefa.concluida);

        return correspondePesquisa && correspondeFiltro;

    });

    if (filtradas.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.className = "vazio";
        mensagem.textContent = "Nenhuma tarefa encontrada.";

        listaTarefas.appendChild(mensagem);

        return;
    }

    filtradas.forEach(tarefa => {

        const card = document.createElement("div");

        card.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = tarefa.descricao || "Sem descrição.";

        const informacoes = document.createElement("div");
        informacoes.className = "informacoes";

        const prioridade = document.createElement("span");

        prioridade.className = "prioridade " + tarefa.prioridade;

        const nomesPrioridade = {
            baixa: "Baixa",
            media: "Média",
            alta: "Alta"
        };

        prioridade.textContent =
            "Prioridade: " + nomesPrioridade[tarefa.prioridade];

        informacoes.appendChild(prioridade);

        if (tarefa.data) {
            const data = document.createElement("span");

            const partes = tarefa.data.split("-");

            data.textContent =
                "📅 Prazo: " + partes.reverse().join("/");

            informacoes.appendChild(data);
        }

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");

        botaoConcluir.className = "btn-concluir";

        botaoConcluir.textContent = tarefa.concluida
            ? "Reabrir tarefa"
            : "Concluir tarefa";

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.id);
        });

        const botaoExcluir = document.createElement("button");

        botaoExcluir.className = "btn-excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.id);
        });

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoExcluir);

        card.appendChild(titulo);
        card.appendChild(descricao);
        card.appendChild(informacoes);
        card.appendChild(acoes);

        listaTarefas.appendChild(card);

    });

}

// CONCLUIR OU REABRIR TAREFA

function concluirTarefa(id) {

    tarefas = tarefas.map(tarefa => {

        if (tarefa.id === id) {
            return {
                ...tarefa,
                concluida: !tarefa.concluida
            };
        }

        return tarefa;

    });

    salvarTarefas();

    atualizarSistema();

}

// EXCLUIR TAREFA

function excluirTarefa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    salvarTarefas();

    atualizarSistema();

}

// PESQUISAR TAREFAS

pesquisa.addEventListener("input", function() {

    listarTarefas();

});

// FILTRAR TAREFAS

document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", function() {

        document.querySelectorAll(".filtro").forEach(item => {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");

        filtroAtual = this.dataset.filtro;

        listarTarefas();

    });

});

// ATUALIZAR SISTEMA

function atualizarSistema() {

    atualizarResumo();

    listarTarefas();

}

// INICIALIZAR

atualizarSistema();
