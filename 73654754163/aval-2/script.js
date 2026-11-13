
let tarefas = [];

// CADASTRAR TAREFA
function cadastrar() {

    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";

    listar();
}


// LISTAR TAREFAS
function listar() {

    let tabela = document.getElementById("lista");

    tabela.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {

        tabela.innerHTML += `
            <tr>
                <td>${tarefas[i].codigo}</td>
                <td>${tarefas[i].titulo}</td>
                <td>${tarefas[i].prioridade}</td>
                <td>${tarefas[i].status}</td>

                <td>
                    <button class="concluir"
                    onclick="concluir(${i})">
                    Concluir
                    </button>

                    <button class="alterar"
                    onclick="alterar(${i})">
                    Alterar Prioridade
                    </button>
                </td>
            </tr>
        `;
    }
}


// MARCAR COMO CONCLUÍDA
function concluir(i) {

    tarefas[i].status = "Concluída";

    alert("Tarefa concluída!");

    listar();
}


// ALTERAR PRIORIDADE
function alterar(i) {

    let novaPrioridade = Number(prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    ));

    if (novaPrioridade >= 1 &&
        novaPrioridade <= 3 &&
        Number.isInteger(novaPrioridade)) {

        tarefas[i].prioridade = novaPrioridade;

        alert("Prioridade alterada!");

        listar();

    } else {
        alert("Prioridade inválida!");
    }
}
