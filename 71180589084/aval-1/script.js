let tarefas = [];
let proximoId = 1;


// VALIDAR DADOS
function validarTarefa(titulo, descricao) {

    if (titulo.trim() === "") {
        alert("Digite o título da tarefa!");
        return false;
    }

    if (descricao.trim() === "") {
        alert("Digite a descrição da tarefa!");
        return false;
    }

    return true;
}


// CADASTRAR TAREFA
document.getElementById("formTarefa")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    if (!validarTarefa(titulo, descricao)) {
        return;
    }

    const tarefa = {
        id: proximoId,
        titulo: titulo,
        descricao: descricao,
        concluida: false
    };

    tarefas.push(tarefa);

    proximoId++;

    document.getElementById("formTarefa").reset();

    listarTarefas();
});


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

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>${tarefa.descricao}</p>

            <p>
                Status:
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                ${
                    tarefa.concluida
                    ? ""
                    : `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${tarefa.id})">
                            Concluir
                        </button>
                    `
                }

                <button
                    class="btn-alterar"
                    onclick="alterarTarefa(${tarefa.id})">
                    Alterar
                </button>

            </div>
        `;

        area.appendChild(div);
    });
}


// BUSCAR TAREFA
document.getElementById("buscar")
.addEventListener("input", function() {

    const texto = this.value.toLowerCase();

    const resultado = tarefas.filter(function(tarefa) {

        return (
            tarefa.titulo.toLowerCase().includes(texto) ||
            tarefa.descricao.toLowerCase().includes(texto)
        );

    });

    listarTarefas(resultado);
});


// CONCLUIR TAREFA
function concluirTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (tarefa) {
        tarefa.concluida = true;
    }

    listarTarefas();
}


// ALTERAR TAREFA
function alterarTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const novoTitulo = prompt(
        "Digite o novo título:",
        tarefa.titulo
    );

    if (novoTitulo === null) {
        return;
    }

    const novaDescricao = prompt(
        "Digite a nova descrição:",
        tarefa.descricao
    );

    if (novaDescricao === null) {
        return;
    }

    if (!validarTarefa(novoTitulo, novaDescricao)) {
        return;
    }

    tarefa.titulo = novoTitulo;
    tarefa.descricao = novaDescricao;

    listarTarefas();
}


// INICIAR LISTA
listarTarefas();
