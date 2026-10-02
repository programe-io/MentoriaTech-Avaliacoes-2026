// Lista onde as tarefas serão armazenadas
let tarefas = [];


// ==========================================
// VALIDAR DADOS
// ==========================================

function validarDados(titulo, descricao, data) {

    if (titulo.trim() === "") {
        alert("Digite o título da tarefa!");
        return false;
    }

    if (descricao.trim() === "") {
        alert("Digite a descrição da tarefa!");
        return false;
    }

    if (data === "") {
        alert("Informe a data da tarefa!");
        return false;
    }

    return true;
}


// ==========================================
// CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;
    let data = document.getElementById("data").value;

    // Validação
    if (!validarDados(titulo, descricao, data)) {
        return;
    }

    // Criando a tarefa
    let tarefa = {
        id: Date.now(),
        titulo: titulo,
        descricao: descricao,
        data: data,
        concluida: false
    };

    // Adicionando na lista
    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    // Limpar campos
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data").value = "";

    // Atualizar lista
    listarTarefas();
}


// ==========================================
// LISTAR TAREFAS
// ==========================================

function listarTarefas(lista = tarefas) {

    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    if (lista.length === 0) {
        resultado.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
        return;
    }

    lista.forEach(function(tarefa) {

        let div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p><strong>Descrição:</strong> ${tarefa.descricao}</p>

            <p><strong>Data:</strong> ${tarefa.data}</p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="botoes">

                ${
                    !tarefa.concluida
                    ? `<button class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.id})">
                        Concluir
                       </button>`
                    : ""
                }

                <button class="btn-alterar"
                    onclick="alterarTarefa(${tarefa.id})">
                    Alterar
                </button>

            </div>
        `;

        resultado.appendChild(div);
    });
}


// ==========================================
// BUSCAR TAREFA
// ==========================================

function buscarTarefa() {

    let busca = document.getElementById("busca").value
        .toLowerCase()
        .trim();

    if (busca === "") {
        alert("Digite o nome da tarefa para buscar!");
        return;
    }

    let tarefasEncontradas = tarefas.filter(function(tarefa) {

        return tarefa.titulo
            .toLowerCase()
            .includes(busca);

    });

    listarTarefas(tarefasEncontradas);
}


// ==========================================
// CONCLUIR TAREFA
// ==========================================

function concluirTarefa(id) {

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa concluída com sucesso!");

    listarTarefas();
}


// ==========================================
// ALTERAR TAREFA
// ==========================================

function alterarTarefa(id) {

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novoTitulo = prompt(
        "Digite o novo título:",
        tarefa.titulo
    );

    if (novoTitulo === null) {
        return;
    }

    let novaDescricao = prompt(
        "Digite a nova descrição:",
        tarefa.descricao
    );

    if (novaDescricao === null) {
        return;
    }

    let novaData = prompt(
        "Digite a nova data (AAAA-MM-DD):",
        tarefa.data
    );

    if (novaData === null) {
        return;
    }

    // Validar os novos dados
    if (!validarDados(novoTitulo, novaDescricao, novaData)) {
        return;
    }

    // Alterar dados
    tarefa.titulo = novoTitulo;
    tarefa.descricao = novaDescricao;
    tarefa.data = novaData;

    alert("Tarefa alterada com sucesso!");

    listarTarefas();
}


// ==========================================
// LISTAR TAREFAS AO ABRIR A PÁGINA
// ==========================================

listarTarefas();