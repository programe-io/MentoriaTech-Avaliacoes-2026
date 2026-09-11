let tarefas = [];

// Cadastrar nova tarefa
function cadastrarTarefa() {

    const codigo = document.getElementById("codigo").value;
    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    // Criação da tarefa
    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";

    listarTarefas();
}


// Listar tarefas
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p><strong>Título:</strong> ${tarefa.titulo}</p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <button 
                class="btn-concluir"
                onclick="concluirTarefa('${tarefa.codigo}')">
                Concluir
            </button>

            <button
                class="btn-prioridade"
                onclick="alterarPrioridade('${tarefa.codigo}')">
                Alterar prioridade
            </button>
        `;

        lista.appendChild(div);
    });
}


// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo == codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}


// Alterar prioridade
function alterarPrioridade(codigo) {

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    // Validação
    if (novaPrioridade < 1 || novaPrioridade > 3 || isNaN(novaPrioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo == codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}


// Exibe a lista inicialmente
listarTarefas();
