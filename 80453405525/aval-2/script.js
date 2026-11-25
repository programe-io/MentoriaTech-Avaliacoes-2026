
// Selecionar elementos
const textoPublicacao = document.getElementById("textoPublicacao");
const imagemPublicacao = document.getElementById("imagemPublicacao");
const botaoPublicar = document.getElementById("botaoPublicar");
const feed = document.getElementById("feed");

// Atualizar ano do rodapé
document.getElementById("ano").textContent =
    new Date().getFullYear();

// Criar uma nova publicação
botaoPublicar.addEventListener("click", function() {

    const texto = textoPublicacao.value.trim();
    const imagem = imagemPublicacao.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    // Criar o artigo
    const post = document.createElement("article");
    post.className = "post";

    // Cabeçalho
    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "F";

    const usuario = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Francisco";

    const data = document.createElement("span");
    data.textContent = "Agora";

    usuario.appendChild(nome);
    usuario.appendChild(data);

    cabecalho.appendChild(avatar);
    cabecalho.appendChild(usuario);

    // Texto da publicação
    const conteudo = document.createElement("div");
    conteudo.className = "post-text";
    conteudo.textContent = texto;

    // Ações
    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const curtir = document.createElement("button");
    curtir.className = "curtir";
    curtir.textContent = "Curtir ";

    const quantidade = document.createElement("span");
    quantidade.textContent = "0";

    curtir.appendChild(quantidade);

    const comentar = document.createElement("button");
    comentar.className = "comentar";
    comentar.textContent = "Comentar";

    acoes.appendChild(curtir);
    acoes.appendChild(comentar);

    // Área de comentários
    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    // Montar publicação
    post.appendChild(cabecalho);
    post.appendChild(conteudo);

    // Adicionar imagem se houver um endereço válido
    if (imagem !== "") {
        try {
            const url = new URL(imagem);

            if (url.protocol === "https:" || url.protocol === "http:") {
                const foto = document.createElement("img");
                foto.className = "post-image";
                foto.src = url.href;
                foto.alt = "Imagem da publicação";
                post.appendChild(foto);
            } else {
                alert("Utilize um endereço de imagem HTTP ou HTTPS.");
                return;
            }

        } catch {
            alert("Digite um endereço de imagem válido.");
            return;
        }
    }

    post.appendChild(acoes);
    post.appendChild(comentarios);

    // Colocar nova publicação no início do feed
    feed.prepend(post);

    // Limpar campos
    textoPublicacao.value = "";
    imagemPublicacao.value = "";

});

// Curtir e comentar usando eventos do feed
feed.addEventListener("click", function(event) {

    const botao = event.target.closest("button");

    if (!botao) return;

    const post = botao.closest(".post");

    if (!post) return;

    // Curtir publicação
    if (botao.classList.contains("curtir")) {

        const quantidade = botao.querySelector("span");

        quantidade.textContent =
            Number(quantidade.textContent) + 1;

    }

    // Abrir campo de comentário
    if (botao.classList.contains("comentar")) {

        const area = post.querySelector(".comentarios");

        // Evitar criar vários campos ao mesmo tempo
        if (area.querySelector(".comentario-form")) return;

        const formulario = document.createElement("div");
        formulario.className = "comentario-form";

        const campo = document.createElement("input");
        campo.type = "text";
        campo.placeholder = "Escreva um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Enviar";

        enviar.addEventListener("click", function() {

            const texto = campo.value.trim();

            if (texto === "") {
                alert("Digite um comentário!");
                return;
            }

            const comentario = document.createElement("p");
            comentario.textContent = "Visitante: " + texto;

            area.insertBefore(comentario, formulario);

            formulario.remove();

        });

        formulario.appendChild(campo);
        formulario.appendChild(enviar);

        area.appendChild(formulario);

        campo.focus();

    }

});
