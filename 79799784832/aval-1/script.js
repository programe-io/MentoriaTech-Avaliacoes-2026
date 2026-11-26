
// MODO CLARO E ESCURO

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function() {
    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        botaoTema.textContent = "☀️";
    } else {
        botaoTema.textContent = "🌙";
    }
});

// BOTÃO LER MAIS

function lerMais(botao) {
    const texto = botao.nextElementSibling;

    if (texto.hidden) {
        texto.hidden = false;
        botao.textContent = "Ler menos";
    } else {
        texto.hidden = true;
        botao.textContent = "Ler mais";
    }
}

// CRIAR NOVAS PUBLICAÇÕES

const formularioPost = document.getElementById("form-post");

formularioPost.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const texto = document.getElementById("texto").value;

    const card = document.createElement("article");
    card.className = "card";

    const imagem = document.createElement("div");
    imagem.className = "card-imagem";
    imagem.textContent = "📝";

    const conteudo = document.createElement("div");
    conteudo.className = "card-conteudo";

    const categoria = document.createElement("span");
    categoria.textContent = "NOVA PUBLICAÇÃO";

    const tituloPost = document.createElement("h3");
    tituloPost.textContent = titulo;

    const textoPost = document.createElement("p");
    textoPost.textContent = texto;

    conteudo.append(categoria, tituloPost, textoPost);
    card.append(imagem, conteudo);

    document.getElementById("lista-posts").prepend(card);

    formularioPost.reset();

    alert("Publicação adicionada com sucesso!");
});

// FORMULÁRIO DE CONTATO

document.getElementById("form-contato")
.addEventListener("submit", function(event) {
    event.preventDefault();

    alert("Mensagem enviada com sucesso! (Demonstração)");

    this.reset();
});
