/* ================================================
   MYSTIC DIARIES — INTERATIVIDADE DO BLOG
================================================ */

// ===== 1. MENU MOBILE =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('aberto');
    menuBtn.textContent = navLinks.classList.contains('aberto') ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('aberto');
        menuBtn.textContent = '☰';
    });
});

// ===== 2. SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
            e.preventDefault();
            destino.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== 3. FILTROS + BUSCA =====
const filtroBtns = document.querySelectorAll('.filtro-btn');
const searchInput = document.getElementById('searchInput');
const posts = document.querySelectorAll('.post-card');
const noResults = document.getElementById('noResults');
let filtroAtivo = 'todos';

function aplicarFiltros() {
    const termo = searchInput.value.toLowerCase().trim();
    let visiveis = 0;

    posts.forEach(post => {
        if (post.classList.contains('oculto')) return;

        const categoria = post.dataset.categoria;
        const texto = post.textContent.toLowerCase();

        const combinaFiltro = filtroAtivo === 'todos' || categoria === filtroAtivo;
        const combinaBusca = texto.includes(termo);

        if (combinaFiltro && combinaBusca) {
            post.classList.remove('escondido');
            visiveis++;
        } else {
            post.classList.add('escondido');
        }
    });

    noResults.hidden = visiveis > 0;
}

filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filtroBtns.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        filtroAtivo = btn.dataset.filtro;
        aplicarFiltros();
    });
});

searchInput.addEventListener('input', aplicarFiltros);

// ===== 4. CARREGAR MAIS =====
const loadMoreBtn = document.getElementById('loadMore');

loadMoreBtn.addEventListener('click', () => {
    document.querySelectorAll('.post-card.oculto').forEach(post => {
        post.classList.remove('oculto');
    });
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = '🩸 Todos os posts foram carregados';
    aplicarFiltros();
});

// ===== 5. CONTADORES ANIMADOS =====
function animarContador(elemento, alvo) {
    let atual = 0;
    const passo = Math.max(1, Math.ceil(alvo / 40));
    const intervalo = setInterval(() => {
        atual += passo;
        if (atual >= alvo) {
            atual = alvo;
            clearInterval(intervalo);
        }
        elemento.textContent = atual;
    }, 40);
}

const statsSection = document.querySelector('.hero-stats');
let contadorIniciado = false;

const observerStats = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !contadorIniciado) {
        contadorIniciado = true;
        animarContador(document.getElementById('statTemp'), 8);
        animarContador(document.getElementById('statEp'), 171);
        animarContador(document.getElementById('statSpin'), 3);
        observerStats.disconnect();
    }
}, { threshold: 0.5 });

observerStats.observe(statsSection);

// ===== 6. ANIMAÇÃO AO ROLAR =====
const observerReveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observerReveal.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observerReveal.observe(el));

// ===== 7. FORMULÁRIO DE CONTATO =====
const formContato = document.getElementById('formContato');
const msgContato = document.getElementById('msgContato');

formContato.addEventListener('submit', e => {
    e.preventDefault();

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');
    let valido = true;

    [nome, email, mensagem].forEach(campo => campo.classList.remove('campo-erro'));

    if (nome.value.trim().length < 2) { nome.classList.add('campo-erro'); valido = false; }
    if (!email.value.includes('@') || !email.value.includes('.')) { email.classList.add('campo-erro'); valido = false; }
    if (mensagem.value.trim().length < 10) { mensagem.classList.add('campo-erro'); valido = false; }

    if (valido) {
        msgContato.style.color = '#e5738a';
        msgContato.textContent = `🦇 Obrigado, ${nome.value.trim()}! Sua mensagem já chegou a Mystic Falls.`;
        formContato.reset();
        setTimeout(() => { msgContato.textContent = ''; }, 5000);
    } else {
        msgContato.style.color = '#ff6b6b';
        msgContato.textContent = '🥀 Ops! Verifique os campos destacados em vermelho.';
    }
});

