// Aguarda o carregamento do documento
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todos os botões de "Ler mais"
    const buttons = document.querySelectorAll('.read-more-btn');

    // Adiciona o evento de clique para cada botão
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            // Pega o título do post mais próximo ao botão clicado
            const postTitle = event.target.parentElement.querySelector('h2').innerText;
            
            // Simula a abertura da matéria
            alert(`Você clicou para ler a matéria:\n"${postTitle}"\n\n(Pronto para expandir o conteúdo!)`);
        });
    });
});