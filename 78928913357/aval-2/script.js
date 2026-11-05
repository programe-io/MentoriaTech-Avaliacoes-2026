// Garante que o código só roda após o HTML estar totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos da página usando seletores CSS
    const botao = document.querySelector('.btn');
    const titulo = document.querySelector('h1');
    const paragrafo = document.querySelector('p');

    // Verifica se o botão realmente existe na página para evitar erros
    if (botao) {
        // Adiciona um evento de clique ao botão
        botao.addEventListener('click', (evento) => {
            // Evita o comportamento padrão (caso o botão fosse um link)
            evento.preventDefault();

            // Altera o conteúdo dos textos dinamicamente
            titulo.textContent = '¡Sucesso!';
            paragrafo.textContent = 'O JavaScript foi executado com sucesso e mudou esta página.';

            // Altera o estilo do botão temporariamente como feedback visual
            botao.style.backgroundColor = '#059669'; // Verde
            botao.textContent = 'Clicado!';

            // Desativa o botão para não clicar repetidas vezes
            botao.style.pointerEvents = 'none';
        });
    }
});
