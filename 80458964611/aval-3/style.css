<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Telles - O Lateral Alvinegro</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* VARIÁVEIS E TEMA ALVINEGRO */
    :root {
      --bg-dark: #0a0a0a;
      --card-bg: #141414;
      --card-hover: #1f1f1f;
      --border-color: #2a2a2a;
      --text-primary: #ffffff;
      --text-secondary: #a0a0a0;
      --accent-silver: #e0e0e0;
      --gold-star: #ffd700;
      --header-bg: rgba(10, 10, 10, 0.95);
    }

    /* RESET GLOBAL */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-primary);
      line-height: 1.6;
    }

    h1, h2, h3, h4, .nav-logo {
      font-family: 'Montserrat', sans-serif;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    /* NAVEGAÇÃO / HEADER FIXO */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: var(--header-bg);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border-color);
      z-index: 1000;
      padding: 1.2rem 2rem;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-logo {
      font-size: 1.4rem;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .badge-num {
      background-color: var(--text-primary);
      color: #000;
      font-size: 0.85rem;
      padding: 0.1rem 0.5rem;
      border-radius: 3px;
      font-weight: 900;
    }

    .nav-menu {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-link {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-secondary);
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .nav-link:hover {
      color: var(--text-primary);
      border-bottom: 2px solid var(--text-primary);
      padding-bottom: 4px;
    }

    /* SEÇÃO HERO */
    .hero {
      min-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8rem 2rem 4rem;
      background: linear-gradient(180deg, rgba(10, 10, 10, 0.75) 0%, rgba(10, 10, 10, 1) 100%),
                  url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
      text-align: center;
    }

    .hero-badge {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background-color: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--text-primary);
      color: var(--text-primary);
      font-size: 0.8rem;
      font-weight: 800;
      border-radius: 50px;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .hero-title {
      font-size: 4rem;
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 2.5rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-block;
      padding: 0.9rem 2.2rem;
      font-weight: 800;
      border-radius: 4px;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .btn-primary {
      background-color: var(--text-primary);
      color: #000;
    }

    .btn-primary:hover {
      background-color: var(--accent-silver);
      transform: translateY(-2px);
    }

    .btn-outline {
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      background-color: rgba(20, 20, 20, 0.8);
    }

    .btn-outline:hover {
      border-color: var(--text-primary);
      transform: translateY(-2px);
    }

    /* BANNERS DE DESTAQUE */
    .star-banner {
      background-color: var(--card-bg);
      border-y: 1px solid var(--border-color);
      padding: 1rem 0;
      overflow: hidden;
      white-space: nowrap;
    }

    .banner-content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      font-weight: 800;
      font-size: 0.9rem;
      letter-spacing: 2px;
      color: var(--accent-silver);
    }

    .star {
      color: var(--gold-star);
    }

    /* SEÇÕES E CONTAINERS */
    .main-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section {
      padding: 6rem 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-tag {
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 0.3rem;
    }

    .divider {
      width: 60px;
      height: 4px;
      background-color: var(--text-primary);
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
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2rem;
      transition: all 0.3s ease;
    }

    .card:hover {
      background-color: var(--card-hover);
      border-color: var(--text-primary);
      transform: translateY(-5px);
    }

    .card-img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 1.5rem;
      filter: grayscale(80%);
      transition: filter 0.3s ease;
    }

    .card:hover .card-img {
      filter: grayscale(0%);
    }

    /* TROFÉUS */
    .trophy-card {
      text-align: center;
    }

    .trophy-icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .trophy-year {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--text-secondary);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      letter-spacing: 1px;
    }

    /* HIGHLIGHT LIBERTADORES */
    .highlight-container {
      background: linear-gradient(135deg, #181818 0%, #000000 100%);
      border: 1px solid var(--text-primary);
      border-radius: 12px;
      padding: 3.5rem 2.5rem;
      text-align: center;
    }

    .highlight-badge {
      background-color: var(--text-primary);
      color: #000;
      font-weight: 900;
      padding: 0.4rem 1rem;
      font-size: 0.8rem;
      text-transform: uppercase;
      border-radius: 3px;
      display: inline-block;
      margin-bottom: 1.5rem;
      letter-spacing: 1px;
    }

    .highlight-title {
      font-size: 2.2rem;
      font-weight: 900;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }

    .highlight-desc {
      color: var(--text-secondary);
      max-width: 800px;
      margin: 0 auto 1rem;
      font-size: 1.05rem;
    }

    .stats-row {
      display: flex;
      justify-content: center;
      gap: 3rem;
      margin-top: 2.5rem;
      flex-wrap: wrap;
    }

    .stat-box {
      text-align: center;
    }

    .stat-num {
      display: block;
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--text-primary);
      font-family: 'Montserrat', sans-serif;
    }

    .stat-lbl {
      font-size: 0.8rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
    }

    /* FOOTER */
    .footer {
      border-top: 1px solid var(--border-color);
      padding: 3rem 2rem;
      text-align: center;
      background-color: #050505;
    }

    .footer-container p {
      color: var(--text-primary);
      font-weight: 700;
    }

    .subfooter {
      color: var(--text-secondary) !important;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }

    /* RESPONSIVIDADE */
    @media (max-width: 768px) {
      .nav-menu { display: none; }
      .hero-title { font-size: 2.8rem; }
      .section-title { font-size: 1.8rem; }
      .highlight-title { font-size: 1.6rem; }
      .section { padding: 4rem 1.5rem; }
    }
  </style>
</head>
<body>

  <!-- NAVEGAÇÃO / HEADER ALVINEGRO -->
  <header class="header">
    <div class="nav-container">
      <a href="#inicio" class="nav-logo">
        ALEX TELLES <span class="badge-num">13</span>
      </a>
      <nav>
        <ul class="nav-menu">
          <li><a href="#inicio" class="nav-link">Início</a></li>
          <li><a href="#trajetoria" class="nav-link">Trajetória</a></li>
          <li><a href="#trofeus" class="nav-link">Sala de Troféus</a></li>
          <li><a href="#momentos" class="nav-link">Libertadores 2024</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- SEÇÃO HERO -->
  <section id="inicio" class="hero">
    <div class="hero-content">
      <span class="hero-badge">Botafogo F.R. — Camisa 13</span>
      <h1 class="hero-title">Alex Telles</h1>
      <p class="hero-subtitle">
        Lateral-esquerdo de classe internacional, especialista em bolas paradas e peça fundamental da conquista da América pelo Glorioso.
      </p>
      <div class="hero-buttons">
        <a href="#trofeus" class="btn btn-primary">Sala de Troféus</a>
        <a href="#momentos" class="btn btn-outline">O Pênalti Inesquecível</a>
      </div>
    </div>
  </section>

  <!-- FAIXA DE ESTRELA SOLITÁRIA -->
  <div class="star-banner">
    <div class="banner-content">
      <span class="star">★</span>
      <span>CAMPEÃO DA CONMEBOL LIBERTADORES 2024</span>
      <span class="star">★</span>
      <span>CAMPEÃO DO BRASILEIRÃO 2024</span>
      <span class="star">★</span>
    </div>
  </div>

  <main class="main-container">

    <!-- SEÇÃO TRAJETÓRIA -->
    <section id="trajetoria" class="section">
      <div class="section-header">
        <span class="section-tag">Perfil & Carreira</span>
        <h2 class="section-title">A Trajetória do Craque</h2>
        <div class="divider"></div>
      </div>

      <div class="grid grid-2">
        <div class="card bio-card">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Alex_Telles_2018.jpg" alt="Alex Telles em campo" class="card-img">
          <h3>Carreira Internacional</h3>
          <p>
            Com passagens marcantes por grandes clubes europeus como <strong>FC Porto, Manchester United, Sevilla e Galatasaray</strong>, Alex Telles se consolidou como um dos laterais mais consistentes do futebol mundial.
          </p>
          <p>
            Representou a Seleção Brasileira em diversas oportunidades, inclusive na Copa do Mundo FIFA 2022 no Catar.
          </p>
        </div>

        <div class="card bio-card">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Pe%C3%B1arol_3_Botafogo_1_-_-_241030-1209-jikatu.jpg" alt="Alex Telles pelo Botafogo" class="card-img">
          <h3>O Capítulo Alvinegro</h3>
          <p>
            Chegou ao Botafogo em 2024 assumindo a titularidade com liderança, técnica refinada e cruzamentos milimétricos, tornando-se pilar na temporada mais vitoriosa da história recente do clube.
          </p>
          <p>
            Além do apoio defensivo, sua frieza em cobranças de pênalti marcou momentos decisivos da temporada.
          </p>
        </div>
      </div>
    </section>

    <!-- SEÇÃO SALA DE TROFÉUS -->
    <section id="trofeus" class="section">
      <div class="section-header">
        <span class="section-tag">Conquistas</span>
        <h2 class="section-title">Sala de Troféus</h2>
        <div class="divider"></div>
      </div>

      <div class="grid grid-3">
        <div class="card trophy-card">
          <div class="trophy-icon">🏆</div>
          <span class="trophy-year">2024 — Botafogo F.R.</span>
          <h3>CONMEBOL Libertadores</h3>
          <p>Campeão da América no Estádio Monumental de Núñez em uma atuação heroica.</p>
        </div>

        <div class="card trophy-card">
          <div class="trophy-icon">🏆</div>
          <span class="trophy-year">2024 — Botafogo F.R.</span>
          <h3>Campeonato Brasileiro</h3>
          <p>Título da Série A do Brasileirão com protagonismo na lateral-esquerda.</p>
        </div>

        <div class="card trophy-card">
          <div class="trophy-icon">🏆</div>
          <span class="trophy-year">2022/23 — Sevilla FC</span>
          <h3>UEFA Europa League</h3>
          <p>Conquista do título europeu em final histórica pelo clube espanhol.</p>
        </div>

        <div class="card trophy-card">
          <div class="trophy-icon">🏆</div>
          <span class="trophy-year">2017/18, 2019/20 — FC Porto</span>
          <h3>Primeira Liga Portuguesa</h3>
          <p>Bicampeão nacional e eleito diversas vezes o melhor lateral do campeonato.</p>
        </div>

        <div class="card trophy-card">
          <div class="trophy-icon">🏆</div>
          <span class="trophy-year">2019/20 — FC Porto</span>
          <h3>Taça de Portugal</h3>
          <p>Dobradinha nacional conquistando a copa nacional com os Dragões.</p>
        </div>

        <div class="card trophy-card">
          <div class="trophy-icon">🏆</div>
          <span class="trophy-year">2014/15 — Galatasaray</span>
          <h3>Süper Lig & Copa da Turquia</h3>
          <p>Campeão da liga e da taça nacional durante sua passagem marcante pela Turquia.</p>
        </div>
      </div>
    </section>

    <!-- SEÇÃO MELHORES MOMENTOS / LIBERTADORES -->
    <section id="momentos" class="section">
      <div class="section-header">
        <span class="section-tag">Momento Histórico</span>
        <h2 class="section-title">O Pênalti na Final da Libertadores</h2>
        <div class="divider"></div>
      </div>

      <div class="highlight-container">
        <div class="highlight-badge">30 de Novembro de 2024 — Buenos Aires</div>
        <h3 class="highlight-title">A Frieza que Selou o Destino da América</h3>
        <p class="highlight-desc">
          Jogando com um jogador a menos desde os 30 segundos de jogo, o Botafogo enfrentou o Atlético-MG na decisão da Libertadores no Estádio Monumental de Núñez. 
        </p>
        <p class="highlight-desc">
          Aos 44 minutos do primeiro tempo, após pênalti sofrido por Luiz Henrique, <strong>Alex Telles pegou a bola com serenidade absoluta</strong> e deslocou o goleiro na cobrança perfeita, fazendo 2 a 0 e abrindo o caminho para o título inédito e a Glória Eterna do Alvinegro.
        </p>

        <div class="stats-row">
          <div class="stat-box">
            <span class="stat-num">3 x 1</span>
            <span class="stat-lbl">Placar Final</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">44'</span>
            <span class="stat-lbl">Minuto do Gol</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">100%</span>
            <span class="stat-lbl">Aproveitamento</span>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- RODAPÉ ALVINEGRO -->
  <footer class="footer">
    <div class="footer-container">
      <p>© 2026 Alex Telles — Portfólio Dedicado ao Lateral Alvinegro</p>
      <p class="subfooter">Desenvolvido em HTML5 & CSS3 puro</p>
    </div>
  </footer>

</body>
</html>