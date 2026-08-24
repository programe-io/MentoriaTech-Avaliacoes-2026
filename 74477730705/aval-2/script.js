let tarefas = [];

const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Cadastrar uma nova tarefa
formTarefa.addEventListener("submit", function (event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    const tarefa = {
        codigo: tarefas.length + 1,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    formTarefa.reset();

    listarTarefas();
});


// Listar tarefas
function listarTarefas() {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa) {

        let nomePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>

            <td>${tarefa.titulo}</td>

            <td class="
                ${tarefa.prioridade === 1
                    ? "prioridade-alta"
                    : tarefa.prioridade === 2
                        ? "prioridade-media"
                        : "prioridade-baixa"}
            ">
                ${tarefa.prioridade} - ${nomePrioridade}
            </td>

            <td class="
                ${tarefa.concluida
                    ? "status-concluida"
                    : "status-pendente"}
            ">
                ${status}
            </td>

            <td>
                <div class="acoes">

                    ${
                        !tarefa.concluida
                        ? `
                            <button
                                class="btn-concluir"
                                onclick="marcarConcluida(${tarefa.codigo})"
                            >
                                Concluir
                            </button>
                        `
                        : ""
                    }

                    <button
                        class="btn-prioridade"
                        onclick="alterarPrioridade(${tarefa.codigo})"
                    >
                        Alterar prioridade
                    </button>

                </div>
            </td>
        `;

        listaTarefas.appendChild(linha);
    });
}


// Marcar tarefa como concluída
function marcarConcluida(codigo) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;

        listarTarefas();
    }
}


// Alterar prioridade
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {

        const novaPrioridade = Number(
            prompt(
                "Digite a nova prioridade:\n" +
                "1 - Alta\n" +
                "2 - Média\n" +
                "3 - Baixa"
            )
        );

        if (
            novaPrioridade >= 1 &&
            novaPrioridade <= 3
        ) {

            tarefa.prioridade = novaPrioridade;

            listarTarefas();

        } else {

            alert(
                "Prioridade inválida! " +
                "Digite um valor entre 1 e 3."
            );
        }
    }
}
