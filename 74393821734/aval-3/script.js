
let tarefas = [];
let proximoCodigo = 1;

// CADASTRAR TAREFA
function cadastrarTarefa() {
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("Prioridade inválida!");
        return;
    }

    // Altera o Array
    tarefas.push({
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    proximoCodigo++;

    document.getElementById("titulo").value = "";

    // Atualiza a interface
    render();
}

// RENDERIZAR TAREFAS
function render() {
    let area = document.getElementById("tarefas");

    // 1. Limpar o container
    area.innerHTML = "";

    // Verificar se existem tarefas
    if (tarefas.length === 0) {
        area.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    // 2. Percorrer o Array
    tarefas.forEach(tarefa => {

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        // 3. Gerar o HTML
        area.innerHTML += `
            <div class="tarefa">
                <h3>${tarefa.titulo}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <p>Prioridade: ${prioridadeTexto}</p>

                <p>Status: ${status}</p>

                <button onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;
    });
}

// CONCLUIR TAREFA
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    // Modifica o objeto dentro do Array
    tarefa.concluida = true;

    // Atualiza a interface
    render();
}

// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    // Modifica o objeto dentro do Array
    tarefa.prioridade = novaPrioridade;

    // Atualiza a interface
    render();
}

// Renderização inicial
render();
