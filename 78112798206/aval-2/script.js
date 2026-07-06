// Modo escuro

const dark = document.getElementById("darkMode");

dark.onclick = function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        dark.innerHTML="☀️";
    }else{
        dark.innerHTML="🌙";
    }

}

// Pesquisa

const search = document.getElementById("search");
const posts = document.querySelectorAll(".post");

search.addEventListener("keyup",()=>{

    let texto = search.value.toLowerCase();

    posts.forEach(post=>{

        if(post.innerText.toLowerCase().includes(texto)){
            post.style.display="block";
        }else{
            post.style.display="none";
        }

    })

})

// Curtidas

const likes = document.querySelectorAll(".like");

likes.forEach(botao=>{

    let curtido=false;

    botao.onclick=()=>{

        curtido=!curtido;

        if(curtido){
            botao.innerHTML="💖 Curtido";
        }else{
            botao.innerHTML="❤️ Curtir";
        }

    }

})