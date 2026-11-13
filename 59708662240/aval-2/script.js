
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoDescricao = document.getElementById("descricao");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const pesquisa = document.getElementById("pesquisa");
const mensagem = document.getElementById("mensagem");

let tarefas = [];

try {
    tarefas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];
} catch (erro) {
    tarefas = [];
}

let editandoId = null;

function salvarTarefas() {
    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
}

function mostrarMensagem(texto, cor = "green") {
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const descricao = campoDescricao.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (titulo.length < 5) {
        mostrarMensagem("O título precisa ter pelo menos 5 caracteres.", "red");
        campoTitulo.focus();
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem("Selecione uma prioridade válida.", "red");
        return;
    }

    if (editandoId !== null) {
        const tarefa = tarefas.find(item => item.id === editandoId);

        if (tarefa) {
            tarefa.titulo = titulo;
            tarefa.descricao = descricao;
            tarefa.prioridade = prioridade;
        }

        editandoId = null;
        document.getElementById("botaoCadastrar").textContent = "Cadastrar tarefa";
        mostrarMensagem("Tarefa atualizada com sucesso!");
    } else {
        const novaTarefa = {
            id: Date.now(),
            titulo: titulo,
            descricao: descricao,
            prioridade: prioridade,
            concluida: false
        };

        tarefas.push(novaTarefa);
        mostrarMensagem("Tarefa cadastrada com sucesso!");
    }

    salvarTarefas();
    formulario.reset();
    campoPrioridade.value = "2";
    mostrarTarefas();
});

function mostrarTarefas() {
    listaTarefas.innerHTML = "";

    const termo = pesquisa.value.trim().toLowerCase();

    const filtradas = tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(termo) ||
        tarefa.descricao.toLowerCase().includes(termo)
    );

    if (filtradas.length === 0) {
        listaTarefas.innerHTML = '<p class="vazio">Nenhuma tarefa encontrada.</p>';
    }

    filtradas.forEach(tarefa => {
        const elemento = document.createElement("div");
        elemento.className = "tarefa";

        if (tarefa.concluida) {
            elemento.classList.add("concluida");
        }

        let nomePrioridade = "";
        let classePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
            classePrioridade = "alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
            classePrioridade = "media";
        } else {
            nomePrioridade = "Baixa";
            classePrioridade = "baixa";
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = tarefa.descricao || "Sem descrição.";

        const prioridade = document.createElement("p");
        prioridade.className = "prioridade " + classePrioridade;
        prioridade.textContent = "Prioridade: " + nomePrioridade;

        const status = document.createElement("p");
        status.textContent = tarefa.concluida ? "Status: Concluída" : "Status: Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = "btn-concluir";
        botaoConcluir.textContent = tarefa.concluida ? "Reabrir" : "Concluir";
        botaoConcluir.addEventListener("click", () => alternarConclusao(tarefa.id));

        const botaoEditar = document.createElement("button");
        botaoEditar.className = "btn-editar";
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", () => editarTarefa(tarefa.id));

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "btn-excluir";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", () => excluirTarefa(tarefa.id));

        acoes.append(botaoConcluir, botaoEditar, botaoExcluir);
        elemento.append(titulo, descricao, prioridade, status, acoes);
        listaTarefas.appendChild(elemento);
    });

    atualizarResumo();
}

function alternarConclusao(id) {
    const tarefa = tarefas.find(item => item.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        mostrarTarefas();
    }
}

function editarTarefa(id) {
    const tarefa = tarefas.find(item => item.id === id);

    if (!tarefa) return;

    campoTitulo.value = tarefa.titulo;
    campoDescricao.value = tarefa.descricao;
    campoPrioridade.value = String(tarefa.prioridade);

    editandoId = id;

    document.getElementById("botaoCadastrar").textContent = "Salvar alterações";
    mostrarMensagem("Edite os dados e clique em Salvar alterações.", "#2457a7");

    campoTitulo.focus();
    formulario.scrollIntoView({ behavior: "smooth" });
}

function excluirTarefa(id) {
    const confirmar = confirm("Deseja realmente excluir esta tarefa?");

    if (!confirmar) return;

    tarefas = tarefas.filter(item => item.id !== id);

    if (editandoId === id) {
        editandoId = null;
        formulario.reset();
        document.getElementById("botaoCadastrar").textContent = "Cadastrar tarefa";
    }

    salvarTarefas();
    mostrarTarefas();
    mostrarMensagem("Tarefa excluída com sucesso!");
}

function atualizarResumo() {
    document.getElementById("total").textContent = tarefas.length;

    const quantidadeConcluidas = tarefas.filter(t => t.concluida).length;
    const quantidadePendentes = tarefas.length - quantidadeConcluidas;

    document.getElementById("concluidas").textContent = quantidadeConcluidas;
    document.getElementById("pendentes").textContent = quantidadePendentes;
}

pesquisa.addEventListener("input", mostrarTarefas);

// Exibe as tarefas salvas ao abrir a página.
mostrarTarefas();
