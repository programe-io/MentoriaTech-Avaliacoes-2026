// ===========================
// MODO ESCURO
// ===========================

const botaoModo = document.getElementById("modoEscuro");

botaoModo.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        botaoModo.textContent = "☀️ Modo Claro";
    } else {
        botaoModo.textContent = "🌙 Modo Escuro";
    }

});


// ===========================
// PESQUISA DE POSTAGENS
// ===========================

const campoPesquisa = document.getElementById("pesquisa");
const posts = document.querySelectorAll(".post");

campoPesquisa.addEventListener("keyup", () => {

    const texto = campoPesquisa.value.toLowerCase();

    posts.forEach(post => {

        const titulo = post.querySelector("h2").textContent.toLowerCase();

        if (titulo.includes(texto)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});


// ===========================
// BOTÃO LER MAIS
// ===========================

const botoesLer = document.querySelectorAll(".lerMais");

botoesLer.forEach(botao => {

    botao.addEventListener("click", () => {

        const post = botao.closest(".post");
        const conteudo = post.querySelector(".conteudo");

        conteudo.classList.toggle("ativo");

        if (conteudo.classList.contains("ativo")) {
            botao.textContent = "Mostrar menos";
        } else {
            botao.textContent = "Ler mais";
        }

    });

});


// ===========================
// BOTÃO CURTIR
// ===========================

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(botao => {

    let curtidas = 0;

    botao.addEventListener("click", () => {

        curtidas++;

        botao.querySelector("span").textContent = curtidas;

    });

});


// ===========================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ===========================

const observer = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            entrada.target.style.opacity = "1";
            entrada.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

posts.forEach(post => {

    post.style.opacity = "0";
    post.style.transform = "translateY(40px)";
    post.style.transition = "0.6s";

    observer.observe(post);

});


// ===========================
// MENSAGEM DE BOAS-VINDAS
// ===========================

window.addEventListener("load", () => {

    console.log("Bem-vindo ao Tech & Games!");

});