
// ELEMENTOS

const textoPost = document.getElementById("textoPost");
const listaPosts = document.getElementById("listaPosts");
const imagemPost = document.getElementById("imagemPost");

let arquivoSelecionado = null;


// SELECIONAR IMAGEM

imagemPost.addEventListener("change", function () {

    arquivoSelecionado = this.files[0] || null;

    document.getElementById("nomeImagem").textContent =
        arquivoSelecionado
            ? arquivoSelecionado.name
            : "Nenhuma imagem selecionada";

});


// CRIAR PUBLICAÇÃO

document.getElementById("publicar").addEventListener("click", function () {

    const texto = textoPost.value.trim();

    if (!texto && !arquivoSelecionado) {

        Swal.fire({
            title: "Atenção!",
            text: "Escreva algo ou escolha uma imagem para publicar.",
            icon: "warning"
        });

        return;
    }

    if (arquivoSelecionado && !arquivoSelecionado.type.startsWith("image/")) {
        Swal.fire("Arquivo inválido", "Escolha uma imagem.", "error");
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

    const horario = document.createElement("small");
    horario.innerHTML = 'Agora mesmo · <i class="bi bi-globe"></i>';

    usuario.append(nome, horario);
    topo.append(avatar, usuario);

    const conteudo = document.createElement("p");
    conteudo.className = "texto-post";
    conteudo.textContent = texto;

    post.append(topo);

    if (texto) {
        post.append(conteudo);
    }

    if (arquivoSelecionado) {

        const imagem = document.createElement("img");

        imagem.className = "imagem-post";
        imagem.src = URL.createObjectURL(arquivoSelecionado);
        imagem.alt = "Imagem da publicação";

        post.append(imagem);

    }

    const estatisticas = document.createElement("div");
    estatisticas.className = "estatisticas";

    estatisticas.innerHTML = `
        <span>
            <i class="bi bi-hand-thumbs-up-fill"></i>
            <span class="numero-curtidas">0</span>
        </span>
        <span>0 comentários</span>
    `;

    const acoes = document.createElement("div");
    acoes.className = "acoes-post";

    acoes.innerHTML = `
        <button class="curtir">
            <i class="bi bi-hand-thumbs-up"></i>
            Curtir
        </button>

        <button class="comentar">
            <i class="bi bi-chat"></i>
            Comentar
        </button>

        <button class="compartilhar">
            <i class="bi bi-share"></i>
            Compartilhar
        </button>
    `;

    const comentarios = document.createElement("div");
    comentarios.className = "area-comentarios";

    post.append(estatisticas, acoes, comentarios);

    listaPosts.prepend(post);

    textoPost.value = "";
    imagemPost.value = "";
    arquivoSelecionado = null;

    document.getElementById("nomeImagem").textContent =
        "Nenhuma imagem selecionada";

    Swal.fire({
        title: "Publicado!",
        text: "Sua publicação foi adicionada ao feed.",
        icon: "success",
        confirmButtonColor: "#1877f2"
    });

});


// CURTIR, COMENTAR E COMPARTILHAR

listaPosts.addEventListener("click", async function (event) {

    const botao = event.target.closest("button");

    if (!botao) return;

    const post = botao.closest(".post");

    if (!post) return;


    // CURTIR

    if (botao.classList.contains("curtir")) {

        const numero = post.querySelector(".numero-curtidas");
        const icone = botao.querySelector("i");

        let curtidas = Number(numero.textContent);

        if (botao.classList.contains("curtido")) {

            botao.classList.remove("curtido");
            icone.className = "bi bi-hand-thumbs-up";
            numero.textContent = curtidas - 1;

        } else {

            botao.classList.add("curtido");
            icone.className = "bi bi-hand-thumbs-up-fill";
            numero.textContent = curtidas + 1;

        }

    }


    // COMENTAR

    if (botao.classList.contains("comentar")) {

        const resultado = await Swal.fire({

            title: "Adicionar comentário",

            input: "textarea",

            inputPlaceholder: "Escreva seu comentário...",

            showCancelButton: true,

            confirmButtonText: "Enviar",

            cancelButtonText: "Cancelar",

            confirmButtonColor: "#1877f2",

            inputValidator: (valor) => {

                if (!valor.trim()) {
                    return "Digite um comentário!";
                }

            }

        });

        if (resultado.isConfirmed) {

            const area = post.querySelector(".area-comentarios");

            const comentario = document.createElement("div");
            comentario.className = "comentario";

            const avatar = document.createElement("img");
            avatar.src = "https://i.pravatar.cc/100?img=12";
            avatar.alt = "Meu perfil";

            const conteudo = document.createElement("div");
            conteudo.className = "comentario-conteudo";

            const nome = document.createElement("strong");
            nome.textContent = "Meu Perfil";

            const texto = document.createElement("span");
            texto.textContent = resultado.value.trim();

            conteudo.append(nome, texto);
            comentario.append(avatar, conteudo);
            area.append(comentario);

            Swal.fire({
                title: "Comentário enviado!",
                icon: "success",
                timer: 1200,
                showConfirmButton: false
            });

        }

    }


    // COMPARTILHAR

    if (botao.classList.contains("compartilhar")) {

        const texto = "Confira esta publicação no CONNECT SOCIAL!";

        if (navigator.clipboard && window.isSecureContext) {

            try {

                await navigator.clipboard.writeText(
                    texto + " " + window.location.href
                );

                Swal.fire({
                    title: "Link copiado!",
                    text: "Você já pode compartilhar a página.",
                    icon: "success"
                });

            } catch {

                Swal.fire({
                    title: "Compartilhar",
                    text: window.location.href,
                    icon: "info"
                });

            }

        } else {

            Swal.fire({
                title: "Compartilhar",
                text: window.location.href,
                icon: "info"
            });

        }

    }


    // OPÇÕES DA PUBLICAÇÃO

    if (botao.classList.contains("mais-opcoes")) {

        const resultado = await Swal.fire({
            title: "Publicação",
            text: "Deseja ocultar esta publicação do feed?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ocultar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#1877f2"
        });

        if (resultado.isConfirmed) {
            post.remove();
        }

    }

});


// STORIES EXISTENTES

document.querySelectorAll("[data-story]").forEach(story => {

    story.addEventListener("click", function () {

        document.getElementById("conteudoStory").textContent =
            this.dataset.story;

        document.getElementById("visualizadorStory")
            .classList.add("ativo");

    });

});


// FECHAR STORY

document.getElementById("fecharStory").addEventListener("click", function () {

    document.getElementById("visualizadorStory")
        .classList.remove("ativo");

});


// CRIAR STORY

document.getElementById("criarStory").addEventListener("click", async function () {

    const resultado = await Swal.fire({

        title: "Criar story",

        input: "textarea",

        inputPlaceholder: "O que você deseja compartilhar?",

        showCancelButton: true,

        confirmButtonText: "Publicar story",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#1877f2",

        inputValidator: valor => {
            if (!valor.trim()) {
                return "Escreva alguma coisa!";
            }
        }

    });

    if (resultado.isConfirmed) {

        const story = document.createElement("button");
        story.className = "story";

        const imagem = document.createElement("img");
        imagem.src = "https://i.pravatar.cc/150?img=12";
        imagem.alt = "Meu story";

        const nome = document.createElement("strong");
        nome.textContent = "Meu story";

        story.append(imagem, nome);

        story.addEventListener("click", function () {

            document.getElementById("conteudoStory").textContent =
                resultado.value;

            document.getElementById("visualizadorStory")
                .classList.add("ativo");

        });

        document.querySelector(".lista-stories").append(story);

        Swal.fire({
            title: "Story publicado!",
            icon: "success",
            timer: 1300,
            showConfirmButton: false
        });

    }

});


// SOLICITAÇÃO DE AMIZADE

document.getElementById("aceitarAmigo").addEventListener("click", function () {

    this.textContent = "Amizade confirmada!";
    this.disabled = true;

    this.style.background = "#31a24c";

    Swal.fire({
        title: "Nova amizade!",
        text: "Mariana agora faz parte dos seus amigos.",
        icon: "success"
    });

});


// NOTIFICAÇÕES

document.getElementById("notificacoes").addEventListener("click", function () {

    Swal.fire({
        title: "Notificações",
        html: `
            <div style="text-align:left;line-height:2;">
                <p>👍 Ana Oliveira curtiu uma publicação.</p>
                <p>💬 Lucas Santos comentou em uma publicação.</p>
                <p>👥 Você recebeu uma solicitação de amizade.</p>
            </div>
        `,
        confirmButtonText: "Entendi",
        confirmButtonColor: "#1877f2"
    });

});


// PESQUISAR PUBLICAÇÕES

document.getElementById("pesquisa").addEventListener("input", function () {

    const termo = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(termo) ? "" : "none";

    });

});


// NAVEGAÇÃO DO MENU

document.querySelectorAll("[data-ir]").forEach(botao => {

    botao.addEventListener("click", function () {

        document.querySelectorAll(".icone-menu").forEach(item => {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");

        const destino = this.dataset.ir;

        if (destino === "inicio") {
            document.getElementById("inicio").scrollIntoView({
                behavior: "smooth"
            });
        }

        if (destino === "amigos") {
            document.getElementById("amigos").scrollIntoView({
                behavior: "smooth"
            });
        }

        if (destino === "videos") {
            Swal.fire({
                title: "Vídeos",
                text: "A área de vídeos será adicionada em uma próxima versão.",
                icon: "info"
            });
        }

    });

});
