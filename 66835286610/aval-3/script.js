```javascript
/* =========================
   MENU MOBILE
========================= */

function abrirMenu() {

    const menu = document.getElementById("navLinks");

    menu.classList.toggle("active");

}


/* =========================
   TEMA CLARO / ESCURO
========================= */

function alternarTema() {

    document.body.classList.toggle("light");

    const botao = document.querySelector(".theme-btn");

    if (document.body.classList.contains("light")) {

        botao.textContent = "🌙";

        localStorage.setItem("tema", "claro");

    } else {

        botao.textContent = "☀️";

        localStorage.setItem("tema", "escuro");

    }

}


/* RECUPERAR TEMA */

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "claro") {

    document.body.classList.add("light");

    document.querySelector(".theme-btn").textContent = "🌙";

}


/* =========================
   MODAL DE ARTIGO
========================= */

function abrirArtigo(titulo, texto) {

    const modal = document.getElementById("modal");

    const modalTitle = document.getElementById("modalTitle");

    const modalText = document.getElementById("modalText");

    modalTitle.textContent = titulo;

    modalText.textContent = texto;

    modal.style.display = "flex";

}


function fecharModal() {

    document.getElementById("modal").style.display = "none";

}


function fecharModalFora(event) {

    if (event.target.id === "modal") {

        fecharModal();

    }

}


/* =========================
   PESQUISA DE ARTIGOS
========================= */

function pesquisarArtigos() {

    const pesquisa =
        document
        .getElementById("pesquisa")
        .value
        .toLowerCase()
        .trim();

    const artigos =
        document.querySelectorAll(".article-card");

    let encontrados = 0;

    artigos.forEach(function (artigo) {

        const titulo =
            artigo
            .getAttribute("data-title")
            .toLowerCase();

        if (titulo.includes(pesquisa)) {

            artigo.style.display = "block";

            encontrados++;

        } else {

            artigo.style.display = "none";

        }

    });


    const mensagem =
        document.getElementById("semResultados");


    if (encontrados === 0) {

        mensagem.style.display = "block";

    } else {

        mensagem.style.display = "none";

    }

}


/* =========================
   FAQ
========================= */

function abrirFAQ(botao) {

    const item = botao.parentElement;

    const todos =
        document.querySelectorAll(".faq-item");


    todos.forEach(function (faq) {

        if (faq !== item) {

            faq.classList.remove("active");

        }

    });


    item.classList.toggle("active");


    const simbolo = botao.querySelector("span");


    if (item.classList.contains("active")) {

        simbolo.textContent = "−";

    } else {

        simbolo.textContent = "+";

    }

}


/* =========================
   CONTATO
========================= */

function mostrarContato() {

    abrirArtigo(
        "Entre em contato",
        "E-mail: contato@mentoria.tech\n\nInstagram: @mentoria.tech\n\nGitHub: MentoriaTech"
    );

}


/* =========================
   BOTÃO VOLTAR AO TOPO
========================= */

window.addEventListener("scroll", function () {

    const botao =
        document.getElementById("topButton");


    if (window.scrollY > 400) {

        botao.style.display = "block";

    } else {

        botao.style.display = "none";

    }

});


function voltarTopo() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================
   ANIMAÇÃO DOS NÚMEROS
========================= */

function animarNumero(elemento, destino, duracao) {

    let atual = 0;

    const incremento = destino / (duracao / 20);


    const contador = setInterval(function () {

        atual += incremento;

        if (atual >= destino) {

            atual = destino;

            clearInterval(contador);

        }

        elemento.textContent =
            Math.floor(atual) + "+";

    }, 20);

}


/* INICIAR CONTADORES */

window.addEventListener("load", function () {

    animarNumero(
        document.getElementById("alunos"),
        500,
        1200
    );

    animarNumero(
        document.getElementById("artigosNumero"),
        30,
        900
    );

    animarNumero(
        document.getElementById("projetosNumero"),
        10,
        700
    );

});


/* =========================
   FECHAR MODAL COM ESC
========================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        fecharModal();

    }

});
```
