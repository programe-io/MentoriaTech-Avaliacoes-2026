
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Salvar tarefas no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cadastrar nova tarefa
document.getElementById("formTarefa").addEventListener("submit", function(event) {

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

    // Criar tarefa
    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    salvarTarefas();
    listarTarefas();

    document.getElementById("formTarefa").reset();

    alert("Tarefa cadastrada com sucesso!");
});

// Listar tarefas
function listarTarefas() {

    const tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

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

        const status = tarefa.concluida ? "Concluída" : "Pendente";

        const classeStatus = tarefa.concluida
            ? "status-concluida"
            : "status-pendente";

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td>${tarefa.titulo}</td>

            <td class="prioridade ${classePrioridade}">
                ${tarefa.prioridade} - ${nomePrioridade}
            </td>

            <td class="${classeStatus}">
                ${status}
            </td>

            <td>
                <div class="acoes">

                    <button class="btn-concluir"
                        onclick="concluirTarefa(${index})"
                        ${tarefa.concluida ? "disabled" : ""}>
                        ${tarefa.concluida ? "Concluída" : "Concluir"}
                    </button>

                    <button class="btn-alterar"
                        onclick="alterarPrioridade(${index})">
                        Prioridade
                    </button>

                </div>
            </td>
        `;

        tabela.appendChild(linha);
    });

    atualizarResumo();
}

// Marcar tarefa como concluída
function concluirTarefa(index) {

    if (tarefas[index].concluida) {
        return;
    }

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

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefas[index].prioridade = prioridade;

    salvarTarefas();
    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}

// Atualizar indicadores
function atualizarResumo() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent = pendentes;

    document.getElementById("concluidas").textContent = concluidas;
}

// Carregar tarefas ao abrir o sistema
listarTarefas();
