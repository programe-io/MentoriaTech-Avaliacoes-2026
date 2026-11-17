
const pessoas = [
    { id: 1, nome: "Sofia", foto: "https://i.pravatar.cc/150?img=47", seguindo: true },
    { id: 2, nome: "Mariana", foto: "https://i.pravatar.cc/150?img=44", seguindo: false },
    { id: 3, nome: "Lucas", foto: "https://i.pravatar.cc/150?img=12", seguindo: true },
    { id: 4, nome: "Isabela", foto: "https://i.pravatar.cc/150?img=49", seguindo: false },
    { id: 5, nome: "Gabriel", foto: "https://i.pravatar.cc/150?img=15", seguindo: false },
    { id: 6, nome: "Laura", foto: "https://i.pravatar.cc/150?img=45", seguindo: true }
];

let videos = [
    { usuario: "Sofia", arquivo: "videos/video1.mp4", legenda: "Meu dia especial ✨", curtidas: 120 },
    { usuario: "Mariana", arquivo: "videos/video2.mp4", legenda: "Momentos felizes 💗", curtidas: 85 },
    { usuario: "Lucas", arquivo: "videos/video3.mp4", legenda: "Um pouco do meu dia!", curtidas: 64 },
    { usuario: "Isabela", arquivo: "videos/video4.mp4", legenda: "Diversão com amigos 🌸", curtidas: 92 },
    { usuario: "Laura", arquivo: "videos/video5.mp4", legenda: "Dicas e novidades!", curtidas: 150 }
];

let conversas = [
    {
        nome: "Sofia",
        naoLidas: 2,
        mensagens: [
            { texto: "Oi! Tudo bem?", minha: false },
            { texto: "Tudo sim! E você?", minha: true },
            { texto: "Estou bem também!", minha: false }
        ]
    },
    {
        nome: "Mariana",
        naoLidas: 0,
        mensagens: [
            { texto: "Gostei do seu vídeo!", minha: false }
        ]
    },
    {
        nome: "Lucas",
        naoLidas: 0,
        mensagens: [
            { texto: "Vamos conversar?", minha: false }
        ]
    }
];

let conversaAtual = null;

function abrirPagina(nome) {
    document.querySelectorAll(".pagina").forEach(pagina => {
        pagina.classList.add("escondida");
    });

    document.getElementById(nome).classList.remove("escondida");

    if (nome === "inicio") mostrarFeed();
    if (nome === "videos") mostrarVideos();
    if (nome === "explorar") pesquisarPessoas();
    if (nome === "seguindo") mostrarSeguindo();
    if (nome === "mensagens") mostrarConversas();
    if (nome === "perfil") atualizarPerfil();
}

function criarCardVideo(video, indice) {
    return `
        <article class="video-card">
            <h3>${video.usuario}</h3>
            <video controls playsinline preload="metadata">
                <source src="${video.arquivo}" type="video/mp4">
                Seu navegador não conseguiu carregar este vídeo.
            </video>
            <p>${video.legenda}</p>
            <p>❤️ ${video.curtidas} curtidas</p>
            <button onclick="curtirVideo(${indice})">Curtir</button>
        </article>
    `;
}

function mostrarFeed() {
    document.getElementById("feed").innerHTML =
        videos.map((video, indice) => criarCardVideo(video, indice)).join("");
}

function mostrarVideos() {
    document.getElementById("listaVideos").innerHTML =
        videos.map((video, indice) => criarCardVideo(video, indice)).join("");
}

function curtirVideo(indice) {
    videos[indice].curtidas++;
    mostrarFeed();
    mostrarVideos();
}

function pesquisarPessoas() {
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    const resultado = pessoas.filter(pessoa =>
        pessoa.nome.toLowerCase().includes(pesquisa)
    );

    document.getElementById("listaPessoas").innerHTML =
        resultado.map(pessoa => `
            <div class="card">
                <img src="${pessoa.foto}" alt="Foto de ${pessoa.nome}">
                <h3>${pessoa.nome}</h3>
                <button onclick="alternarSeguir(${pessoa.id})">
                    ${pessoa.seguindo ? "Deixar de seguir" : "Seguir"}
                </button>
                <button onclick="abrirConversa('${pessoa.nome}')">
                    Enviar mensagem
                </button>
            </div>
        `).join("");
}

