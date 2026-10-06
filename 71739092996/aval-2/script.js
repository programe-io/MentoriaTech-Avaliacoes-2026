let tarefas = [];
let codigo = 0;

function cadastrar() {

    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres");
        return;
    }

    let tarefa = {
        codigo: ++codigo,
        descricao: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    listarTarefas();
}

function listarTarefas() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        lista.innerHTML += `
            <li>
                ${tarefa.codigo} - ${tarefa.descricao}
                <br>
                Prioridade: ${tarefa.prioridade}
            </li>
        `;
    });
}