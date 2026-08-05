// =========================
// BOTÃO "DESCOBRIR MAIS"
// =========================

function mostrarMensagem(){

    const mensagens = [

        "🐍 Draco pertenceu à Casa Sonserina em Hogwarts.",

        "⚡ Draco foi rival de Harry Potter durante seus anos escolares.",

        "🪄 Sua varinha era feita de espinheiro com núcleo de pelo de unicórnio.",

        "🎬 O personagem foi interpretado por Tom Felton nos filmes.",

        "🏰 Draco estudou durante a mesma época que Harry, Rony e Hermione."

    ];


    let aleatorio = Math.floor(Math.random() * mensagens.length);


    document.getElementById("mensagem").innerHTML =
    mensagens[aleatorio];

}



// =========================
// ANIMAÇÃO AO APARECER NA TELA
// =========================


const secoes = document.querySelectorAll("section");


function aparecer(){

    secoes.forEach(secao=>{


        let altura = secao.getBoundingClientRect().top;


        let tela = window.innerHeight;


        if(altura < tela - 100){


            secao.style.opacity="1";

            secao.style.transform="translateY(0)";


        }


    });


}



secoes.forEach(secao=>{


    secao.style.opacity="0";

    secao.style.transform="translateY(50px)";

    secao.style.transition="1s";


});



window.addEventListener("scroll", aparecer);


aparecer();



// =========================
// EFEITO NOS CARDS
// =========================


const cards = document.querySelectorAll(".card");


cards.forEach(card=>{


    card.addEventListener("mouseenter",()=>{


        card.style.background="#164d2a";


    });



    card.addEventListener("mouseleave",()=>{


        card.style.background="#101010";


    });



});



// =========================
// MENU MUDANDO AO ROLAR
// =========================


const links = document.querySelectorAll("nav a");


window.addEventListener("scroll",()=>{


    let posicao = window.scrollY;


    document.querySelectorAll("section").forEach(secao=>{


        let inicio = secao.offsetTop - 200;

        let fim = inicio + secao.offsetHeight;


        if(posicao >= inicio && posicao < fim){


            links.forEach(link=>{


                link.style.color="white";


                if(link.getAttribute("href") === "#" + secao.id){


                    link.style.color="#5cff8d";


                }


            });


        }


    });


});



// =========================
// EFEITO DE DIGITAÇÃO
// =========================


const titulo = document.querySelector(".capa h2");


const textoTitulo = titulo.innerHTML;


titulo.innerHTML="";


let contador=0;



function escrever(){


    if(contador < textoTitulo.length){


        titulo.innerHTML += textoTitulo.charAt(contador);

        contador++;

        setTimeout(escrever,80);


    }


}


window.onload=()=>{

    escrever();

};



// =========================
// DATA NO CONSOLE
// =========================


let data = new Date();


console.log(
"Site de Draco Malfoy carregado em: "
+ data.toLocaleDateString()
);
