
function publicarPost() {
    const texto = document.getElementById("textoPost");
    const imagem = document.getElementById("imagemPost");
    const listaPosts = document.getElementById("listaPosts");

    if (texto.value.trim() === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const perfil = document.createElement("div");
    perfil.className = "post-perfil";

    const foto = document.createElement("img");
    foto.src = "https://i.pravatar.cc/100?img=12";
    foto.alt = "Foto do usuário";

    const dados = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Você";

    const horario = document.createElement("small");
    horario.textContent = "Agora";

    dados.append(nome, horario);
    perfil.append(foto, dados);

    const mensagem = document.createElement("p");
    mensagem.textContent = texto.value;

    post.append(perfil, mensagem);

    if (imagem.value.trim() !== "") {
        try {
            const url = new URL(imagem.value);

            if (url.protocol !== "https:" && url.protocol !== "http:") {
                throw new Error("URL inválida");
            }

            const img = document.createElement("img");
            img.className = "imagem-post";
            img.src = url.href;
            img.alt = "Imagem da publicação";
            img.onerror = () => img.remove();

            post.appendChild(img);
        } catch {
            alert("Digite uma URL de imagem válida.");
            return;
        }
    }

    const acoes = document.createElement("div");
    acoes.className = "botoes-post";

    const curtirBtn = document.createElement("button");
    curtirBtn.textContent = "♡ Curtir";
    curtirBtn.onclick = function () {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";
    comentarBtn.onclick = comentar;

    const compartilharBtn = document.createElement("button");
    compartilharBtn.textContent = "↗ Compartilhar";
    compartilharBtn.onclick = compartilhar;

    acoes.append(curtirBtn, comentarBtn, compartilharBtn);
    post.appendChild(acoes);

    listaPosts.prepend(post);

    texto.value = "";
    imagem.value = "";
}

function curtir(botao) {
    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        botao.textContent = "♡ Curtir";
    } else {
        botao.classList.add("curtido");
        botao.textContent = "♥ Curtido";
    }
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário enviado: " + comentario);
    }
}

function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "MiniFeed",
            text: "Confira esta publicação no MiniFeed!"
        }).catch(() => {});
    } else {
        alert("Compartilhe esta publicação com seus amigos!");
    }
}
