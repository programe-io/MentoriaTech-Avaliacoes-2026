// Selecionando os elementos do DOM
const inputTarefa = document.getElementById('novaTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();

    // Validação básica para não adicionar item vazio
    if (textoTarefa === "") {
        alert("Por favor, digite uma tarefa válida!");
        return;
    }

    // Criando o elemento <li> da lista
    const novoItem = document.createElement('li');
    novoItem.innerText = textoTarefa;

    // Criando o botão de excluir que vai dentro do <li>
    const btnExcluir = document.createElement('button');
    btnExcluir.innerText = 'Excluir';
    btnExcluir.classList.add('btn-excluir');

    // Evento para remover a tarefa quando clicar em excluir
    btnExcluir.addEventListener('click', function() {
        listaTarefas.removeChild(novoItem);
    });

    // Colocando o botão de excluir dentro do item da lista
    novoItem.appendChild(btnExcluir);

    // Adicionando o item completo na nossa lista <ul>
    listaTarefas.appendChild(novoItem);

    // Limpando o campo de texto e voltando o foco para ele
    inputTarefa.value = "";
    inputTarefa.focus();
}

// Ouvinte de evento para o clique do botão
btnAdicionar.addEventListener('click', adicionarTarefa);

// Permite adicionar a tarefa também apertando a tecla "Enter"
inputTarefa.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});