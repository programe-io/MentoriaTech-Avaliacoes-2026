
// Recupera as tarefas salvas no navegador
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Gera códigos automaticamente
let proximoCodigo = tarefas.length > 0
    ? Math.max(...tarefas.map(t => t.codigo)) + 1
    : 1;

// Cadastrar tarefa
document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    proximoCodigo++;

    salvarTarefas();
    mostrarTarefas();

    document.getElementById("formTarefa").reset();
});

// Salvar no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Listar tarefas
function mostrarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        const div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa pendente";

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p><strong>Código:</strong> ${tarefa.codigo}</p>
            <p><strong>Prioridade:</strong> ${tarefa.prioridade} - ${prioridadeTexto[tarefa.prioridade]}</p>
            <p><strong>Status:</strong> ${status}</p>

            <div class="acoes">
                <button onclick="concluirTarefa(${tarefa.codigo})">
                    ${tarefa.concluida ? "Desmarcar conclusão" : "Concluir tarefa"}
                </button>

                <button onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

                <button class="excluir" onclick="excluirTarefa(${tarefa.codigo})">
                    Excluir
                </button>
            </div>
        `;

        lista.appendChild(div);
    });

    atualizarResumo();
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        mostrarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        const novaPrioridade = Number(
            prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
        );

        if (![1, 2, 3].includes(novaPrioridade)) {
            alert("Prioridade inválida! Digite 1, 2 ou 3.");
            return;
        }

        tarefa.prioridade = novaPrioridade;

        salvarTarefas();
        mostrarTarefas();
    }
}

// Excluir tarefa
function excluirTarefa(codigo) {
    if (confirm("Deseja realmente excluir esta tarefa?")) {
        tarefas = tarefas.filter(t => t.codigo !== codigo);
        salvarTarefas();
        mostrarTarefas();
    }
}

// Atualizar quantidade de tarefas
function atualizarResumo() {
    document.getElementById("total").textContent = tarefas.length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(t => t.concluida).length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(t => !t.concluida).length;
}

// Exibir as tarefas assim que abrir a página
mostrarTarefas();
