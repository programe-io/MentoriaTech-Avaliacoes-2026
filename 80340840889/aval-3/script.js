
const pessoas = {
    Jacy: {
        usuario: "jacy.oficial",
        foto: "https://i.pravatar.cc/150?img=47",
        bio: "Perfil principal 👑"
    },
    Abner: {
        usuario: "abner.jpg",
        foto: "https://i.pravatar.cc/150?img=12",
        bio: "Vivendo e colecionando histórias 😂"
    },
    Jatan: {
        usuario: "jatan",
        foto: "https://i.pravatar.cc/150?img=44",
        bio: "Só momentos bons 💗"
    },
    Alvaro: {
        usuario: "alvaro",
        foto: "https://i.pravatar.cc/150?img=13",
        bio: "Na resenha sempre 🔥"
    },
    Kaiky: {
        usuario: "kaiky.jpg",
        foto: "https://i.pravatar.cc/150?img=14",
        bio: "A vida é uma aventura!"
    }
};

let posts = [
    {
        pessoa: "Jacy",
        legenda: "Um dia maravilhoso com essa galera! ❤️😂",
        foto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900",
        curtidas: 128,
        comentarios: [
            {nome:"Abner", texto:"KKKKKK melhor dia!" },
            {nome:"Jatan", texto:"Amo vocês ❤️"},
            {nome:"Alvaro", texto:"Quando vai ter outro?"},
            {nome:"Kaiky", texto:"Já tô com saudades!"}
        ]
    },
    {
        pessoa: "Abner",
        legenda: "Os melhores momentos são com os melhores amigos 😂",
        foto: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900",
        curtidas: 86,
        comentarios: [
            {nome:"Jacy", texto:"Olha o Abner blogueiro KKKK"},
            {nome:"Jatan", texto:"A foto ficou linda!"},
            {nome:"Alvaro", texto:"Meu parceiro!"},
            {nome:"Kaiky", texto:"Resenha boa demais."}
        ]
    },
    {
        pessoa: "Jatan",
        legenda: "Colecionando momentos inesquecíveis 💗",
        foto: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900",
        curtidas: 204,
        comentarios: [
            {nome:"Jacy", texto:"Minha menina ❤️"},
            {nome:"Abner", texto:"Saudades desse dia!"},
            {nome:"Alvaro", texto:"Top demais!"},
            {nome:"Kaiky", texto:"A próxima vai ser melhor."}
        ]
    },
    {
        pessoa: "Alvaro",
        legenda: "Só os momentos bons com essa turma!",
        foto: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900",
        curtidas: 97,
        comentarios: [
            {nome:"Jacy", texto:"Alvaro arrasou na foto KKKK"},
            {nome:"Abner", texto:"Meu irmão!"},
            {nome:"Jatan", texto:"Amei ❤️"},
            {nome:"Kaiky", texto:"Bora repetir!"}
        ]
    },
    {
        pessoa: "Kaiky",
        legenda: "Essa galera é diferenciada 😂",
        foto: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900",
        curtidas: 150,
        comentarios: [
            {nome:"Jacy", texto:"Meus favoritos ❤️"},
            {nome:"Abner", texto:"KKKKKK"},
            {nome:"Jatan", texto:"Amo vocês!"},
            {nome:"Alvaro", texto:"Próxima aventura já!"}
        ]
    }
];

let pessoaChat = null;
let mensagens = {
    Abner: ["Abner: Jacy, bora sair hoje? 😂"],
    Jatan: ["Jatan: Amigaaa, precisamos conversar KKKK 💗"],
    Alvaro: ["Alvaro: Qual o plano pra hoje?"],
    Kaiky: ["Kaiky: Tem resenha hoje ou não?"]
};

const respostas = {
    Abner: [
        "KKKKKK não acredito 😂",
        "Jacy, tu é doida!",
        "Bora marcar alguma coisa!",
        "Eu avisei KKKKK"
    ],
    Jatan: [
        "Amigaaa ❤️",
        "Eu quero muito!",
        "KKKKKK vocês são impossíveis",
        "Saudades de vocês!"
    ],
    Alvaro: [
        "Tô dentro!",
        "Só avisar a hora 😂",
        "Não me deixem esperando!",
        "KKKKKK boa!"
    ],
    Kaiky: [
        "Partiuuu 🔥",
        "Isso vai dar história KKKK",
        "Eu sabia 😂",
        "Tô esperando!"
    ]
};

function renderStories() {
    const stories = document.getElementById("stories");

    stories.innerHTML = Object.entries(pessoas).map(([nome, p]) => `
        <div class="story-item" onclick="abrirStory('${nome}')">
            <img src="${p.foto}">
            <small>${nome}</small>
        </div>
    `).join("");
}

function abrirStory(nome) {
    const p = pessoas[nome];

    document.getElementById("storyFoto").src = p.foto;
    document.getElementById("storyNome").textContent = nome;
    document.getElementById("storyTexto").textContent =
        nome === "Jacy"
        ? "Aproveitando cada momento! ❤️"
        : "Curtindo a vida com a galera! 😂";

    document.getElementById("modalStory").classList.add("aberto");
}

function fecharStory() {
    document.getElementById("modalStory").classList.remove("aberto");
}

