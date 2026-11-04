
// 1. Array de tarefas

const tarefas = [
    {
        id: 1,
        titulo: "Estudar JavaScript",
        concluida: false
    },

    {
        id: 2,
        titulo: "Montar o slide de apresentação do trabalho",
        concluida: true
    }
];


// 2. Contador para gerar códigos automáticos

let contadorCodigo = 2;

function gerarCodigo() {
    return ++contadorCodigo;
}


// 3. Mapeamento dos elementos do DOM

const formTarefa = document.getElementById("form-tarefa");

const inputTitulo = document.getElementById("input-titulo");

const listaTarefas = document.getElementById("lista-tarefas");


// 4. Função de renderização

function render() {

    // Limpa a lista atual
    listaTarefas.innerHTML = "";

    // Percorre o array de tarefas
    tarefas.forEach(function(tarefa) {

        // Cria um elemento li
        const li = document.createElement("li");

        // Adiciona o título da tarefa
        li.textContent = tarefa.titulo;

        // Verifica se a tarefa está concluída
        if (tarefa.concluida === true) {
            li.classList.add("concluida");
        }

        // Adiciona o elemento à lista HTML
        listaTarefas.appendChild(li);

    });

}


// 5. Chamada inicial da renderização

render();


// 6. Evento de submissão do formulário

formTarefa.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();

    // Obtém o texto digitado
    const novoTitulo = inputTitulo.value.trim();

    // Verifica se o campo está vazio
    if (novoTitulo === "") {
        alert("Digite o título da tarefa!");
        return;
    }

    // Cria um novo objeto de tarefa
    const novaTarefa = {
        id: gerarCodigo(),
        titulo: novoTitulo,
        concluida: false
    };

    // Adiciona a tarefa ao array
    tarefas.push(novaTarefa);

    // Limpa o campo de texto
    inputTitulo.value = "";

    // Atualiza a lista na tela
    render();

});
