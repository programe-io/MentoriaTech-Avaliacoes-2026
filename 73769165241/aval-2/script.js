
// Array para armazenar as tarefas
let tarefas = [];

let proximoCodigo = 1;

// 1. Função para validar os dados
function validarTarefa(descricao, prioridade) {

    if (descricao.trim() === "") {
        alert("Informe a descrição da tarefa!");
        return false;
    }

    if (!["Baixa", "Média", "Alta"].includes(prioridade)) {
        alert("Selecione uma prioridade válida!");
        return false;
    }

    return true;
}

// 2. Função para cadastrar tarefa
function cadastrarTarefa() {

    const descricao =
        document.getElementById("descricao").value;

    const prioridade =
        document.getElementById("prioridade").value;

    if (!validarTarefa(descricao, prioridade)) {
        return;
    }

    // Criação do objeto tarefa
    const tarefa = {
        codigo: proximoCodigo,
        descricao: descricao.trim(),
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar tarefa ao array
    tarefas.push(tarefa);

    proximoCodigo++;

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("descricao").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
}

// 3. Função para listar tarefas
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        let classePrioridade = "";

        if (tarefa.prioridade === "Alta") {
            classePrioridade = "prioridade-alta";
        } else if (tarefa.prioridade === "Média") {
            classePrioridade = "prioridade-media";
        } else {
            classePrioridade = "prioridade-baixa";
        }

        lista.innerHTML += `
            <div class="tarefa ${tarefa.concluida ? 'concluida' : ''}">

                <h3>Código: ${tarefa.codigo}</h3>

                <p>Descrição: ${tarefa.descricao}</p>

                <p class="${classePrioridade}">
                    Prioridade: ${tarefa.prioridade}
                </p>

                <p class="status">
                    Status: ${tarefa.concluida ? 'Concluída' : 'Pendente'}
                </p>

                ${!tarefa.concluida ? `
                    <button onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                    </button>
                ` : ''}

            </div>
        `;
    });
}

// 4. Função para buscar tarefa usando find
function buscarTarefa() {

    const codigo = Number(
        document.getElementById("codigoBusca").value
    );

    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    const resultado = document.getElementById("resultadoBusca");

    if (!tarefa || codigo <= 0) {
        resultado.innerHTML = "<p>Tarefa não encontrada!</p>";
        return;
    }

    resultado.innerHTML = `
        <div class="tarefa">
            <h3>Tarefa encontrada</h3>
            <p>Código: ${tarefa.codigo}</p>
            <p>Descrição: ${tarefa.descricao}</p>
            <p>Prioridade: ${tarefa.prioridade}</p>
            <p>Status: ${tarefa.concluida ? 'Concluída' : 'Pendente'}</p>
        </div>
    `;
}

// 5. Função para concluir tarefa
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (tarefa.concluida) {
        alert("Esta tarefa já foi concluída!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa concluída com sucesso!");

    listarTarefas();
}

// 6. Função para alterar prioridade
function alterarPrioridade() {

    const codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    const novaPrioridade =
        document.getElementById("novaPrioridade").value;

    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (!["Baixa", "Média", "Alta"].includes(novaPrioridade)) {
        alert("Selecione uma prioridade válida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novaPrioridade").value = "";

    listarTarefas();
}

// Exibir a lista ao abrir a página
listarTarefas();
