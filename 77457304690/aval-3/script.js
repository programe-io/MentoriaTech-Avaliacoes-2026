
const publications = [
    {
        user: "larajean",
        name: "Lara Jean",
        emoji: "💌",
        title: "Algumas palavras nunca encontram coragem para sair do papel.",
        author: "anotações de uma garota sonhadora",
        likes: 2481,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900"
    },
    {
        user: "peterk",
        name: "Peter Kavinsky",
        emoji: "♡",
        title: "Talvez o amor seja encontrar alguém que transforme o comum em lembrança.",
        author: "para alguém especial",
        likes: 1892,
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900"
    },
    {
        user: "kittycovey",
        name: "Kitty Covey",
        emoji: "🌷",
        title: "O mundo seria muito mais simples se as pessoas simplesmente dissessem o que sentem.",
        author: "pensamentos de kitty",
        likes: 3210,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900"
    },
    {
        user: "margotcovey",
        name: "Margot Covey",
        emoji: "☁️",
        title: "Crescer também é aprender a guardar com carinho aquilo que precisamos deixar partir.",
        author: "diário de viagem",
        likes: 1730,
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900"
    },
    {
        user: "gen",
        name: "Genevieve",
        emoji: "🦋",
        title: "Nem toda história bonita precisa ser perfeita.",
        author: "páginas esquecidas",
        likes: 2100,
        image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=900"
    },
    {
        user: "chris",
        name: "Chris",
        emoji: "🌸",
        title: "Algumas amizades são poemas que a vida escreve sem pedir licença.",
        author: "pequenas descobertas",
        likes: 1432,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900"
    },
    {
        user: "joshsanderson",
        name: "Josh Sanderson",
        emoji: "📖",
        title: "Existem lembranças que permanecem mesmo quando os dias mudam.",
        author: "memórias",
        likes: 980,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900"
    },
    {
        user: "johnambrose",
        name: "John Ambrose",
        emoji: "❄️",
        title: "O tempo pode mudar os caminhos, mas não apaga tudo o que sentimos.",
        author: "cartas de inverno",
        likes: 1650,
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=900"
    }
];

const feed = document.getElementById("feed");

publications.forEach((post, index) => {

    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">${post.name[0]}</div>
            <div>
                <strong>${post.user}</strong>
                <small>${post.name} · ${post.emoji}</small>
            </div>
        </div>

        <div class="poem-card">
            <div class="decoration">${post.emoji}</div>
            <h2>“${post.title}”</h2>
            <small>${post.author}</small>
        </div>

        <div class="actions">
            <span class="like">♡</span>
            <span>♡</span>
            <span>↗</span>
            <span style="margin-left:auto">♧</span>
        </div>

        <div class="post-content">
            <strong class="likes">${post.likes.toLocaleString("pt-BR")} curtidas</strong>
            <p><strong>${post.user}</strong> ${post.title}</p>
            <small>Ver todos os comentários</small>
        </div>
    `;

    const like = article.querySelector(".like");
    const likes = article.querySelector(".likes");

    let liked = false;
    let count = post.likes;

    like.addEventListener("click", () => {
        liked = !liked;
        count += liked ? 1 : -1;

        like.textContent = liked ? "♥" : "♡";
        like.style.color = liked ? "#d65d83" : "#604650";

        likes.textContent =
            count.toLocaleString("pt-BR") + " curtidas";
    });

    feed.appendChild(article);
});
function seguir(botao) {
  if (botao.textContent === "Seguir") {
    botao.textContent = "Seguindo";
    botao.style.background = "#a9a0a5";
  } else {
    botao.textContent = "Seguir";
    botao.style.background = "#d98ba9";
  }
}

function abrirDirect() {
  document.getElementById("direct-modal").style.display = "flex";
}

function fecharDirect() {
  document.getElementById("direct-modal").style.display = "none";
}

document.getElementById("direct-modal").addEventListener("click", function(event) {
  if (event.target === this) {
    fecharDirect();
  }
});