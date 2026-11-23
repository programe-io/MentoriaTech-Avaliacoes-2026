
// Sistema de curtidas
function curtir(botao) {
    let contador = botao.querySelector("span");
    let curtidas = Number(contador.textContent);

    if (botao.classList.contains("liked")) {
        curtidas--;
        botao.classList.remove("liked");
        botao.firstChild.textContent = "♡ ";
    } else {
        curtidas++;
        botao.classList.add("liked");
        botao.firstChild.textContent = "♥ ";
    }

    contador.textContent = curtidas;
}

// Publicações do blog
const formulario = document.getElementById("formBlog");
const publicacoes = document.getElementById("publicacoes");

// Recuperar publicações salvas
let posts = JSON.parse(localStorage.getItem("postsPerfumes")) || [];

function mostrarPosts() {
    publicacoes.innerHTML = "";

    posts.forEach((post, index) => {
        const artigo = document.createElement("article");
        artigo.className = "publicacao";

        const titulo = document.createElement("h3");
        titulo.textContent = "🌸 " + post.titulo;

        const texto = document.createElement("p");
        texto.textContent = post.texto;

        const excluir = document.createElement("button");
        excluir.textContent = "🗑️ Excluir publicação";

        excluir.addEventListener("click", () => {
            posts.splice(index, 1);
            salvarPosts();
        });

        artigo.append(titulo, texto, excluir);
        publicacoes.appendChild(artigo);
    });
}

function salvarPosts() {
    localStorage.setItem("postsPerfumes", JSON.stringify(posts));
    mostrarPosts();
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (!titulo || !texto) return;

    posts.unshift({
        titulo: titulo,
        texto: texto
    });

    salvarPosts();
    formulario.reset();

    alert("Sua publicação foi salva com sucesso! 🌷");
});

// Mostrar publicações ao abrir o site
mostrarPosts();
