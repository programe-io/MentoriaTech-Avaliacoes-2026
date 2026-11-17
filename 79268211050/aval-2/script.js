// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o título principal e o botão (link) da página
    const titulo = document.querySelector('h1');
    const botao = document.querySelector('a');

    // Adiciona um evento de clique ao botão
    botao.addEventListener('click', (evento) => {
        // Impede que o link abra imediatamente para mostrar a ação na tela
        evento.preventDefault();

        // Altera o texto e a cor do título
        titulo.textContent = 'Você clicou no botão!';
        titulo.style.color = '#28a745';

        // Exibe um alerta amigável
        alert('O JavaScript está funcionando perfeitamente!');
    });
});
