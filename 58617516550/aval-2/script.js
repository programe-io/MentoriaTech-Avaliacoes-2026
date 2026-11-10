// Array que armazena as tarefas
let tarefas = [];

// Função para cadastrar tarefas
function cadastrarTarefa() {

    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = document.getElementById("prioridade").value;

    try {

        if (!codigo || !titulo || !prioridade) {
            throw new Error("Preencha todos os campos!");
        }

        if (codigo < 1 || !Number.isInteger(codigo)) {
            throw new Error("Digite um código válido!");
        }

        if (tarefas.some(t => t.codigo === codigo)) {
            throw new Error("Este código já está cadastrado!");
        }

        // Criação do objeto tarefa
        let tarefa = {
            codigo: codigo,
            titulo: titulo,
            prioridade: prioridade,
            status: "Pendente"
        };

        // Adiciona a tarefa ao array
        tarefas.push(tarefa);

        alert("Tarefa cadastrada com sucesso!");

        // Limpa os campos
        document.getElementById("codigo").value = "";
        document.getElementById("titulo").value = "";
        document.getElementById("prioridade").value = "";

        listarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

// Função para listar as tarefas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        let classe = tarefa.status === "Concluída"
            ? "tarefa concluida"
            : "tarefa";

        lista.innerHTML += `
            <div class="${classe}">
                <p><strong>Código:</strong> ${tarefa.codigo}</p>
                <p><strong>Título:</strong> ${tarefa.titulo}</p>
                <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
                <p><strong>Status:</strong>
                    <span class="status">${tarefa.status}</span>
                </p>
            </div>
        `;

    });
}

// Função para consultar uma tarefa
function consultarTarefa() {

    let codigo = Number(
        document.getElementById("consultaCodigo").value
    );

    let resultado = document.getElementById("resultadoConsulta");

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!codigo || !tarefa) {
        resultado.innerHTML = "<p>Tarefa não encontrada!</p>";
        return;
    }

    resultado.innerHTML = `
        <div class="tarefa">
            <p><strong>Código:</strong> ${tarefa.codigo}</p>
            <p><strong>Título:</strong> ${tarefa.titulo}</p>
            <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
            <p><strong>Status:</strong> ${tarefa.status}</p>
        </div>
    `;
}

// Função para concluir uma tarefa
function concluirTarefa() {

    let codigo = Number(
        document.getElementById("codigoConclusao").value
    );

    try {

        let tarefa = tarefas.find(t => t.codigo === codigo);

        if (!codigo || !tarefa) {
            throw new Error("Tarefa não encontrada!");
        }

        if (tarefa.status === "Concluída") {
            throw new Error("Esta tarefa já foi concluída!");
        }

        tarefa.status = "Concluída";

        alert("Tarefa concluída com sucesso!");

        document.getElementById("codigoConclusao").value = "";

        listarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}
