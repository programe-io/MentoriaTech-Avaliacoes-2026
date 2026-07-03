// Animação ao carregar

window.addEventListener("load", ()=>{

    document.querySelectorAll(".card").forEach((card, indice)=>{

        card.style.opacity="0";
        card.style.transform="translateY(30px)";

        setTimeout(()=>{

            card.style.transition="0.6s";
            card.style.opacity="1";
            card.style.transform="translateY(0)";

        }, indice * 300);

    });

});

// Mensagem ao clicar em Leia Mais

const botoes = document.querySelectorAll(".card button");

botoes.forEach(botao=>{

    botao.addEventListener("click", ()=>{

        alert("Artigo completo em breve!");

    });

});

// Botão voltar ao topo

const topo = document.getElementById("topo");

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 200){

        topo.style.display="block";

    }else{

        topo.style.display="none";

    }

});

topo.addEventListener("click", ()=>{

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});