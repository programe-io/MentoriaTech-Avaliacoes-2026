
// Lista de publicações
let publicacoes = JSON.parse(
    localStorage.getItem("publicacoes")
) || [];

// Salvar publicações
function salvarPublicacoes() {
    localStorage.setItem(
        "publicacoes",
        JSON.stringify(publicacoes)
    );
}

// Criar publicação
function criarPost() {
    const texto = document.getElementById("textoPost").value.trim();
    const imagem = document.getElementById("imagemPost").value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const novaPublicacao = {
        id: Date.now(),
        nome: "Maria Silva",
        texto: texto,
        imagem: imagem,
        curtidas: 0,
        comentarios: []
    };

    publicacoes.unshift(novaPublicacao);

    salvarPublicacoes();
    mostrarFeed();

    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";

    alert("Publicação realizada com sucesso!");
}

// Exibir publicações
function mostrarFeed() {
    const feed = document.getElementById("feed");

    feed.innerHTML = "";

    publicacoes.forEach((post) => {
        const postagem = document.createElement("div");

        postagem.className = "postagem";

        postagem.innerHTML = `
            <h3>${post.nome}</h3>
            <p></p>

            ${post.imagem ? `<img src="${post.imagem}" alt="Imagem da publicação" class="imagem-post">` : ""}

            <div class="acoes">
                <button onclick="curtirPost(${post.id})">
                    ❤️ Curtir (${post.curtidas})
                </button>

                <button onclick="comentarPost(${post.id})">
                    💬 Comentar
                </button>
            </div>

            <div class="comentarios">
                <h4>Comentários</h4>
                <div class="lista-comentarios"></div>
            </div>
        `;

        postagem.querySelector("p").textContent = post.texto;

        const lista = postagem.querySelector(".lista-comentarios");

        post.comentarios.forEach((comentario) => {
            const item = document.createElement("p");
            item.textContent = "💬 " + comentario;
            lista.appendChild(item);
        });

        feed.appendChild(postagem);
    });
}

// Curtir publicação
function curtirPost(id) {
    const post = publicacoes.find(p => p.id === id);

    if (post) {
        post.curtidas++;

        salvarPublicacoes();
        mostrarFeed();
    }
}

// Comentar publicação
function comentarPost(id) {
    const mensagem = prompt("Digite seu comentário:");

    if (!mensagem || mensagem.trim() === "") {
        return;
    }

    const post = publicacoes.find(p => p.id === id);

    if (post) {
        post.comentarios.push(mensagem.trim());

        salvarPublicacoes();
        mostrarFeed();
    }
}

// Excluir publicação
function excluirPost(id) {
    const confirmar = confirm(
        "Deseja excluir esta publicação?"
    );

    if (confirmar) {
        publicacoes = publicacoes.filter(
            post => post.id !== id
        );

        salvarPublicacoes();
        mostrarFeed();
    }
}

// Iniciar o feed
mostrarFeed();
