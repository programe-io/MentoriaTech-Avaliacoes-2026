// Função para maximizar e restaurar a caixa de código
function maximizar(idTextArea) {
    const textarea = document.getElementById(idTextArea);
    const editorBox = textarea.closest('.editor-box');
    const botao = editorBox.querySelector('.btn-maximizar');

    // Alterna a classe de maximizado
    editorBox.classList.toggle('maximizado');

    // Altera o texto do botão de acordo com o estado
    if (editorBox.classList.contains('maximizado')) {
        botao.textContent = 'Minimizar';
    } else {
        botao.textContent = 'Maximizar';
    }
}

// Manipulação do envio do formulário
document.getElementById('form-entrega').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Captura os valores digitados
    const htmlEntrega = document.getElementById('html-code').value;
    const cssEntrega