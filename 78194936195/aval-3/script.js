// Função principal para manipular o clique nos cards de conteúdo
function mostrarMensagem(tema) {
    // Alerta nativo simulando uma busca de dados
    alert(`Acessando mais informações detalhadas sobre: ${tema}...`);
    console.log(`O usuário demonstrou interesse na seção: ${tema}`);
}

// Exemplo de manipulação do DOM: Efeito visual nos 3 links ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
    
    links.forEach((link, index) => {
        // Exibe no console para verificação dos links estruturados
        console.log(`Link ${index + 1} configurado: ${link.textContent}`);
    });
});