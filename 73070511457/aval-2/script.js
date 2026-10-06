let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3");
    }
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
}

function adicionarTarefa() {
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    try {
        cadastrarTarefa(titulo, prioridade);
        mostrarTarefas();
    } catch (erro) {
        alert(erro.message);
    }
}

function mostrarTarefas() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        lista.innerHTML += `
            <p>
                ${tarefa.codigo} - ${tarefa.titulo}
                - Prioridade: ${tarefa.prioridade}
            </p>
        `;
    });
}