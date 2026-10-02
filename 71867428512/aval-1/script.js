let tarefas = [];
let proximoId = 1;

const form = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const busca = document.getElementById("busca");
const listaTarefas = document.getElementById("listaTarefas");

// VALIDAR TAREFA
function validarTarefa(titulo, descricao) {

    if (titulo.trim() === "") {
        alert("O título é obrigatório!");
        return false;
    }

    if (descricao.trim() === "") {
        alert("A descrição é obrigatória!");
        return false;
    }

    return true;
}

// CADASTRAR TAREFA
form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validarTarefa(titulo.value, descricao.value)) {
        return;
    }

    const tarefa = {
        id: proximoId++,
        titulo: titulo.value.trim(),
        descricao: descricao.value.trim(),
        concluida: false
    };

    tarefas.push(tarefa);

    form.reset();

    listarTarefas();
});

// LISTAR TAREFAS
function listarTarefas(lista = tarefas) {

    listaTarefas.innerHTML = "";

    if (lista.length === 0) {
        listaTarefas.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
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
                    !tarefa.concluida
                    ? `<button
                        class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.id})">
                        Concluir
                       </button>`
                    : ""
                }

                <button
                    class="btn-alterar"
                    onclick="alterarTarefa(${tarefa.id})">
                    Alterar
                </button>

            </div>
        `;

        listaTarefas.appendChild(div);
    });
}

// BUSCAR TAREFAS
busca.addEventListener("input", function() {

    const texto = busca.value.toLowerCase();

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

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

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

    tarefa.titulo = novoTitulo.trim();
    tarefa.descricao = novaDescricao.trim();

    listarTarefas();
}
