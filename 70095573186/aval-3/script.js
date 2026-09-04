```javascript
// BOTÃO SEGUIR

const btnSeguir = document.getElementById("btnSeguir");

btnSeguir.addEventListener("click", function () {

    if (btnSeguir.innerText === "Seguir") {
        btnSeguir.innerText = "Seguindo";
        btnSeguir.style.background = "#777";
    } else {
        btnSeguir.innerText = "Seguir";
        btnSeguir.style.background = "#0095f6";
    }

});


// CURTIDAS

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const postagem = botao.closest(".post");
        const contador = postagem.querySelector(".contador");

        let curtidas = parseInt(contador.innerText.replace(".", ""));

        if (botao.innerText === "♡") {

            botao.innerText = "♥";
            curtidas++;

        } else {

            botao.innerText = "♡";
            curtidas--;

        }

        contador.innerText = curtidas.toLocaleString("pt-BR");

    });

});


// SALVAR PUBLICAÇÃO

const botoesSalvar = document.querySelectorAll(".salvar");

botoesSalvar.forEach(function (botao) {

    botao.addEventListener("click", function () {

        if (botao.innerText === "🔖") {
            botao.innerText = "🔒";
        } else {
            botao.innerText = "🔖";
        }

    });

});


// PESQUISA

const campoPesquisa = document.getElementById("campoPesquisa");
const posts = document.querySelectorAll(".post");

campoPesquisa.addEventListener("input", function () {

    const pesquisa = campoPesquisa.value.toLowerCase();

    posts.forEach(function (post) {

        const texto = post.innerText.toLowerCase();

        if (texto.includes(pesquisa)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});
```