function alternarSeguir(id) {
    const pessoa = pessoas.find(p => p.id === id);
    pessoa.seguindo = !pessoa.seguindo;

    pesquisarPessoas();
    mostrarSeguindo();
}

function mostrarSeguindo() {
    const lista = pessoas.filter(pessoa => pessoa.seguindo);

    document.getElementById("listaSeguindo").innerHTML =
        lista.map(pessoa => `
            <div class="card">
                <img src="${pessoa.foto}" alt="Foto de ${pessoa.nome}">
                <h3>${pessoa.nome}</h3>
                <button onclick="alternarSeguir(${pessoa.id})">
                    Deixar de seguir
                </button>
            </div>
        `).join("") || "<p>Você ainda não está seguindo ninguém.</p>";
}

function mostrarConversas() {
    const lista = document.getElementById("listaConversas");

    lista.innerHTML = conversas.map(conversa => `
        <button class="contato"
            onclick="abrirConversa('${conversa.nome}')">
            ${conversa.nome}
            ${conversa.naoLidas > 0 ? " 🔴 " + conversa.naoLidas : ""}
        </button>
    `).join("");

    atualizarNaoLidas();
}

function abrirConversa(nome) {
    let conversa = conversas.find(c => c.nome === nome);

    if (!conversa) {
        conversa = { nome, naoLidas: 0, mensagens: [] };
        conversas.push(conversa);
    }

    conversaAtual = conversa;
    conversa.naoLidas = 0;

    document.getElementById("nomeConversa").textContent = nome;
    mostrarHistorico();
    mostrarConversas();
}

function mostrarHistorico() {
    if (!conversaAtual) return;

    document.getElementById("historico").innerHTML =
        conversaAtual.mensagens.map(mensagem => `
            <div class="bolha ${mensagem.minha ? "minha" : ""}">
                ${mensagem.texto}
            </div>
        `).join("");

    const historico = document.getElementById("historico");
    historico.scrollTop = historico.scrollHeight;
}

function enviarMensagem() {
    const campo = document.getElementById("textoMensagem");
    const texto = campo.value.trim();

    if (!conversaAtual) {
        alert("Escolha uma conversa primeiro!");
        return;
    }

    if (texto === "") {
        alert("Digite uma mensagem!");
        return;
    }

    conversaAtual.mensagens.push({
        texto: texto,
        minha: true
    });

    campo.value = "";
    mostrarHistorico();
}

function atualizarNaoLidas() {
    const total = conversas.reduce(
        (soma, conversa) => soma + conversa.naoLidas, 0
    );

    document.getElementById("naoLidas").textContent = total;
}

function publicarVideo() {
    const arquivo = document.getElementById("arquivoVideo").files[0];
    const legenda = document.getElementById("legendaVideo").value.trim();

    if (!arquivo) {
        alert("Escolha um vídeo antes de publicar!");
        return;
    }

    const url = URL.createObjectURL(arquivo);

    videos.unshift({
        usuario: "Meu perfil",
        arquivo: url,
        legenda: legenda || "Meu novo vídeo 💗",
        curtidas: 0
    });

    document.getElementById("arquivoVideo").value = "";
    document.getElementById("legendaVideo").value = "";

    alert("Vídeo publicado com sucesso!");
    abrirPagina("videos");
}

function editarPerfil() {
    const nome = prompt("Digite seu nome:");
    const bio = prompt("Escreva uma descrição para seu perfil:");

    if (nome && nome.trim()) {
        document.getElementById("nomePerfil").textContent = nome.trim();
    }

    if (bio !== null) {
        document.getElementById("bioPerfil").textContent = bio;
    }
}

function atualizarPerfil() {
    document.getElementById("totalPublicacoes").textContent =
        videos.filter(v => v.usuario === "Meu perfil").length;
}

function inicializar() {
    mostrarFeed();
    mostrarVideos();
    mostrarConversas();
    atualizarPerfil();
}

inicializar();
