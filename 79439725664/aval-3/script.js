
// ELEMENTOS

const textoPost = document.getElementById("textoPost");
const listaPosts = document.getElementById("listaPosts");

const imagemPost = document.getElementById("imagemPost");
const videoPost = document.getElementById("videoPost");

let arquivo = null;
let tipoArquivo = null;


// SELECIONAR FOTO

imagemPost.addEventListener("change", function () {

    arquivo = this.files[0] || null;
    tipoArquivo = arquivo ? "imagem" : null;

    videoPost.value = "";

    mostrarArquivo();

});


// SELECIONAR VÍDEO

videoPost.addEventListener("change", function () {

    arquivo = this.files[0] || null;
    tipoArquivo = arquivo ? "video" : null;

    imagemPost.value = "";

    mostrarArquivo();

});


// MOSTRAR ARQUIVO SELECIONADO

function mostrarArquivo() {

    const campo = document.getElementById("arquivoSelecionado");

    campo.textContent = arquivo
        ? "Arquivo selecionado: " + arquivo.name
        : "";

}


// PUBLICAR

document.getElementById("publicarBtn").addEventListener("click", function () {

    const texto = textoPost.value.trim();

    if (!texto && !arquivo) {

        Swal.fire("Atenção!", "Escreva algo ou selecione uma foto ou vídeo.", "warning");

        return;

    }

    if (arquivo && tipoArquivo === "imagem" && !arquivo.type.startsWith("image/")) {
        Swal.fire("Arquivo inválido", "Selecione uma imagem válida.", "error");
        return;
    }

    if (arquivo && tipoArquivo === "video" && !arquivo.type.startsWith("video/")) {
        Swal.fire("Arquivo inválido", "Selecione um vídeo válido.", "error");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const topo = document.createElement("div");
    topo.className = "post-topo";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Meu perfil";

    const usuario = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Meu Perfil";

    const data = document.createElement("small");
    data.textContent = "Agora mesmo · Público";

    usuario.append(nome, data);
    topo.append(avatar, usuario);

    post.append(topo);

    if (texto) {

        const paragrafo = document.createElement("p");
        paragrafo.textContent = texto;

        post.append(paragrafo);

    }

    if (arquivo) {

        const url = URL.createObjectURL(arquivo);

        if (tipoArquivo === "imagem") {

            const img = document.createElement("img");
            img.className = "post-imagem";
            img.src = url;
            img.alt = "Imagem publicada";

            post.append(img);

        } else {

            const video = document.createElement("video");

            video.controls = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = "metadata";

            video.src = url;

            video.style.width = "100%";
            video.style.maxHeight = "450px";
            video.style.borderRadius = "10px";

            post.append(video);

        }

    }

    const estatisticas = document.createElement("div");
    estatisticas.className = "estatisticas";

    estatisticas.innerHTML = `
        <span>👍 <span class="quantidade-curtidas">0</span></span>
        <span>0 comentários</span>
    `;

    const acoes = document.createElement("div");
    acoes.className = "acoes-post";

    acoes.innerHTML = `
        <button class="curtir">
            <i class="bi bi-hand-thumbs-up"></i> Curtir
        </button>

        <button class="comentar">
            <i class="bi bi-chat"></i> Comentar
        </button>

        <button class="compartilhar">
            <i class="bi bi-share"></i> Compartilhar
        </button>
    `;

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(estatisticas, acoes, comentarios);

    listaPosts.prepend(post);

    textoPost.value = "";

    imagemPost.value = "";
    videoPost.value = "";

    arquivo = null;
    tipoArquivo = null;

    mostrarArquivo();

    Swal.fire({
        title: "Publicado com sucesso!",
        icon: "success",
        confirmButtonColor: "#1877f2"
    });

});


// AÇÕES DOS POSTS

listaPosts.addEventListener("click", async function (event) {

    const botao = event.target.closest("button");

    if (!botao) return;

    const post = botao.closest(".post");

    if (!post) return;


    // CURTIR

    if (botao.classList.contains("curtir")) {

        const quantidade = post.querySelector(".quantidade-curtidas");
        const icone = botao.querySelector("i");

        let total = Number(quantidade.textContent);

        if (botao.classList.contains("curtido")) {

            botao.classList.remove("curtido");
            icone.className = "bi bi-hand-thumbs-up";
            quantidade.textContent = total - 1;

        } else {

            botao.classList.add("curtido");
            icone.className = "bi bi-hand-thumbs-up-fill";
            quantidade.textContent = total + 1;

        }

    }


    // COMENTAR

    if (botao.classList.contains("comentar")) {

        const resposta = await Swal.fire({

            title: "Comentar publicação",

            input: "textarea",

            inputPlaceholder: "Escreva seu comentário...",

            showCancelButton: true,

            confirmButtonText: "Enviar",

            cancelButtonText: "Cancelar",

            confirmButtonColor: "#1877f2",

            inputValidator: valor => {

                if (!valor.trim()) {
                    return "Digite um comentário!";
                }

            }

        });

        if (resposta.isConfirmed) {

            const area = post.querySelector(".comentarios");

            const comentario = document.createElement("div");
            comentario.className = "comentario";

            const avatar = document.createElement("img");
            avatar.src = "https://i.pravatar.cc/100?img=12";
            avatar.alt = "Meu perfil";

            const conteudo = document.createElement("div");

            const nome = document.createElement("strong");
            nome.textContent = "Meu Perfil";

            const texto = document.createElement("span");
            texto.textContent = resposta.value.trim();

            conteudo.append(nome, texto);
            comentario.append(avatar, conteudo);

            area.append(comentario);

        }

    }


    // COMPARTILHAR

    if (botao.classList.contains("compartilhar")) {

        const link = window.location.href;

        if (navigator.clipboard && window.isSecureContext) {

            try {

                await navigator.clipboard.writeText(link);

                Swal.fire("Link copiado!", "Agora você pode compartilhar a página.", "success");

            } catch {

                Swal.fire("Compartilhar", link, "info");

            }

        } else {

            Swal.fire("Compartilhar", link, "info");

        }

    }


    // OCULTAR POST

    if (botao.classList.contains("opcoes-post")) {

        const resposta = await Swal.fire({

            title: "Ocultar publicação?",

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Ocultar",

            cancelButtonText: "Cancelar",

            confirmButtonColor: "#1877f2"

        });

        if (resposta.isConfirmed) {
            post.remove();
        }

    }

});


// STORIES EXISTENTES

document.querySelectorAll("[data-story]").forEach(story => {

    story.addEventListener("click", function () {

        document.getElementById("textoStory").textContent =
            this.dataset.story;

        document.getElementById("storyViewer")
            .classList.add("ativo");

    });

});


// CRIAR STORY

document.getElementById("criarStory").addEventListener("click", async function () {

    const resposta = await Swal.fire({

        title: "Criar story",

        input: "textarea",

        inputPlaceholder: "O que você deseja compartilhar?",

        showCancelButton: true,

        confirmButtonText: "Publicar",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#1877f2",

        inputValidator: valor => {
            if (!valor.trim()) return "Digite alguma coisa!";
        }

    });

    if (resposta.isConfirmed) {

        const story = document.createElement("button");
        story.className = "story";

        const img = document.createElement("img");
        img.src = "https://i.pravatar.cc/150?img=12";
        img.alt = "Meu story";

        const nome = document.createElement("strong");
        nome.textContent = "Meu story";

        story.append(img, nome);

        story.addEventListener("click", function () {

            document.getElementById("textoStory").textContent =
                resposta.value;

            document.getElementById("storyViewer")
                .classList.add("ativo");

        });

        document.querySelector(".lista-stories").append(story);

        Swal.fire("Story publicado!", "", "success");

    }

});


// FECHAR STORY

document.getElementById("fecharStory").addEventListener("click", function () {

    document.getElementById("storyViewer").classList.remove("ativo");

});


// NAVEGAÇÃO

function mostrarSecao(secao) {

    const feed = document.getElementById("areaFeed");
    const videos = document.getElementById("areaVideos");
    const amigos = document.getElementById("areaAmigos");

    feed.hidden = secao !== "inicio";
    videos.hidden = secao !== "videos";
    amigos.hidden = secao !== "amigos";

    document.querySelectorAll(".topo-btn").forEach(botao => {
        botao.classList.remove("ativo");
    });

    const botaoAtivo = document.getElementById(
        secao === "inicio" ? "inicioBtn" :
        secao === "videos" ? "videosBtn" : "amigosBtn"
    );

    if (botaoAtivo) botaoAtivo.classList.add("ativo");

    window.scrollTo({ top: 0, behavior: "smooth" });

}

document.getElementById("inicioBtn").addEventListener("click", () => {
    mostrarSecao("inicio");
});

document.getElementById("videosBtn").addEventListener("click", () => {
    mostrarSecao("videos");
});

document.getElementById("amigosBtn").addEventListener("click", () => {
    mostrarSecao("amigos");
});

document.querySelectorAll("[data-section]").forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const secao = this.dataset.section;

        if (["inicio", "videos", "amigos"].includes(secao)) {
            mostrarSecao(secao);
        } else {
            Swal.fire("Em breve!", "Essa área será desenvolvida nas próximas versões.", "info");
        }

    });

});


