
/* TROCAR ENTRE OS DOIS MENUS */

const botoesMenu = document.querySelectorAll(".menu-btn");
const telas = document.querySelectorAll(".tela");

botoesMenu.forEach(botao => {
    botao.addEventListener("click", () => {

        botoesMenu.forEach(b => b.classList.remove("ativo"));
        telas.forEach(tela => tela.classList.remove("ativa"));

        botao.classList.add("ativo");

        const telaSelecionada = document.getElementById(
            botao.dataset.tela
        );

        telaSelecionada.classList.add("ativa");
    });
});


/* SISTEMA DE CURTIDAS */

document.addEventListener("click", function(event) {

    if (event.target.closest(".like")) {

        const botao = event.target.closest(".like");
        const contador = botao.querySelector("span");

        let numero = Number(contador.textContent);

        if (botao.classList.contains("ativo")) {
            numero--;
            botao.classList.remove("ativo");
        } else {
            numero++;
            botao.classList.add("ativo");
        }

        contador.textContent = numero;
    }

});


/* SISTEMA DE COMENTÁRIOS */

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("comentar")) {

        const area = event.target.closest(".comentarios");
        const input = area.querySelector("input");
        const lista = area.querySelector(".lista-comentarios");

        const texto = input.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        const comentario = document.createElement("div");
        comentario.className = "comentario-item";

        const mensagem = document.createElement("p");
        mensagem.textContent = "👤 Você: " + texto;

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";

        excluir.addEventListener("click", () => {
            comentario.remove();
        });

        comentario.appendChild(mensagem);
        comentario.appendChild(excluir);

        lista.appendChild(comentario);

        input.value = "";
    }

});


/* CRIAR PUBLICAÇÕES NO MEU FEED */

const publicar = document.getElementById("publicar");

publicar.addEventListener("click", function() {

    const nome = document.getElementById("nome").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    const imagem = document.getElementById("imagem").value.trim();
    const video = document.getElementById("video").value.trim();

    const feed = document.getElementById("feed-pessoal");

    if (!nome || !titulo || !legenda) {
        alert("Preencha seu nome, título e legenda!");
        return;
    }

    if (imagem && video) {
        alert("Escolha uma imagem OU um vídeo por publicação.");
        return;
    }

    if (imagem && !validarUrl(imagem)) {
        alert("Digite um link válido para a imagem!");
        return;
    }

    if (video && !validarUrl(video)) {
        alert("Digite um link válido para o vídeo!");
        return;
    }

    if (video && !/\.(mp4|webm|ogg)(\?.*)?$/i.test(video)) {
        alert("Use um link direto de vídeo MP4, WebM ou OGG.");
        return;
    }

    // Remove a mensagem de feed vazio
    const vazio = feed.querySelector(".vazio");

    if (vazio) {
        vazio.remove();
    }

    // Criar publicação
    const post = document.createElement("article");
    post.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = "🎮";

    const dados = document.createElement("div");

    const nomeUsuario = document.createElement("h3");
    nomeUsuario.textContent = nome;

    const data = document.createElement("small");
    data.textContent = "Agora mesmo";

    dados.append(nomeUsuario, data);
    usuario.append(avatar, dados);

    const conteudo = document.createElement("div");
    conteudo.className = "conteudo-post";

    // Adicionar imagem ou vídeo
    if (imagem) {
        const img = document.createElement("img");
        img.className = "imagem-post";
        img.src = imagem;
        img.alt = "Imagem da publicação";
        img.onerror = () => {
            img.replaceWith(document.createTextNode("Não foi possível carregar a imagem."));
        };
        post.appendChild(usuario);
        post.appendChild(img);

    } else if (video) {
        const player = document.createElement("video");
        player.className = "video-post";
        player.controls = true;

        const fonte = document.createElement("source");
        fonte.src = video;
        fonte.type = video.match(/\.webm/i) ? "video/webm" :
                     video.match(/\.ogg/i) ? "video/ogg" : "video/mp4";

        player.appendChild(fonte);
        post.appendChild(usuario);
        post.appendChild(player);

    } else {
        post.appendChild(usuario);
    }

    // Título e legenda
    const tituloPost = document.createElement("h3");
    tituloPost.textContent = titulo;

    const textoPost = document.createElement("p");
    textoPost.textContent = legenda;

    // Curtidas
    const like = document.createElement("button");
    like.className = "like";
    like.innerHTML = '❤️ Curtir <span>0</span>';

    // Comentários
    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const lista = document.createElement("div");
    lista.className = "lista-comentarios";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Escreva um comentário...";

    const botaoComentar = document.createElement("button");
    botaoComentar.className = "comentar";
    botaoComentar.textContent = "Enviar";

    comentarios.append(lista, input, botaoComentar);

    // Botão excluir publicação
    const excluirPost = document.createElement("button");
    excluirPost.textContent = "🗑️ Excluir publicação";
    excluirPost.style.background = "#a72c4a";
    excluirPost.style.marginTop = "15px";

    excluirPost.addEventListener("click", () => {
        if (confirm("Deseja excluir esta publicação?")) {
            post.remove();
        }
    });

    conteudo.append(
        tituloPost,
        textoPost,
        like,
        comentarios,
        excluirPost
    );

    post.appendChild(conteudo);

    // Adiciona no início do feed
    feed.prepend(post);

    // Limpar formulário
    document.getElementById("titulo").value = "";
    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("video").value = "";

    alert("Sua publicação foi criada com sucesso! 🎮");

});


/* VALIDAR LINKS */

function validarUrl(url) {
    try {
        const endereco = new URL(url);
        return endereco.protocol === "https:" || endereco.protocol === "http:";
    } catch {
        return false;
    }
}
