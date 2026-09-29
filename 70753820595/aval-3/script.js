// Lista de tarefas
const tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;

// Formulário
const form = document.getElementById("formTarefa");

// Cadastrar uma nova tarefa
form.addEventListener("submit", function (event) {
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

    // Criar tarefa
    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    form.reset();

    listarTarefas();
});


// Listar tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function (tarefa) {

        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <strong>Código:</strong> ${tarefa.codigo}<br>
            <strong>Título:</strong> ${tarefa.titulo}<br>
            <strong>Prioridade:</strong> ${tarefa.prioridade}<br>
            <strong>Status:</strong>
            ${tarefa.concluida ? "Concluída" : "Pendente"}

            <div class="botoes">
                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}


// Marcar tarefa como concluída
function concluirTarefa(codigo) {

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


// Alterar prioridade
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
            "Digite a nova prioridade:\n" +
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


// Exibir tarefas ao carregar a página
listarTarefas();
