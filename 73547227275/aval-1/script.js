// Selecionando os elementos do HTML
const inputTarefa = document.getElementById('novaTarefa');
const botaoAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();

    // Validação: não deixa adicionar se o campo estiver vazio
    if (textoTarefa === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    // Criando o elemento de lista (li)
    const novaLi = document.createElement('li');
    novaLi.innerText = textoTarefa;

    // Criando o botão de deletar tarefa
    const botaoDeletar = document.createElement('button');
    botaoDeletar.innerText = 'Excluir';
    botaoDeletar.className = 'btn-deletar';
    
    // Evento para deletar a tarefa quando clicar no botão
    botaoDeletar.addEventListener('click', function() {
        listaTarefas.removeChild(novaLi);
    });

    // Colocando o botão dentro do li, e o li dentro da ul (lista)
    novaLi.appendChild(botaoDeletar);
    listaTarefas.appendChild(novaLi);

    // Limpa o campo de texto e põe o foco nele novamente
    inputTarefa.value = '';
    inputTarefa.focus();
}

// Escutando o clique do botão
botaoAdicionar.addEventListener('click', adicionarTarefa);

// Permite adicionar a tarefa também apertando a tecla "Enter"
inputTarefa.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});