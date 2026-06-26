/*====================================
        GAMEZONE
        Criado por Caio José
=====================================*/

/*============================
        MENU MOBILE
=============================*/

const menu = document.getElementById("menu");
const menuMobile = document.getElementById("menuMobile");

menuMobile.addEventListener("click", () => {

    menu.classList.toggle("active");

});


/*============================
      FECHAR MENU AO CLICAR
=============================*/

const links = document.querySelectorAll("nav a");

links.forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

    });

});


/*============================
      BOTÃO VOLTAR AO TOPO
=============================*/

const btnTopo = document.getElementById("topo");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

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


/*============================
        HEADER SCROLL
=============================*/

const header = document.querySelector("header");

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 80){

        header.style.background="#0b0f14";

        header.style.padding="15px 8%";

        header.style.transition=".4s";

    }else{

        header.style.background="#111827";

        header.style.padding="20px 8%";

    }

});


/*============================
        PESQUISA
=============================*/

const pesquisa = document.getElementById("pesquisa");

const cards = document.querySelectorAll(".card");

pesquisa.addEventListener("keyup", ()=>{

    let valor = pesquisa.value.toLowerCase();

    cards.forEach(card=>{

        let texto = card.innerText.toLowerCase();

        if(texto.indexOf(valor) > -1){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});


/*============================
    ANIMAÇÃO DOS CARDS
=============================*/

const observador = new IntersectionObserver((entradas)=>{

    entradas.forEach((entrada)=>{

        if(entrada.isIntersecting){

            entrada.target.classList.add("mostrar");

        }

    });

});

cards.forEach((card)=>{

    card.classList.add("esconder");

    observador.observe(card);

});


/*============================
    EFEITO NAS CATEGORIAS
=============================*/

const categorias = document.querySelectorAll(".categoria");

categorias.forEach((categoria)=>{

    categoria.addEventListener("mouseenter",()=>{

        categoria.style.transform="translateY(-12px) scale(1.03)";

    });

    categoria.addEventListener("mouseleave",()=>{

        categoria.style.transform="translateY(0px) scale(1)";

    });

});


/*============================
      EFEITO BOTÃO ENVIAR
=============================*/

const botao = document.querySelector("form button");

botao.addEventListener("click",(e)=>{

    e.preventDefault();

    alert("Mensagem enviada com sucesso!");

});


/*============================
      ANO AUTOMÁTICO
=============================*/

const footer = document.querySelector("footer");

const ano = new Date().getFullYear();

footer.innerHTML += `<p style="margin-top:15px;">GameZone © ${ano}</p>`;


/*============================
      DIGITAÇÃO NO BANNER
=============================*/

const titulo = document.querySelector(".overlay h1");

const texto = "GAMEZONE";

let i = 0;

titulo.innerHTML = "";

function escrever(){

    if(i < texto.length){

        titulo.innerHTML += texto.charAt(i);

        i++;

        setTimeout(escrever,150);

    }

}

escrever();


/*============================
      HOVER DOS BOTÕES
=============================*/

const botoes = document.querySelectorAll(".texto a");

botoes.forEach(botao=>{

    botao.addEventListener("mouseenter",()=>{

        botao.style.transform="scale(1.05)";

    });

    botao.addEventListener("mouseleave",()=>{

        botao.style.transform="scale(1)";

    });

});


/*============================
      SCROLL SUAVE
=============================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const destino=document.querySelector(this.getAttribute("href"));

        if(destino){

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


console.log("GameZone carregado com sucesso!");