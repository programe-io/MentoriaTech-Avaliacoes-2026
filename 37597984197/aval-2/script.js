
let tarefas = [];
let codigo = 1;

// CADASTRAR TAREFA
function adicionarTarefa() {

    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    let tarefa = {
        codigo: codigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    document.getElementById("titulo").value = "";

    alert("Tarefa cadastrada com sucesso!");

    listarTarefas();
}

// LISTAR TAREFAS
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {

        let classe = tarefa.prioridade === 1 ? "alta" :
                     tarefa.prioridade === 2 ? "media" : "baixa";

        lista.innerHTML += `
            <div class="tarefa ${classe} ${tarefa.concluida ? 'concluida' : ''}">

                <h3>${tarefa.titulo}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <p>Prioridade: ${
                    tarefa.prioridade === 1 ? "Alta" :
                    tarefa.prioridade === 2 ? "Média" : "Baixa"
                }</p>

                <p>Status: ${
                    tarefa.concluida ? "Concluída" : "Pendente"
                }</p>

                <div class="acoes">

                    <button class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                    </button>

                    <button class="btn-alterar"
                        onclick="alterarPrioridade(${tarefa.codigo})">
                        Alterar Prioridade
                    </button>

                </div>
            </div>
        `;
    });
}

// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}

// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}

// EXIBIR LISTA INICIAL
listarTarefas();
