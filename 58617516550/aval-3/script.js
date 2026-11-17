// Array que armazena as tarefas
let tarefas = [
    { id: 1, nome: "Estudar programação" },
    { id: 2, nome: "Fazer atividade de HTML" },
    { id: 3, nome: "Praticar JavaScript" }
];

// Identificador automático
let proximoId = 4;

// Mapeamento dos elementos HTML
const formulario = document.getElementById("formTarefa");
const campoTarefa = document.getElementById("campoTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Função responsável por atualizar a tela
function render() {

    // Limpa a lista antes de atualizar
    listaTarefas.innerHTML = "";

    // Percorre o array de tarefas
    tarefas.forEach(function(tarefa) {

        // Cria um novo elemento HTML
        const item = document.createElement("li");

        // Cria o texto da tarefa
        const texto = document.createElement("span");
        texto.textContent = tarefa.id + " - " + tarefa.nome;

        // Cria o botão de exclusão
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";

        // Evento para excluir uma tarefa
        botaoExcluir.addEventListener("click", function() {

            tarefas = tarefas.filter(function(t) {
                return t.id !== tarefa.id;
            });

            render();
        });

        // Insere os elementos na lista
        item.appendChild(texto);
        item.appendChild(botaoExcluir);

        listaTarefas.appendChild(item);
    });
}

// Evento de envio do formulário
formulario.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();

    // Captura o texto digitado
    const nomeTarefa = campoTarefa.value.trim();

    // Verifica se o campo não está vazio
    if (nomeTarefa === "") {
        return;
    }

    // Adiciona uma nova tarefa ao array
    tarefas.push({
        id: proximoId,
        nome: nomeTarefa
    });

    // Incrementa o identificador
    proximoId++;

    // Limpa o campo de texto
    campoTarefa.value = "";

    // Atualiza a tela
    render();
});

// Primeira renderização
render();
