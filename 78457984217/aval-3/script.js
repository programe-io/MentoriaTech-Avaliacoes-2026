let publicacoes = [];

function publicar() {
    const usuario = document.getElementById("usuario").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (!usuario || !texto) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    publicacoes.unshift({
        usuario,
        texto,
        curtidas: 0,
        comentarios: []
    });

    document.getElementById("usuario").value = "";
    document.getElementById("texto").value = "";

    atualizarFeed();
}

function curtir(indice) {
    publicacoes[indice].curtidas++;
    atualizarFeed();
}

function comentar(indice) {
    const campo = document.getElementById("comentario-" + indice);
    const texto = campo.value.trim();

    if (!texto) return;

    publicacoes[indice].comentarios.push(texto);

    atualizarFeed();
}

function atualizarFeed() {
    const feed = document.getElementById("publicacoes");

    feed.innerHTML = "";

    publicacoes.forEach((post, indice) => {
        const card = document.createElement("article");
        card.className = "publicacao";

        const titulo = document.createElement("h3");
        titulo.textContent = "👤 " + post.usuario;

        const texto = document.createElement("p");
        texto.textContent = post.texto;

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoCurtir = document.createElement("button");
        botaoCurtir.textContent = "❤️ Curtir";
        botaoCurtir.onclick = () => curtir(indice);

        const contador = document.createElement("span");
        contador.textContent = post.curtidas + " curtidas";

        acoes.append(botaoCurtir, contador);

        const comentarios = document.createElement("div");
        comentarios.className = "comentarios";

        post.comentarios.forEach(comentario => {
            const item = document.createElement("div");
            item.className = "comentario";
            item.textContent = "💬 " + comentario;
            comentarios.appendChild(item);
        });

        const campo = document.createElement("input");
        campo.id = "comentario-" + indice;
        campo.placeholder = "Escreva um comentário...";

        const botaoComentar = document.createElement("button");
        botaoComentar.textContent = "Comentar";
        botaoComentar.onclick = () => comentar(indice);

        comentarios.append(campo, botaoComentar);

        card.append(titulo, texto, acoes, comentarios);
        feed.appendChild(card);
    });
}