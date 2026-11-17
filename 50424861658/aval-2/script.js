
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const formulario = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Salvar tarefas no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cadastrar nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar código duplicado
    if (tarefas.some(t => t.codigo.toLowerCase() === codigo.toLowerCase())) {
        alert("Este código já está cadastrado!");
        return;
    }

    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    salvarTarefas();
    listarTarefas();

    formulario.reset();

    alert("Tarefa cadastrada com sucesso!");
});

// Listar tarefas
function listarTarefas() {
    listaTarefas.innerHTML = "";

    document.getElementById("total").textContent = tarefas.length;

    const quantidadeConcluidas = tarefas.filter(
        t => t.concluida
    ).length;

    document.getElementById("concluidas").textContent =
        quantidadeConcluidas;

    document.getElementById("pendentes").textContent =
        tarefas.length - quantidadeConcluidas;

    document.getElementById("mensagemVazia").style.display =
        tarefas.length === 0 ? "block" : "none";

    tarefas.forEach((tarefa, index) => {

        let nomePrioridade = "";
        let classePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
            classePrioridade = "alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
            classePrioridade = "media";
        } else {
            nomePrioridade = "Baixa";
            classePrioridade = "baixa";
        }

        const linha = document.createElement("tr");

        const tituloSeguro = document.createElement("td");
        tituloSeguro.textContent = tarefa.titulo;

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td></td>
            <td class="${classePrioridade}">
                ${tarefa.prioridade} - ${nomePrioridade}
            </td>
            <td class="${tarefa.concluida ?
                'status-concluida' : 'status-pendente'}">
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </td>
            <td class="acoes">
                <button class="btn-concluir"
                    onclick="concluirTarefa(${index})"
                    ${tarefa.concluida ? "disabled" : ""}>
                    Concluir
                </button>

                <button class="btn-prioridade"
                    onclick="alterarPrioridade(${index})">
                    Prioridade
                </button>

                <button class="btn-excluir"
                    onclick="excluirTarefa(${index})">
                    Excluir
                </button>
            </td>
        `;

        linha.children[1].appendChild(tituloSeguro);

        listaTarefas.appendChild(linha);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(index) {
    tarefas[index].concluida = true;

    salvarTarefas();
    listarTarefas();

    alert("Tarefa concluída com sucesso!");
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

    const prioridade = Number(novaPrioridade);

    if (!Number.isInteger(prioridade) ||
        ![1, 2, 3].includes(prioridade)) {
        alert("Digite uma prioridade válida: 1, 2 ou 3!");
        return;
    }

    tarefas[index].prioridade = prioridade;

    salvarTarefas();
    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}

// Excluir tarefa
function excluirTarefa(index) {
    const confirmar = confirm("Deseja excluir esta tarefa?");

    if (confirmar) {
        tarefas.splice(index, 1);

        salvarTarefas();
        listarTarefas();

        alert("Tarefa excluída!");
    }
}

// Mostrar tarefas ao abrir o sistema
listarTarefas();
