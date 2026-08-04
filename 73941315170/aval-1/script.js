/*=========================================
      UNIVERSO DO HOMEM-ARANHA
=========================================*/

// ===============================
// MENU RESPONSIVO
// ===============================

const menuBtn = document.querySelector(".menu-mobile");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("ativo");
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("ativo");
    });
});


// ===============================
// BOTÃO VOLTAR AO TOPO
// ===============================

const botaoTopo = document.getElementById("topo");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){
        botaoTopo.style.display = "block";
    }else{
        botaoTopo.style.display = "none";
    }

});

botaoTopo.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});


// ===============================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ===============================

const elementos = document.querySelectorAll(
".card, .timeline-item, .lista div, .historia p, h2"
);

const aparecer = () => {

    const alturaTela = window.innerHeight;

    elementos.forEach(item => {

        const topo = item.getBoundingClientRect().top;

        if(topo < alturaTela - 100){

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }

    });

};

// Estado inicial
elementos.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = ".7s ease";

});

window.addEventListener("scroll", aparecer);

aparecer();


// ===============================
// EFEITO NA NAVBAR
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.background = "rgba(0,0,0,.95)";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.4)";

    }else{

        header.style.background = "rgba(0,0,0,.85)";
        header.style.boxShadow = "none";

    }

});


// ===============================
// EFEITO NOS BOTÕES
// ===============================

const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao => {

    botao.addEventListener("mouseenter", () => {

        botao.style.transform = "scale(1.05)";

    });

    botao.addEventListener("mouseleave", () => {

        botao.style.transform = "scale(1)";

    });

});

console.log("🕷 Universo do Homem-Aranha carregado com sucesso!");