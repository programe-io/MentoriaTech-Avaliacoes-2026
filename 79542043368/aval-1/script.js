// Banco de dados simulado de artigos
const artigos = [
    {
        id: 1,
        titulo: "O Minimalismo como Nova Expressão de Luxo",
        categoria: "tendencias",
        data: "24 de Novembro, 2026",
        imagem: "https://unsplash.com",
        resumo: "Peças sem logotipos aparentes, cortes impecáveis e tecidos nobres dominam as passarelas.",
        conteudo: "O conceito de luxo silencioso (Quiet Luxury) deixou de ser apenas uma microtendência para se consolidar como um estilo de vida. A ideia central é investir em peças atemporais, com alfaiataria precisa e matérias-primas de alta durabilidade como linho puro, seda e lã merino. Em vez de exibir marcas, o foco recai sobre o caimento e a discrição elegante."
    },
    {
        id: 2,
        titulo: "A Ascensão do Streetwear Brasileiro no Cenário Global",
        categoria: "streetwear",
        data: "20 de Novembro, 2026",
        imagem: "https://unsplash.com",
        resumo: "Marcas independentes nacionais ganham destaque combinando cultura urbana e identidade local.",
        conteudo: "A moda urbana produzida no Brasil vive seu auge criativo. Estilistas independentes estão ressignificando símbolos cotidianos, modelagens oversized e grafismos inspirados na arquitetura e música periférica para criar coleções que dialogam tanto com São Paulo quanto com Tóquio e Paris."
    },
    {
        id: 3,
        titulo: "Upcycling: Como a Reutilização Transforma o Design",
        categoria: "sustentabilidade",
        data: "15 de Novembro, 2026",
        imagem: "https://unsplash.com",
        resumo: "Desconstruir peças antigas para criar roupas exclusivas reduz o impacto ambiental da indústria.",
        conteudo: "Diferente da reciclagem tradicional, que demanda processos industriais pesados para desfazer fibras, o upcycling utiliza tecidos e roupas já existentes em seu estado atual. O resultado são peças únicas, feitas artesanalmente, que combatem o descarte têxtil e valorizam o trabalho manual."
    },
    {
        id: 4,
        titulo: "Acessórios Esculturais: O Ponto Focal da Temporada",
        categoria: "tendencias",
        data: "10 de Novembro, 2026",
        imagem: "https://unsplash.com",
        resumo: "Brincos orgânicos e bolsas estruturadas elevam produções básicas instantaneamente.",
        conteudo: "Quando o vestuário adota linhas mais limpas, os acessórios assumem o protagonismo. Metais dourados com formas fluidas, inspirado em esculturas modernistas, e bolsas de couro rígido com design geométrico são as apostas certeiras para atualizar qualquer visual."
    }
];

const postsGrid = document.getElementById('posts-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Renderiza os cards na tela
function renderizarArtigos(filtro = 'todos') {
    postsGrid.innerHTML = '';

    const artigosFiltrados = filtro === 'todos' 
        ? artigos 
        : artigos.filter(artigo => artigo.categoria === filtro);

    artigosFiltrados.forEach(artigo => {
        const card = document.createElement('article');
        card.className = 'post-card';
        card.innerHTML = `
            <img src="${artigo.imagem}" alt="${artigo.titulo}">
            <div class="post-info">
                <span class="tag">${artigo.categoria}</span>
                <h4>${artigo.titulo}</h4>
                <span class="post-date">${artigo.data}</span>
                <p class="post-excerpt">${artigo.resumo}</p>
                <button class="read-more" onclick="abrirPost(${artigo.id})">Ler mais</button>
            </div>
        `;
        postsGrid.appendChild(card);
    });
}

// Eventos dos botões de filtro
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderizarArtigos(btn.dataset.category);
    });
});

// Funções do Modal
function abrirPost(id) {
    const artigo = artigos.find(item => item.id === id);
    if (!artigo) return;

    document.getElementById('modal-img').src = artigo.imagem;
    document.getElementById('modal-category').textContent = artigo.categoria;
    document.getElementById('modal-title').textContent = artigo.titulo;
    document.getElementById('modal-date').textContent = artigo.data;
    document.getElementById('modal-body').textContent = artigo.conteudo;

    document.getElementById('article-modal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('article-modal').style.display = 'none';
}

// Fechar modal clicando fora da caixa
window.onclick = function(event) {
    const modal = document.getElementById('article-modal');
    if (event.target === modal) {
        fecharModal();
    }
};

// Simulação de envio da Newsletter
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const msg = document.getElementById('newsletter-msg');
    msg.textContent = `Obrigado! O e-mail ${email} foi cadastrado com sucesso.`;
    this.reset();
});

// Inicializa a página
renderizarArtigos();
