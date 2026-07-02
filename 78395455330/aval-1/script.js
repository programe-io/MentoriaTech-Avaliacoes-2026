vconst botao = document.getElementById("botao");
const card = document.querySelector(".card");

botao.addEventListener("click", function(){

    card.classList.toggle("animar");

    if(card.classList.contains("animar")){
        botao.innerHTML = "Animação Ativada";
    }else{
        botao.innerHTML = "Clique para Animar";
    }

});

// animação ao carregar a página

window.onload = function(){

    const elementos = document.querySelectorAll(".card, .posts");

    elementos.forEach((item, index)=>{

        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";

        setTimeout(()=>{

            item.style.transition = "0.8s";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }, index * 300);

    });

};