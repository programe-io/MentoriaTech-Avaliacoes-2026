let tarefas = [];

const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

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

function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhuma tarefa cadastrada.
                </td>
            </tr>
        `;

        contador.textContent = "0 tarefas";
        return;
    }

    tarefas.forEach(function (tarefa) {
        let textoPrioridade;
        let classePrioridade;

        if (tarefa.prioridade === 1) {
            textoPrioridade = "Alta";
            classePrioridade = "alta";
        } else if (tarefa.prioridade === 2) {
            textoPrioridade = "Média";
            classePrioridade = "media";
        } else {
            textoPrioridade = "Baixa";
            classePrioridade = "baixa";
        }

        const status = tarefa.concluida
            ? `<span class="status concluida">Concluída</span>`
            : `<span class="status pendente">Pendente</span>`;

        const botaoConcluir = tarefa.concluida
            ? `<button class="btn btn-concluida" disabled>
                    Concluída
               </button>`
            : `<button
                    class="btn btn-concluir"
                    onclick="marcarComoConcluida(${tarefa.codigo})"
               >
                    Concluir
               </button>`;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>

            <td>${tarefa.titulo}</td>

            <td>
                <span class="prioridade ${classePrioridade}">
                    ${tarefa.prioridade} - ${textoPrioridade}
                </span>
            </td>

            <td>${status}</td>

            <td>
                ${botaoConcluir}

                <button
                    class="btn btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})"
                >
                    Alterar prioridade
                </button>
            </td>
        `;

        listaTarefas.appendChild(linha);
    });

    contador.textContent =
        `${tarefas.length} tarefa${tarefas.length !== 1 ? "s" : ""}`;
}

function marcarComoConcluida(codigo) {
    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}

function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    if (
        isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}

listarTarefas();
