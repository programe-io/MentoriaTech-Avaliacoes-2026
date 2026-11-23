
let tarefas = [];

const formulario = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Cadastrar tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Verificar código duplicado
    const existe = tarefas.some(tarefa => tarefa.codigo === codigo);

    if (existe) {
        alert("Esse código já está cadastrado!");
        return;
    }

    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    formulario.reset();
    listarTarefas();
});

// Listar tarefas
function listarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        const linha = document.createElement("tr");

        const nomePrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td>${tarefa.titulo}</td>
            <td>${nomePrioridade[tarefa.prioridade]}</td>

            <td class="${tarefa.concluida ? 'concluida' : 'pendente'}">
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </td>

            <td class="acoes">
                <button class="btn-concluir"
                    onclick="marcarConcluida(${indice})">
                    Concluir
                </button>

                <button class="btn-prioridade"
                    onclick="alterarPrioridade(${indice})">
                    Prioridade
                </button>

                <button class="btn-excluir"
                    onclick="excluirTarefa(${indice})">
                    Excluir
                </button>
            </td>
        `;

        listaTarefas.appendChild(linha);
    });

    atualizarResumo();
}

// Marcar tarefa como concluída
function marcarConcluida(indice) {
    tarefas[indice].concluida = true;
    listarTarefas();
}

// Alterar prioridade
function alterarPrioridade(indice) {
    const novaPrioridade = Number(
        prompt("Digite a nova prioridade: 1 - Alta, 2 - Média, 3 - Baixa")
    );

    if ([1, 2, 3].includes(novaPrioridade)) {
        tarefas[indice].prioridade = novaPrioridade;
        listarTarefas();
    } else {
        alert("Prioridade inválida! Escolha entre 1 e 3.");
    }
}

// Excluir tarefa
function excluirTarefa(indice) {
    if (confirm("Deseja excluir esta tarefa?")) {
        tarefas.splice(indice, 1);
        listarTarefas();
    }
}

// Atualizar resumo
function atualizarResumo() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;
}
