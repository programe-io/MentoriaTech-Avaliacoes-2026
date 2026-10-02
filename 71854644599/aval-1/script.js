let tarefas = [];
let proximoId = 1;

const formTarefa = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");
const listaTarefas = document.getElementById("listaTarefas");
const campoBusca = document.getElementById("campoBusca");
const mensagem = document.getElementById("mensagem");

// VALIDAR DADOS
function validarTarefa(titulo, descricao) {
if (titulo.trim() === "") {
return "O título é obrigatório.";
}

```
if (titulo.trim().length < 3) {
    return "O título deve ter pelo menos 3 caracteres.";
}

if (descricao.trim() === "") {
    return "A descrição é obrigatória.";
}

return null;
```

}

// CADASTRAR TAREFA
formTarefa.addEventListener("submit", function (evento) {
evento.preventDefault();

```
const titulo = tituloInput.value;
const descricao = descricaoInput.value;

const erro = validarTarefa(titulo, descricao);

if (erro) {
    mostrarMensagem(erro, "red");
    return;
}

const tarefa = {
    id: proximoId,
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    concluida: false
};

tarefas.push(tarefa);
proximoId++;

formTarefa.reset();

mostrarMensagem("Tarefa cadastrada com sucesso!", "green");

listarTarefas();
```

});

// LISTAR TAREFAS
function listarTarefas(lista = tarefas) {
listaTarefas.innerHTML = "";

```
if (lista.length === 0) {
    listaTarefas.innerHTML =
        '<p class="vazio">Nenhuma tarefa encontrada.</p>';
    return;
}

lista.forEach(function (tarefa) {

    const div = document.createElement("div");

    div.classList.add("tarefa");

    if (tarefa.concluida) {
        div.classList.add("concluida");
    }

    div.innerHTML = `
        <h3>${tarefa.titulo}</h3>

        <p>${tarefa.descricao}</p>

        <p>
            <strong>Status:</strong>
            ${tarefa.concluida ? "Concluída" : "Pendente"}
        </p>

        <div class="botoes">

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

            <button
                class="btn-excluir"
                onclick="excluirTarefa(${tarefa.id})">
                Excluir
            </button>

        </div>
    `;

    listaTarefas.appendChild(div);
});
```

}

// BUSCAR TAREFAS
campoBusca.addEventListener("input", function () {

```
const texto = campoBusca.value.toLowerCase();

const resultado = tarefas.filter(function (tarefa) {

    return (
        tarefa.titulo.toLowerCase().includes(texto) ||
        tarefa.descricao.toLowerCase().includes(texto)
    );

});

listarTarefas(resultado);
```

});

// CONCLUIR TAREFA
function concluirTarefa(id) {

```
const tarefa = tarefas.find(function (tarefa) {
    return tarefa.id === id;
});

if (!tarefa) {
    mostrarMensagem("Tarefa não encontrada.", "red");
    return;
}

tarefa.concluida = true;

mostrarMensagem(
    "Tarefa concluída com sucesso!",
    "green"
);

listarTarefas();
```

}

// ALTERAR TAREFA
function alterarTarefa(id) {

```
const tarefa = tarefas.find(function (tarefa) {
    return tarefa.id === id;
});

if (!tarefa) {
    mostrarMensagem("Tarefa não encontrada.", "red");
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

const erro = validarTarefa(
    novoTitulo,
    novaDescricao
);

if (erro) {
    mostrarMensagem(erro, "red");
    return;
}

tarefa.titulo = novoTitulo.trim();
tarefa.descricao = novaDescricao.trim();

mostrarMensagem(
    "Tarefa alterada com sucesso!",
    "green"
);

listarTarefas();
```

}

// EXCLUIR TAREFA
function excluirTarefa(id) {

```
const confirmar = confirm(
    "Deseja realmente excluir esta tarefa?"
);

if (!confirmar) {
    return;
}

tarefas = tarefas.filter(function (tarefa) {
    return tarefa.id !== id;
});

mostrarMensagem(
    "Tarefa excluída com sucesso!",
    "green"
);

listarTarefas();
```

}

// MOSTRAR MENSAGEM
function mostrarMensagem(texto, cor) {

```
mensagem.textContent = texto;
mensagem.style.color = cor;

setTimeout(function () {
    mensagem.textContent = "";
}, 3000);
```

}

// INICIAR LISTA
listarTarefas();
