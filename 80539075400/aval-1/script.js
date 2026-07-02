<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Motos 2026 - Blog JS</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      transition: 0.3s;
      background: #111;
      color: #fff;
    }

    header {
      background: linear-gradient(90deg, #ff0000, #111);
      padding: 20px;
      text-align: center;
    }

    header h1 {
      margin: 0;
    }

    .controls {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 15px;
      flex-wrap: wrap;
    }

    button {
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      background: #ff2e2e;
      color: white;
      transition: 0.3s;
    }

    button:hover {
      background: #cc0000;
    }

    .container {
      max-width: 900px;
      margin: auto;
      padding: 20px;
    }

    .card {
      background: #1e1e1e;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 10px;
      border-left: 5px solid #ff2e2e;
    }

    .tag {
      font-size: 12px;
      background: #ff2e2e;
      padding: 3px 8px;
      border-radius: 5px;
      display: inline-block;
      margin-bottom: 10px;
    }

    .light {
      background: #f4f4f4;
      color: #111;
    }

    .light .card {
      background: #fff;
      color: #111;
    }
  </style>
</head>

<body>

<header>
  <h1>🏍️ Blog Motos 2026</h1>
  <p>Tecnologia, velocidade e inovação</p>
</header>

<div class="controls">
  <button onclick="filterPosts('all')">Todos</button>
  <button onclick="filterPosts('tech')">Tecnologia</button>
  <button onclick="filterPosts('launch')">Lançamentos</button>
  <button onclick="toggleTheme()">🌙 Tema</button>
</div>

<div class="container" id="posts"></div>

<script>
  const posts = [
    {
      title: "📈 Crescimento do mercado de motos",
      category: "tech",
      text: "O mercado de motos cresce em 2026 com foco em mobilidade urbana e economia."
    },
    {
      title: "⚡ Motos cada vez mais tecnológicas",
      category: "tech",
      text: "Painéis digitais, ABS e conectividade já são padrão até em motos populares."
    },
    {
      title: "🆕 Honda CG 160 2026",
      category: "launch",
      text: "A CG chega renovada com mais tecnologia e eficiência para o uso diário."
    },
    {
      title: "🏍️ CFMoto e novas concorrentes",
      category: "launch",
      text: "Marcas chinesas ganham espaço com motos modernas e preço competitivo."
    },
    {
      title: "🔋 Futuro elétrico",
      category: "tech",
      text: "Motos elétricas estão crescendo rapidamente e mudando o mercado urbano."
    }
  ];

  const container = document.getElementById("posts");

  function renderPosts(filter = "all") {
    container.innerHTML = "";

    posts
      .filter(p => filter === "all" || p.category === filter)
      .forEach(p => {
        container.innerHTML += `
          <div class="card">
            <div class="tag">${p.category}</div>
            <h3>${p.title}</h3>
            <p>${p.text}</p>
          </div>
        `;
      });
  }

  function filterPosts(category) {
    renderPosts(category);
  }

  function toggleTheme() {
    document.body.classList.toggle("light");
  }

  renderPosts();
</script>

</body>
</html>