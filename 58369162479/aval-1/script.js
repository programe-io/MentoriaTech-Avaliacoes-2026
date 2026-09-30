// ==============================
// POSTS DO BLOG
// ==============================

let posts = [
    {
        titulo: "Como comecei a programar",
        autor: "Seu Nome",
        conteudo:
            "Minha jornada na programação começou com curiosidade. " +
            "Comecei estudando HTML, CSS e JavaScript e aos poucos " +
            "fui criando meus primeiros projetos."
    },

    {
        titulo: "Meu primeiro projeto",
        autor: "Seu Nome",
        conteudo:
            "Neste post conto como criei meu primeiro projeto utilizando " +
            "HTML, CSS e JavaScript."
    },

    {
        titulo: "Por que gosto de tecnologia?",
        autor: "Seu Nome",
        conteudo:
            "A tecnologia permite criar coisas incríveis. " +
            "Neste texto compartilho alguns dos motivos pelos quais " +
            "gosto tanto de programação."
    }
];


// ==============================
// MOSTRAR POSTS
// ==============================

const listaPosts = document.getElementById("listaPosts");

function mostrarPosts(lista = posts) {

    listaPosts.innerHTML = "";

    if (lista.length === 0) {
        listaPosts.innerHTML = `
            <p>Nenhum post encontrado.</p>
        `;

        return;
    }

    lista.forEach((post, index) => {

        const elemento = document.createElement("article");

        elemento.classList.add("post");

        elemento.innerHTML = `
            <h3>${post.titulo}</h3>

            <p class="autor">
                Por ${post.autor}
            </p>

            <p>
                ${post.conteudo}
            </p>

            <button onclick="lerPost(${index})">
                Ler mais
            </button>
        `;

        listaPosts.appendChild(elemento);
    });
}


// ==============================
// LER POST
// ==============================

function lerPost(index) {

    const post = posts[index];

    alert(
        post.titulo +
        "\n\n" +
        post.conteudo
    );
}


// ==============================
// PESQUISA
// ==============================

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function () {

    const texto = pesquisa.value.toLowerCase();

    const resultados = posts.filter(post =>
        post.titulo.toLowerCase().includes(texto) ||
        post.conteudo.toLowerCase().includes(texto)
    );

    mostrarPosts(resultados);
});


// ==============================
// NOVO POST
// ==============================

const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const conteudo = document.getElementById("conteudo").value;

    const novoPost = {
        titulo: titulo,
        autor: autor,
        conteudo: conteudo
    };

    posts.unshift(novoPost);

    mostrarPosts();

    postForm.reset();

    alert("Post publicado com sucesso! 🎉");

    document
        .getElementById("posts")
        .scrollIntoView({
            behavior: "smooth"
        });
});


// ==============================
// MODO ESCURO
// ==============================

const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        temaBtn.textContent = "☀️";
        localStorage.setItem("tema", "escuro");
    } else {
        temaBtn.textContent = "🌙";
        localStorage.setItem("tema", "claro");
    }
});


// Recuperar tema salvo

if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark");
    temaBtn.textContent = "☀️";
}


// ==============================
// FORMULÁRIO DE CONTATO
// ==============================

const contatoForm = document.getElementById("contatoForm");

contatoForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert(
        "Mensagem enviada com sucesso! " +
        "Obrigado pelo contato. 😊"
    );

    contatoForm.reset();
});


// ==============================
// INICIAR BLOG
// ==============================

mostrarPosts();
