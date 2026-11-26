
// Curtir publicação
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".likes span");

    let curtidas = Number(contador.textContent);

    if (botao.textContent === "♡") {
        curtidas++;
        botao.textContent = "❤️";
    } else {
        curtidas--;
        botao.textContent = "♡";
    }

    contador.textContent = curtidas;
}

// Comentar publicação
function comentar(botao) {
    const comentario = prompt("Escreva seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const post = botao.closest(".post");

        const novoComentario = document.createElement("p");
        novoComentario.innerHTML =
            "<strong>Você:</strong> " +
            comentario.replace(/[&<>"']/g, letra => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[letra]);

        post.querySelector(".post-content").appendChild(novoComentario);
    }
}

// Compartilhar publicação
function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "TravelFeed",
            text: "Confira esta viagem incrível!"
        });
    } else {
        alert("Compartilhe o TravelFeed com seus amigos!");
    }
}

// Abrir formulário
function abrirFormulario() {
    document.getElementById("modal").style.display = "flex";
}

// Fechar formulário
function fecharFormulario() {
    document.getElementById("modal").style.display = "none";
}

// Criar publicação
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const local = document.getElementById("local").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!nome || !local || !imagem || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const url = new URL(imagem);
        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }
    } catch {
        alert("Digite uma URL de imagem válida!");
        return;
    }

    const feed = document.querySelector(".feed");

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=68";
    avatar.alt = "Foto do usuário";

    const dados = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const endereco = document.createElement("span");
    endereco.textContent = "📍 " + local;

    dados.append(titulo, endereco);
    cabecalho.append(avatar, dados);

    const foto = document.createElement("img");
    foto.className = "post-image";
    foto.src = imagem;
    foto.alt = "Foto da viagem";

    const conteudo = document.createElement("div");
    conteudo.className = "post-content";

    const acoes = document.createElement("div");
    acoes.className = "actions";

    const curtirBtn = document.createElement("button");
    curtirBtn.textContent = "♡";
    curtirBtn.addEventListener("click", () => curtir(curtirBtn));

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬";
    comentarBtn.addEventListener("click", () => comentar(comentarBtn));

    const compartilharBtn = document.createElement("button");
    compartilharBtn.textContent = "↗";
    compartilharBtn.addEventListener("click", compartilhar);

    acoes.append(curtirBtn, comentarBtn, compartilharBtn);

    const curtidas = document.createElement("p");
    curtidas.className = "likes";
    curtidas.textContent = "❤️ ";

    const contador = document.createElement("span");
    contador.textContent = "0";
    curtidas.append(contador, " curtidas");

    const texto = document.createElement("p");
    const autor = document.createElement("strong");
    autor.textContent = nome;
    texto.append(autor, " " + descricao);

    const data = document.createElement("span");
    data.className = "date";
    data.textContent = "Agora";

    conteudo.append(acoes, curtidas, texto, data);
    post.append(cabecalho, foto, conteudo);

    feed.prepend(post);

    fecharFormulario();

    document.getElementById("nome").value = "";
    document.getElementById("local").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("descricao").value = "";

    alert("Publicação criada com sucesso!");
}
