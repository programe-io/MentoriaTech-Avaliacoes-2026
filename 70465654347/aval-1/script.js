let tarefas = [];
let proximoId = 1;


// VALIDAR DADOS DA TAREFA
function validarDados(titulo, descricao, prioridade) {

    if (titulo.trim() === "") {
        alert("Digite o título da tarefa.");
        return false;
    }

    if (descricao.trim() === "") {
        alert("Digite a descrição da tarefa.");
        return false;
    }

    if (prioridade === "") {
        alert("Selecione uma prioridade.");
        return false;
    }

    return true;
}


// CADASTRAR TAREFA
function cadastrarTarefa() {

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const prioridade = document.getElementById("prioridade").value;

    if (!validarDados(titulo, descricao, prioridade)) {
        return;
    }

    const tarefa = {
        id: proximoId++,
        titulo: titulo,
        descricao: descricao,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    limparCampos();
    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
}


// LISTAR TAREFAS
function listarTarefas(lista = tarefas) {

    const area = document.getElementById("listaTarefas");

    area.innerHTML = "";

    if (lista.length === 0) {
        area.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
        return;
    }

    lista.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>${tarefa.descricao}</p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                <button onclick="concluirTarefa(${tarefa.id})">
                    ${tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                <button onclick="alterarTarefa(${tarefa.id})">
                    Alterar
                </button>

                <button onclick="excluirTarefa(${tarefa.id})">
                    Excluir
                </button>

            </div>
        `;

        area.appendChild(div);
    });
}


// BUSCAR TAREFA
function buscarTarefa() {

    const texto = document
        .getElementById("busca")
        .value
        .toLowerCase();

    const resultado = tarefas.filter(function(tarefa) {

        return tarefa.titulo
            .toLowerCase()
            .includes(texto);
    });

    listarTarefas(resultado);
}


// CONCLUIR TAREFA
function concluirTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    listarTarefas();
}


// ALTERAR TAREFA
function alterarTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        return;
    }

    const novoTitulo = prompt(
        "Digite o novo título:",
        tarefa.titulo
    );

    if (novoTitulo === null || novoTitulo.trim() === "") {
        return;
    }

    const novaDescricao = prompt(
        "Digite a nova descrição:",
        tarefa.descricao
    );

    if (novaDescricao === null || novaDescricao.trim() === "") {
        return;
    }

    tarefa.titulo = novoTitulo;
    tarefa.descricao = novaDescricao;

    listarTarefas();

    alert("Tarefa alterada com sucesso!");
}


// EXCLUIR TAREFA
function excluirTarefa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) {
        return;
    }

    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    });

    listarTarefas();
}


// LIMPAR CAMPOS
function limparCampos() {

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("prioridade").value = "";
}