
/* =================================
   1. ARRAY DE TAREFAS
================================= */

let tarefas = [
    {
        id: 1,
        titulo: "Estudar JavaScript",
        concluida: false
    },
    {
        id: 2,
        titulo: "Fazer atividade da faculdade",
        concluida: true
    },
    {
        id: 3,
        titulo: "Organizar os estudos",
        concluida: false
    }
];


/* =================================
   2. GERADOR DE CÓDIGOS
================================= */

let contadorCodigo = 3;

function gerarCodigo() {
    return ++contadorCodigo;
}


/* =================================
   3. MAPEAMENTO DO DOM
================================= */

const formTarefa = document.getElementById("form-tarefa");

const inputTitulo = document.getElementById("input-titulo");

const listaTarefas = document.getElementById("lista-tarefas");

const total = document.getElementById("total");

const pendentes = document.getElementById("pendentes");

const concluidas = document.getElementById("concluidas");


/* =================================
   4. FUNÇÃO RENDER
================================= */

function render() {

    // Limpa o conteúdo anterior
    listaTarefas.innerHTML = "";

    // Verifica se existem tarefas
    if (tarefas.length === 0) {

        const mensagem = document.createElement("li");

        mensagem.textContent = "Nenhuma tarefa cadastrada.";

        mensagem.classList.add("vazio");

        listaTarefas.appendChild(mensagem);

    }

    // Percorre o array
    tarefas.forEach(function(tarefa) {

        // Cria o elemento li
        const li = document.createElement("li");

        // Cria o título
        const span = document.createElement("span");

        span.textContent = tarefa.titulo;

        span.classList.add("titulo");

        // Verifica se está concluída
        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        // Cria a área de ações
        const acoes = document.createElement("div");

        acoes.classList.add("acoes");

        // Botão concluir
        const btnConcluir = document.createElement("button");

        btnConcluir.textContent = tarefa.concluida
            ? "Desfazer"
            : "Concluir";

        btnConcluir.classList.add("btn-concluir");

        btnConcluir.addEventListener("click", function() {

            tarefa.concluida = !tarefa.concluida;

            render();

        });

        // Botão excluir
        const btnExcluir = document.createElement("button");

        btnExcluir.textContent = "Excluir";

        btnExcluir.classList.add("btn-excluir");

        btnExcluir.addEventListener("click", function() {

            tarefas = tarefas.filter(function(item) {

                return item.id !== tarefa.id;

            });

            render();

        });

        // Organiza os elementos
        acoes.appendChild(btnConcluir);

        acoes.appendChild(btnExcluir);

        li.appendChild(span);

        li.appendChild(acoes);

        // Insere na lista HTML
        listaTarefas.appendChild(li);

    });


    /* =================================
       5. ATUALIZA OS CONTADORES
    ================================= */

    total.textContent = tarefas.length;

    pendentes.textContent = tarefas.filter(function(tarefa) {

        return tarefa.concluida === false;

    }).length;

    concluidas.textContent = tarefas.filter(function(tarefa) {

        return tarefa.concluida === true;

    }).length;

}


/* =================================
   6. EVENTO DO FORMULÁRIO
================================= */

formTarefa.addEventListener("submit", function(event) {

    // Impede o envio padrão
    event.preventDefault();

    // Captura o texto digitado
    const novoTitulo = inputTitulo.value.trim();

    // Validação
    if (novoTitulo === "") {

        alert("Digite uma tarefa!");

        return;

    }

    // Cria o objeto
    const novaTarefa = {

        id: gerarCodigo(),

        titulo: novoTitulo,

        concluida: false

    };

    // Adiciona ao array
    tarefas.push(novaTarefa);

    // Limpa o input
    inputTitulo.value = "";

    // Atualiza a tela
    render();

});


/* =================================
   7. RENDERIZAÇÃO INICIAL
================================= */

render();
