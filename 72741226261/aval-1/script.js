// Lista de Notícias do CETI Paulo Freire
// Para trocar a foto, mude o nome em 'imagem' (ex: 'aluno.png')
const noticias = [
    {
        titulo: "Início das Aulas 2026",
        data: "19 de Fevereiro, 2026",
        categoria: "Avisos",
        imagem: "volta-as-aulas.jpg", 
        texto: "Sejam bem-vindos! Iniciamos mais um ano letivo com foco na excelência."
    },
    {
        titulo: "Projeto de Robótica",
        data: "15 de Março, 2026",
        categoria: "Projetos",
        imagem: "robotica.jpg",
        texto: "Nossos alunos estão desenvolvendo protótipos para a feira estadual."
    },
    {
        titulo: "Palestra sobre Paulo Freire",
        data: "22 de Abril, 2026",
        categoria: "Cultura",
        imagem: "palestra.png",
        texto: "Um debate sobre o patrono da nossa escola e seu legado na educação."
    }
];

// Função para renderizar as notícias na tela
function exibirNoticias() {
    const container = document.getElementById('news-container');
    
    // Limpa o container antes de carregar
    container.innerHTML = "";

    noticias.forEach(item => {
        const template = `
            <article class="news-card">
                <img src="${item.imagem}" alt="${item.titulo}" class="news-image">
                <div class="news-content">
                    <span class="category">${item.categoria}</span>
                    <h3>${item.titulo}</h3>
                    <p>${item.texto}</p>
                    <small>${item.data}</small>
                </div>
            </article>
        `;
        container.innerHTML += template;
    });
}

// Inicia a função quando a página carregar
document.addEventListener('DOMContentLoaded', exibirNoticias);