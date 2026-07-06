const botao = document.getElementById("modoEscuro");

botao.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botao.innerHTML="☀️";
    }else{
        botao.innerHTML="🌙";
    }
});

// Pesquisa

const pesquisa = document.getElementById("pesquisa");
const noticias = document.querySelectorAll(".noticia");

pesquisa.addEventListener("keyup", function(){

    let texto = pesquisa.value.toLowerCase();

    noticias.forEach(noticia=>{

        if(noticia.innerText.toLowerCase().includes(texto)){
            noticia.style.display="block";
        }else{
            noticia.style.display="none";
        }

    });

});