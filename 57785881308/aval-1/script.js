// Aguarda o carregamento do documento
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todos os botões de curtir projeto
    const botoesCurtir = document.querySelectorAll('.btn-projeto');

    botoesCurtir.forEach((botao, index) => {
        let curtido = false;
        
        botao.addEventListener('click', () => {
            curtido = !curtido;
            
            if (curtido) {
                botao.textContent = '❤️ Curtido!';
                botao.style.backgroundColor = '#e74c3c';
            \} else {
                botao.textContent = 'Curtir Projeto';
                botao.style.backgroundColor = '#1abc9c';
            \}
        \});
    \});
\});
$0