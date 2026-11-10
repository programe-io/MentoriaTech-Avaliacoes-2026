// 1. Geração automática de identificadores por pré-incremento
let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

// 2. Estrutura do array de tarefas com objetos iniciais
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

// 3. Mapeamento de elementos do DOM com getElementById
const formTarefa = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("input-titulo");
const listaTarefas = document.getElementById("lista-tarefas");

// 4. Função render para sincronizar o array com o DOM
function render() {
    // Etapa 1: Limpar o container atual
    listaTarefas.innerHTML = "";

    // Etapa 2: Percorrer o array de tarefas
    tarefas.forEach(tarefa => {
        // Etapa 3: Gerar o elemento HTML correspondente
        const li = document.createElement("li");
        li.textContent = tarefa.titulo;

        // Verificação e estilização visual de tarefa concluída
        if (tarefa.concluida) {
            li.style.textDecoration = "line-through";
            li.classList.add("concluida");
        }

        // Etapa 4: Inserir o elemento criado no DOM
        listaTarefas.appendChild(li);
    });
}

// Chamada inicial para renderizar os dados já existentes
render();

// 5. Manipulação de evento do formulário com addEventListener e preventDefault
formTarefa.addEventListener("submit", function (event) {
    // Impede o recarregamento automático da página
    event.preventDefault();

    // Captura e remoção de espaços em branco nas extremidades
    const novoTitulo = inputTitulo.value.trim();

    // Validação: evita cadastrar tarefas sem título
    if (!novoTitulo) return;

    // Criação da nova tarefa
    const novaTarefa = {
        id: gerarCodigo(),
        titulo: novoTitulo,
        concluida: false
    };

    // Adição ao array e sincronização da interface
    tarefas.push(novaTarefa);
    inputTitulo.value = "";
    render();
});