
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let proximoCodigo = tarefas.length > 0
    ? Math.max(...tarefas.map(t => t.codigo)) + 1
    : 1;

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

// Salvar tarefas no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    salvarTarefas();
    listarTarefas();

    formulario.reset();
    campoPrioridade.value = "2";

    alert("Tarefa cadastrada com sucesso!");
});

// Listar tarefas cadastradas
function listarTarefas() {
    listaTarefas.replaceChildren();

    contador.textContent = "Total de tarefas: " + tarefas.length;

    if (tarefas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(mensagem);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade +
            " - " + obterPrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        div.appendChild(titulo);
        div.appendChild(codigo);
        div.appendChild(prioridade);
        div.appendChild(status);

        // Botão de conclusão
        if (!tarefa.concluida) {
            const btnConcluir = document.createElement("button");
            btnConcluir.textContent = "Marcar como concluída";
            btnConcluir.className = "btn-concluir";

            btnConcluir.addEventListener("click", function() {
                concluirTarefa(tarefa.codigo);
            });

            div.appendChild(btnConcluir);
        }

        // Botão para alterar prioridade
        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar prioridade";
        btnAlterar.className = "btn-alterar";

        btnAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        div.appendChild(btnAlterar);
        listaTarefas.appendChild(div);
    });
}

// Mostrar nome da prioridade
function obterPrioridade(valor) {
    if (valor === 1) return "Alta";
    if (valor === 2) return "Média";
    if (valor === 3) return "Baixa";
    return "Inválida";
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        salvarTarefas();
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null) return;

    const valor = Number(novaPrioridade);

    if (![1, 2, 3].includes(valor) ||
        novaPrioridade.trim() === "") {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = valor;

    salvarTarefas();
    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}

// Mostrar tarefas ao abrir o sistema
listarTarefas();
