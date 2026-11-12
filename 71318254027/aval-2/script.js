
let tarefas = [];

const formulario = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Cadastrar nova tarefa
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
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar código duplicado
    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
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

    formulario.reset();

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
});


// Listar tarefas cadastradas
function listarTarefas() {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const linha = document.createElement("tr");

        let nomePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td>${tarefa.titulo}</td>
            <td>${tarefa.prioridade} - ${nomePrioridade}</td>

            <td class="${tarefa.concluida ? 'concluida' : 'pendente'}">
                ${tarefa.concluida ? 'Concluída' : 'Pendente'}
            </td>

            <td>
                <div class="acoes">

                    <button class="btn-concluir"
                        onclick="marcarConcluida(${tarefa.codigo})"
                        ${tarefa.concluida ? 'disabled' : ''}>
                        Concluir
                    </button>

                    <button class="btn-alterar"
                        onclick="alterarPrioridade(${tarefa.codigo})">
                        Alterar prioridade
                    </button>

                </div>
            </td>
        `;

        listaTarefas.appendChild(linha);

    });
}


// Marcar tarefa como concluída
function marcarConcluida(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.concluida = true;

        listarTarefas();

        alert("Tarefa marcada como concluída!");

    } else {

        alert("Tarefa não encontrada!");

    }
}


// Alterar prioridade da tarefa
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        const novaPrioridade = Number(
            prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
        );

        if (![1, 2, 3].includes(novaPrioridade)) {

            alert("Prioridade inválida! Digite 1, 2 ou 3.");

            return;
        }

        tarefa.prioridade = novaPrioridade;

        listarTarefas();

        alert("Prioridade alterada com sucesso!");

    } else {

        alert("Tarefa não encontrada!");

    }
}
