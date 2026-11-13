
// MINI CONNECT - FOOTBALL EDITION

// ==================================
// 1. SISTEMA DE CURTIDAS
// ==================================

function ativarPost(post) {

    const botaoCurtir = post.querySelector(".curtir");
    const contador = post.querySelector(".contador-likes");

    botaoCurtir.addEventListener("click", () => {

        let numero = Number(contador.textContent.replace(/\./g, ""));

        if (botaoCurtir.classList.contains("curtido")) {

            numero--;
            botaoCurtir.classList.remove("curtido");

            botaoCurtir.innerHTML =
                '<i class="fa-regular fa-heart"></i> Curtir';

        } else {

            numero++;
            botaoCurtir.classList.add("curtido");

            botaoCurtir.innerHTML =
                '<i class="fa-solid fa-heart"></i> Curtir';
        }

        contador.textContent = numero.toLocaleString("pt-BR");
    });


    // ==================================
    // 2. SISTEMA DE COMENTÁRIOS
    // ==================================

    const campo = post.querySelector(".campo-comentario input");
    const enviar = post.querySelector(".enviar");
    const lista = post.querySelector(".lista-comentarios");

    function adicionarComentario() {

        const texto = campo.value.trim();

        if (texto === "") {
            alert("Escreva um comentário!");
            return;
        }

        const comentario = document.createElement("p");
        comentario.textContent = "⚽ Você: " + texto;

        lista.appendChild(comentario);

        campo.value = "";
    }

    enviar.addEventListener("click", adicionarComentario);

    campo.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            adicionarComentario();
        }

    });


    // ==================================
    // 3. ABRIR COMENTÁRIOS
    // ==================================

    post.querySelector(".comentar").addEventListener("click", () => {

        campo.focus();

        post.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });


    // ==================================
    // 4. COMPARTILHAR PUBLICAÇÃO
    // ==================================

    post.querySelector(".compartilhar").addEventListener("click", async () => {

        try {

            if (navigator.share) {

                await navigator.share({
                    title: "MiniConnect Football",
                    text: post.querySelector(".post-texto")?.innerText ||
                          "Confira esta publicação de futebol!",
                    url: window.location.href
                });

            } else {

                await navigator.clipboard.writeText(window.location.href);

                alert("Link copiado com sucesso!");

            }

        } catch (erro) {

            console.log("Compartilhamento cancelado.");

        }

    });

}


// ATIVAR TODOS OS POSTS INICIAIS

document.querySelectorAll(".post").forEach(post => {
    ativarPost(post);
});


// ==================================
// 5. CRIAR NOVA PUBLICAÇÃO
// ==================================

const publicar = document.getElementById("publicar");

