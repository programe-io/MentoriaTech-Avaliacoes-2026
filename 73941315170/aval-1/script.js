/*=====================================================
    MICHAEL JACKSON - SCRIPT.JS
    Desenvolvido por Matheus de Sousa Rocha
=====================================================*/

/* ===========================
      MENU RESPONSIVO
=========================== */

const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", () => {
    menu.classList.toggle("active");
});

/* Fecha o menu ao clicar em um link */

document.querySelectorAll("#menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

    });

});

/* ===========================
      SCROLL REVEAL
=========================== */

const reveals = document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;

        const top = section.getBoundingClientRect().top;

        const visible = 120;

        if(top < windowHeight - visible){

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();

/* ===========================
        BOTÃO TOPO
=========================== */

const btnTopo = document.getElementById("topo");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        btnTopo.style.display = "block";

    }else{

        btnTopo.style.display = "none";

    }

});

btnTopo.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ===========================
      MENU ATIVO
=========================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;

        const height = section.offsetHeight;

        if(scrollY >= top){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("ativo");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("ativo");

        }

    });

});

/* ===========================
      ROLAGEM SUAVE
=========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const destino=document.querySelector(this.getAttribute("href"));

        destino.scrollIntoView({

            behavior:"smooth"

        });

    });

});

/* ===========================
     HEADER AO ROLAR
=========================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.style.background="rgba(0,0,0,.90)";
        header.style.padding="14px 8%";
        header.style.boxShadow="0 8px 25px rgba(0,0,0,.5)";

    }else{

        header.style.background="rgba(0,0,0,.55)";
        header.style.padding="18px 8%";
        header.style.boxShadow="none";

    }

});

/* ===========================
      BOTÃO EXPLORAR
=========================== */

const botao = document.querySelector(".btn");

botao.addEventListener("click",()=>{

    botao.style.transform="scale(.95)";

    setTimeout(()=>{

        botao.style.transform="scale(1)";

    },150);

});

/* ===========================
       CARDS DOS ÁLBUNS
=========================== */

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const x = e.offsetX;
        const y = e.offsetY;

        card.style.background =
        `radial-gradient(circle at ${x}px ${y}px,
        rgba(255,215,0,.15),
        rgba(255,255,255,.05))`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.background="rgba(255,255,255,.05)";

    });

});

/* ===========================
      GALERIA
=========================== */

const imagens = document.querySelectorAll(".grid-galeria img");

imagens.forEach(img=>{

    img.addEventListener("click",()=>{

        img.style.transform="scale(1.12)";

        setTimeout(()=>{

            img.style.transform="scale(1)";

        },250);

    });

});

/* ===========================
        ANIMAÇÃO TÍTULOS
=========================== */

const titulos = document.querySelectorAll("section h2");

titulos.forEach(titulo=>{

    titulo.addEventListener("mouseenter",()=>{

        titulo.style.letterSpacing="3px";
        titulo.style.transition=".3s";

    });

    titulo.addEventListener("mouseleave",()=>{

        titulo.style.letterSpacing="1px";

    });

});

/* ===========================
      EFEITO NO LOGO
=========================== */

const logo = document.querySelector(".logo");

logo.addEventListener("mouseenter",()=>{

    logo.style.textShadow="0 0 20px gold";

});

logo.addEventListener("mouseleave",()=>{

    logo.style.textShadow="none";

});

/* ===========================
      EFEITO DE ENTRADA
=========================== */

window.addEventListener("load",()=>{

    document.body.style.opacity="1";

});

/* ===========================
       MENSAGEM
=========================== */

console.log("%cMichael Jackson - O Rei do Pop",
"color:gold;font-size:20px;font-weight:bold;");

console.log("%cSite desenvolvido por Matheus de Sousa Rocha",
"color:white;font-size:14px;");