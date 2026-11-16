
const pesquisa = document.getElementById("pesquisa");
const posts = document.querySelectorAll(".post");
const mensagem = document.getElementById("sem-resultados");

// PESQUISAR POSTS

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();
    let encontrados = 0;

    posts.forEach(function(post) {

        const conteudo = post.innerText.toLowerCase();

        if (conteudo.includes(texto)) {
            post.style.display = "";
            encontrados++;
        } else {
            post.style.display = "none";
        }

    });

    mensagem.hidden = encontrados !== 0;

});

// CURTIR POSTS

document.querySelectorAll(".curtir").forEach(function(botao) {

    let curtido = false;
    let quantidade = 0;

    botao.addEventListener("click", function() {

        const contador = botao.querySelector("span");

        if (!curtido) {
            quantidade++;
            botao.firstChild.textContent = "♥ Curtido ";
            curtido = true;
        } else {
            quantidade--;
            botao.firstChild.textContent = "♡ Curtir ";
            curtido = false;
        }

        contador.textContent = quantidade;

    });

});
