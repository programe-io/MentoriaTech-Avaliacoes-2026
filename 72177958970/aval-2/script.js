
let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    let nome = document.getElementById("nomeTarefa").value;
    let prioridade = document.getElementById("prioridade").value;

    if (nome.trim() === "") {
        alert("Digite uma tarefa!");
        return;
    }

    let tarefa = {
        id: Date.now(),
        nome: nome,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    document.getElementById("nomeTarefa").value = "";

    listarTarefas();
}

// Listar tarefas cadastradas
function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        let div = document.createElement("div");

        div.className = "tarefa";

        div.innerHTML = `
            <h3 class="${tarefa.concluida ? 'concluida' : ''}">
                ${tarefa.nome}
            </h3>

            <p class="prioridade-${tarefa.prioridade.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}">
                Prioridade: ${tarefa.prioridade}
            </p>

            <p>
                Status: ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <button onclick="concluirTarefa(${tarefa.id})">
                Concluir tarefa
            </button>

            <select onchange="alterarPrioridade(${tarefa.id}, this.value)">
                <option value="Baixa" ${tarefa.prioridade === "Baixa" ? "selected" : ""}>Baixa</option>
                <option value="Média" ${tarefa.prioridade === "Média" ? "selected" : ""}>Média</option>
                <option value="Alta" ${tarefa.prioridade === "Alta" ? "selected" : ""}>Alta</option>
            </select>

            <button class="excluir" onclick="excluirTarefa(${tarefa.id})">
                Excluir tarefa
            </button>
        `;

        lista.appendChild(div);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(id) {
    let tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(id, novaPrioridade) {
    let tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        listarTarefas();
    }
}

// Excluir tarefa
function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    listarTarefas();
}
