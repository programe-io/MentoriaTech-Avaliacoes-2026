// ===============================
// MODO ESCURO
// ===============================

const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        temaBtn.textContent = "☀️";
    } else {
        temaBtn.textContent = "🌙";
    }

});


// ===============================
// PESQUISA DE POSTS
// ===============================

const campoBusca = document.getElementById("campoBusca");
const posts = document.querySelectorAll(".post");

campoBusca.addEventListener("input", () => {

    const pesquisa = campoBusca.value.toLowerCase();

    posts.forEach(post => {

        const texto = post.textContent.toLowerCase();

        if (texto.includes(pesquisa)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});


// ===============================
// BOTÃO LER MAIS
// ===============================

const botoes = document.querySelectorAll(".lerMais");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        alert(
            "Em breve você poderá acessar o conteúdo completo deste post!"
        );

    });

});


// ===============================
// FORMULÁRIO
// ===============================

const formulario = document.getElementById("formContato");
const mensagemForm = document.getElementById("mensagemForm");

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nome = document.getElementById("nome").value;

    mensagemForm.textContent =
        `Obrigado, ${nome}! Sua mensagem foi enviada.`;

    formulario.reset();

});
