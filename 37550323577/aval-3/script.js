
// 1. Array de tarefas
let tarefas = [
    {
        id: 1,
        titulo: "Estudar JavaScript",
        concluida: false
    },
    {
        id: 2,
        titulo: "Montar o slide da apresentação",
        concluida: true
    }
];

// 2. Contador para gerar códigos
let contadorCodigo = 2;

function gerarCodigo() {
    return ++contadorCodigo;
}

// 3. Mapeamento dos elementos HTML
const formTarefa = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("input-titulo");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");

// 4. Função de renderização
function render() {

    // Limpa a lista atual
    listaTarefas.innerHTML = "";

    // Percorre o array de tarefas
    tarefas.forEach(function(tarefa) {

        // Cria um elemento li
        const li = document.createElement("li");

        // Cria o texto da tarefa
        const span = document.createElement("span");

        span.textContent = tarefa.titulo;
        span.classList.add("texto-tarefa");

        // Verifica se a tarefa está concluída
        if (tarefa.concluida) {
            span.classList.add("concluida");
        }

        // Área dos botões
        const acoes = document.createElement("div");
        acoes.classList.add("acoes");

        // Botão concluir
        const btnConcluir = document.createElement("button");

        btnConcluir.textContent = tarefa.concluida
            ? "Desfazer"
            : "Concluir";

        btnConcluir.classList.add("btn-concluir");

        btnConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.id);
        });

        // Botão excluir
        const btnExcluir = document.createElement("button");

        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("btn-excluir");

        btnExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.id);
        });

        // Montagem dos elementos
        acoes.appendChild(btnConcluir);
        acoes.appendChild(btnExcluir);

        li.appendChild(span);
        li.appendChild(acoes);

        // Insere na lista
        listaTarefas.appendChild(li);

    });

    // Atualiza o contador
    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    contadorTarefas.textContent =
        `Total: ${tarefas.length} tarefas | ` +
        `Concluídas: ${concluidas}`;
}

// 5. Evento de cadastro de tarefas
formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    // Captura o texto digitado
    const novoTitulo = inputTitulo.value.trim();

    // Validação
    if (novoTitulo === "") {
        alert("Digite uma tarefa antes de adicionar!");
        return;
    }

    // Cria um novo objeto
    const novaTarefa = {
        id: gerarCodigo(),
        titulo: novoTitulo,
        concluida: false
    };

    // Adiciona ao array
    tarefas.push(novaTarefa);

    // Limpa o campo
    inputTitulo.value = "";

    // Atualiza a interface
    render();

});

// 6. Função para concluir ou desfazer tarefa
function concluirTarefa(id) {

    const tarefa = tarefas.find(
        tarefa => tarefa.id === id
    );

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
    }

    render();
}

// 7. Função para excluir tarefa
function excluirTarefa(id) {

    tarefas = tarefas.filter(
        tarefa => tarefa.id !== id
    );

    render();
}

// 8. Renderização inicial
render();
