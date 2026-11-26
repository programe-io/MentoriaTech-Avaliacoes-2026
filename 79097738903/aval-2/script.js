let posts = [];

function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const arquivo = document.getElementById("imagem").files[0];

    if (nome === "" || mensagem === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    if (arquivo && !arquivo.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem válido!");
        return;
    }

    const leitor = new FileReader();

    function salvarPost(imagem = null) {
        const novoPost = {
            id: Date.now(),
            nome: nome,
            mensagem: mensagem,
            imagem: imagem,
            data: new Date().toLocaleString("pt-BR"),
            curtidas: 0,
            comentarios: []
        };

        posts.unshift(novoPost);

        document.getElementById("nome").value = "";
        document.getElementById("mensagem").value = "";
        document.getElementById("imagem").value = "";

        mostrarPosts();
    }

    if (arquivo) {
        leitor.onload = function() {
            salvarPost(leitor.result);
        };

        leitor.onerror = function() {
            alert("Não foi possível carregar a imagem!");
        };

        leitor.readAsDataURL(arquivo);
    } else {
        salvarPost();
    }
}

function mostrarPosts() {
    const lista = document.getElementById("lista-posts");

    lista.innerHTML = "";

    posts.forEach(post => {
        const artigo = document.createElement("article");
        artigo.className = "post";

        const titulo = document.createElement("h3");
        titulo.textContent = post.nome;

        const data = document.createElement("p");
        data.className = "data";
        data.textContent = post.data;

        const texto = document.createElement("p");
        texto.className = "post-text";
        texto.textContent = post.mensagem;

        artigo.append(titulo, data, texto);

        // MOSTRAR A IMAGEM NA PUBLICAÇÃO
        if (post.imagem) {
            const imagem = document.createElement("img");

            imagem.src = post.imagem;
            imagem.alt = "Imagem da publicação";
            imagem.className = "post-imagem";

            artigo.appendChild(imagem);
        }

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const curtir = document.createElement("button");
        curtir.textContent = `Curtir (${post.curtidas})`;
        curtir.onclick = () => curtirPost(post.id);

        const comentar = document.createElement("button");
        comentar.textContent = "Comentar";
        comentar.onclick = () => {
            document.getElementById(
                `comentario-${post.id}`
            ).focus();
        };

        acoes.append(curtir, comentar);

        const comentarios = document.createElement("div");
        comentarios.className = "comentarios";

        post.comentarios.forEach(comentario => {
            const item = document.createElement("div");
            item.className = "comentario";
            item.textContent = comentario;
            comentarios.appendChild(item);
        });

        const campo = document.createElement("div");
        campo.className = "campo-comentario";

        const input = document.createElement("input");
        input.type = "text";
        input.id = `comentario-${post.id}`;
        input.placeholder = "Escreva um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Enviar";
        enviar.onclick = () => adicionarComentario(post.id);

        campo.append(input, enviar);

        artigo.append(
            acoes,
            comentarios,
            campo
        );

        lista.appendChild(artigo);
    });
}

function curtirPost(id) {
    const post = posts.find(p => p.id === id);

    if (post) {
        post.curtidas++;
        mostrarPosts();
    }
}

function adicionarComentario(id) {
    const post = posts.find(p => p.id === id);

    if (!post) return;

    const campo = document.getElementById(`comentario-${id}`);
    const comentario = campo.value.trim();

    if (comentario === "") {
        alert("Digite um comentário!");
        return;
    }

    post.comentarios.push(comentario);

    mostrarPosts();
}