
/* ==========================================
   PORTAL LIMA DA SILVA
   FUNCIONALIDADES
========================================== */


/* ==========================================
   DATA AUTOMÁTICA
========================================== */

const dataAtual = document.getElementById("dataAtual");

const hoje = new Date();

dataAtual.textContent = hoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
});


/* ==========================================
   MENU MOBILE
========================================== */

const menuMobile = document.getElementById("menuMobile");

const menu = document.getElementById("menu");

menuMobile.addEventListener("click", () => {

    menu.classList.toggle("open");

    menuMobile.textContent =
        menu.classList.contains("open") ? "✕" : "☰";

});


document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("open");

        menuMobile.textContent = "☰";

    });

});


/* ==========================================
   FILTRO DE CATEGORIAS
========================================== */

const botoesCategoria =
    document.querySelectorAll(".category-btn");

const cards =
    document.querySelectorAll(".news-card");

const semResultados =
    document.getElementById("semResultados");

let categoriaAtual = "todas";


function filtrarNoticias() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .toLowerCase()
        .trim();

    let quantidadeVisivel = 0;

    cards.forEach(card => {

        const categoria = card.dataset.categoria;

        const conteudo = card.innerText.toLowerCase();

        const correspondeCategoria =
            categoriaAtual === "todas" ||
            categoria === categoriaAtual;

        const correspondePesquisa =
            conteudo.includes(pesquisa);

        if (correspondeCategoria && correspondePesquisa) {

            card.classList.remove("hidden");

            quantidadeVisivel++;

        } else {

            card.classList.add("hidden");

        }

    });

    semResultados.style.display =
        quantidadeVisivel === 0 ? "block" : "none";

}


botoesCategoria.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesCategoria.forEach(item => {
            item.classList.remove("active");
        });

        botao.classList.add("active");

        categoriaAtual = botao.dataset.categoria;

        filtrarNoticias();

    });

});


/* ==========================================
   PESQUISA DE NOTÍCIAS
========================================== */

const campoPesquisa = document.getElementById("pesquisa");

const botaoPesquisar = document.getElementById("btnPesquisar");

botaoPesquisar.addEventListener("click", filtrarNoticias);

campoPesquisa.addEventListener("input", filtrarNoticias);

campoPesquisa.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        filtrarNoticias();

    }

});


/* ==========================================
   MODAL DE LEITURA DAS NOTÍCIAS
========================================== */

const modal = document.getElementById("modal");

const modalTitulo = document.getElementById("modalTitulo");

const modalTexto = document.getElementById("modalTexto");

const fecharModal = document.getElementById("fecharModal");

const voltarModal = document.getElementById("voltarModal");


document.querySelectorAll(".read-button").forEach(botao => {

    botao.addEventListener("click", () => {

        const titulo = botao.dataset.titulo;

        const texto = botao.dataset.texto;

        modalTitulo.textContent = titulo;

        modalTexto.textContent = texto;

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


function fecharJanela() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


fecharModal.addEventListener("click", fecharJanela);

voltarModal.addEventListener("click", fecharJanela);


modal.addEventListener("click", event => {

    if (event.target === modal) {

        fecharJanela();

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        fecharJanela();

    }

});


/* ==========================================
   FORMULÁRIO DE CADASTRO
========================================== */

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", event => {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {

        alert("Digite um e-mail válido!");

        return;

    }

    alert(
        "Cadastro realizado com sucesso!\nObrigado por acompanhar o Portal Lima da Silva."
    );

    formulario.reset();

});


/* ==========================================
   ANO AUTOMÁTICO
========================================== */

const direitos = document.getElementById("direitos");

direitos.textContent =
    `© ${new Date().getFullYear()} Portal Lima da Silva. Todos os direitos reservados.`;


/* ==========================================
   ANIMAÇÃO AO ROLAR A PÁGINA
========================================== */

const elementos = document.querySelectorAll(
    ".news-card, .about, .featured-news"
);


if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver((entradas, observer) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

                observer.unobserve(entrada.target);

            }

        });

    }, {
        threshold: 0.12
    });


    elementos.forEach(elemento => {

        observador.observe(elemento);

    });

}


/* ==========================================
   FINALIZAÇÃO
========================================== */

console.log("Portal Lima da Silva carregado com sucesso!");
