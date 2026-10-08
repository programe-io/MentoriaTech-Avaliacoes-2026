```javascript
// Lista onde serão armazenadas as tarefas
let tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// ======================================
// CADASTRAR UMA NOVA TAREFA
// ======================================

function cadastrarTarefa() {

    const tituloInput = document.getElementById("titulo");
    const prioridadeInput = document.getElementById("prioridade");
    const mensagem = document.getElementById("mensagem");

    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);

    // Validação do título
    if (titulo.length < 5) {
        mensagem.textContent =
            "Erro: o título deve ter no mínimo 5 caracteres.";

        mensagem.style.color = "red";
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mensagem.textContent =
            "Erro: a prioridade deve ser entre 1 e 3.";

        mensagem.style.color = "red";
        return;
    }

    // Criando a tarefa
    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adicionando na lista
    tarefas.push(tarefa);

    // Aumentando o código
    proximoCodigo++;

    // Mensagem de sucesso
    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    // Limpar campo
    tituloInput.value = "";

    // Atualizar lista
    listarTarefas();
}


// ======================================
// LISTAR AS TAREFAS
// ======================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    // Verifica se não existem tarefas
    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    lista.innerHTML = "";

    // Percorre todas as tarefas
    tarefas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        let nomePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Código:</strong>
                ${tarefa.codigo}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade} - ${nomePrioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída ✅" : "Pendente ⏳"}
            </p>

            <div class="acoes">

                ${
                    !tarefa.concluida
                    ? `<button
                        class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                       </button>`
                    : ""
                }

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar Prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}


// ======================================
// MARCAR TAREFA COMO CONCLUÍDA
// ======================================

function concluirTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Erro: tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}


// ======================================
// ALTERAR A PRIORIDADE
// ======================================

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Erro: tarefa não encontrada.");
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

    // Validação
    if (
        isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {
        alert(
            "Erro: a prioridade deve ser um valor entre 1 e 3."
        );

        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// ======================================
// INICIAR O SISTEMA
// ======================================

listarTarefas();
```
