
let posts = [];

try {
    posts = JSON.parse(localStorage.getItem("meuBlogPosts")) || [];
} catch (erro) {
    posts = [];
}

if (posts.length === 0) {
    posts = [
        {
            id: 1,
            titulo: "A importância da tecnologia na educação",
            conteudo: "A tecnologia facilita o acesso ao conhecimento e transforma a maneira como aprendemos.",
            data: new Date().toLocaleDateString("pt-BR"),
            curtidas: 0
        },
        {
            id: 2,
            titulo: "Por que aprender programação?",
            conteudo: "Aprender programação desenvolve o raciocínio lógico, a criatividade e a capacidade de resolver problemas.",
            data: new Date().toLocaleDateString("pt-BR"),
            curtidas: 0
        }
    ];
}

function salvarPosts() {
    try {
        localStorage.setItem("meuBlogPosts", JSON.stringify(posts));
    } catch (erro) {
        console.log("Não foi possível salvar no navegador.");
    }
}

function adicionarPost() {
    const titulo = document.getElementById("titulo").value.trim();
    const conteudo = document.getElementById("conteudo").value.trim();

    if (titulo === "" || conteudo === "") {
        alert("Preencha o título e o conteúdo!");
        return;
    }

    const novoPost = {
        id: Date.now(),
        titulo: titulo,
        conteudo: conteudo,
        data: new Date().toLocaleDateString("pt-BR"),
        curtidas: 0
    };

    posts.unshift(novoPost);

    salvarPosts();
    mostrarPosts();

    document.getElementById("titulo").value = "";
    document.getElementById("conteudo").value = "";

    alert("Publicação adicionada com sucesso!");
}

function curtirPost(id) {
    const post = posts.find(item => item.id === id);

    if (post) {
        post.curtidas++;
        salvarPosts();
        mostrarPosts();
    }
}

function excluirPost(id) {
    if (confirm("Deseja excluir esta publicação?")) {
        posts = posts.filter(item => item.id !== id);

        salvarPosts();
        mostrarPosts();
    }
}

function mostrarPosts() {
    const lista = document.getElementById("listaPosts");

    lista.innerHTML = "";

    if (posts.length === 0) {
        lista.innerHTML = "<p>Nenhuma publicação cadastrada.</p>";
        return;
    }

    posts.forEach(post => {
        const artigo = document.createElement("article");
        artigo.className = "post";

        const titulo = document.createElement("h3");
        titulo.textContent = post.titulo;

        const data = document.createElement("div");
        data.className = "post-data";
        data.textContent = "Publicado em: " + post.data;

        const conteudo = document.createElement("p");
        conteudo.textContent = post.conteudo;

        const acoes = document.createElement("div");
        acoes.className = "post-actions";

        const botaoCurtir = document.createElement("button");
        botaoCurtir.textContent = "Curtir (" + post.curtidas + ")";
        botaoCurtir.onclick = function() {
            curtirPost(post.id);
        };

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "delete-button";
        botaoExcluir.onclick = function() {
            excluirPost(post.id);
        };

        acoes.appendChild(botaoCurtir);
        acoes.appendChild(botaoExcluir);

        artigo.appendChild(titulo);
        artigo.appendChild(data);
        artigo.appendChild(conteudo);
        artigo.appendChild(acoes);

        lista.appendChild(artigo);
    });
}

mostrarPosts();