// ===== 8. NEWSLETTER =====
const formNewsletter = document.getElementById('formNewsletter');
const msgNewsletter = document.getElementById('msgNewsletter');

formNewsletter.addEventListener('submit', e => {
    e.preventDefault();
    const emailNews = document.getElementById('emailNewsletter');

    if (emailNews.value.includes('@')) {
        msgNewsletter.textContent = '🩸 Boas-vindas a Mystic Falls! Você receberá nossas novidades.';
        formNewsletter.reset();
    } else {
        msgNewsletter.textContent = '🥀 Digite um e-mail válido para assinar.';
    }
});

// ===== 9. MODAL DE POSTS (LER MAIS) — via data-post =====
const postsCompletos = {
    'especial-tvd': {
        img: '🩸', tag: 'Especial', data: '📅 30 de julho de 2026 · ⏱ 10 min',
        titulo: 'The Vampire Diaries: por que a série ainda conquista novos fãs',
        texto: `<p>Baseada nos livros de L.J. Smith, The Vampire Diaries estreou em 2009 e acompanha a vida de Elena Gilbert em Mystic Falls, uma cidade cheia de segredos sobrenaturais. A série conquistou milhões de fãs com sua mistura de romance, drama e mistério.</p>
        <p>Mesmo anos após o final, a história dos irmãos Salvatore continua atraindo novos espectadores. A combinação de personagens complexos, reviravoltas surpreendentes e um universo sobrenatural rico faz de TVD um clássico atemporal.</p>`
    },
    'damon': {
        img: '🖤', tag: 'Personagens', data: '📅 26 de julho de 2026 · ⏱ 7 min',
        titulo: 'Damon Salvatore: vilão, anti-herói ou apenas apaixonado?',
        texto: `<p>Damon Salvatore é um dos personagens mais complexos da série. Ao longo das temporadas, ele transita entre vilão e herói, movido muitas vezes por seu amor por Elena e sua relação complicada com o irmão Stefan.</p>
        <p>O que torna Damon fascinante é sua ambiguidade: ele comete atos questionáveis, mas também demonstra lealdade e capacidade de sacrifício. Essa dualidade o tornou um dos personagens mais amados de The Vampire Diaries.</p>`
    },
    'doppelgangers': {
        img: '🌙', tag: 'Mitologia', data: '📅 21 de julho de 2026 · ⏱ 8 min',
        titulo: 'Doppelgängers: entenda a origem de Elena e Katherine',
        texto: `<p>Os doppelgängers são uma parte central da mitologia de TVD. Elena e Katherine são cópias uma da outra, ligadas a uma antiga maldição sobrenatural que atravessa séculos.</p>
        <p>Entender os doppelgängers é essencial para compreender a trama da série, especialmente o vínculo com os irmãos Salvatore e as forças sobrenaturais que cercam Mystic Falls.</p>`
    },
    'delena-stelena': {
        img: '❤️', tag: 'Relacionamentos', data: '📅 15 de julho de 2026 · ⏱ 6 min',
        titulo: 'Delena vs. Stelena: os dois lados do coração de Elena',
        texto: `<p>O triângulo amoroso entre Elena, Damon e Stefan é um dos pilares de TVD. De um lado, Stelena representa o amor doce e protetor do início; do outro, Delena traz paixão intensa e complexidade.</p>
        <p>Esse debate divide os fãs até hoje. Cada relacionamento mostra um lado diferente de Elena e de seu amadurecimento ao longo da série.</p>`
    },
    'temporada-1': {
        img: '📖', tag: 'Temporadas', data: '📅 09 de julho de 2026 · ⏱ 6 min',
        titulo: 'A 1ª temporada: onde tudo começou em Mystic Falls',
        texto: `<p>A primeira temporada apresenta Elena Gilbert, uma adolescente que perdeu os pais e encontra consolo em seu diário. Tudo muda quando os irmãos Salvatore chegam a Mystic Falls.</p>
        <p>É nessa temporada que conhecemos os principais personagens e os primeiros mistérios sobrenaturais que tornariam a série um fenômeno.</p>`
    },
    'katherine': {
        img: '👑', tag: 'Personagens', data: '📅 03 de julho de 2026 · ⏱ 7 min',
        titulo: 'Katherine Pierce: a vilã mais icônica da série',
        texto: `<p>Katherine Pierce é uma das antagonistas mais memoráveis de TVD. Vampira astuta e manipuladora, ela é o doppelgänger que antecede Elena e tem uma história entrelaçada com os Salvatore.</p>
        <p>Apesar de vilã, Katherine conquista o público com sua inteligência e carisma, tornando-se uma das personagens mais marcantes do universo da série.</p>`
    },
    'bastidores': {
        img: '🎬', tag: 'Bastidores', data: '📅 27 de junho de 2026 · ⏱ 5 min',
        titulo: 'Curiosidades dos bastidores de The Vampire Diaries',
        texto: `<p>The Vampire Diaries foi gravada em Covington, na Geórgia, que se transformou na fictícia Mystic Falls. A cidade abraçou a série e se tornou ponto de peregrinação para os fãs.</p>
        <p>Nos bastidores, o elenco desenvolveu fortes amizades que duram até hoje. A química entre Ian Somerhalder, Paul Wesley e Nina Dobrev foi essencial para o sucesso da produção.</p>`
    },
    'originais': {
        img: '⚰️', tag: 'Mitologia', data: '📅 20 de junho de 2026 · ⏱ 8 min',
        titulo: 'Os Originais: quem são os primeiros vampiros',
        texto: `<p>Os Originais são a família Mikaelson, os primeiros vampiros da história. Klaus, Elijah e Rebekah são personagens centrais que ganharam até uma série própria, The Originals.</p>
        <p>Conhecer a história dos Originais é fundamental para entender a hierarquia e as regras do universo sobrenatural de TVD.</p>`
    },
    'klaroline': {
        img: '🐺', tag: 'Relacionamentos', data: '📅 14 de junho de 2026 · ⏱ 6 min',
        titulo: 'Caroline e Klaus: um amor impossível',
        texto: `<p>A relação entre Caroline Forbes e Klaus Mikaelson conquistou os fãs, mesmo sendo um romance impossível. Klaus, um dos vilões mais temidos, mostra um lado vulnerável ao lado de Caroline.</p>
        <p>Esse casal improvável se tornou um dos favoritos dos espectadores, mostrando como o amor pode surgir nos lugares mais inesperados de Mystic Falls.</p>`
    },
    'elena-vampira': {
        img: '🦇', tag: 'Temporadas', data: '📅 07 de junho de 2026 · ⏱ 7 min',
        titulo: 'A evolução de Elena: de humana a vampira',
        texto: `<p>Elena Gilbert passa por uma das maiores transformações da série. De uma adolescente humana e vulnerável, ela se torna vampira, enfrentando novos desafios e dilemas morais.</p>
        <p>Essa evolução mostra o amadurecimento da personagem e como ela aprende a lidar com o poder, a perda e o amor em um mundo sobrenatural.</p>`
    }
};

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function abrirModal(postId) {
    const post = postsCompletos[postId];
    if (!post) {
        console.warn('Post não encontrado:', postId);
        return;
    }

    document.getElementById('modalImg').textContent = post.img;
    document.getElementById('modalTag').textContent = post.tag;
    document.getElementById('modalTitle').textContent = post.titulo;
    document.getElementById('modalData').textContent = post.data;
    document.getElementById('modalText').innerHTML = post.texto;

    modalOverlay.classList.add('aberto');
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    modalOverlay.classList.remove('aberto');
    document.body.style.overflow = '';
}

document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = link.closest('article');
        const postId = card.dataset.post;
        abrirModal(postId);
    });
});

modalClose.addEventListener('click', fecharModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) fecharModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('aberto')) {
        fecharModal();
    }
});

// ===== 10. VOLTAR AO TOPO =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('mostrar', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== 11. ANO NO RODAPÉ =====
document.getElementById('ano').textContent = new Date().getFullYear();