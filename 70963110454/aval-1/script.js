// ========================================
// FUNÇÃO DE NOTIFICAÇÃO
// ========================================

function mostrarMensagem(mensagem) {

    const toast = document.getElementById("toast");

    toast.textContent = mensagem;

    toast.classList.add("mostrar");

    setTimeout(function () {

        toast.classList.remove("mostrar");

    }, 2500);
}



// ========================================
// MENU MOBILE
// ========================================

const menuBtn = document.getElementById("menuBtn");

const menu = document.getElementById("menu");


menuBtn.addEventListener("click", function () {

    menu.classList.toggle("aberto");

});


// Fecha o menu quando clicar em algum link

const linksMenu = document.querySelectorAll("#menu a");

linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("aberto");

    });

});



// ========================================
// MODO ESCURO / CLARO
// ========================================

const temaBtn = document.getElementById("temaBtn");


temaBtn.addEventListener("click", function () {

    document.body.classList.toggle("claro");


    if (document.body.classList.contains("claro")) {

        temaBtn.textContent = "☀";

        mostrarMensagem("Modo claro ativado");

    } else {

        temaBtn.textContent = "☾";

        mostrarMensagem("Modo escuro ativado");

    }

});



// ========================================
// SISTEMA DE PESQUISA
// ========================================

const pesquisaBtn =
    document.getElementById("pesquisaBtn");

const pesquisa =
    document.getElementById("pesquisa");

const fecharPesquisa =
    document.getElementById("fecharPesquisa");

const campoPesquisa =
    document.getElementById("campoPesquisa");


pesquisaBtn.addEventListener("click", function () {

    pesquisa.classList.toggle("mostrar");

    campoPesquisa.focus();

});


fecharPesquisa.addEventListener("click", function () {

    pesquisa.classList.remove("mostrar");

});


campoPesquisa.addEventListener("keydown", function (evento) {

    if (evento.key === "Enter") {

        const texto = campoPesquisa.value.trim();


        if (texto === "") {

            mostrarMensagem(
                "Digite algo para pesquisar"
            );

            return;

        }


        mostrarMensagem(
            "Pesquisando por: " + texto
        );

    }

});



// ========================================
// FILTRO DOS JOGOS
// ========================================

const filtros =
    document.querySelectorAll(".filtro");

const jogos =
    document.querySelectorAll(".jogo");


filtros.forEach(function (botao) {

    botao.addEventListener("click", function () {


        // remove seleção dos outros

        filtros.forEach(function (item) {

            item.classList.remove("active");

        });


        // seleciona o atual

        botao.classList.add("active");


        const filtro =
            botao.dataset.filtro;


        jogos.forEach(function (jogo) {

            if (
                filtro === "todos" ||
                jogo.dataset.dia === filtro
            ) {

                jogo.style.display = "";

            } else {

                jogo.style.display = "none";

            }

        });

    });

});



// ========================================
// BOTÕES DOS JOGOS
// ========================================

const botoesDetalhes =
    document.querySelectorAll(".detalhes");


botoesDetalhes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        mostrarMensagem(
            "Detalhes do jogo carregados!"
        );

    });

});



// ========================================
// BOTÃO CALENDÁRIO
// ========================================

const calendarioBtn =
    document.getElementById("calendarioBtn");


calendarioBtn.addEventListener("click", function () {

    mostrarMensagem(
        "Calendário completo em breve!"
    );

});



// ========================================
// BOTÃO DE NOTÍCIA
// ========================================

const lerBtn =
    document.querySelector(".ler");


lerBtn.addEventListener("click", function () {

    mostrarMensagem(
        "Matéria completa em breve!"
    );

});



// ========================================
// LINKS DE NAVEGAÇÃO ATIVOS
// ========================================

const secoes =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", function () {

    let secaoAtual = "inicio";


    secoes.forEach(function (secao) {

        const topo =
            secao.offsetTop - 150;


        if (window.scrollY >= topo) {

            secaoAtual = secao.id;

        }

    });


    linksMenu.forEach(function (link) {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + secaoAtual
        ) {

            link.classList.add("active");

        }

    });

});



// ========================================
// ANIMAÇÃO AO APARECER NA TELA
// ========================================

const elementos =
    document.querySelectorAll(
        ".jogo, .noticia-principal, " +
        ".noticias-laterais article, " +
        ".ranking-linha, .duelo"
    );


const observador =
    new IntersectionObserver(
        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.style.opacity = "1";

                    entrada.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


elementos.forEach(function (elemento) {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(30px)";

    elemento.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observador.observe(elemento);

});



// ========================================
// EFEITO PARALLAX NA FOTO
// ========================================

const imagemHero =
    document.querySelector(".hero-img");


window.addEventListener("scroll", function () {

    const movimento =
        window.scrollY * 0.15;


    if (window.scrollY < 700) {

        imagemHero.style.transform =
            "translateY(" + movimento + "px) scale(1.04)";

    }

});