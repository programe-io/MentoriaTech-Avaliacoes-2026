// ========================================
// SITE FLOR DE LÓTUS - JAVASCRIPT
// ========================================


// ========================================
// 1. MENSAGEM DE BOAS-VINDAS
// ========================================

window.addEventListener("load", function () {

    console.log("🌸 Bem-vindo ao site da Flor de Lótus!");

});


// ========================================
// 2. ANIMAÇÃO DAS SEÇÕES
// ========================================

const elementos = document.querySelectorAll(
    "section, .card, .curiosidade"
);

const observador = new IntersectionObserver(
    function (entradas) {

        entradas.forEach(function (entrada) {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("aparecer");

            }

        });

    },
    {
        threshold: 0.15
    }
);

elementos.forEach(function (elemento) {

    observador.observe(elemento);

});


// ========================================
// 3. BOTÃO VOLTAR AO TOPO
// ========================================

const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "↑";

botaoTopo.setAttribute(
    "aria-label",
    "Voltar ao topo"
);

botaoTopo.id = "botaoTopo";

document.body.appendChild(botaoTopo);


// Mostrar o botão quando a página for rolada

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        botaoTopo.classList.add("mostrar");

    } else {

        botaoTopo.classList.remove("mostrar");

    }

});


// Voltar para o topo

botaoTopo.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ========================================
// 4. EFEITO NO MENU
// ========================================

const linksMenu = document.querySelectorAll("nav a");

linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        linksMenu.forEach(function (item) {

            item.classList.remove("ativo");

        });

        link.classList.add("ativo");

    });

});


// ========================================
// 5. FRASE INTERATIVA SOBRE A FLOR
// ========================================

const botao = document.querySelector(".botao");

if (botao) {

    botao.addEventListener("click", function () {

        console.log(
            "🌸 Você está conhecendo mais sobre a flor de lótus!"
        );

    });

}


// ========================================
// 6. EFEITO NAS CURIOSIDADES
// ========================================

const curiosidades =
    document.querySelectorAll(".curiosidade");

curiosidades.forEach(function (item) {

    item.addEventListener("click", function () {

        item.classList.toggle("selecionada");

    });

});


// ========================================
// 7. ANO AUTOMÁTICO NO RODAPÉ
// ========================================

const anoAtual = new Date().getFullYear();

const textosRodape =
    document.querySelectorAll("footer p");

if (textosRodape.length > 0) {

    const ultimoTexto =
        textosRodape[textosRodape.length - 1];

    ultimoTexto.innerHTML =
        `&copy; ${anoAtual} - Todos os direitos reservados.`;

}


// ========================================
// 8. EFEITO DE DIGITAÇÃO
// ========================================

const tituloHero =
    document.querySelector(".hero h2");

if (tituloHero) {

    const textoOriginal =
        tituloHero.textContent;

    tituloHero.textContent = "";

    let indice = 0;

    function escreverTitulo() {

        if (indice < textoOriginal.length) {

            tituloHero.textContent +=
                textoOriginal.charAt(indice);

            indice++;

            setTimeout(escreverTitulo, 100);

        }

    }

    escreverTitulo();

}


// ========================================
// 9. BOTÃO DE CURIOSIDADE
// ========================================

const secaoCuriosidades =
    document.querySelector("#curiosidades");

if (secaoCuriosidades) {

    const novoBotao =
        document.createElement("button");

    novoBotao.textContent =
        "🌸 Mostrar uma curiosidade";

    novoBotao.classList.add(
        "botao-curiosidade"
    );

    secaoCuriosidades.appendChild(novoBotao);


    novoBotao.addEventListener("click", function () {

        const lista = [
            "A flor de lótus é uma planta aquática.",
            "Suas flores podem apresentar diferentes cores.",
            "O lótus possui grande importância cultural em várias sociedades.",
            "Suas folhas possuem uma superfície que repele água.",
            "A flor de lótus é frequentemente associada à renovação."
        ];

        const numero =
            Math.floor(Math.random() * lista.length);

        alert("🌸 Curiosidade:\n\n" + lista[numero]);

    });

}


// ========================================
// FIM DO JAVASCRIPT
// ========================================

console.log("🌸 JavaScript carregado com sucesso!");