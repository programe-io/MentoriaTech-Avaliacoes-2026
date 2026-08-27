// ================================
// GERENCIADOR DE TAREFAS
// ================================

let tarefas = [];
let proximoCodigo = 1;


// ================================
// CADASTRAR TAREFA
// ================================

function cadastrarTarefa() {

    const tituloInput = document.getElementById("titulo");
    const prioridadeInput = document.getElementById("prioridade");

    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);

    // Validação do título
    if (titulo.length < 5) {
        alert("❌ O título deve ter no mínimo 5 caracteres!");
        tituloInput.focus();
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("❌ A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Criar nova tarefa
    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar ao array
    tarefas.push(novaTarefa);

    proximoCodigo++;

    // Limpar campo
    tituloInput.value = "";

    alert("✅ Tarefa cadastrada com sucesso!");

    listarTarefas();
}


// ================================
// LISTAR TAREFAS
// ================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        let prioridadeTexto;

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "🔴 Alta";
        } 
        else if (tarefa.prioridade === 2) {
            prioridadeTexto = "🟡 Média";
        } 
        else {
            prioridadeTexto = "🟢 Baixa";
        }

        const status = tarefa.concluida
            ? "✅ Concluída"
            : "⏳ Pendente";

        div.innerHTML = `
            <strong>Código:</strong> ${tarefa.codigo}<br>
            <strong>Título:</strong> ${tarefa.titulo}<br>
            <strong>Prioridade:</strong> ${prioridadeTexto}<br>
            <strong>Status:</strong> ${status}
            <br><br>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                ${tarefa.concluida ? "↩️ Reabrir" : "✅ Concluir"}
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                🔄 Alterar prioridade
            </button>

            <button onclick="excluirTarefa(${tarefa.codigo})">
                🗑️ Excluir
            </button>
        `;

        lista.appendChild(div);
    });
}


// ================================
// CONCLUIR / REABRIR TAREFA
// ================================

function concluirTarefa(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("❌ Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    listarTarefas();
}


// ================================
// ALTERAR PRIORIDADE
// ================================

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("❌ Tarefa não encontrada!");
        return;
    }

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("❌ Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("✅ Prioridade alterada com sucesso!");

    listarTarefas();
}


// ================================
// EXCLUIR TAREFA
// ================================

function excluirTarefa(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("❌ Tarefa não encontrada!");
        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir a tarefa "${tarefa.titulo}"?`
    );

    if (confirmar) {

        tarefas = tarefas.filter(t => t.codigo !== codigo);

        alert("🗑️ Tarefa excluída!");

        listarTarefas();
    }
}


// ================================
// INICIAR SISTEMA
// ================================

listarTarefas();