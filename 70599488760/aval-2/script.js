```javascript
let tarefas = [];
let proximoCodigo = 1;

// CADASTRAR TAREFA
function cadastrarTarefa() {
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Criar tarefa
    let tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    document.getElementById("titulo").value = "";

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

    tarefas.forEach(function(tarefa) {

        let div = document.createElement("div");

        let prioridadeTexto;

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p><strong>Prioridade:</strong> ${prioridadeTexto}</p>

            <p><strong>Status:</strong> 
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>
        `;

        lista.appendChild(div);
    });
}


// MARCAR COMO CONCLUÍDA
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}


// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    let novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Digite uma prioridade válida: 1, 2 ou 3.");
        return;
    }

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// MOSTRAR TAREFAS AO ABRIR A PÁGINA
listarTarefas();
```
