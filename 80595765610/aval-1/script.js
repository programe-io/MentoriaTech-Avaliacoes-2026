// Banco de dados simulado de artigos
const artigos = [
    {
        id: 1,
        titulo: "Mangalarga Marchador: O Orgulho Nacional",
        categoria: "racas",
        categoriaNome: "Raças",
        data: "20 de Novembro, 2026",
        imagem: "https://unsplash.com",
        resumo: "Conheça a história, a resistência e o andamento macio que tornaram o Mangalarga Marchador a raça mais popular do Brasil.",
        conteudo: `
            <p>O Mangalarga Marchador é uma raça genuinamente brasileira, surgida no sul de Minas Gerais no século XIX a partir do cruzamento entre cavalos da raça Alter-Real e éguas locais.</p>
            <p>Sua principal característica é a marcha, um andamento natural em quatro tempos que proporciona extremo conforto ao cavaleiro, evitando o impacto característico do trote comum.</p>
            <p>Além da docilidade e inteligência, são animais extremamente rústicos e resistentes, ideais tanto para longas cavalgadas quanto para o trabalho no campo e provas funcionais.</p>
        `
    },
    {
        id: 2,
        titulo: "Cuidados Essenciais com os Cascos no Período Chuvoso",
        categoria: "cuidados",
        categoriaNome: "Cuidados & Saúde",
        data: "15 de Novembro, 2026",
        imagem: "https://unsplash.com",
        resumo: "A umidade excessiva pode causar problemas sérios nos cascos. Veja como prevenir a podridão da ranilha e manter seu cavalo saudável.",
        conteudo: `
            <p>Existe um ditado antigo no meio equestre: "sem casco, não há cavalo". Durante épocas de muita chuva ou em baias úmidas, a saúde dos cascos exige atenção redobrada.</p>
            <p>A limpeza diária com o limpador de cascos é fundamental para remover barro, esterco e pedras acumuladas. A umidade retida favorece a proliferação de bactérias e fungos, causando a chamada broca ou podridão de ranilha.</p>
            <p>Mantenha o casqueamento em dia com um ferrador profissional a cada 30 a 45 dias e garanta que o animal tenha áreas secas para descansar.</p>
        `
    },
    {
        id: 3,
        titulo: "Quarto de Milha: Velocidade e Versatilidade nas Pistas",
        categoria: "esportes",
        categoriaNome: "Esportes & Montaria",
        data: "10 de Novembro, 2026",
        imagem: "https://unsplash.com",
        resumo: "Descubra por que o Quarto de Milha domina provas como Três Tambores, Vaquejada e Rédeas com sua explosão muscular.",
        conteudo: `
            <p>O nome Quarto de Milha vem da sua incrível capacidade de acelerar mais rápido que qualquer outra raça em distâncias curtas de até um quarto de milha (cerca de 400 metros).</p>
            <p>Com musculatura compacta e poderosa, especialmente nos posteriores, esses cavalos têm agilidade impressionante para paradas bruscas e giros rápidos.</p>
            <p>No Brasil, a raça é a grande estrela de modalidades como Três Tambores, Laço em Dupla, Vaquejada e Apartação, conquistando criadores e competidores em todo o país.</p>
        `
    },
    {
        id: 4,
        titulo: "Alimentação Equina: Entendendo o Sistema Digestivo",
        categoria: "cuidados",
        categoriaNome: "Cuidados & Saúde",
        data: "02 de Novembro, 2026",
        imagem: "https://unsplash.com",
        resumo: "O estômago do cavalo é pequeno e sensível. Aprenda a equilibrar volumoso e concentrado para evitar cólicas.",
        conteudo: `
            <p>Na natureza, os cavalos passam até 16 horas por dia pastando pequenas quantidades de fibra. Seu estômago representa apenas cerca de 10% de todo o trato digestivo.</p>
            <p>Por isso, fornecer grandes quantidades de ração (concentrado) de uma só vez é um dos principais gatilhos para a temida cólica equina.</p>
            <p>A base da dieta deve ser sempre o volumoso de boa qualidade (pasto, feno ou pré-secado), dividindo a ração em várias pequenas porções ao longo do dia e mantendo água limpa sempre disponível.</p>
        `
    }
];

// Elementos do DOM
const listaPosts = document.getElementById('lista-posts');
const botoesFiltro = document.querySelectorAll('.filtro-btn');
const campoBusca = document.getElementById('campo-busca');
const modal = document.getElementById('modal-artigo');
const fecharModal = document.querySelector('.fechar-modal');

// Função para renderizar os cards na tela
function renderizarPosts(lista) {
    listaPosts.innerHTML = '';

    if (lista.length === 0) {
        listaPosts.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhum artigo encontrado.</p>';
        return;
    }

    lista.forEach(artigo => {
        const card = document.createElement('article');
        card.classList.add('card-post');

        card.innerHTML = `
            <img src="${artigo.imagem}" alt="${artigo.titulo}">
            <div class="card-conteudo">
                <span class="tag-categoria">${artigo.categoriaNome}</span>
                <h3>${artigo.titulo}</h3>
                <span class="data-post">${artigo.data}</span>
                <p>${artigo.resumo}</p>
                <button class="btn-ler" onclick="abrirArtigo(${artigo.id})">Ler Artigo</button>
            </div>
        `;

        listaPosts.appendChild(card);
    });
}

// Função para abrir o modal com o texto completo
function abrirArtigo(id) {
    const artigo = artigos.find(item => item.id === id);
    if (!artigo) return;

    document.getElementById('modal-imagem').src = artigo.imagem;
    document.getElementById('modal-categoria').textContent = artigo.categoriaNome;
    document.getElementById('modal-titulo').textContent = artigo.titulo;
    document.getElementById('modal-data').textContent = artigo.data;
    document.getElementById('modal-texto').innerHTML = artigo.conteudo;

    modal.style.display = 'block';
}

// Eventos para fechar o modal
fecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.style.display = 'none';
    }
});

// Filtro por categoria
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        // Atualiza classe ativa
        botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
        botao.classList.add('ativo');

        const categoria = botao.getAttribute('data-categoria');
        
        if (categoria === 'todos') {
            renderizarPosts(artigos);
        } else {
            const filtrados = artigos.filter(artigo => artigo.categoria === categoria);
            renderizarPosts(filtrados);
        }
    });
});

// Busca por texto
campoBusca.addEventListener('input', (evento) => {
    const termo = evento.target.value.toLowerCase();
    
    const filtrados = artigos.filter(artigo => 
        artigo.titulo.toLowerCase().includes(termo) || 
        artigo.resumo.toLowerCase().includes(termo)
    );

    renderizarPosts(filtrados);
});

// Inicializa o blog mostrando todos os posts
renderizarPosts(artigos);
