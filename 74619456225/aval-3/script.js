
// Array para armazenar as tarefas
let tarefas = [];

// Cadastrar nova tarefa
document.getElementById("formTarefa").addEventListener("submit", function(event) {

    event.preventDefault();

    let codigo = document.getElementById("codigo").value.trim();
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

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
    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    // Criar objeto tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("formTarefa").reset();

    listarTarefas();

});


// Listar tarefas cadastradas
function listarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let classe = tarefa.concluida
            ? "concluida"
            : "pendente";

        let nomePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${tarefa.prioridade} - ${nomePrioridade}</td>
                <td class="${classe}">${status}</td>

                <td>
                    <button class="concluir"
                        onclick="marcarConcluida(${index})">
                        Concluir
                    </button>

                    <button class="alterar"
                        onclick="alterarPrioridade(${index})">
                        Alterar Prioridade
                    </button>
                </td>
            </tr>
        `;

    });

}


// Marcar tarefa como concluída
function marcarConcluida(index) {

    tarefas[index].concluida = true;

    alert("Tarefa marcada como concluída!");

    listarTarefas();

}


// Alterar prioridade da tarefa
function alterarPrioridade(index) {

    let novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    novaPrioridade = Number(novaPrioridade);

    // Validar prioridade
    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefas[index].prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();

}
