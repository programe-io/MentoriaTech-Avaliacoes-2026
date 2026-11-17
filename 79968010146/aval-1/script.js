
let posts = JSON.parse(localStorage.getItem("meuBlogPosts")) || [
    {
        id: 1,
        titulo: "A importância da tecnologia na educação",
        conteudo: "A tecnologia está transformando a maneira como aprendemos. Com ferramentas digitais, os estudantes podem pesquisar, desenvolver projetos e adquirir novos conhecimentos.",
        data: new Date().toLocaleDateString("pt-BR"),
        curtidas: 0
    },
    {
        id: 2,
        titulo: "Por que aprender programação?",
        conteudo: "Aprender programação desenvolve o raciocínio lógico, a criatividade e a capacidade de resolver problemas. Além disso, permite criar sites, aplicativos e sistemas.",
        data: new Date().toLocaleDateString("pt-BR"),
        curtidas: 0
    }
];

function salvarPosts() {
    localStorage.setItem("meuBlogPosts", JSON.stringify(posts));
}

function adicionarPost() {
    const titulo = document.getElementById("titulo").value.trim();
    const conteudo = document.getElementById("conteudo").value.trim();

    if (titulo === "" || conteudo === "") {
        alert("Preencha o título e o conteúdo da publicação!");
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

    alert("Publicação criada com sucesso!");
}

function curtirPost(id) {
    const post = posts.find(p => p.id === id);

    if (post) {
        post.curtidas++;
        salvarPosts();
        mostrarPosts();
    }
}

function excluirPost(id) {
    if (confirm("Deseja realmente excluir esta publicação?")) {
        posts = posts.filter(p => p.id !== id);
        salvarPosts();
        mostrarPosts();
    }
}

function mostrarPosts() {
    const lista = document.getElementById("listaPosts");

    lista.innerHTML = "";

    if (posts.length === 0) {
        lista.innerHTML = "<p>Nenhuma publicação encontrada.</p>";
        return;
    }

    posts.forEach(post => {
        const artigo = document.createElement("article");
        artigo.className = "post";

        const categoria = document.createElement("span");
        categoria.className = "post-category";
        categoria.textContent = "Publicação";

        const titulo = document.createElement("h3");
        titulo.textContent = post.titulo;

        const data = document.createElement("div");
        data.className = "post-info";
        data.textContent = "Publicado em " + post.data;

        const conteudo = document.createElement("p");
        conteudo.textContent = post.conteudo;

        const acoes = document.createElement("div");
        acoes.className = "post-actions";

        const curtir = document.createElement("button");
        curtir.textContent = "♥ Curtir (" + post.curtidas + ")";
        curtir.onclick = () => curtirPost(post.id);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirPost(post.id);

        acoes.appendChild(curtir);
        acoes.appendChild(excluir);

        artigo.appendChild(categoria);
        artigo.appendChild(titulo);
        artigo.appendChild(data);
        artigo.appendChild(conteudo);
        artigo.appendChild(acoes);

        lista.appendChild(artigo);
    });
}

mostrarPosts();
