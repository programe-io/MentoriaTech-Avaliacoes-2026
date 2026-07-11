const posts = [
    {
        id: 1,
        title: "A Redenção do Fenômeno",
        date: "30 de Junho de 2002",
        summary: "Após o drama de 98 e anos de lesões assustadoras, Ronaldo ressurge para decidir a final contra a Alemanha.",
        details: "Ronaldo marcou 8 gols no torneio, sendo o artilheiro isolado. Os dois gols na final contra o goleiro Oliver Kahn selaram o Penta."
    },
    {
        id: 2,
        title: "O Fator Ronaldinho e o Gol de Falta",
        date: "21 de Junho de 2002",
        summary: "Quartas de final contra a Inglaterra: um jogo tenso, virada e um gol que desafiou a física.",
        details: "Atrás no placar, o Brasil contou com a genialidade de um jovem Ronaldinho Gaúcho. Ele encobriu o goleiro David Seaman em uma falta memorável."
    },
    {
        id: 3,
        title: "A Madrugada Brasileira",
        date: "31 de Maio a 30 de Junho",
        summary: "Como o fuso horário transformou a rotina de um país inteiro durante um mês.",
        details: "Escolas parando, bares abrindo às 3 da manhã e trabalhadores unidos pelo futebol durante a madrugada."
    }
];

const feedContainer = document.getElementById('blog-feed');

posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'post';
    
    article.innerHTML = `
        <h2>${post.title}</h2>
        <span class="meta">Publicado em: ${post.date}</span>
        <p>${post.summary}</p>
        <button onclick="toggleDetails(${post.id})">Ler Mais</button>
        <div id="details-${post.id}" class="hidden-content">
            <p>${post.details}</p>
        </div>
    `;
    
    feedContainer.appendChild(article);
});

window.toggleDetails = function(id) {
    const content = document.getElementById(`details-${id}`);
    const isHidden = content.style.display === 'none' || content.style.display === '';
    
    if (isHidden) {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
};