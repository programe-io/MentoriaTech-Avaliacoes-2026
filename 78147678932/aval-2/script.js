<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minecraft Codex - Guia Completo & Lore</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* PALETA E TEMÁTICA MINECRAFT */
    :root {
      --bg-dark: #0f1410;
      --card-bg: #18221a;
      --card-border: #2c3e30;
      --mc-green: #52a435;
      --mc-dirt: #866043;
      --mc-wood: #4a3423;
      --mc-diamond: #4bede6;
      --mc-gold: #fbc02d;
      --mc-redstone: #e53935;
      --text-main: #e2f0e6;
      --text-muted: #8ba892;
      --header-bg: rgba(15, 20, 16, 0.95);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      line-height: 1.6;
    }

    h1, h2, h3, .pixel-font {
      font-family: 'Press Start 2P', cursive;
      letter-spacing: -0.5px;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    /* HEADER FIXO */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: var(--header-bg);
      backdrop-filter: blur(8px);
      border-bottom: 2px solid var(--card-border);
      z-index: 1000;
      padding: 1rem 2rem;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-logo {
      font-size: 0.9rem;
      color: var(--mc-green);
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .block-icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      background-color: var(--mc-green);
      border-bottom: 4px solid var(--mc-dirt);
      box-shadow: inset 0 0 0 2px rgba(0,0,0,0.3);
    }

    .nav-menu {
      display: flex;
      gap: 1.8rem;
      list-style: none;
    }

    .nav-link {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-muted);
      transition: color 0.3s ease;
      text-transform: uppercase;
    }

    .nav-link:hover {
      color: var(--mc-diamond);
    }

    /* HERO SECTION */
    .hero {
      min-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8rem 2rem 4rem;
      background: linear-gradient(180deg, rgba(15, 20, 16, 0.75) 0%, rgba(15, 20, 16, 1) 100%),
                  url('https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
      text-align: center;
    }

    .hero-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
      background-color: rgba(82, 164, 53, 0.2);
      border: 1px solid var(--mc-green);
      color: var(--mc-green);
      font-size: 0.65rem;
      font-family: 'Press Start 2P', cursive;
      margin-bottom: 1.5rem;
    }

    .hero-title {
      font-size: 2.2rem;
      line-height: 1.4;
      margin-bottom: 1.5rem;
      color: #fff;
      text-shadow: 3px 3px 0px #000;
    }

    .hero-subtitle {
      font-size: 1.15rem;
      color: var(--text-muted);
      margin-bottom: 2.5rem;
      max-width: 750px;
      margin-left: auto;
      margin-right: auto;
    }

    .btn {
      display: inline-block;
      padding: 0.9rem 1.8rem;
      font-family: 'Press Start 2P', cursive;
      font-size: 0.7rem;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .btn-primary {
      background-color: var(--mc-green);
      color: #000;
      border-bottom: 4px solid #387323;
    }

    .btn-primary:hover {
      background-color: #62be41;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background-color: var(--card-bg);
      color: var(--mc-diamond);
      border: 1px solid var(--card-border);
      border-bottom: 4px solid #101712;
      margin-left: 1rem;
    }

    .btn-secondary:hover {
      border-color: var(--mc-diamond);
      transform: translateY(-2px);
    }

    /* BARRA DE ESTATÍSTICAS DO JOGO */
    .game-banner {
      background-color: var(--card-bg);
      border-y: 2px solid var(--card-border);
      padding: 1.2rem 0;
    }

    .banner-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      text-align: center;
    }

    .banner-item span {
      display: block;
    }

    .banner-val {
      font-family: 'Press Start 2P', cursive;
      font-size: 0.9rem;
      color: var(--mc-gold);
    }

    .banner-lbl {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* CONTAINER PRINCIPAL */
    .main-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
    }

    .section {
      margin-bottom: 6rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .section-tag {
      font-size: 0.65rem;
      color: var(--mc-green);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      display: block;
    }

    .section-title {
      font-size: 1.4rem;
      color: #fff;
      text-shadow: 2px 2px 0px #000;
    }

    .divider {
      width: 50px;
      height: 4px;
      background-color: var(--mc-green);
      margin: 1rem auto 0;
    }

    /* GRID & CARDS */
    .grid {
      display: grid;
      gap: 2rem;
    }

    .grid-2 { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
    .grid-3 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }

    .card {
      background-color: var(--card-bg);
      border: 2px solid var(--card-border);
      border-radius: 4px;
      padding: 2rem;
      transition: all 0.3s ease;
    }

    .card:hover {
      border-color: var(--mc-green);
      transform: translateY(-4px);
    }

    .card-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 2px;
      margin-bottom: 1.5rem;
      border: 1px solid var(--card-border);
    }

    .card-title {
      font-size: 1rem;
      color: #fff;
      margin-bottom: 1rem;
    }

    .card-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
    }

    /* CARD DE GUIA/CRAFTING */
    .craft-card {
      position: relative;
      overflow: hidden;
    }

    .craft-tag {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 0.55rem;
      background-color: var(--mc-gold);
      color: #000;
      padding: 0.3rem 0.6rem;
      font-weight: 800;
    }

    /* HIGHLIGHT DO ENDER DRAGON / LORE */
    .lore-box {
      background: linear-gradient(135deg, #120e17 0%, #1a1024 100%);
      border: 2px solid #5a348a;
      padding: 3.5rem 2rem;
      border-radius: 4px;
      text-align: center;
      position: relative;
    }

    .lore-title {
      color: #c084fc;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .lore-desc {
      color: #d8b4fe;
      max-width: 800px;
      margin: 0 auto 1.5rem;
      font-size: 1rem;
    }

    /* FOOTER */
    .footer {
      border-top: 2px solid var(--card-border);
      padding: 3rem 2rem;
      text-align: center;
      background-color: #0a0d0a;
    }

    .footer p {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .footer-logo {
      color: var(--mc-green);
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }

    /* RESPONSIVIDADE */
    @media (max-width: 768px) {
      .nav-menu { display: none; }
      .hero-title { font-size: 1.4rem; }
      .section-title { font-size: 1.1rem; }
      .btn { display: block; margin: 0.5rem auto; }
      .btn-secondary { margin-left: auto; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="header">
    <div class="nav-container">
      <a href="#inicio" class="nav-logo pixel-font">
        <span class="block-icon"></span>
        MINECRAFT CODEX
      </a>
      <nav>
        <ul class="nav-menu">
          <li><a href="#inicio" class="nav-link">Início</a></li>
          <li><a href="#sobre" class="nav-link">O Jogo</a></li>
          <li><a href="#guias" class="nav-link">Guias</a></li>
          <li><a href="#lore" class="nav-link">Lore & Dimensões</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- HERO -->
  <section id="inicio" class="hero">
    <div>
      <span class="hero-badge">CONSTRUÇÃO ★ SOBREVIVÊNCIA ★ EXPLORAÇÃO</span>
      <h1 class="hero-title">O MUNDO É FEITO DE BLOCOS E POSSIBILIDADES</h1>
      <p class="hero-subtitle">
        Aprenda a sobreviver à primeira noite, domine a automação com Redstone e explore as profundezas do Overworld, Nether e The End.
      </p>
      <div>
        <a href="#guias" class="btn btn-primary">VER GUIAS</a>
        <a href="#lore" class="btn btn-secondary">EXPLORAR LORE</a>
      </div>
    </div>
  </section>

  <!-- BANNERS -->
  <div class="game-banner">
    <div class="banner-content">
      <div class="banner-item">
        <span class="banner-val">300M+</span>
        <span class="banner-lbl">Cópias Vendidas</span>
      </div>
      <div class="banner-item">
        <span class="banner-val">1.21+</span>
        <span class="banner-lbl">Versão Atual</span>
      </div>
      <div class="banner-item">
        <span class="banner-val">INFINITO</span>
        <span class="banner-lbl">Mundo Gerado</span>
      </div>
    </div>
  </div>

  <main class="main-container">

    <!-- SEÇÃO O JOGO -->
    <section id="sobre" class="section">
      <div class="section-header">
        <span class="section-tag pixel-font">CONCEITOS BÁSICOS</span>
        <h2 class="section-title">A ESSÊNCIA DO MINECRAFT</h2>
        <div class="divider"></div>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <img src="https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80" alt="Sobrevivência" class="card-img">
          <h3 class="card-title pixel-font">Modo Sobrevivência</h3>
          <p class="card-desc">
            Colete recursos, crie ferramentas e defenda-se de criaturas noturnas como Zombies, Skeletons e Creepers enquanto constrói sua base dos sonhos.
          </p>
        </div>

        <div class="card">
          <img src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80" alt="Construção" class="card-img">
          <h3 class="card-title pixel-font">Modo Criativo</h3>
          <p class="card-desc">
            Recursos ilimitados, habilidade de voar e liberdade total para construir castelos, cidades futuristas ou sistemas complexos sem se preocupar com vida ou fome.
          </p>
        </div>
      </div>
    </section>

    <!-- SEÇÃO GUIAS -->
    <section id="guias" class="section">
      <div class="section-header">
        <span class="section-tag pixel-font">TUTORIAIS</span>
        <h2 class="section-title">GUIAS DE SOBREVIVÊNCIA</h2>
        <div class="divider"></div>
      </div>

      <div class="grid grid-3">
        <div class="card craft-card">
          <span class="craft-tag pixel-font">INICIANTE</span>
          <h3 class="card-title pixel-font">A Primeira Noite</h3>
          <p class="card-desc">
            Corte madeira, faça uma bancada de trabalho (Crafting Table), crie uma picareta e construa um abrigo antes do pôr do sol.
          </p>
        </div>

        <div class="card craft-card">
          <span class="craft-tag pixel-font" style="background-color: var(--mc-redstone); color: #fff;">AVANÇADO</span>
          <h3 class="card-title pixel-font">Redstone & Automação</h3>
          <p class="card-desc">
            Crie fazendas automáticas, portas secretas e circuitos lógicos utilizando o equivalente ao pó elétrico do Minecraft.
          </p>
        </div>

        <div class="card craft-card">
          <span class="craft-tag pixel-font" style="background-color: var(--mc-diamond); color: #000;">DIAMANTE</span>
          <h3 class="card-title pixel-font">Mineração Eficiente</h3>
          <p class="card-desc">
            Minere na camada Y: -58 para maximizar suas chances de encontrar Diamantes e Redstone nas profundezas das cavernas.
          </p>
        </div>
      </div>
    </section>

    <!-- SEÇÃO LORE & DIMENSÕES -->
    <section id="lore" class="section">
      <div class="section-header">
        <span class="section-tag pixel-font">MISTÉRIOS</span>
        <h2 class="section-title">AS TRÊS DIMENSÕES</h2>
        <div class="divider"></div>
      </div>

      <div class="lore-box">
        <h2 class="lore-title pixel-font">THE END & O DRAGÃO</h2>
        <p class="lore-desc">
          Para zerar o jogo, viaje até o Nether para obter Varas de Blaze, colete Pérolas do Enderman e monte os Olhos do End para localizar o Portal do Fim. Enfrente o Ender Dragon e alcance os créditos finais.
        </p>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-logo pixel-font">MINECRAFT CODEX</div>
    <p>© 2026 Blog não-oficial de fã. Minecraft é marca registrada da Mojang Studios / Microsoft.</p>
  </footer>

</body>
</html>