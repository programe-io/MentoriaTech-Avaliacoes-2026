
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: false
    };

    tarefas.push(tarefa);

    document.getElementById("titulo").value = "";

    listarTarefas();
}

// Listar todas as tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        const item = document.createElement("li");

        item.className = "tarefa";

        item.innerHTML = `
            <p><strong>Código:</strong> ${tarefa.codigo}</p>
            <p><strong>Título:</strong> ${tarefa.titulo}</p>
            <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
            <p><strong>Status:</strong> 
                ${tarefa.status ? "Concluída" : "Pendente"}
            </p>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>

            <button class="excluir" onclick="excluirTarefa(${tarefa.codigo})">
                Excluir
            </button>
        `;

        if (tarefa.status) {
            item.classList.add("concluida");
        }

        lista.appendChild(item);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(t) {
        return t.codigo === codigo;
    });

    if (tarefa) {
        tarefa.status = true;
        listarTarefas();
    }
}

// Alterar prioridade da tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(t) {
        return t.codigo === codigo;
    });

    if (tarefa) {
        const novaPrioridade = Number(
            prompt("Digite a nova prioridade (1, 2 ou 3):")
        );

        if ([1, 2, 3].includes(novaPrioridade)) {
            tarefa.prioridade = novaPrioridade;
            listarTarefas();
        } else {
            alert("Prioridade inválida! Digite 1, 2 ou 3.");
        }
    }
}

// Excluir tarefa
function excluirTarefa(codigo) {
    tarefas = tarefas.filter(function(t) {
        return t.codigo !== codigo;
    });

    listarTarefas();
}
