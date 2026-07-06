const topo = document.getElementById("topo");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){
        topo.style.display = "block";
    }else{
        topo.style.display = "none";
    }

});

topo.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("keyup", () => {

    let texto = pesquisa.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post=>{

        let titulo = post.querySelector("h2").textContent.toLowerCase();

        if(titulo.includes(texto)){
            post.style.display="block";
        }else{
            post.style.display="none";
        }

    });

});

document.querySelectorAll("button").forEach(botao=>{

    if(botao.id !== "topo"){

        botao.addEventListener("click", ()=>{

            alert("Página da notícia em desenvolvimento.");

        });

    }

});