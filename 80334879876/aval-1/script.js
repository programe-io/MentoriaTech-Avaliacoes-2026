
const pesquisa = document.getElementById("pesquisa");
const posts = document.querySelectorAll(".post");
const mensagem = document.getElementById("sem-resultados");

// PESQUISAR PUBLICAÇÕES

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();
    let encontrados = 0;

    posts.forEach(function(post) {

        const conteudo = post.innerText.toLowerCase();

        if (conteudo.includes(texto)) {
            post.style.display = "block";
            encontrados++;
        } else {
            post.style.display = "none";
        }

    });

    mensagem.hidden = encontrados !== 0;

});

// CURTIR PUBLICAÇÕES

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function(botao) {

    let curtido = false;
    let quantidade = 0;

    botao.addEventListener("click", function() {

        if (!curtido) {
            quantidade++;
            botao.firstChild.textContent = "♥ Curtido ";
            curtido = true;

        } else {
            quantidade--;
            botao.firstChild.textContent = "♡ Curtir ";
            curtido = false;
        }

        botao.querySelector("span").textContent = quantidade;

    });

});
