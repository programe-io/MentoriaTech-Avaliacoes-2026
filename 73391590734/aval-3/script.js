
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
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    // Criar objeto da tarefa
    const novaTarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    formulario.reset();

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");

});

// Listar tarefas cadastradas
function listarTarefas() {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const linha = document.createElement("tr");

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td></td>
            <td>${prioridadeTexto}</td>
            <td class="${tarefa.concluida ? 'concluida' : 'pendente'}">
                ${status}
            </td>
            <td>
                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})"
                    ${tarefa.concluida ? "disabled" : ""}
                >
                    Concluir
                </button>

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})"
                >
                    Alterar prioridade
                </button>
            </td>
        `;

        // Exibir título como texto
        linha.children[1].textContent = tarefa.titulo;

        listaTarefas.appendChild(linha);

    });

}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.concluida = true;

        listarTarefas();

        alert("Tarefa concluída com sucesso!");

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