function renderFeed() {
    document.getElementById("feed").innerHTML =
        posts.map((post, index) => `
        <article class="post">
            <div class="post-header">
                <img src="${pessoas[post.pessoa].foto}">
                <div>
                    <strong>${pessoas[post.pessoa].usuario}</strong>
                    <small> • há pouco tempo</small>
                </div>
            </div>

            <img class="post-foto" src="${post.foto}">

            <div class="post-acoes">
                <button onclick="curtir(${index}, this)">❤️</button>
                <button onclick="focarComentario(${index})">💬</button>
                <button onclick="compartilhar(${index})">↗</button>
            </div>

            <div class="post-info">
                <strong>${post.curtidas} curtidas</strong>
                <p class="legenda">
                    <strong>${pessoas[post.pessoa].usuario}</strong>
                    ${post.legenda}
                </p>

                <div class="comentarios" id="comentarios-${index}">
                    ${post.comentarios.map(c => `
                        <p>
                            <strong>${pessoas[c.nome].usuario}</strong>
                            ${c.texto}
                        </p>
                    `).join("")}
                </div>
            </div>

            <div class="comentar">
                <input id="comentario-${index}"
                       placeholder="Adicione um comentário...">
                <button onclick="comentar(${index})">Publicar</button>
            </div>
        </article>
    `).join("");

    document.getElementById("totalPosts").textContent = posts.length;
    renderExplorar();
}

function curtir(index, botao) {
    const post = posts[index];

    if (botao.dataset.curtido === "sim") {
        post.curtidas--;
        botao.dataset.curtido = "nao";
        botao.classList.remove("curtido");
    } else {
        post.curtidas++;
        botao.dataset.curtido = "sim";
        botao.classList.add("curtido");
    }

    renderFeed();
}

function comentar(index) {
    const input = document.getElementById(`comentario-${index}`);
    const texto = input.value.trim();

    if (!texto) return;

    posts[index].comentarios.push({
        nome: "Jacy",
        texto
    });

    renderFeed();
}

function focarComentario(index) {
    document.getElementById(`comentario-${index}`).focus();
}

function criarPost() {
    const input = document.getElementById("novaLegenda");
    const texto = input.value.trim();

    if (!texto) return;

    posts.unshift({
        pessoa: "Jacy",
        legenda: texto,
        foto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900",
        curtidas: 0,
        comentarios: []
    });

    input.value = "";
    renderFeed();
    mostrarPagina("inicio");
}

function compartilhar(index) {
    const texto = posts[index].legenda;

    if (navigator.share) {
        navigator.share({
            title: "Jacygram",
            text: texto
        });
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto)
            .then(() => alert("Legenda copiada!"));
    } else {
        alert(texto);
    }
}

function mostrarPagina(id) {
    document.querySelectorAll(".pagina").forEach(p => {
        p.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");
}

function renderExplorar() {
    document.getElementById("explorarGrid").innerHTML =
        posts.map(p => `<img src="${p.foto}">`).join("");

    document.getElementById("perfilGrid").innerHTML =
        posts.filter(p => p.pessoa === "Jacy")
        .map(p => `<img src="${p.foto}">`).join("");
}

function renderAmigos() {
    document.getElementById("amigos").innerHTML =
        Object.entries(pessoas)
        .filter(([nome]) => nome !== "Jacy")
        .map(([nome, p]) => `
            <div class="amigo">
                <img src="${p.foto}">
                <div>
                    <strong>${p.usuario}</strong>
                    <small>${p.bio}</small>
                </div>
            </div>
        `).join("");

    document.getElementById("contatos").innerHTML =
        Object.keys(pessoas)
        .filter(nome => nome !== "Jacy")
        .map(nome => `
            <div class="contato" onclick="abrirChat('${nome}')">
                ${nome}
            </div>
        `).join("");
}

function abrirChat(nome) {
    pessoaChat = nome;

    document.getElementById("nomeConversa").textContent =
        pessoas[nome].usuario;

    renderMensagens();
}

function renderMensagens() {
    const chat = document.getElementById("chatMensagens");

    chat.innerHTML = (mensagens[pessoaChat] || [])
        .map(m => `
            <div class="bolha ${m.startsWith("Você:") ? "eu" : ""}">
                ${m}
            </div>
        `).join("");

    chat.scrollTop = chat.scrollHeight;
}

function enviarMensagem() {
    if (!pessoaChat) {
        alert("Escolha um amigo primeiro!");
        return;
    }

    const input = document.getElementById("textoMensagem");
    const texto = input.value.trim();

    if (!texto) return;

    mensagens[pessoaChat].push("Você: " + texto);
    input.value = "";

    renderMensagens();

    setTimeout(() => {
        const opcoes = respostas[pessoaChat];
        const resposta = opcoes[Math.floor(Math.random() * opcoes.length)];

        mensagens[pessoaChat].push(pessoaChat + ": " + resposta);
        renderMensagens();
    }, 1200);
}

function renderNotificacoes() {
    document.getElementById("notificacoesFeed").innerHTML = `
        <p>❤️ Abner curtiu sua publicação.</p>
        <p>💬 Jatan comentou: "Amei essa foto!"</p>
        <p>❤️ Kaiky curtiu sua foto.</p>
        <p>💬 Alvaro comentou: "Bora repetir esse dia!"</p>
    `;
}

function renderReels() {
    document.getElementById("reelsFeed").innerHTML = `
        <h3>😂 Momentos da galera</h3>
        <img src="${posts[0].foto}">
        <p>Jacy e os amigos: melhores momentos ❤️</p>
        <img src="${posts[2].foto}">
        <p>Quando os cinco se encontram KKKKK</p>
    `;
}

renderStories();
renderFeed();
renderAmigos();
renderNotificacoes();
renderReels();
