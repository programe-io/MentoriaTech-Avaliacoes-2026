
let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar os campos
    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    // Validar título
    if (titulo.length < 3) {
        alert("O título deve ter pelo menos 3 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar código repetido
    let existe = tarefas.find(t => t.codigo === codigo);

    if (existe) {
        alert("Esse código já está cadastrado!");
        return;
    }

    // Adicionar tarefa
    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    alert("Tarefa cadastrada com sucesso!");

    limparCampos();
    listarTarefas();
}


// Listar as tarefas cadastradas
function listarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach(tarefa => {

        let status = tarefa.concluida ? "Concluída" : "Pendente";

        let prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>

                <td>${tarefa.titulo}</td>

                <td>${tarefa.prioridade} - ${prioridadeTexto[tarefa.prioridade]}</td>

                <td class="${tarefa.concluida ? 'concluida' : 'pendente'}">
                    ${status}
                </td>

                <td>
                    <button class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                    </button>

                    <button class="btn-prioridade"
                        onclick="alterarPrioridade(${tarefa.codigo})">
                        Alterar Prioridade
                    </button>
                </td>
            </tr>
        `;
    });
}


// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.concluida = true;

        alert("Tarefa marcada como concluída!");

        listarTarefas();
    }
}


// Alterar prioridade da tarefa
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        let novaPrioridade = prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        );

        if (novaPrioridade === null || novaPrioridade.trim() === "") {
            return;
        }

        novaPrioridade = Number(novaPrioridade);

        if (![1, 2, 3].includes(novaPrioridade)) {
            alert("Prioridade inválida! Digite 1, 2 ou 3.");
            return;
        }

        tarefa.prioridade = novaPrioridade;

        alert("Prioridade alterada com sucesso!");

        listarTarefas();
    }
}


// Limpar os campos
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

}
