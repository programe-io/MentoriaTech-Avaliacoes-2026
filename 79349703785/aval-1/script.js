const posts = [
    {
        id: 1,
        title: "É Assim que Acaba: Por que a história de Lily Bloom marcou uma geração",
        book: "É Assim que Acaba (2016)",
        category: "Drama Contemporâneo",
        color: "linear-gradient(135deg, #c0566b, #e08295)",
        readTime: "4 min de leitura",
        likes: 142,
        liked: false,
        excerpt: "Muito além de um romance comum, o maior sucesso de Colleen Hoover aborda ciclos familiares, coragem e decisões difíceis.",
        quote: "“Nem todo mundo que você ama vai te fazer bem, e nem todo mundo que te faz bem você vai amar da mesma forma.”",
        content: [
            "Quando Lily Bloom se muda para Boston para abrir sua própria floricultura e conhece o neurocirurgião Ryle Kincaid, tudo parece seguir o roteiro clássico de um romance perfeito. No entanto, Colleen Hoover subverte essa expectativa ao construir uma narrativa honesta sobre relacionamentos abusivos e a dificuldade real de romper ciclos.",
            "O grande trunfo do livro está na empatia construída com o leitor. Em vez de julgar as escolhas da protagonista de fora, somos colocados dentro da sua mente, entendendo como o afeto e a esperança podem confundir os limites entre amor e dor.",
            "A presença de Atlas Corrigan funciona como um porto seguro e um lembrete de quem Lily era antes de precisar se diminuir para caber na vida de outra pessoa. É uma leitura necessária, emocionante e que continua gerando debates importantes."
        ]
    },
    {
        id: 2,
        title: "Verity: O lado sombrio e perturbador de Colleen Hoover",
        book: "Verity (2018)",
        category: "Suspense Psicológico",
        color: "linear-gradient(135deg, #2b2d42, #5c6378)",
        readTime: "5 min de leitura",
        likes: 98,
        liked: false,
        excerpt: "Conhecida pelos dramas românticos, a autora surpreendeu o mundo literário com um thriller claustrofóbico e cheio de reviravoltas.",
        quote: "“Encontre o que você ama e deixe que isso mate você.”",
        content: [
            "Lowen Ashleigh é uma escritora à beira da falência financeira quando recebe uma proposta irrecusável: terminar os livros de uma série de sucesso da famosa autora Verity Crawford, que ficou incapacitada após um grave acidente.",
            "Ao se hospedar na casa da família para organizar as anotações de Verity, Lowen encontra uma autobiografia secreta nunca destinada a ser lida. Cada página revela confissões perturbadoras sobre a família, os filhos e o casamento com Jeremy.",
            "O final divide opiniões até hoje entre os leitores: Carta ou Manuscrito? Independentemente do lado que você escolher, Verity prova a versatilidade de Hoover em criar tensão psicológica do início ao fim."
        ]
    },
    {
        id: 3,
        title: "Novembro, 9: Um encontro por ano e segredos guardados no tempo",
        book: "Novembro, 9 (2015)",
        category: "Romance Jovem",
        color: "linear-gradient(135deg, #b56576, #6d597a)",
        readTime: "3 min de leitura",
        likes: 76,
        liked: false,
        excerpt: "Fallon e Ben fazem um pacto para se encontrarem apenas um dia por ano, sem contato nas redes sociais entre uma data e outra.",
        quote: "“Você nunca vai conseguir se encontrar se estiver perdida em outra pessoa.”",
        content: [
            "Fallon está prestes a se mudar de Los Angeles para Nova York no dia 9 de novembro quando conhece Ben, um aspirante a escritor. A química entre os dois é imediata, mas o momento de vida de ambos pede foco individual.",
            "Eles decidem se encontrar exatamente na mesma data pelos próximos cinco anos, sem trocar telefones ou se seguir na internet. O que começa como uma premissa leve e criativa ganha camadas profundas à medida que os anos passam.",
            "Com diálogos rápidos e reviravoltas típicas da autora, o livro fala sobre autoestima, perdão e como a escrita pode ser uma ferramenta de cura."
        ]
    },
    {
        id: 4,
        title: "Todas as Suas (Im)Perfeições: O retrato mais maduro sobre o casamento",
        book: "Todas as Suas (Im)Perfeições (2018)",
        category: "Drama Contemporâneo",
        color: "linear-gradient(135deg, #3d5a80, #7692b5)",
        readTime: "4 min de leitura",
        likes: 115,
        liked: false,
        excerpt: "Alternando entre o passado apaixonado e o presente desgastado de Quinn e Graham, o livro mostra o peso do silêncio a dois.",
        quote: "“Se você iluminar apenas suas imperfeições, todas as suas qualidades ficarão na sombra.”",
        content: [
            "Diferente das histórias focadas no início da paixão, este livro mergulha na manutenção de um relacionamento longo quando os sonhos do casal não se realizam como planejado.",
            "A estrutura alterna capítulos do 'Antes' — cheios de leveza, bilhetes escondidos e cumplicidade — com o 'Agora', marcado pela distância emocional causada pela infertilidade e pela falta de comunicação.",
            "É uma das obras mais sensíveis de Colleen Hoover, mostrando que o amor exige escolha diária e vulnerabilidade para sobreviver às crises."
        ]
    },
    {
        id: 5,
        title: "O Lado Feio do Amor: Regras simples que nunca funcionam",
        book: "O Lado Feio do Amor (2014)",
        category: "Romance Jovem",
        color: "linear-gradient(135deg, #4a4e69, #9a8c98)",
        readTime: "4 min de leitura",
        likes: 89,
        liked: false,
        excerpt: "Tate e Miles combinam um relacionamento puramente físico com apenas duas regras: nunca perguntar sobre o passado e não esperar um futuro.",
        quote: "“Os momentos feios do amor são os que dão valor aos momentos bonitos.”",
        content: [
            "Quando Tate Collins se muda para o apartamento do irmão em São Francisco, ela conhece Miles Archer, um piloto de avião reservado e emocionalmente fechado. A atração entre eles leva a um acordo aparentemente prático.",
            "Enquanto Tate narra o presente e tenta entender as barreiras de Miles, capítulos curtos e poéticos revelam o passado dele seis anos antes, explicando a origem de seu trauma.",
            "A narrativa prende pela dualidade entre a leveza do cotidiano de Tate e o peso emocional carregado por Miles, culminando em uma das histórias de superação mais queridas pelos fãs."
        ]
    },
    {
        id: 6,
        title: "Layla: Sobrenatural, mistério e obsessão em uma casa isolada",
        book: "Layla (2020)",
        category: "Suspense Psicológico",
        color: "linear-gradient(135deg, #5e303c, #8c4a5b)",
        readTime: "4 min de leitura",
        likes: 64,
        liked: false,
        excerpt: "Colleen Hoover mistura romance e elementos paranormais em uma trama que desafia a percepção do leitor sobre identidade.",
        quote: "“Às vezes, amar alguém significa deixar ir quem você achava que essa pessoa era.”",
        content: [
            "Leeds conhece Layla em um casamento e sente uma conexão instantânea. Porém, após um ataque violento que deixa Layla hospitalizada por semanas, ela retorna fisicamente recuperada, mas emocionalmente irreconhecível.",
            "Na tentativa de resgatar o relacionamento, Leeds a leva para a pousada isolada onde se conheceram. Lá, fenômenos inexplicáveis começam a acontecer, colocando o protagonista diante de um dilema moral complexo.",
            "É uma leitura fora da curva na bibliografia da autora, ideal para quem gosta de mistérios com atmosfera sombria e ritmo acelerado."
        ]
    }
];

