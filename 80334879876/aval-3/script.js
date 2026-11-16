
function publicarPost() {
    const texto = document.getElementById("textoPost").value.trim();
    const imagem = document.getElementById("imagemPost").value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post card";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const usuario = document.createElement("div");
    usuario.className = "user";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "K";

    const informacoes = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Meu Perfil";

    const data = document.createElement("span");
    data.textContent = "Agora";

    informacoes.append(nome, data);
    usuario.append(avatar, informacoes);
    cabecalho.appendChild(usuario);

    const mensagem = document.createElement("p");
    mensagem.className = "post-text";
    mensagem.textContent = texto;

    post.append(cabecalho, mensagem);

    if (imagem !== "") {
        try {
            const endereco = new URL(imagem);

            if (endereco.protocol !== "https:" &&
                endereco.protocol !== "http:") {
                throw new Error("Endereço inválido");
            }

            const foto = document.createElement("img");
            foto.className = "post-image";
            foto.src = endereco.href;
            foto.alt = "Imagem da publicação";

            foto.onerror = function() {
                foto.remove();
                alert("Não foi possível carregar essa imagem.");
            };

            post.appendChild(foto);
        } catch {
            alert("Digite um link de imagem válido.");
            return;
        }
    }

    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const curtir = document.createElement("button");
    curtir.innerHTML = "♥ Curtir <span>0</span>";
    curtir.onclick = function() {
        curtirPost(curtir);
    };

    const comentar = document.createElement("button");
    comentar.textContent = "💬 Comentar";
    comentar.onclick = function() {
        mostrarComentario(comentar);
    };

    acoes.append(curtir, comentar);

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(acoes, comentarios);

    document.getElementById("listaPosts").prepend(post);

    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";

    alert("Publicação realizada com sucesso!");
}

function curtirPost(botao) {
    const contador = botao.querySelector("span");
    let quantidade = Number(contador.textContent);

    if (botao.classList.contains("curtiu")) {
        quantidade--;
        botao.classList.remove("curtiu");
    } else {
        quantidade++;
        botao.classList.add("curtiu");
    }

    contador.textContent = quantidade;
}

function mostrarComentario(botao) {
    const post = botao.closest(".post");
    const area = post.querySelector(".comentarios");

    if (area.querySelector(".comentario-input")) {
        return;
    }

    const formulario = document.createElement("div");
    formulario.className = "comentario-input";

    const campo = document.createElement("input");
    campo.type = "text";
    campo.placeholder = "Escreva um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Enviar";

    enviar.onclick = function() {
        const texto = campo.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        const comentario = document.createElement("div");
        comentario.className = "comentario";
        comentario.textContent = "Você: " + texto;

        area.insertBefore(comentario, formulario);
        campo.value = "";
    };

    formulario.append(campo, enviar);
    area.appendChild(formulario);
}
