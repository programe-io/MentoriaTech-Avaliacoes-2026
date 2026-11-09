// Pessoas simuladas conversando e debatendo sobre o material enviado
const tweetsIniciais = [
    {
        avatar: "🐰",
        avatarClass: "pink-avatar",
        nome: "Bia Dev Pastel",
        arroba: "@biacodes",
        texto: "Mano, muita gente confunde até hoje, mas fixa aí na cabeça: \n\nINTERNET = Infraestrutura física de cabos, roteadores e redes mundiais.\nWEB = Só as páginas e documentos com hiperlinks que rodam lá dentro!\n\nNão errem mais isso pfvr 😭",
        likes: 142,
        rt: 28
    },
    {
        avatar: "⚡",
        avatarClass: "blue-avatar",
        nome: "Tech_Guto",
        arroba: "@gutotech",
        texto: "Chocado com o tópico dos CABOS SUBMARINOS. A gente acha q a internet tá flutuando na nuvem ou via satélite, mas quase toda a comunicação global cruza oceanos por cabos físicos de fibra óptica de altíssima capacidade. O mundo é um grande emaranhado de fios marítimos 🌊🌐",
        likes: 89,
        rt: 12
    },
    {
        avatar: "🦖",
        avatarClass: "purple-avatar",
        nome: "Nostalgia Web",
        arroba: "@retro_net",
        texto: "Um brinde ao Tim Berners-Lee na década de 1980 lá no CERN! O cara simplesmente inventou a trindade da nossa vida moderna:\n\n1. HTML (Páginas)\n2. HTTP (Protocolo de conversa)\n3. URL (Os endereços)\n\nSem ele, a internet ainda seria só uma rede acadêmica/militar sem graça como a ARPANET.",
        likes: 310,
        rt: 95
    },
    {
        avatar: "🧁",
        avatarClass: "yellow-avatar",
        nome: "Lari Estudante",
        arroba: "@laristudies",
        texto: "Estudando o modelo Cliente-Servidor aqui. Basicamente, quando digito uma URL no Chrome (Cliente), meu pc manda uma requisição HTTP cruzando milissegundos de roteadores até o Servidor. Ele processa e cospe o site de volta na minha tela. É lindo demais como tudo funciona rápido.",
        likes: 54,
        rt: 6
    }
];

const feedContainer = document.getElementById('tweet-feed');
const tweetInput = document.getElementById('tweet-input');
const tweetBtn = document.getElementById('tweet-btn');

// Renderiza a conversa inicial
function renderizarTweets() {
    feedContainer.innerHTML = "";
    tweetsIniciais.forEach((tweet, index) => {
        criarElementoTweet(tweet, false);
    });
}

// Cria a estrutura visual do Tweet estilo X
function criarElementoTweet(data, inserirNoTopo = false) {
    const div = document.createElement('article');
    div.classList.add('tweet');

    div.innerHTML = `
        <div class="avatar ${data.avatarClass}">${data.avatar}</div>
        <div class="tweet-content">
            <div class="tweet-meta">
                <span class="user-name">${data.nome}</span>
                <span class="user-handle">${data.arroba} • agora</span>
            </div>
            <p class="tweet-text">${data.texto}</p>
            <div class="tweet-actions">
                <div class="action-item" onclick="fazerRetweet(this, ${data.rt})">
                    <span>🔁</span> <span class="count">${data.rt}</span>
                </div>
                <div class="action-item" onclick="darLike(this, ${data.likes})">
                    <span>♥</span> <span class="count">${data.likes}</span>
                </div>
            </div>
        </div>
    `;

    if (inserirNoTopo) {
        feedContainer.insertBefore(div, feedContainer.firstChild);
    } else {
        feedContainer.appendChild(div);
    }
}

// Lógica para enviar um novo Tweet digitado
tweetBtn.addEventListener('click', () => {
    const texto = tweetInput.value.trim();
    if (!texto) return;

    const novo = {
        avatar: "✨",
        avatarClass: "pink-avatar",
        nome: "Você (Estudante)",
        arroba: "@meu_user",
        texto: texto,
        likes: 0,
        rt: 0
    };

    criarElementoTweet(novo, true);
    tweetInput.value = "";
    document.querySelector('.char-counter').innerText = "0/280";
});

// Atualiza contador de caracteres
tweetInput.addEventListener('input', () => {
    const contagem = tweetInput.value.length;
    document.querySelector('.char-counter').innerText = `${contagem}/280`;
});

// Ações clássicas interativas de curtida e retweet
function darLike(elemento, valorOriginal) {
    elemento.classList.toggle('active-like');
    const spanContador = elemento.querySelector('.count');
    if (elemento.classList.contains('active-like')) {
        spanContador.innerText = valorOriginal + 1;
    } else {
        spanContador.innerText = valorOriginal;
    }
}

function fazerRetweet(elemento, valorOriginal) {
    elemento.classList.toggle('active-like'); // Reaproveita estilo visual de ativo
    const spanContador = elemento.querySelector('.count');
    if (elemento.classList.contains('active-like')) {
        spanContador.innerText = valorOriginal + 1;
    } else {
        spanContador.innerText = valorOriginal;
    }
}

// Inicializa a timeline
renderizarTweets();
