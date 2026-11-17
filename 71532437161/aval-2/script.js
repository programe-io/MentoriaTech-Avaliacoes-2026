
// Lista que armazenará as tarefas
let tarefas = [];

// Elementos HTML
const formulario = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = titulo.value.trim();
    const nivel = Number(prioridade.value);

    // Validar título
    if (nome.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(nivel)) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Criar tarefa
    const tarefa = {
        codigo: tarefas.length + 1,
        titulo: nome,
        prioridade: nivel,
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    formulario.reset();

    listarTarefas();
});

// Listar tarefas cadastradas
function listarTarefas() {

    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");
        div.className = "tarefa";

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const classe = tarefa.concluida
            ? "concluida"
            : "";

        div.innerHTML = `
            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p class="${classe}">
                <strong>Título:</strong> ${tarefa.titulo}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade}
                (${nomePrioridade(tarefa.prioridade)})
            </p>

            <p class="status">
                <strong>Status:</strong> ${status}
            </p>

            <div class="acoes">

                <button onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;

        listaTarefas.appendChild(div);
    });
}

// Converter número em nome da prioridade
function nomePrioridade(valor) {

    if (valor === 1) return "Alta";
    if (valor === 2) return "Média";
    if (valor === 3) return "Baixa";

}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;

        alert("Tarefa concluída com sucesso!");

        listarTarefas();
    }
}

// Alterar prioridade da tarefa
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
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

        if (![1, 2, 3].includes(novaPrioridade)) {
            alert("Prioridade inválida!");
            return;
        }

        tarefa.prioridade = novaPrioridade;

        alert("Prioridade alterada com sucesso!");

        listarTarefas();
    }
}

// Exibir lista inicialmente
listarTarefas();
