
// CURTIR PUBLICAÇÃO
function curtir(botao) {

    const post = botao.closest(".post");
    const icone = botao.querySelector("i");
    const contador = post.querySelector(".curtidas");

    let quantidade = Number(
        contador.dataset.total ||
        contador.textContent.replace(/\D/g, "")
    );

    if (botao.classList.contains("liked")) {

        quantidade--;
        botao.classList.remove("liked");

        icone.classList.remove("fa-solid");
        icone.classList.add("fa-regular");

    } else {

        quantidade++;
        botao.classList.add("liked");

        icone.classList.remove("fa-regular");
        icone.classList.add("fa-solid");

    }

    contador.dataset.total = quantidade;
    contador.textContent = quantidade.toLocaleString("pt-BR")
        + " curtidas";
}

// COMENTAR
function comentar() {

    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim()) {
        alert("Comentário enviado: " + comentario);
    }

}

// COMPARTILHAR
function compartilhar() {

    if (navigator.share) {

        navigator.share({
            title: "Instagram Clone",
            text: "Confira esta publicação!"
        }).catch(() => {});

    } else {

        alert("Publicação compartilhada!");

    }

}

// SALVAR PUBLICAÇÃO
function salvar(botao) {

    const icone = botao.querySelector("i");

    icone.classList.toggle("fa-regular");
    icone.classList.toggle("fa-solid");

    alert("Publicação atualizada!");

}

// ABRIR FORMULÁRIO
function mostrarFormulario(event) {

    if (event) {
        event.preventDefault();
    }

    const formulario = document.getElementById("formulario");

    formulario.classList.toggle("hidden");

    if (!formulario.classList.contains("hidden")) {
        formulario.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

}

// CRIAR PUBLICAÇÃO
function publicar() {

    const legenda = document
        .getElementById("legenda")
        .value.trim();

    const imagem = document
        .getElementById("imagem")
        .value.trim();

    if (!legenda) {
        alert("Digite uma legenda!");
        return;
    }

    let imagemSegura = "";

    if (imagem) {
        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }

            imagemSegura = url.href;

        } catch {
            alert("Informe uma URL de imagem válida!");
            return;
        }
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className =
        "flex items-center justify-between p-3";

    const usuario = document.createElement("div");
    usuario.className = "flex items-center gap-3";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.className = "avatar";

    const informacoes = document.createElement("div");

    const nome = document.createElement("h3");
    nome.className = "font-bold text-sm";
    nome.textContent = "seu_perfil";

    const horario = document.createElement("p");
    horario.className = "text-xs text-gray-500";
    horario.textContent = "Agora";

    informacoes.append(nome, horario);
    usuario.append(avatar, informacoes);
    cabecalho.append(usuario);

    const conteudo = document.createElement("div");
    conteudo.className = "p-3";

    const texto = document.createElement("p");
    texto.className = "text-sm";
    texto.textContent = legenda;

    const imagemPost = document.createElement("img");

    if (imagemSegura) {
        imagemPost.src = imagemSegura;
        imagemPost.alt = "Imagem da publicação";
        imagemPost.className = "post-image";
    }

    const acoes = document.createElement("div");
    acoes.className =
        "flex justify-between text-2xl mb-3 mt-3";

    const grupo = document.createElement("div");
    grupo.className = "flex gap-4";

    const curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    curtirBtn.onclick = function () {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.innerHTML =
        '<i class="fa-regular fa-comment"></i>';
    comentarBtn.onclick = comentar;

    const compartilharBtn = document.createElement("button");
    compartilharBtn.innerHTML =
        '<i class="fa-regular fa-paper-plane"></i>';
    compartilharBtn.onclick = compartilhar;

    const salvarBtn = document.createElement("button");
    salvarBtn.innerHTML =
        '<i class="fa-regular fa-bookmark"></i>';
    salvarBtn.onclick = function () {
        salvar(this);
    };

    grupo.append(curtirBtn, comentarBtn, compartilharBtn);
    acoes.append(grupo, salvarBtn);

    const curtidas = document.createElement("p");
    curtidas.className = "text-sm font-bold curtidas";
    curtidas.dataset.total = "0";
    curtidas.textContent = "0 curtidas";

    conteudo.append(acoes, curtidas, texto);

    post.append(cabecalho);

    if (imagemSegura) {
        post.append(imagemPost);
    }

    post.append(conteudo);

    feed.prepend(post);

    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";

    document.getElementById("formulario")
        .classList.add("hidden");

    alert("Publicação criada com sucesso!");
}
