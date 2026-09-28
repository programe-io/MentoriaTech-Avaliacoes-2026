let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    const mensagem = document.getElementById("mensagem");

    // Validação do título
    if (titulo.length < 5) {
        mensagem.textContent =
            "O título deve ter no mínimo 5 caracteres.";

        mensagem.style.color = "red";
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mensagem.textContent =
            "A prioridade deve estar entre 1 e 3.";

        mensagem.style.color = "red";
        return;
    }

    // Criando a tarefa
    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    proximoCodigo++;

    mensagem.textContent =
        "Tarefa cadastrada com sucesso!";

    mensagem.style.color = "green";

    // Limpar o campo
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

    tarefas.forEach(tarefa => {

        let nomePrioridade = "";
        let classePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
            classePrioridade = "prioridade-alta";
        } 
        else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
            classePrioridade = "prioridade-media";
        } 
        else {
            nomePrioridade = "Baixa";
            classePrioridade = "prioridade-baixa";
        }

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const classeConcluida = tarefa.concluida
            ? "concluida"
            : "";

        lista.innerHTML += `
            <div class="tarefa ${classeConcluida}">

                <p>
                    <strong>Código:</strong>
                    ${tarefa.codigo}
                </p>

                <p class="titulo">
                    <strong>Título:</strong>
                    ${tarefa.titulo}
                </p>

                <p>
                    <strong>Prioridade:</strong>
                    <span class="${classePrioridade}">
                        ${tarefa.prioridade} - ${nomePrioridade}
                    </span>
                </p>

                <p>
                    <strong>Status:</strong>
                    ${status}
                </p>

                <div class="acoes">

                    ${
                        !tarefa.concluida
                        ? `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${tarefa.codigo})">
                            Concluir
                        </button>
                        `
                        : ""
                    }

                    <button
                        class="btn-prioridade"
                        onclick="alterarPrioridade(${tarefa.codigo})">
                        Alterar prioridade
                    </button>

                </div>

            </div>
        `;
    });
}


// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}


// Alterar prioridade
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

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
    if (
        isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {
        alert(
            "Prioridade inválida. " +
            "Digite um valor entre 1 e 3."
        );

        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// Exibir a lista inicialmente
listarTarefas();
