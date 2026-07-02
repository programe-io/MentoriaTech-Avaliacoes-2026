// Mostrar e esconder conteúdo

const botao = document.querySelector(".btn");
const extra = document.querySelector(".extra");

botao.addEventListener("click", () => {

    if(extra.style.display === "block"){
        extra.style.display = "none";
        botao.textContent = "Ler Mais";
    }else{
        extra.style.display = "block";
        botao.textContent = "Mostrar Menos";
    }

});

// Animação ao carregar a página

window.addEventListener("load", ()=>{

    const post = document.querySelector(".post");

    post.style.opacity = "0";
    post.style.transform = "translateY(50px)";

    setTimeout(()=>{

        post.style.transition = "1s";
        post.style.opacity = "1";
        post.style.transform = "translateY(0)";

    },300);

});

// Efeito ao passar o mouse

const links = document.querySelectorAll(".sidebar li");

links.forEach(item=>{

    item.addEventListener("mouseover",()=>{

        item.style.transform="translateX(10px)";
        item.style.transition=".3s";

    });

    item.addEventListener("mouseout",()=>{

        item.style.transform="translateX(0)";

    });

});