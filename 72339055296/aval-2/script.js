let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);
    const mensagem = document.getElementById("mensagem");

    // Validação do título
    if (titulo.length < 5) {
        mensagem.textContent = "❌ O título deve ter no mínimo 5 caracteres.";
        mensagem.style.color = "red";
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mensagem.textContent = "❌ A prioridade deve estar entre 1 e 3.";
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

    mensagem.textContent = "✅ Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    document.getElementById("titulo").value = "";

    listarTarefas();
}


// Listar as tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        let nomePrioridade;

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        div.innerHTML = `
            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p class="titulo">
                <strong>Título:</strong> ${tarefa.titulo}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade} - ${nomePrioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída ✅" : "Pendente ⏳"}
            </p>

            <div class="acoes">
                ${
                    !tarefa.concluida
                    ? `<button class="btn-concluir"
                         onclick="marcarConcluida(${tarefa.codigo})">
                         Marcar como concluída
                       </button>`
                    : ""
                }

                <button class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}


// Marcar tarefa como concluída
function marcarConcluida(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}


// Alterar prioridade
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        return;
    }

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
        )
    );

    // Validação da prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3 || isNaN(novaPrioridade)) {
        alert("❌ A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// Exibir a lista inicialmente
listarTarefas();