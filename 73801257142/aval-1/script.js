const input = document.getElementById('tarefaInput');
const botao = document.getElementById('adicionarBtn');
const lista = document.getElementById('listaTarefas');

botao.addEventListener('click', function() {
    const textoTarefa = input.value.trim();
    
    if (textoTarefa === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    \}
    
    // Cria um novo elemento de lista (li)
    const novoItem = document.createElement('li');
    novoItem.textContent = textoTarefa;
    
    // Adiciona botão para remover o item ao clicar nele
    novoItem.addEventListener('click', function() {
        novoItem.remove();
    \});
    
    // Adiciona o item na lista na tela
    lista.appendChild(novoItem);
    
    // Limpa o campo de texto
    input.value = '';
\});$0