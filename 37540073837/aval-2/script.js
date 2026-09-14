let tarefas = [];

const form = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");


// Cadastrar uma nova tarefa
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validação do código
    if (codigo === "") {
        alert("Informe o código da tarefa!");
        return;
    }

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

    // Verifica se o código já existe
    const existe = tarefas.some(function (tarefa) {
        return tarefa.codigo === codigo;
    });

    if (existe) {
        alert("Já existe uma tarefa com esse código!");
        return;
    }

    // Cria a tarefa
    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    listarTarefas();

    form.reset();
});


// Listar tarefas
function listarTarefas() {

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhuma tarefa cadastrada.
                </td>
            </tr>
        `;

        return;
    }

    tarefas.forEach(function (tarefa, index) {

        const linha = document.createElement("tr");

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>

            <td>${tarefa.titulo}</td>

            <td>${tarefa.prioridade}</td>

            <td>${status}</td>

            <td>
                <button onclick="concluirTarefa(${index})">
                    ${tarefa.concluida ? "Desmarcar" : "Concluir"}
                </button>

                <button onclick="alterarPrioridade(${index})">
                    Alterar prioridade
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}


// Marcar tarefa como concluída
function concluirTarefa(index) {

    tarefas[index].concluida = !tarefas[index].concluida;

    listarTarefas();
}


// Alterar prioridade
function alterarPrioridade(index) {

    const novaPrioridade = prompt(
        "Digite a nova prioridade (1 = Alta, 2 = Média, 3 = Baixa):",
        tarefas[index].prioridade
    );

    if (novaPrioridade === null) {
        return;
    }

    const prioridade = Number(novaPrioridade);

    // Validação
    if (
        isNaN(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        alert("A prioridade deve ser um valor entre 1 e 3!");
        return;
    }

    tarefas[index].prioridade = prioridade;

    listarTarefas();
}
