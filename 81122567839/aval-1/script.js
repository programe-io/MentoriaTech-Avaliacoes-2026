
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Passo Chic — calçados para todos os estilos.">
  <title>Passo Chic | Loja de Calçados</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>

  <div class="topbar">
    ✨ ELEGÂNCIA EM CADA PASSO ✨
  </div>

  <header class="header">
    <a href="#" class="logo">PASSO <span>CHIC</span></a>

    <nav>
      <a href="#inicio">Início</a>
      <a href="#produtos">Produtos</a>
      <a href="#ofertas">Ofertas</a>
    </nav>

    <button class="cart-button" id="open-cart">
      Sacola (<span id="cart-count">0</span>)
    </button>
  </header>

  <main>
    <section class="hero" id="inicio">
      <div class="hero-content">
        <p class="eyebrow">NOVA COLEÇÃO</p>
        <h1>Seu estilo.<br><span>Seu próximo passo.</span></h1>
        <p>
          Descubra calçados que combinam elegância,
          conforto e personalidade.
        </p>
        <a href="#produtos" class="button-gold">
          Comprar agora →
        </a>
      </div>

      <div class="hero-image">
        <div class="hero-shoe">👠</div>
        <p>ESTILO EM CADA PASSO</p>
      </div>
    </section>

    <section class="products-section" id="produtos">
      <p class="eyebrow">NOSSA COLEÇÃO</p>
      <h2>Encontre seu próximo par</h2>
      <p class="subtitle">
        Calçados para todas as ocasiões.
      </p>

      <div class="filters">
        <button class="filter active" data-category="Todos">Todos</button>
        <button class="filter" data-category="Tênis">Tênis</button>
        <button class="filter" data-category="Feminino">Femininos</button>
        <button class="filter" data-category="Masculino">Masculinos</button>
        <button class="filter" data-category="Social">Sociais</button>
        <button class="filter" data-category="Ofertas">Ofertas</button>
      </div>

      <div class="product-grid" id="product-list"></div>
    </section>

    <section class="offers" id="ofertas">
      <p class="eyebrow">OFERTAS ESPECIAIS</p>
      <h2>Elegância com preços incríveis.</h2>
      <p>Seu próximo par favorito está esperando por você.</p>
      <a href="#produtos" class="button-gold">Ver produtos</a>
    </section>

    <section class="cart-section" id="cart-section" hidden>
      <h2>Sua sacola</h2>

      <div id="cart-items"></div>

      <div class="cart-total">
        <span>Total</span>
        <strong id="cart-total">R$ 0,00</strong>
      </div>

      <label for="customer-name">Seu nome</label>
      <input id="customer-name" type="text"
             placeholder="Digite seu nome">

      <label for="whatsapp">WhatsApp da loja</label>
      <input id="whatsapp" type="tel"
             placeholder="5511999999999">

      <label for="payment">Pagamento</label>
      <select id="payment">
        <option value="Pix">Pix</option>
        <option value="A combinar">Combinar com a loja</option>
      </select>

      <button class="button-gold full-width" id="checkout">
        Finalizar pelo WhatsApp
      </button>

      <p class="small-note" id="checkout-message">
        O pagamento será confirmado diretamente com a loja.
      </p>
    </section>

    <section class="benefits">
      <div>
        <span>✦</span>
        <h3>Estilo e elegância</h3>
        <p>Modelos para todas as ocasiões.</p>
      </div>

      <div>
        <span>◇</span>
        <h3>Pagamento via Pix</h3>
        <p>Combine o pagamento com a loja.</p>
      </div>

      <div>
        <span>♡</span>
        <h3>Atendimento próximo</h3>
        <p>Pedidos pelo WhatsApp.</p>
      </div>
    </section>
  </main>

  <footer>
    <a href="#" class="logo">PASSO <span>CHIC</span></a>
    <p>Seu estilo merece o próximo passo.</p>
    <p>© 2026 Passo Chic. Todos os direitos reservados.</p>
  </footer>

</body>
</html>
