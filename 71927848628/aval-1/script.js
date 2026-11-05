
// Lista de tarefas
let tarefas = [];

// Gerador de códigos
let geradorDeCodigo = 1;

// Validar dados
function validarDadosDaTarefa(titulo, descricao, data, prioridade) {

    if (titulo.trim().length < 5) {
        alert("O título precisa ter pelo menos 5 caracteres!");
        return false;
    }

    if (descricao.trim() === "") {
        alert("Digite uma descrição!");
        return false;
    }

    if (data === "") {
        alert("Informe a data!");
        return false;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("Prioridade inválida!");
        return false;
    }

    return true;
}

// Cadastrar tarefa
function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;
    let data = document.getElementById("data").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (!validarDadosDaTarefa(titulo, descricao, data, prioridade)) {
        return;
    }

    let tarefa = {
        codigo: geradorDeCodigo++,
        titulo: titulo,
        descricao: descricao,
        data: data,
        prioridade: prioridade,
        status: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    limparCampos();
    listarTarefas();
}

// Limpar campos
function limparCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data").value = "";
    document.getElementById("prioridade").value = "1";
}

// Buscar tarefa
function buscarTarefa(codigo) {
    return tarefas.find(tarefa => tarefa.codigo === codigo);
}

// Listar tarefas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        let div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.status) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>Descrição: ${tarefa.descricao}</p>
            <p>Data: ${tarefa.data}</p>
            <p>Prioridade: ${tarefa.prioridade}</p>
            <p>Status: ${tarefa.status ? "Concluída" : "Pendente"}</p>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>
        `;

        lista.appendChild(div);
    });
}

// Concluir tarefa
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa) {
        tarefa.status = true;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade (1 - Baixa, 2 - Média, 3 - Alta):")
    );

    if (novaPrioridade < 1 || novaPrioridade > 3 ||
        !Number.isInteger(novaPrioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}