// NOTIFICAÇÕES

document.getElementById("notificacoesBtn").addEventListener("click", function () {

    Swal.fire({

        title: "Notificações",

        html: `
            <div style="text-align:left;line-height:2;">
                <p>❤️ Ana curtiu sua publicação.</p>
                <p>💬 Lucas comentou em um post.</p>
                <p>👥 Você recebeu uma solicitação de amizade.</p>
                <p>🎬 Novo vídeo disponível no CONNECT REELS.</p>
            </div>
        `,

        confirmButtonText: "Fechar",

        confirmButtonColor: "#1877f2"

    });

});


// AMIZADES

document.querySelectorAll(".adicionar-amigo").forEach(botao => {

    botao.addEventListener("click", function () {

        this.textContent = "Solicitação enviada";
        this.disabled = true;
        this.style.background = "#31a24c";

    });

});


// CURTIR VÍDEOS

document.getElementById("listaVideos").addEventListener("click", async function (event) {

    const botao = event.target.closest("button");

    if (!botao) return;

    if (botao.classList.contains("curtir-video")) {

        const numero = botao.querySelector("span");
        let total = Number(numero.textContent);

        if (botao.classList.contains("curtido")) {

            botao.classList.remove("curtido");
            total--;

        } else {

            botao.classList.add("curtido");
            total++;

        }

        numero.textContent = total;

    }


    if (botao.classList.contains("comentar-video")) {

        const resposta = await Swal.fire({

            title: "Comentar vídeo",

            input: "textarea",

            inputPlaceholder: "Escreva seu comentário...",

            showCancelButton: true,

            confirmButtonText: "Enviar",

            confirmButtonColor: "#1877f2",

            inputValidator: valor => {
                if (!valor.trim()) return "Digite um comentário!";
            }

        });

        if (resposta.isConfirmed) {

            const numero = botao.querySelector("span");

            numero.textContent = Number(numero.textContent) + 1;

            Swal.fire("Comentário enviado!", "", "success");

        }

    }


    if (botao.classList.contains("compartilhar-video")) {

        if (navigator.clipboard && window.isSecureContext) {

            try {

                await navigator.clipboard.writeText(window.location.href);

                Swal.fire("Link copiado!", "", "success");

            } catch {

                Swal.fire("Compartilhar", window.location.href, "info");

            }

        } else {

            Swal.fire("Compartilhar", window.location.href, "info");

        }

    }

});


// PESQUISA

document.getElementById("pesquisa").addEventListener("input", function () {

    mostrarSecao("inicio");

    const termo = this.value.toLowerCase();

    document.querySelectorAll("#listaPosts .post").forEach(post => {

        post.style.display =
            post.textContent.toLowerCase().includes(termo) ? "" : "none";

    });

});
