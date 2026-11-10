
// Selecionando elementos
const formulario = document.getElementById("formPublicacao");
const textoPublicacao = document.getElementById("textoPublicacao");
const imagemPublicacao = document.getElementById("imagemPublicacao");
const listaPublicacoes = document.getElementById("listaPublicacoes");

// Função para criar uma publicação
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const texto = textoPublicacao.value.trim();
    const imagem = imagemPublicacao.value.trim();

    if (texto === "") {
        alert("Digite algo para publicar!");
        return;
    }

    let imagemValida = "";

    if (imagem !== "") {
        try {
            const url = new URL(imagem);

            if (url.protocol !== "https:" && url.protocol !== "http:") {
                alert("Informe um link de imagem válido.");
                return;
            }

            imagemValida = imagem;
        } catch {
            alert("Informe um endereço de imagem válido.");
            return;
        }
    }

    // Criando o cartão da publicação
    const post = document.createElement("article");
    post.className = "post";

    // Usuário
    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "V";

    const dados = document.createElement("div");

    const nome = document.createElement("h3");
    nome.textContent = "Você";

    const horario = document.createElement("small");
    horario.textContent = "Agora mesmo";

    dados.append(nome, horario);
    usuario.append(avatar, dados);

    // Texto
    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    post.append(usuario, paragrafo);

    // Imagem opcional
    if (imagemValida) {
        const img = document.createElement("img");
        img.className = "imagem-post";
        img.src = imagemValida;
        img.alt = "Imagem da publicação";
        post.appendChild(img);
    }

    // Botões
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtir = document.createElement("button");
    curtir.className = "curtir";
    curtir.textContent = "❤️ Curtir ";

    const contador = document.createElement("span");
    contador.textContent = "0";
    curtir.appendChild(contador);

    const comentar = document.createElement("button");
    comentar.className = "comentar";
    comentar.textContent = "💬 Comentar";

    acoes.append(curtir, comentar);

    // Área de comentários
    const areaComentarios = document.createElement("div");
    areaComentarios.className = "area-comentarios";

    post.append(acoes, areaComentarios);

    // Adiciona no início do feed
    listaPublicacoes.prepend(post);

    // Limpa os campos
    formulario.reset();

    alert("Publicação realizada com sucesso!");
});

// Curtir publicações
document.addEventListener("click", function(event) {
    if (event.target.closest(".curtir")) {
        const botao = event.target.closest(".curtir");
        const contador = botao.querySelector("span");

        let quantidade = Number(contador.textContent);

        if (botao.classList.contains("ativo")) {
            quantidade--;
            botao.classList.remove("ativo");
        } else {
            quantidade++;
            botao.classList.add("ativo");
        }

        contador.textContent = quantidade;
    }
});

// Comentar publicações
document.addEventListener("click", function(event) {
    if (event.target.closest(".comentar")) {
        const botao = event.target.closest(".comentar");
        const post = botao.closest(".post");
        const area = post.querySelector(".area-comentarios");

        // Evita criar vários formulários
        if (area.querySelector(".form-comentario")) {
            return;
        }

        const formularioComentario = document.createElement("form");
        formularioComentario.className = "form-comentario";

        const campo = document.createElement("input");
        campo.type = "text";
        campo.placeholder = "Escreva um comentário...";
        campo.required = true;

        const enviar = document.createElement("button");
        enviar.type = "submit";
        enviar.textContent = "Enviar";

        formularioComentario.append(campo, enviar);
        area.appendChild(formularioComentario);

        campo.focus();

        formularioComentario.addEventListener("submit", function(e) {
            e.preventDefault();

            const texto = campo.value.trim();

            if (texto === "") {
                return;
            }

            const comentario = document.createElement("div");
            comentario.className = "comentario";

            const conteudo = document.createElement("p");
            conteudo.textContent = "Você: " + texto;

            comentario.appendChild(conteudo);

            area.insertBefore(comentario, formularioComentario);

            campo.value = "";
            campo.focus();
        });
    }
});
