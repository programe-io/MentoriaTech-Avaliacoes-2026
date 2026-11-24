
const publicacoes = document.getElementById("publicacoes");

const videos = [
    {
        titulo: "Gatinho brincando 😂",
        usuario: "@gatos",
        arquivo: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
        tipo: "video",
        curtidas: 120
    },
    {
        titulo: "Olha que fofura! 😻",
        usuario: "@mundo_pet",
        arquivo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
        tipo: "imagem",
        curtidas: 250
    },
    {
        titulo: "O rei da casa 🐈",
        usuario: "@catlover",
        arquivo: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800",
        tipo: "imagem",
        curtidas: 180
    },
    {
        titulo: "Gatinho descansando ❤️",
        usuario: "@mimi",
        arquivo: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800",
        tipo: "imagem",
        curtidas: 320
    }
];

function criarPost(post) {
    const div = document.createElement("div");
    div.className = "post";

    const midia = post.tipo === "video"
        ? `<video src="${post.arquivo}" controls loop playsinline></video>`
        : `<img src="${post.arquivo}" alt="Foto de gato">`;

    div.innerHTML = `
        <h3>${post.usuario}</h3>
        ${midia}
        <p>${post.titulo}</p>
        <div class="acoes">
            <button class="curtir">❤️ ${post.curtidas}</button>
            <button class="comentar">💬 Comentar</button>
        </div>
        <div class="comentarios"></div>
    `;

    const botaoCurtir = div.querySelector(".curtir");

    botaoCurtir.addEventListener("click", () => {
        post.curtidas++;
        botaoCurtir.textContent = `❤️ ${post.curtidas}`;
    });

    div.querySelector(".comentar").addEventListener("click", () => {
        const comentario = prompt("Digite seu comentário:");

        if (comentario) {
            const p = document.createElement("p");
            p.textContent = "💬 " + comentario;
            div.querySelector(".comentarios").appendChild(p);
        }
    });

    publicacoes.appendChild(div);
}

function carregarPosts(lista = videos) {
    publicacoes.innerHTML = "";
    lista.forEach(criarPost);
}

function publicar() {
    const arquivo = document.getElementById("arquivo").files[0];
    const titulo = document.getElementById("titulo").value;

    if (!arquivo) {
        alert("Escolha uma foto ou vídeo!");
        return;
    }

    const url = URL.createObjectURL(arquivo);

    const novoPost = {
        titulo: titulo || "Meu gatinho! 🐱",
        usuario: "@amantedegatos",
        arquivo: url,
        tipo: arquivo.type.startsWith("video") ? "video" : "imagem",
        curtidas: 0
    };

    videos.unshift(novoPost);
    carregarPosts();

    document.getElementById("arquivo").value = "";
    document.getElementById("titulo").value = "";

    document.getElementById("totalPosts").textContent =
        videos.length + " publicações";

    alert("Publicação realizada! 🐾");
}

function mostrarInicio() {
    document.getElementById("feed").classList.remove("oculto");
    document.getElementById("perfil").classList.add("oculto");
}

function mostrarVideos() {
    document.getElementById("feed").classList.remove("oculto");
    document.getElementById("perfil").classList.add("oculto");
    carregarPosts(videos.filter(p => p.tipo === "video"));
}

function mostrarPerfil() {
    document.getElementById("feed").classList.add("oculto");
    document.getElementById("perfil").classList.remove("oculto");
}

document.getElementById("pesquisa").addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();

    carregarPosts(videos.filter(p =>
        p.titulo.toLowerCase().includes(termo) ||
        p.usuario.toLowerCase().includes(termo)
    ));
});

carregarPosts();
