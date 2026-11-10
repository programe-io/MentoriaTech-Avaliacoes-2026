
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar tarefa
function adicionarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("Selecione uma prioridade válida!");
        return;
    }

    // Criar tarefa
    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    // Limpar campos
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    // Atualizar lista
    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
}

// Listar tarefas
function listarTarefas() {
    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        let nomePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        div.innerHTML = `
            <div>
                <h3>${tarefa.titulo}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <p class="prioridade-${nomePrioridade.toLowerCase()}">
                    Prioridade: ${nomePrioridade}
                </p>

                <p class="status">
                    Status: ${tarefa.concluida ? "Concluída" : "Pendente"}
                </p>
            </div>

            <div>
                <button onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}

// Concluir tarefa
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        listarTarefas();

        alert("Prioridade alterada com sucesso!");
    }
}
