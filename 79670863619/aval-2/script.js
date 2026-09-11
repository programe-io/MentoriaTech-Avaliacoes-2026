// ROLAR ATÉ UMA SEÇÃO

function rolarPara(id) {
    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// BOTÃO PRINCIPAL

function mostrarMensagem() {

    alert(
        "⚽ Bem-vindo ao FutebolMax!\n\n" +
        "Aqui você pode acompanhar jogos, times, " +
        "tabelas, artilheiros e notícias."
    );

}


// NOTÍCIA

function lerNoticia() {

    alert(
        "📰 Esta é uma notícia demonstrativa.\n\n" +
        "Em um site real, este botão poderia abrir " +
        "uma página completa com a notícia."
    );

}


// NEWSLETTER

function inscrever() {

    const email = document.getElementById("email").value;

    if (email === "") {

        alert("📩 Digite seu e-mail primeiro!");

        return;
    }

    if (!email.includes("@")) {

        alert("⚠️ Digite um e-mail válido.");

        return;
    }

    alert(
        "✅ Inscrição realizada!\n\n" +
        "Você receberá as novidades do FutebolMax."
    );

    document.getElementById("email").value = "";

}


// MENU MOBILE

function abrirMenu() {

    const nav = document.querySelector("nav");

    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.position = "absolute";
        nav.style.top = "75px";
        nav.style.left = "0";
        nav.style.width = "100%";

        nav.style.background = "#071007";

        nav.style.padding = "25px";

        nav.style.flexDirection = "column";

        nav.style.textAlign = "center";
    }
}


// EFEITO AO ROLAR

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 30px rgba(0,0,0,.5)";

    } else {

        header.style.boxShadow = "none";
    }

});