const postsGrid = document.getElementById('postsGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('postModal');
const closeModalBtn = document.getElementById('closeModal');

let currentCategory = 'Todos';
let searchQuery = '';

function renderPosts() {
    const filtered = posts.filter(post => {
        const matchesCategory = currentCategory === 'Todos' || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery) ||
                              post.book.toLowerCase().includes(searchQuery) ||
                              post.excerpt.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        postsGrid.innerHTML = `<div class="empty-state"><h3>Nenhuma resenha encontrada</h3><p>Tente buscar por outro livro ou limpar o filtro.</p></div>`;
        return;
    }

    postsGrid.innerHTML = filtered.map(post => `
        <article class="post-card">
            <div class="card-banner" style="background: ${post.color};">
                ${post.book}
            </div>
            <div class="card-body">
                <span class="tag">${post.category}</span>
                <h2>${post.title}</h2>
                <p class="card-excerpt">${post.excerpt}</p>
                <div class="card-footer">
                    <button class="read-btn" onclick="openPost(${post.id})">Ler resenha &rarr;</button>
                    <button class="like-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                        ♥ ${post.likes}
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts();
}

function openPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('modalTag').textContent = post.category;
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalMeta').textContent = `${post.book} • ${post.readTime}`;
    document.getElementById('modalQuote').textContent = post.quote;
