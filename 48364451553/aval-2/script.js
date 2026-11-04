
let posts = [];

function publicar() {

    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !texto) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    // Verifica se a URL da imagem é válida
    let imagemSegura = "";

    if (imagem) {
        try {
            const url = new URL(imagem);

            if (url.protocol === "https:" || url.protocol === "http:") {
                imagemSegura = url.href;
            }
        } catch {
            alert("Digite uma URL de imagem válida!");
            return;
        }

        if (!imagemSegura) {
            alert("Use uma URL HTTP ou HTTPS.");
            return;
        }
    }

    const post = {
        id: Date.now() + Math.random(),
        nome: nome,
        texto: texto,
        imagem: imagemSegura,
        curtidas: 0,
        comentarios: []
    };

    posts.unshift(post);

    mostrarPosts();

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}


// MOSTRAR PUBLICAÇÕES
function mostrarPosts() {

    const feed = document.getElementById("publicacoes");

    feed.innerHTML = "";

    posts.forEach(post => {

        const card = document.createElement("article");
        card.className = "post";

        const usuario = document.createElement("div");
        usuario.className = "usuario";

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = post.nome.charAt(0).toUpperCase();

        const nome = document.createElement("strong");
        nome.textContent = post.nome;

        usuario.append(avatar, nome);

        const texto = document.createElement("p");
        texto.textContent = post.texto;

        card.append(usuario, texto);

        if (post.imagem) {
            const img = document.createElement("img");
            img.src = post.imagem;
            img.alt = "Imagem da publicação";
            img.onerror = () => img.remove();

            card.appendChild(img);
        }

        // BOTÃO DE CURTIR
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const curtir = document.createElement("button");
        curtir.textContent = `❤️ Curtir (${post.curtidas})`;

        curtir.onclick = () => {
            post.curtidas++;
            mostrarPosts();
        };

        acoes.appendChild(curtir);
        card.appendChild(acoes);

        // COMENTÁRIOS
        const comentarios = document.createElement("div");
        comentarios.className = "comentarios";

        const titulo = document.createElement("strong");
        titulo.textContent = "Comentários";

        comentarios.appendChild(titulo);

        post.comentarios.forEach(comentario => {
            const item = document.createElement("div");
            item.className = "comentario";
            item.textContent = comentario;

            comentarios.appendChild(item);
        });

        const campo = document.createElement("input");
        campo.placeholder = "Escreva um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Comentar";

        enviar.onclick = () => {

            const comentario = campo.value.trim();

            if (comentario) {
                post.comentarios.push(comentario);
                mostrarPosts();
            }

        };

        comentarios.append(campo, enviar);
        card.appendChild(comentarios);

        feed.appendChild(card);

    });

}
