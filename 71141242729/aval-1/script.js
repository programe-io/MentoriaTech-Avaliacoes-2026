
// Lista de tarefas
let tarefas = [];

// Elementos
const form = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const indice = document.getElementById("indice");
const lista = document.getElementById("listaTarefas");
const busca = document.getElementById("busca");

// =================================
// VALIDAR DADOS
// =================================

function validarDados() {
    if (titulo.value.trim() === "") {
        alert("Digite o título da tarefa!");
        return false;
    }

    if (descricao.value.trim() === "") {
        alert("Digite a descrição da tarefa!");
        return false;
    }

    return true;
}

// =================================
// CADASTRAR E ALTERAR
// =================================

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validarDados()) return;

    if (indice.value === "") {
        cadastrarTarefa();
    } else {
        alterarTarefa();
    }

    form.reset();
    indice.value = "";
    listarTarefas();
});

function cadastrarTarefa() {
    const tarefa = {
        titulo: titulo.value.trim(),
        descricao: descricao.value.trim(),
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada!");
}

function alterarTarefa() {
    const i = Number(indice.value);

    tarefas[i].titulo = titulo.value.trim();
    tarefas[i].descricao = descricao.value.trim();

    alert("Tarefa alterada!");
}

// =================================
// LISTAR TAREFAS
// =================================

function listarTarefas() {
    lista.innerHTML = "";

    const termo = busca.value.toLowerCase();

    const encontradas = tarefas
        .map((tarefa, i) => ({ tarefa, i }))
        .filter(item =>
            item.tarefa.titulo.toLowerCase().includes(termo)
        );

    encontradas.forEach(({ tarefa, i }) => {
        const div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const h3 = document.createElement("h3");
        h3.textContent = tarefa.titulo;

        const p = document.createElement("p");
        p.textContent = tarefa.descricao;

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const btnConcluir = document.createElement("button");
        btnConcluir.textContent = "Concluir";
        btnConcluir.className = "concluir";
        btnConcluir.addEventListener("click", function() {
            concluirTarefa(i);
        });

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Alterar";
        btnEditar.className = "editar";
        btnEditar.addEventListener("click", function() {
            prepararAlteracao(i);
        });

        div.append(h3, p, status, btnConcluir, btnEditar);
        lista.appendChild(div);
    });
}

// =================================
// BUSCAR TAREFAS
// =================================

busca.addEventListener("input", listarTarefas);

// =================================
// CONCLUIR TAREFAS
// =================================

function concluirTarefa(i) {
    tarefas[i].concluida = !tarefas[i].concluida;

    listarTarefas();
}

// =================================
// PREPARAR ALTERAÇÃO
// =================================

function prepararAlteracao(i) {
    titulo.value = tarefas[i].titulo;
    descricao.value = tarefas[i].descricao;

    indice.value = i;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Inicializar sistema
listarTarefas();
