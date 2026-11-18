
// CURTIR PUBLICAÇÃO
document.querySelectorAll(".like").forEach(botao => {

    botao.addEventListener("click", () => {

        botao.classList.toggle("liked");

        const curtidas = botao
            .closest(".post")
            .querySelector(".likes");

        let numero = parseInt(curtidas.textContent.replace(/\D/g, ""));

        if (botao.classList.contains("liked")) {
            numero++;
            botao.classList.remove("fa-regular");
            botao.classList.add("fa-solid");
        } else {
            numero--;
            botao.classList.remove("fa-solid");
            botao.classList.add("fa-regular");
        }

        curtidas.textContent = numero.toLocaleString("pt-BR") + " curtidas";
    });

});

// SALVAR PUBLICAÇÃO
document.querySelectorAll(".bookmark").forEach(botao => {

    botao.addEventListener("click", () => {

        botao.classList.toggle("saved");

        botao.classList.toggle("fa-regular");
        botao.classList.toggle("fa-solid");

    });

});

// COMENTÁRIOS
document.querySelectorAll(".send-comment").forEach(botao => {

    botao.addEventListener("click", () => {

        const post = botao.closest(".post");
        const input = post.querySelector("input");
        const texto = input.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        const comentario = document.createElement("p");

        const usuario = document.createElement("strong");
        usuario.textContent = "seu_usuario ";

        comentario.append(usuario, document.createTextNode(texto));

        const info = post.querySelector(".post-info");
        info.insertBefore(comentario, info.querySelector(".date"));

        input.value = "";

    });

});

// ABRIR MODAL
const modal = document.getElementById("modal");

document.getElementById("criar").addEventListener("click", evento => {
    evento.preventDefault();
    modal.style.display = "flex";
});

// FECHAR MODAL
document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", evento => {
    if (evento.target === modal) {
        modal.style.display = "none";
    }
});

// CRIAR PUBLICAÇÃO
document.getElementById("publicar").addEventListener("click", () => {

    const imagem = document.getElementById("imagemUrl").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!imagem) {
        alert("Insira o endereço de uma imagem!");
        return;
    }

    try {
        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        const post = document.createElement("article");
        post.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const usuario = document.createElement("div");
        usuario.className = "user";

        const avatar = document.createElement("img");
        avatar.src = "https://i.pravatar.cc/150?img=12";

        const nome = document.createElement("strong");
        nome.textContent = "seu_usuario";

        usuario.append(avatar, nome);
        header.append(usuario);

        const foto = document.createElement("img");
        foto.className = "post-image";
        foto.src = url.href;
        foto.alt = "Publicação de seu_usuario";

        foto.onerror = () => {
            alert("Não foi possível carregar essa imagem.");
            post.remove();
        };

        const info = document.createElement("div");
        info.className = "post-info";

        const legendaTexto = document.createElement("p");
        const nomeLegenda = document.createElement("strong");
        nomeLegenda.textContent = "seu_usuario ";

        legendaTexto.append(nomeLegenda, document.createTextNode(legenda));

        info.append(legendaTexto);

        post.append(header, foto, info);

        document.getElementById("feed").prepend(post);

        document.getElementById("imagemUrl").value = "";
        document.getElementById("legenda").value = "";

        modal.style.display = "none";

    } catch {
        alert("Digite uma URL válida de imagem.");
    }

});
