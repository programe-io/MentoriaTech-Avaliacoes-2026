
/* USUÁRIOS */

const usuarios = [
    {
        nome: "ana ♡",
        foto: "https://i.pravatar.cc/150?img=1",
        story: "https://picsum.photos/600/900?random=101"
    },
    {
        nome: "lucas",
        foto: "https://i.pravatar.cc/150?img=3",
        story: "https://picsum.photos/600/900?random=102"
    },
    {
        nome: "marina",
        foto: "https://i.pravatar.cc/150?img=5",
        story: "https://picsum.photos/600/900?random=103"
    },
    {
        nome: "pedro",
        foto: "https://i.pravatar.cc/150?img=8",
        story: "https://picsum.photos/600/900?random=104"
    },
    {
        nome: "sofia",
        foto: "https://i.pravatar.cc/150?img=9",
        story: "https://picsum.photos/600/900?random=105"
    }
];


/* PUBLICAÇÕES */

const publicacoes = [
    {
        usuario: "aryanewzy",
        foto: "https://i.pravatar.cc/150?img=60",
        imagem: "https://picsum.photos/600/450?random=15",
        legenda: "Eu falando que vou economizar e recebendo notificação de promoção KKKKK 😂",
        curtidas: 245
    },
    {
        usuario: "ana ♡",
        foto: usuarios[0].foto,
        imagem: "https://picsum.photos/600/450?random=25",
        legenda: "Quero alguém que me escolha todos os dias. ❤️",
        curtidas: 189
    },
    {
        usuario: "aryanewzy",
        foto: "https://i.pravatar.cc/150?img=60",
        imagem: "https://picsum.photos/600/450?random=35",
        legenda: "Minha vida amorosa está igual ao Wi-Fi: procurando conexão e nada KKKKK 😭",
        curtidas: 532
    },
    {
        usuario: "marina",
        foto: usuarios[2].foto,
        imagem: "https://picsum.photos/600/450?random=45",
        legenda: "O amor está nos pequenos detalhes. 💗",
        curtidas: 310
    },
    {
        usuario: "aryanewzy",
        foto: "https://i.pravatar.cc/150?img=60",
        imagem: "https://picsum.photos/600/450?random=55",
        legenda: "Eu dizendo que não vou mandar mensagem e abrindo o WhatsApp 30 segundos depois 🤡",
        curtidas: 421
    }
];


/* STORIES */

const stories = document.getElementById("stories");

usuarios.forEach((usuario, index) => {

    const item = document.createElement("div");

    item.className = "story-item";

    item.innerHTML = `
        <img src="${usuario.foto}" class="story-img"
        alt="Story de ${usuario.nome}">

        <p>${usuario.nome}</p>
    `;

    item.addEventListener("click", () => {

        document.getElementById("storyTitle").textContent =
            usuario.nome;

        document.getElementById("storyImage").src =
            usuario.story;

        const modal = new bootstrap.Modal(
            document.getElementById("storyModal")
        );

        modal.show();

    });

    stories.appendChild(item);

});


/* FEED */

const feed = document.getElementById("feed");

publicacoes.forEach((post, index) => {

    const card = document.createElement("div");

    card.className = "card post-card shadow-sm border-0";

    card.innerHTML = `

        <div class="card-body">

            <div class="d-flex align-items-center gap-2">

                <img src="${post.foto}" class="post-user-img">

                <strong>${post.usuario}</strong>

            </div>

        </div>

        <img src="${post.imagem}" class="post-image"
        alt="Publicação">

        <div class="card-body">

            <div class="d-flex gap-3">

                <button class="action-btn"
                onclick="curtir(this, ${index})">
                    <i class="bi bi-heart"></i>
                </button>

                <button class="action-btn"
                onclick="document.getElementById('comentario-${index}').focus()">
                    <i class="bi bi-chat"></i>
                </button>

                <button class="action-btn"
                onclick="compartilhar(${index})">
                    <i class="bi bi-send"></i>
                </button>

            </div>

            <p id="likes-${index}" class="fw-bold small">
                ${post.curtidas} curtidas
            </p>

            <p class="post-caption">
                <strong>${post.usuario}</strong>
                ${post.legenda}
            </p>

            <div id="comments-${index}" class="small"></div>

            <div class="input-group mt-3">

                <input
                    type="text"
                    class="form-control comment-input"
                    id="comentario-${index}"
                    placeholder="Adicione um comentário...">

                <button class="btn btn-purple"
                onclick="comentar(${index})">
                    Publicar
                </button>

            </div>

        </div>

    `;

    feed.appendChild(card);

});


/* CURTIDAS */

function curtir(botao, index) {

    const post = publicacoes[index];

    post.curtido = !post.curtido;

    post.curtidas += post.curtido ? 1 : -1;

    const icone = botao.querySelector("i");

    icone.className = post.curtido
        ? "bi bi-heart-fill like-active"
        : "bi bi-heart";

    document.getElementById(`likes-${index}`).textContent =
        post.curtidas + " curtidas";

}


/* COMENTÁRIOS */

function comentar(index) {

    const input = document.getElementById(`comentario-${index}`);

    const texto = input.value.trim();

    if (!texto) return;

    const comentarios = document.getElementById(`comments-${index}`);

    const novoComentario = document.createElement("p");

    const usuario = document.createElement("strong");
    usuario.textContent = "aryanewzy: ";

    novoComentario.appendChild(usuario);
    novoComentario.appendChild(document.createTextNode(texto));

    comentarios.appendChild(novoComentario);

    input.value = "";

}


/* COMPARTILHAR */

function compartilhar(index) {

    const post = publicacoes[index];

    if (navigator.share) {

        navigator.share({
            title: "Aryanewzy",
            text: post.legenda
        }).catch(() => {});

    } else {

        navigator.clipboard.writeText(post.legenda)
            .then(() => alert("Publicação copiada!"));

    }

}
