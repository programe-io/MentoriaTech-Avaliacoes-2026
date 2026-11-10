
let tarefas = [];

// Cadastrar nova tarefa
function cadastrarTarefa() {

    let codigo = Number(document.getElementById("codigo").value);

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = document.getElementById("prioridade").value;

    // Validar os campos
    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade === "" ||
        !["1", "2", "3"].includes(prioridade)) {

        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar código duplicado
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    // Criar objeto da tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: Number(prioridade),
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    limparCampos();

    listarTarefas();
}


// Listar tarefas cadastradas
function listarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let classe = tarefa.concluida
            ? "status-concluido"
            : "status-pendente";

        tabela.innerHTML += `
            <tr>

                <td>${tarefa.codigo}</td>

                <td>${tarefa.titulo}</td>

                <td>${tarefa.prioridade}</td>

                <td class="${classe}">
                    ${status}
                </td>

                <td>

                    <button class="concluir"
                        onclick="marcarConcluida(${index})">
                        Concluir
                    </button>

                    <button class="alterar"
                        onclick="alterarPrioridade(${index})">
                        Prioridade
                    </button>

                </td>

            </tr>
        `;

    });

}


// Marcar tarefa como concluída
function marcarConcluida(index) {

    if (tarefas[index].concluida) {
        alert("Essa tarefa já está concluída!");
        return;
    }

    tarefas[index].concluida = true;

    alert("Tarefa marcada como concluída!");

    listarTarefas();

}


// Alterar prioridade da tarefa
function alterarPrioridade(index) {

    let novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (novaPrioridade === null) {
        return;
    }

    if (!["1", "2", "3"].includes(novaPrioridade.trim())) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefas[index].prioridade = Number(novaPrioridade);

    alert("Prioridade alterada com sucesso!");

    listarTarefas();

}


// Limpar os campos
function limparCampos() {

    document.getElementById("codigo").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "";

}
