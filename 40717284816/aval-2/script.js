const tarefas = [];


// ================================
// CADASTRAR TAREFA
// ================================

function cadastrarTarefa() {

    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    const mensagem = document.getElementById("mensagem");

    // Validação do título
    if (titulo.length < 5) {
        mensagem.textContent = "O título deve ter no mínimo 5 caracteres.";
        mensagem.style.color = "red";
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mensagem.textContent = "A prioridade deve estar entre 1 e 3.";
        mensagem.style.color = "red";
        return;
    }

    // Verifica se o código foi informado
    if (!codigo) {
        mensagem.textContent = "Informe o código da tarefa.";
        mensagem.style.color = "red";
        return;
    }

    // Cria a tarefa
    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

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

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p>
                <strong>Prioridade:</strong>
                ${mostrarPrioridade(tarefa.prioridade)}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                <button 
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button 
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}


// ================================
// MOSTRAR PRIORIDADE
// ================================

function mostrarPrioridade(prioridade) {

    if (prioridade === 1) {
        return "1 - Alta";
    }

    if (prioridade === 2) {
        return "2 - Média";
    }

    return "3 - Baixa";
}


// ================================
// CONCLUIR TAREFA
// ================================

function concluirTarefa(codigo) {

    const tarefa = tarefas.find(tarefa => tarefa.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}


// ================================
// ALTERAR PRIORIDADE
// ================================

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(tarefa => tarefa.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    // Validação
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}
