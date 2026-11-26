
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const campo = document.getElementById("nomeTarefa");
    const prioridade = document.getElementById("prioridade");

    const nome = campo.value.trim();

    if (nome === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const tarefa = {
        id: Date.now(),
        nome: nome,
        prioridade: prioridade.value,
        concluida: false
    };

    tarefas.push(tarefa);

    salvarTarefas();
    atualizarTela();

    campo.value = "";
}

function concluirTarefa(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }

        return tarefa;
    });

    salvarTarefas();
    atualizarTela();
}

function excluirTarefa(id) {
    if (confirm("Deseja excluir esta tarefa?")) {
        tarefas = tarefas.filter(tarefa => tarefa.id !== id);

        salvarTarefas();
        atualizarTela();
    }
}

function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    const novoNome = prompt(
        "Digite o novo nome da tarefa:",
        tarefa.nome
    );

    if (novoNome !== null && novoNome.trim() !== "") {
        tarefa.nome = novoNome.trim();

        salvarTarefas();
        atualizarTela();
    }
}

function atualizarTela() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
    }

    tarefas.forEach(tarefa => {
        const item = document.createElement("div");

        item.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const info = document.createElement("div");
        info.className = "tarefa-info";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.nome;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            "Prioridade: " + tarefa.prioridade;

        info.append(titulo, detalhes);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.className = "btn-concluir";
        concluir.textContent = tarefa.concluida
            ? "Desfazer"
            : "Concluir";
        concluir.onclick = () => concluirTarefa(tarefa.id);

        const editar = document.createElement("button");
        editar.className = "btn-editar";
        editar.textContent = "Editar";
        editar.onclick = () => editarTarefa(tarefa.id);

        const excluir = document.createElement("button");
        excluir.className = "btn-excluir";
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirTarefa(tarefa.id);

        acoes.append(concluir, editar, excluir);
        item.append(info, acoes);

        lista.appendChild(item);
    });

    document.getElementById("total").textContent =
        tarefas.length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(t => t.concluida).length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(t => !t.concluida).length;
}

// Carregar tarefas ao abrir o sistema
atualizarTela();
