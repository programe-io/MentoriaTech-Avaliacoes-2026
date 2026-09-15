<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Capitão Mem - Mini Feed</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      background: linear-gradient(135deg, #061b35, #0b4f6c);
      color: white;
      min-height: 100vh;
    }

    header {
      background: #06244a;
      padding: 18px;
      text-align: center;
      border-bottom: 3px solid #ffd700;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    header h1 {
      color: #ffd700;
      font-size: 30px;
    }

    header p {
      margin-top: 5px;
      color: #ddd;
    }

    .feed {
      width: 95%;
      max-width: 650px;
      margin: 25px auto;
    }

    .post {
      background: #fff;
      color: #222;
      border-radius: 18px;
      margin-bottom: 25px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0,0,0,.35);
    }

    .post-header {
      display: flex;
      align-items: center;
      padding: 15px;
      gap: 12px;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #ffd700;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
    }

    .user {
      font-weight: bold;
    }

    .verified {
      color: #168cff;
    }

    .post-image {
      width: 100%;
      height: 360px;
      object-fit: cover;
      display: block;
    }

    .post-content {
      padding: 15px;
    }

    .post-content h2 {
      color: #063b73;
      margin-bottom: 8px;
    }

    .actions {
      display: flex;
      gap: 12px;
      margin-top: 15px;
    }

    button {
      border: none;
      padding: 10px 18px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: bold;
      background: #eee;
      transition: .2s;
    }

    button:hover {
      transform: scale(1.05);
    }

    .like-btn.liked {
      background: #ff3158;
      color: white;
    }

    .city {
      color: #777;
      font-size: 13px;
      margin-top: 8px;
    }

    footer {
      text-align: center;
      padding: 30px;
      color: #aaa;
    }
  </style>
</head>

<body>

<header>
  <h1>🦸‍♂️ CAPITÃO MEM</h1>
  <p>O herói que salva a cidade... e ainda posta no feed 🇧🇷</p>
</header>

<main class="feed" id="feed"></main>

<footer>
  © 2026 Capitão Mem — Herói oficial dos memes
</footer>

<script>

const posts = [
  {
    imagem: "img/capitao1.jpg",
    titulo: "CAPITÃO MEM SALVA A CIDADE! 🚨",
    texto: "Mais um dia normal para o Capitão Mem. A cidade estava em perigo e ele apareceu para resolver tudo!",
    cidade: "📍 Cidade do Mem"
  },

  {
    imagem: "img/capitao2.jpg",
    titulo: "🚒 RESGATE CONCLUÍDO!",
    texto: "Enquanto todos corriam, Capitão Mem foi direto para o problema. A população está segura!",
    cidade: "📍 Centro da cidade"
  },

  {
    imagem: "img/capitao3.jpg",
    titulo: "💥 O HERÓI ESTÁ DE VOLTA!",
    texto: "Uma nova ameaça apareceu, mas o Capitão Mem já estava preparado.",
    cidade: "📍 Bairro dos Memes"
  }
];

const feed = document.getElementById("feed");

posts.forEach((post, index) => {

  const elemento = document.createElement("article");

  elemento.className = "post";

  elemento.innerHTML = `
    <div class="post-header">
      <div class="avatar">🦸</div>

      <div>
        <div class="user">
          Capitão Mem <span class="verified">✔</span>
        </div>

        <small>agora mesmo</small>
      </div>
    </div>

    <img
      class="post-image"
      src="${post.imagem}"
      alt="Capitão Mem salvando a cidade"
    >

    <div class="post-content">

      <h2>${post.titulo}</h2>

      <p>${post.texto}</p>

      <div class="city">
        ${post.cidade}
      </div>

      <div class="actions">

        <button
          class="like-btn"
          onclick="curtir(${index}, this)"
        >
          ❤️ Curtir <span>0</span>
        </button>

        <button onclick="compartilhar()">
          📤 Compartilhar
        </button>

      </div>

    </div>
  `;

  feed.appendChild(elemento);
});


function curtir(index, botao) {

  let contador = botao.querySelector("span");

  let numero = Number(contador.textContent);

  if (botao.classList.contains("liked")) {

    numero--;

    botao.classList.remove("liked");

  } else {

    numero++;

    botao.classList.add("liked");

  }

  contador.textContent = numero;
}


function compartilhar() {

  alert("🚀 Capitão Mem foi compartilhado com a cidade inteira!");

}

</script>

</body>
</html>
