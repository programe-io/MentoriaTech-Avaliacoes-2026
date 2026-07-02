// Animação dos posts

const posts = document.querySelectorAll(".post");

function aparecerPosts(){

    posts.forEach(post=>{

        const topo = post.getBoundingClientRect().top;

        if(topo < window.innerHeight - 100){
            post.classList.add("mostrar");
        }

    });

}

window.addEventListener("scroll", aparecerPosts);

aparecerPosts();


// Botão voltar ao topo

const botao = document.getElementById("topo");

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 300){
        botao.style.display="block";
    }else{
        botao.style.display="none";
    }

});

botao.addEventListener("click", ()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});