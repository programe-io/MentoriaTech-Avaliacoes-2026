// ==========================
// ANIMAÇÃO DAS SEÇÕES
// ==========================

const secoes = document.querySelectorAll("section");


secoes.forEach(secao => {

    secao.style.opacity = "0";

    secao.style.transform = "translateY(50px)";

    secao.style.transition = "1s";

});



function mostrarSecoes(){

    secoes.forEach(secao => {

        const topo = secao.getBoundingClientRect().top;

        const alturaTela = window.innerHeight;


        if(topo < alturaTela - 100){

            secao.style.opacity = "1";

            secao.style.transform = "translateY(0)";

        }


    });

}


window.addEventListener("scroll", mostrarSecoes);


mostrarSecoes();





// ==========================
// CURIOSIDADES ALEATÓRIAS
// ==========================


const curiosidades = [

"🪝 Harry Hook é filho do Capitão Gancho.",

"🏴‍☠️ Ele vive na Ilha dos Perdidos.",

"⚓ Seu estilo é inspirado nos piratas.",

"🎬 O personagem é interpretado por Thomas Doherty.",

"🌊 Harry faz parte do grupo de Uma.",

"😈 Apesar de ser um vilão, demonstra amizade pelos seus aliados."

];



const lista = document.querySelector("#curiosidades ul");



if(lista){

    lista.addEventListener("click",()=>{


        let numero = Math.floor(
            Math.random() * curiosidades.length
        );


        lista.innerHTML = 
        "<li>" + curiosidades[numero] + "</li>";


    });

}





// ==========================
// EFEITO NA IMAGEM
// ==========================


const imagem = document.querySelector("figure img");


if(imagem){


imagem.addEventListener("mouseenter",()=>{


    imagem.style.transform = "scale(1.1)";


});



imagem.addEventListener("mouseleave",()=>{


    imagem.style.transform = "scale(1)";


});


}





// ==========================
// MENU ATIVO
// ==========================


const links = document.querySelectorAll("nav a");



window.addEventListener("scroll",()=>{


let posicao = window.scrollY;



document.querySelectorAll("section").forEach(secao=>{


let inicio = secao.offsetTop - 150;

let fim = inicio + secao.offsetHeight;



if(posicao >= inicio && posicao < fim){



links.forEach(link=>{


link.style.color="white";


if(link.getAttribute("href") === "#" + secao.id){


link.style.color="#ffd700";


}


});



}



});



});






// ==========================
// MENSAGEM DE BOAS-VINDAS
// ==========================


window.onload = ()=>{


setTimeout(()=>{


alert("🏴‍☠️ Bem-vindo ao mundo de Harry Hook!");



},800);



};






// ==========================
// ANO AUTOMÁTICO NO RODAPÉ
// ==========================


const ano = document.querySelector("footer p:last-child");


if(ano){


const data = new Date();

ano.innerHTML =
"© " + data.getFullYear() + " - Descendentes";


}
