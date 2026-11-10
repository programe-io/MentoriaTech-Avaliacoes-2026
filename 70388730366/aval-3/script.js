// 1. Geração automática de identificadores por meio de incremento
let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

// 2. Estrutura do array de tarefas (Estrutura de Dados em memória)
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

// 3. Mapeamento dos elementos do DOM com getElementById
const formTarefa = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("input-titulo");
const listaTarefas = document.getElementById("lista-tarefas");

// 4. Construção da função render (Padrão para limpar, percorrer e inserir elementos no DOM)
function render() {
    // A) Limpa o container atual
    listaTarefas.innerHTML = "";

    // B) Percorre a estrutura de dados (Array tarefas)
    tarefas.forEach(function (tarefa) {
        // C) Gera o elemento HTML correspondente a cada dado
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.textContent = tarefa.titulo;

        // Adiciona a badge com o ID gerado automaticamente
        const badge = document.createElement("span");
        badge.classList.add("task-badge");
        badge.textContent = `#${tarefa.id}`;
        li.appendChild(badge);

        // Verificação de tarefas concluídas (Aplica a classe que insere o estilo line-through)
        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        // D) Insere esse elemento no DOM
        listaTarefas.appendChild(li);
    });
}

// 5. Manipulação de eventos de formulário com addEventListener e preventDefault
formTarefa.addEventListener("submit", function (event) {
    // Impede o comportamento padrão do navegador de recarregar a página
    event.preventDefault();

    // Captura e valida o título digitado
    const novoTitulo = inputTitulo.value.trim();

    // Interrompe se o campo estiver vazio
    if (novoTitulo === "") {
        return;
    }

    // Cria o objeto da nova tarefa
    const novaTarefa = {
        id: gerarCodigo(),
        titulo: novoTitulo,
        concluida: false
    };

    // 6. Adição de novos itens ao array com push
    tarefas.push(novaTarefa);

    // Limpa o campo do formulário
    inputTitulo.value = "";

    // Atualização da tela por meio de nova chamada à função render
    render();
});

// 7. Chamada inicial da função render
render();