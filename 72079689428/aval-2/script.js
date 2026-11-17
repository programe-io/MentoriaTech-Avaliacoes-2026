
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const form = document.getElementById("formTarefa");

const codigo = document.getElementById("codigo");
const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");

const lista = document.getElementById("listaTarefas");

// Cadastrar nova tarefa
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const novaTarefa = {
        codigo: codigo.value.trim(),
        titulo: titulo.value.trim(),
        prioridade: Number(prioridade.value),
        concluida: false
    };

    // Validar título
    if (novaTarefa.titulo.length < 5) {
        alert("O título precisa ter pelo menos 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(novaTarefa.prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar código repetido
    const existe = tarefas.some(function(tarefa) {
        return tarefa.codigo.toLowerCase() ===
            novaTarefa.codigo.toLowerCase();
    });

    if (existe) {
        alert("Este código já está cadastrado!");
        return;
    }

    tarefas.push(novaTarefa);

    salvarTarefas();

    form.reset();

    alert("Tarefa cadastrada com sucesso!");
});

// Salvar tarefas no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    mostrarTarefas();
}

// Listar tarefas
function mostrarTarefas() {
    lista.innerHTML = "";

    let pendentes = 0;
    let concluidas = 0;

    tarefas.forEach(function(tarefa, index) {

        if (tarefa.concluida) {
            concluidas++;
        } else {
            pendentes++;
        }

        let nomePrioridade = "";
        let classePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
            classePrioridade = "prioridade-alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
            classePrioridade = "prioridade-media";
        } else {
            nomePrioridade = "Baixa";
            classePrioridade = "prioridade-baixa";
        }

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${escaparHTML(tarefa.codigo)}</td>

            <td>${escaparHTML(tarefa.titulo)}</td>

            <td>
                <span class="${classePrioridade}">
                    ${nomePrioridade}
                </span>
            </td>

            <td>
                <span class="status ${tarefa.concluida ? 'concluida' : 'pendente'}">
                    ${tarefa.concluida ? 'Concluída' : 'Pendente'}
                </span>
            </td>

            <td>
                <div class="acoes">

                    <button class="btn-concluir"
                        onclick="marcarConcluida(${index})"
                        ${tarefa.concluida ? 'disabled' : ''}>
                        ${tarefa.concluida ? 'Concluída ✓' : 'Concluir'}
                    </button>

                    <button class="btn-prioridade"
                        onclick="alterarPrioridade(${index})">
                        Prioridade
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirTarefa(${index})">
                        Excluir
                    </button>

                </div>
            </td>
        `;

        lista.appendChild(linha);
    });

    // Atualizar os indicadores
    document.getElementById("totalTarefas").textContent =
        tarefas.length;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;

    // Mensagem quando não houver tarefas
    document.getElementById("mensagemVazia").style.display =
        tarefas.length === 0 ? "block" : "none";
}

// Proteger textos inseridos pelo usuário
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, function(caractere) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[caractere];
    });
}

// Marcar tarefa como concluída
function marcarConcluida(index) {

    tarefas[index].concluida = true;

    salvarTarefas();

    alert("Tarefa marcada como concluída!");
}

// Alterar prioridade
function alterarPrioridade(index) {

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
        tarefas[index].prioridade
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    const numero = Number(novaPrioridade);

    if (![1, 2, 3].includes(numero)) {
        alert("Prioridade inválida! Escolha 1, 2 ou 3.");
        return;
    }

    tarefas[index].prioridade = numero;

    salvarTarefas();

    alert("Prioridade alterada com sucesso!");
}

// Excluir tarefa
function excluirTarefa(index) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (confirmar) {
        tarefas.splice(index, 1);

        salvarTarefas();

        alert("Tarefa excluída com sucesso!");
    }
}

// Carregar tarefas ao abrir o sistema
mostrarTarefas();
