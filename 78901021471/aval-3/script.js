
const feed = document.getElementById("feed");

let players = [
    {
        id: 1,
        name: "Lionel Messi",
        country: "🇦🇷 Argentina",
        team: "Inter Miami",
        position: "atacante",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900",
        description: "O gênio argentino! 🐐⚽ #Messi",
        likes: 0,
        comments: [],
        score: 0
    },
    {
        id: 2,
        name: "Cristiano Ronaldo",
        country: "🇵🇹 Portugal",
        team: "Al-Nassr",
        position: "atacante",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900",
        description: "Mentalidade de campeão! 🔥 #CR7",
        likes: 0,
        comments: [],
        score: 0
    },
    {
        id: 3,
        name: "Neymar Jr.",
        country: "🇧🇷 Brasil",
        team: "Santos",
        position: "atacante",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900",
        description: "Futebol arte brasileiro! 🇧🇷",
        likes: 0,
        comments: [],
        score: 0
    },
    {
        id: 4,
        name: "Kylian Mbappé",
        country: "🇫🇷 França",
        team: "Real Madrid",
        position: "atacante",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900",
        description: "Velocidade e talento! 🚀",
        likes: 0,
        comments: [],
        score: 0
    },
    {
        id: 5,
        name: "Vinícius Júnior",
        country: "🇧🇷 Brasil",
        team: "Real Madrid",
        position: "atacante",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900",
        description: "Alegria e dribles! ⚽🔥",
        likes: 0,
        comments: [],
        score: 0
    }
];

let activePlayer = null;

// Criar publicação
function createPost(player) {
    const article = document.createElement("article");
    article.className = "post";
    article.dataset.id = player.id;

    const img = document.createElement("img");
    img.src = player.image;
    img.alt = player.name;
    img.loading = "lazy";

    const info = document.createElement("div");
    info.className = "info";

    const name = document.createElement("h2");
    name.textContent = player.name;

    const details = document.createElement("p");
    details.textContent =
        `${player.country} | ${player.team} | ${player.position}`;

    const description = document.createElement("p");
    description.textContent = player.description;

    info.append(name, details, description);

    const actions = document.createElement("div");
    actions.className = "actions";

    const like = document.createElement("button");
    like.innerHTML = `❤️ <span>${player.likes}</span>`;

    like.onclick = () => {
        player.liked = !player.liked;
        player.likes += player.liked ? 1 : -1;
        player.score += player.liked ? 5 : -2;

        like.classList.toggle("liked", player.liked);
        like.querySelector("span").textContent = player.likes;

        recommend();
    };

    const comment = document.createElement("button");
    comment.innerHTML = `💬 <span>${player.comments.length}</span>`;

    comment.onclick = () => openComments(player);

    const share = document.createElement("button");
    share.textContent = "↗️";

    share.onclick = async () => {
        const url = location.href + "#jogador-" + player.id;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: player.name,
                    text: player.description,
                    url
                });
            } else {
                await navigator.clipboard.writeText(url);
                alert("Link copiado!");
            }
        } catch (error) {
            console.log("Compartilhamento cancelado.");
        }
    };

    actions.append(like, comment, share);
    article.append(img, info, actions);

    return article;
}

// Mostrar feed
function renderFeed(list = players) {
    feed.innerHTML = "";

    list.forEach(player => {
        feed.appendChild(createPost(player));
    });
}

// Algoritmo de recomendação
function recommend() {
    players.sort((a, b) => b.score - a.score);
    renderFeed();
}

// Filtrar jogadores
function filterPlayers(position) {
    const result = position === "todos"
        ? players
        : players.filter(p => p.position === position);

    renderFeed(result);
}

// Pesquisa
document.getElementById("search").addEventListener("input", event => {
    const term = event.target.value.toLowerCase();

    const result = players.filter(player =>
        player.name.toLowerCase().includes(term) ||
        player.team.toLowerCase().includes(term) ||
        player.country.toLowerCase().includes(term)
    );

    renderFeed(result);
});

// Comentários
function openComments(player) {
    activePlayer = player;

    document.getElementById("commentModal").style.display = "flex";

    renderComments();
}

function renderComments() {
    const list = document.getElementById("commentsList");
    list.innerHTML = "";

    if (!activePlayer.comments.length) {
        list.textContent = "Seja o primeiro a comentar!";
        return;
    }

    activePlayer.comments.forEach(text => {
        const p = document.createElement("p");
        p.textContent = "💬 " + text;
        list.appendChild(p);
    });
}

document.getElementById("sendComment").onclick = () => {
    const input = document.getElementById("commentInput");
    const text = input.value.trim();

    if (!text || !activePlayer) return;

    activePlayer.comments.push(text);
    activePlayer.score += 3;

    input.value = "";

    renderComments();
    recommend();
};

function closeModal() {
    document.getElementById("commentModal").style.display = "none";
}

// Inicializar
renderFeed();
