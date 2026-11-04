
let posts = JSON.parse(
    localStorage.getItem("posts")
) || [];

function salvar() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function publicar() {
    const titulo = document.getElementById("titulo").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const conteudo = document.getElementById("conteudo").value.trim();

    if (!titulo || !conteudo) {
        alert("Preencha o título e o conteúdo!");
        return;
    }

    posts.unshift({
        id: Date.now(),
        titulo,
        imagem,
        conteudo,
        data: new Date().toLocaleDateString("pt-BR")
    });

    salvar();
    mostrarPosts();

    document.getElementById("titulo").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("conteudo").value = "";
}

function mostrarPosts() {
    const lista = document.getElementById("lista-posts");

    lista.innerHTML = "";

    if (posts.length === 0) {
        lista.textContent = "Nenhuma publicação ainda.";
        return;
    }

    posts.forEach(post => {
        const artigo = document.createElement("article");
        artigo.className = "post";

        const titulo = document.createElement("h3");
        titulo.textContent = post.titulo;

        const data = document.createElement("div");
        data.className = "data";
        data.textContent = post.data;

        artigo.appendChild(titulo);
        artigo.appendChild(data);

        if (post.imagem) {
            const img = document.createElement("img");

            img.src = post.imagem;
            img.alt = post.titulo;
            img.onerror = () => img.remove();

            artigo.appendChild(img);
        }

        const texto = document.createElement("p");
        texto.textContent = post.conteudo;

        artigo.appendChild(texto);

        const botao = document.createElement("button");
        botao.className = "excluir";
        botao.textContent = "Excluir";

        botao.onclick = () => {
            posts = posts.filter(p => p.id !== post.id);
            salvar();
            mostrarPosts();
        };

        artigo.appendChild(botao);
        lista.appendChild(artigo);
    });
}

mostrarPosts();