publicar.addEventListener("click", () => {

    const texto = document.getElementById("textoPost").value.trim();

    const imagem = document.getElementById("imagemPost").value.trim();

    if (!texto) {
        alert("Escreva algo sobre futebol antes de publicar!");
        return;
    }

    // Verificação do endereço da imagem

    let imagemSegura = "";

    if (imagem) {

        try {

            const url = new URL(imagem);

            if (url.protocol === "https:" || url.protocol === "http:") {
                imagemSegura = url.href;
            }

        } catch (erro) {

            alert("O endereço da imagem não é válido. A publicação será feita sem foto.");

        }
    }

    // Criar estrutura do post

    const post = document.createElement("article");

    post.className = "post";
    post.dataset.categoria = "torcida";

    // Cabeçalho

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Perfil";

    const usuario = document.createElement("div");
    usuario.className = "post-usuario";

    const nome = document.createElement("strong");
    nome.textContent = "Lucas Futebol";

    const data = document.createElement("small");
    data.textContent = "@lucas_fut · agora";

    usuario.append(nome, data);

    header.append(avatar, usuario);

    // Texto

    const textoPost = document.createElement("div");
    textoPost.className = "post-texto";

    const categoria = document.createElement("span");
    categoria.className = "categoria verde";
    categoria.textContent = "⚽ PUBLICAÇÃO DA COMUNIDADE";

    const titulo = document.createElement("h3");
    titulo.textContent = "NOVA RESENHA DE FUTEBOL!";

    const descricao = document.createElement("p");
    descricao.textContent = texto;

    textoPost.append(categoria, titulo, descricao);

    post.append(header, textoPost);

    // Foto opcional

    if (imagemSegura) {

        const foto = document.createElement("img");

        foto.className = "post-imagem";
        foto.src = imagemSegura;
        foto.alt = "Foto da publicação";

        post.appendChild(foto);
    }

    // Informações

    const informacoes = document.createElement("div");
    informacoes.className = "post-info";

    informacoes.innerHTML =
        '❤️ <span class="contador-likes">0</span> curtidas · 0 comentários';

    // Botões

    const acoes = document.createElement("div");
    acoes.className = "post-acoes";

    const curtir = document.createElement("button");
    curtir.className = "curtir";
    curtir.innerHTML = '<i class="fa-regular fa-heart"></i> Curtir';

    const comentar = document.createElement("button");
    comentar.className = "comentar";
    comentar.innerHTML = '<i class="fa-regular fa-comment"></i> Comentar';

    const compartilhar = document.createElement("button");
    compartilhar.className = "compartilhar";
    compartilhar.innerHTML = '<i class="fa-solid fa-share"></i> Compartilhar';

    acoes.append(curtir, comentar, compartilhar);

    // Área de comentários

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const lista = document.createElement("div");
    lista.className = "lista-comentarios";

    const campo = document.createElement("div");
    campo.className = "campo-comentario";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Comente sobre futebol...";

    const enviar = document.createElement("button");
    enviar.className = "enviar";
    enviar.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';

    campo.append(input, enviar);
    comentarios.append(lista, campo);

    post.append(informacoes, acoes, comentarios);

    // Colocar publicação no início do feed

    document.getElementById("publicacoes").prepend(post);

    // Ativar os recursos do novo post

    ativarPost(post);

    // Limpar campos

    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";

    // Atualizar filtro ativo

    filtrarPosts(filtroAtual);

    alert("Sua publicação entrou no MiniConnect! ⚽");

});


// ==================================
// 6. FILTROS DE PUBLICAÇÕES
// ==================================

let filtroAtual = "todos";

function filtrarPosts(categoria) {

    filtroAtual = categoria;

    document.querySelectorAll(".post").forEach(post => {

        const tipo = post.dataset.categoria;

        if (categoria === "todos" || tipo === categoria) {

            post.classList.remove("escondido");

        } else {

            post.classList.add("escondido");

        }

    });

}

document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelectorAll(".filtro").forEach(item => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        filtrarPosts(botao.dataset.filtro);

    });

});


// ==================================
// 7. SISTEMA DE PESQUISA
// ==================================

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", () => {

    const termo = pesquisa.value.toLowerCase().trim();

    document.querySelectorAll(".post").forEach(post => {

        const conteudo = post.textContent.toLowerCase();

        const categoria = post.dataset.categoria;

        const correspondeFiltro =
            filtroAtual === "todos" || categoria === filtroAtual;

        const correspondePesquisa = conteudo.includes(termo);

        post.classList.toggle(
            "escondido",
            !(correspondeFiltro && correspondePesquisa)
        );

    });

});


// ==================================
// 8. SEGUIR USUÁRIOS
// ==================================

document.querySelectorAll(".seguir").forEach(botao => {

    botao.addEventListener("click", () => {

        const seguindo = botao.classList.toggle("seguindo");

        botao.textContent = seguindo ? "✓" : "+";

        botao.title = seguindo ? "Deixar de seguir" : "Seguir";

    });

});


// ==================================
// 9. ANIMAÇÃO DOS POSTS
// ==================================

const observador = new IntersectionObserver(entradas => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visivel");

            observador.unobserve(entrada.target);

        }

    });

}, {
    threshold: 0.08
});

const estilo = document.createElement("style");

estilo.textContent = `
    .post {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity .5s ease, transform .5s ease;
    }

    .post.visivel {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(estilo);

function observarPosts() {

    document.querySelectorAll(".post:not(.visivel)").forEach(post => {
        observador.observe(post);
    });

}

observarPosts();


// Observar novas publicações

const publicacoes = document.getElementById("publicacoes");

new MutationObserver(() => {

    observarPosts();

}).observe(publicacoes, {
    childList: true
});


console.log("⚽ MiniConnect Football Edition iniciado!");
