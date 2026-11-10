document.addEventListener('DOMContentLoaded', () => {
    
    // Interação com o botão de destaque (Hero)
    const btnLerMais = document.getElementById('btn-ler-mais');
    
    if (btnLerMais) {
        btnLerMais.addEventListener('click', () => {
            alert('Você clicou no artigo em destaque! Redirecionando para a leitura completa...');
        });
    }

    // Simulação de carregamento dinâmico de novos posts ao rolar ou interagir
    const postsContainer = document.getElementById('posts-container');

    // Exemplo de função que poderia buscar dados de uma API
    function simularCarregamentoDinamico() {
        console.log("Blog carregado e pronto para interações com JavaScript.");
    }

    simularCarregamentoDinamico();
});