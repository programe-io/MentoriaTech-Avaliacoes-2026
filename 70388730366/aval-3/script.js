// Geração automática de código (ID sequencial)
let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

// Estrutura do array inicial de tarefas
const tarefas = [
    {
        id: gerarCodigo(),
        titulo: "estudar JavaScript",
        concluida: false
    },
    {
        id: gerarCodigo(),
        titulo: "montar o slide de apresentação do trabalho",
        concluida: true
    }
];

// Mapeamento dos elementos do DOM
const formTarefa = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("input-titulo");
const listaTarefas = document.getElementById("lista-tarefas");

// Função responsável por renderizar o array na tela
function render() {
    // 1. Limpa o container visual
    listaTarefas.innerHTML = "";

    // 2. Percorre a estrutura de dados
    tarefas.forEach(function (tarefa) {
        // Cría o elemento visual <li>
        const li = document.createElement("li");
        li.textContent = tarefa.titulo;

        // Aplica o estilo de riscado se a tarefa estiver concluída
        if (tarefa.concluida) {
            li.style.textDecoration = "line-through";
        }

        // Insere o <li> dentro do container <ul>
        listaTarefas.appendChild(li);
    });
}

// Evento de submissão do formulário
formTarefa.addEventListener("submit", function (event) {
    // Impede o recarregamento padrão da página
    event.preventDefault();

    // Obtém o valor digitado e remove espaços nas pontas
    const novoTitulo = inputTitulo.value.trim();

    // Validação: não adiciona tarefas sem título
    if (novoTitulo === "") {
        return;
    }

    // Cria o objeto da nova tarefa
    const novaTarefa = {
        id: gerarCodigo(),
        titulo: novoTitulo,
        concluida: false
    };

    // Adiciona a nova tarefa ao final do array
    tarefas.push(novaTarefa);

    // Limpa o campo de entrada
    inputTitulo.value = "";

    // Reexecuta a renderização para atualizar a tela
    render();
});

// Chamada inicial para renderizar os itens cadastrados ao carregar a página
render();