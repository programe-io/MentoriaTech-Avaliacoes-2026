// Geração automática de identificadores por pré-incremento
let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

// Estrutura de dados inicial (array de tarefas)
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

// Função render para sincronizar o array com a interface gráfica
function render() {
    // 1. Limpa o container visual
    listaTarefas.innerHTML = "";

    // 2. Percorre a estrutura de dados
    tarefas.forEach(function (tarefa) {
        // 3. Cria o elemento HTML <li>
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.textContent = tarefa.titulo;

        // Adiciona a identificação sequencial (#id)
        const badge = document.createElement("span");
        badge.classList.add("task-badge");
        badge.textContent = `#${tarefa.id}`;
        li.appendChild(badge);

        // Aplica o estilo de concluída caso seja true
        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        // 4. Insere o item criado na lista
        listaTarefas.appendChild(li);
    });
}

// Evento de envio do formulário
formTarefa.addEventListener("submit", function (event) {
    // Evita o recarregamento automático da página
    event.preventDefault();

    // Obtém o texto limpo de espaços adicionais
    const novoTitulo = inputTitulo.value.trim();

    // Valida se o título não está vazio
    if (novoTitulo === "") {
        return;
    }

    // Objeto da nova tarefa
    const novaTarefa = {
        id: gerarCodigo(),
        titulo: novoTitulo,
        concluida: false
    };

    // Adiciona o novo item ao array
    tarefas.push(novaTarefa);

    // Reseta o campo do input
    inputTitulo.value = "";

    // Atualiza a visualização no navegador
    render();
});

// Execução inicial para exibir os dados predefinidos
render();