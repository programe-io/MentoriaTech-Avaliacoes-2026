// Garante que o código só rode após o HTML estar pronto
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('conteudo-criptideos');
    if (!container) return;

    // ==========================================
    // CRIAÇÃO DO BOTÃO DE DARK MODE
    // ==========================================
    const btnTema = document.createElement('button');
    btnTema.className = 'botao-tema';
    btnTema.innerHTML = '🌙 Modo Escuro'; // Texto inicial
    container.appendChild(btnTema);

    // Função que altera o tema ao clicar no botão
    btnTema.addEventListener('click', function() {
        // Alterna a classe 'dark-mode' no elemento <body>
        document.body.classList.toggle('dark-mode');

        // Altera o texto e o ícone do botão dependendo do modo ativo
        if (document.body.classList.contains('dark-mode')) {
            btnTema.innerHTML = '☀️ Modo Claro';
        } else {
            btnTema.innerHTML = '🌙 Modo Escuro';
        }
    });


    // ==========================================
    // CONTEÚDO DO SITE (CONSTRUÇÃO DO TEXTO)
    // ==========================================
    
    // Título Principal
    const h1 = document.createElement('h1');
    h1.textContent = 'O que são Criaturas Criptídeas?';
    container.appendChild(h1);

    // Parágrafos introdutórios
    const p1 = document.createElement('p');
    p1.innerHTML = 'As <strong>criaturas criptídeas</strong> (ou simplesmente criptídeos) são animais cuja existência <strong>não é comprovada pela ciência tradicional</strong>. Eles são o objeto de estudo da <em>Criptozoologia</em> (do grego <kbd>kryptos</kbd>, que significa "oculto" ou "escondido").';
    container.appendChild(p1);

    const p2 = document.createElement('p');
    p2.innerHTML = 'Isso significa que, para a biologia oficial, essas criaturas pertencem ao reino das lendas, boatos ou erros de identificação, já que não existem evidências físicas inquestionáveis — como fósseis recentes, corpos ou amostras de DNA válidas — que comprovem que elas realmente existem.';
    container.appendChild(p2);

    container.appendChild(document.createElement('hr'));

    // Seção de Categorias
    const h2 = document.createElement('h2');
    h2.textContent = 'Principais Categorias de Criptídeos';
    container.appendChild(h2);

    const pCategorias = document.createElement('p');
    pCategorias.textContent = 'Geralmente, os criptídeos são divididos em três grandes grupos:';
    container.appendChild(pCategorias);

    // Criação da Lista
    const ul = document.createElement('ul');
    ul.className = 'lista-criptideos';

    const itensLista = [
        {
            titulo: 'Criaturas Lendárias e Folclóricas',
            texto: 'Animais que habitam o imaginário popular, com relatos de avistamentos ao longo dos anos, mas sem base científica sólida.',
            exemplo: 'Exemplos: O Pé-Grande (América do Norte), o Monstro do Lago Ness (Escócia) e o Chupacabra (América Latina).'
        },
        {
            titulo: 'Animais Supostamente Extintos',
            texto: 'Espécies que a ciência sabe que já existiram, mas que alguns acreditam que ainda sobrevivem em áreas isoladas do planeta.',
            exemplo: 'Exemplos: O Tigre da Tasmânia (extinto oficialmente nos anos 1930) ou o Mamute-Anão.'
        },
        {
            titulo: 'Criptídeos Brasileiros',
            texto: 'Criaturas do nosso folclore que muitos pesquisadores tentam associar a animais reais.',
            exemplo: 'Exemplos: O Mapinguari (que muitos acreditam ser um vislumbre sobrevivente da preguiça-gigante) e o Minhocão.'
        }
    ];

    itensLista.forEach(item => {