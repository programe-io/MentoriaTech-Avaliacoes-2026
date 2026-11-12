
// Lista (Array) de tarefas
let tarefas = [];

// Validar tarefa
function validarTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve ser entre 1 e 3");
    }

}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarTarefa(titulo, prioridade);

    let novaTarefa = {
        codigo: tarefas.length + 1,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(novaTarefa);

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");
    const mensagem = document.getElementById("mensagem");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        mensagem.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    mensagem.textContent = "";

    tarefas.forEach(function(tarefa) {

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td>${tarefa.titulo}</td>
            <td>${tarefa.prioridade}</td>
            <td class="${tarefa.status === "Concluída" ? "concluida" : "pendente"}">
                ${tarefa.status}
            </td>
            <td>
                <div class="acoes">
                    <button class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                    </button>

                    <button class="btn-alterar"
                        onclick="alterarPrioridade(${tarefa.codigo})">
                        Alterar prioridade
                    </button>
                </div>
            </td>
        `;

        lista.appendChild(linha);

    });

}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (tarefa) {
        tarefa.status = "Concluída";
        listarTarefas();
    } else {
        alert("Tarefa não encontrada");
    }

}

// Alterar prioridade
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (tarefa) {

        let novaPrioridade = Number(
            prompt("Digite a nova prioridade (1 - Alta, 2 - Média, 3 - Baixa):")
        );

        if (!Number.isInteger(novaPrioridade) ||
            novaPrioridade < 1 ||
            novaPrioridade > 3) {

            alert("Prioridade inválida!");
            return;
        }

        tarefa.prioridade = novaPrioridade;

        listarTarefas();

    } else {
        alert("Tarefa não encontrada");
    }

}

// Evento do formulário
document.getElementById("formTarefa").addEventListener("submit", function(event) {

    event.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {

        cadastrarTarefa(titulo, prioridade);

        document.getElementById("formTarefa").reset();

        alert("Tarefa cadastrada com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }

});

// Exibir tarefas inicialmente
listarTarefas();
