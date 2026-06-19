HTML (index.html)

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GameZone - Vinícius Vianna</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <h1>🎮 GAMEZONE</h1>
    <p>O portal definitivo para os apaixonados por games</p>
</header>
<nav>
    <a href="#inicio">Início</a>
    <a href="#noticias">Notícias</a>
    <a href="#lancamentos">Lançamentos</a>
    <a href="#sobre">Sobre</a>
</nav>
<section class="hero" id="inicio">
    <div class="hero-text">
        <h2>Bem-vindo ao Universo Gamer</h2>
        <p>Confira as últimas notícias, lançamentos e curiosidades dos melhores jogos do mundo.</p>
        <button onclick="mostrarMensagem()">Explorar</button>
    </div>
</section>
<section id="noticias">
    <h2>🔥 Notícias em Destaque</h2>
    <div class="cards">
        <div class="card">
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200" alt="Games">
            <h3>eSports em Crescimento</h3>
            <p>Os campeonatos de eSports movimentam milhões de fãs ao redor do mundo.</p>
        </div>
        <div class="card">
            <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200" alt="Console">
            <h3>Novos Consoles</h3>
            <p>Os consoles atuais trazem gráficos incríveis e experiências mais imersivas.</p>
        </div>
        <div class="card">
            <img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200" alt="Controle">
            <h3>Games Mais Esperados</h3>
            <p>Conheça os títulos que prometem dominar o mercado nos próximos meses.</p>
        </div>
    </div>
</section>
<section id="lancamentos">
    <h2>🚀 Próximos Lançamentos</h2>
    <div class="card-lancamento">
        <h3>Cyber Legends</h3>
        <p>RPG futurista com mundo aberto e batalhas épicas.</p>
    </div>
    <div class="card-lancamento">
        <h3>Speed Racers X</h3>
        <p>Corridas em alta velocidade com gráficos impressionantes.</p>
    </div>
    <div class="card-lancamento">
        <h3>Battle Arena Infinity</h3>
        <p>Combates online competitivos para jogadores de todo o mundo.</p>
    </div>
</section>
<section id="sobre">
    <h2>👨‍💻 Sobre o Autor</h2>
    <p>
        Meu nome é <strong>Vinícius Vianna</strong>. Sou apaixonado por tecnologia,
        jogos eletrônicos e inovação. Este site foi desenvolvido para compartilhar
        informações e novidades sobre o universo gamer.
    </p>
</section>
<footer>
    <p>🎮 Desenvolvido por Vinícius Vianna © 2026</p>
</footer>
<script src="script.js"></script>
</body>
</html>