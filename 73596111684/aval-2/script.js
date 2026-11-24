
let tarefas = [];

function cadastrarTarefa() {
    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar código
    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

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

    // Verificar código duplicado
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    listarTarefas();

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    alert("Tarefa cadastrada com sucesso!");
}

// Listar tarefas
function listarTarefas() {
    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        let status = tarefa.concluida ? "Concluída" : "Pendente";

        let nomePrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${nomePrioridade[tarefa.prioridade]}</td>
                <td class="${tarefa.concluida ? 'concluida' : ''}">
                    ${status}
                </td>
                <td>
                    <button onclick="concluirTarefa(${indice})">
                        Concluir
                    </button>

                    <button onclick="alterarPrioridade(${indice})">
                        Alterar prioridade
                    </button>
                </td>
            </tr>
        `;
    });
}

// Marcar tarefa como concluída
function concluirTarefa(indice) {
    tarefas[indice].concluida = true;

    listarTarefas();

    alert("Tarefa marcada como concluída!");
}

// Alterar prioridade
function alterarPrioridade(indice) {
    let novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Escolha 1, 2 ou 3.");
        return;
    }

    tarefas[indice].prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}
