
let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    let codigo = Number(document.getElementById("codigo").value);

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar campos vazios
    if (
        document.getElementById("codigo").value === "" ||
        titulo === "" ||
        document.getElementById("prioridade").value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Verificar código duplicado
    let existe = tarefas.find(t => t.codigo === codigo);

    if (existe) {
        alert("Este código já está cadastrado!");
        return;
    }

    // Criar objeto da tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar tarefa ao array
    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
}


// Listar tarefas cadastradas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let classe = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        lista.innerHTML += `
            <div class="${classe}">
                <strong>Código:</strong> ${tarefa.codigo}<br>

                <strong>Título:</strong> ${tarefa.titulo}<br>

                <strong>Prioridade:</strong> ${tarefa.prioridade} - ${prioridadeTexto}<br>

                <strong>Status:</strong> ${status}
            </div>
        `;

    });
}


// Marcar tarefa como concluída
function concluirTarefa() {

    let codigo = Number(document.getElementById("codigoConcluir").value);

    if (document.getElementById("codigoConcluir").value === "") {
        alert("Informe o código da tarefa!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        if (tarefa.concluida) {
            alert("Esta tarefa já está concluída!");
            return;
        }

        tarefa.concluida = true;

        alert("Tarefa concluída com sucesso!");

        listarTarefas();

    } else {

        alert("Tarefa não encontrada!");

    }

    document.getElementById("codigoConcluir").value = "";
}


// Alterar prioridade da tarefa
function alterarPrioridade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let novaPrioridade = Number(document.getElementById("novaPrioridade").value);

    if (
        document.getElementById("codigoAlterar").value === "" ||
        document.getElementById("novaPrioridade").value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    // Validar prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.prioridade = novaPrioridade;

        alert("Prioridade alterada com sucesso!");

        listarTarefas();

    } else {

        alert("Tarefa não encontrada!");

    }

    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novaPrioridade").value = "";
}
