// Curtir publicação
const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach((botao) => {

    botao.addEventListener("click", () => {

        const post = botao.closest(".post");
        const contador = post.querySelector(".curtidas");

        let numero = parseInt(contador.textContent);

        if (!botao.classList.contains("ativo")) {
            botao.classList.add("ativo");
            botao.textContent = "♥";
            numero++;
        } else {
            botao.classList.remove("ativo");
            botao.textContent = "♡";
            numero--;
        }

        contador.textContent = `${numero} curtidas`;
    });

});


// Botões "Seguir"
const botoesSeguir = document.querySelectorAll(".sugestao button");

botoesSeguir.forEach((botao) => {

    botao.addEventListener("click", () => {

        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
            botao.style.color = "#888";
        } else {
            botao.textContent = "Seguir";
            botao.style.color = "#0095f6";
        }

    });

});


// Pesquisa
const pesquisa = document.querySelector("#pesquisa");

pesquisa.addEventListener("input", () => {

    const termo = pesquisa.value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach((post) => {

        const texto = post.textContent.toLowerCase();

        if (texto.includes(termo)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});


// Botão de comentários
const botoesComentarios = document.querySelectorAll(".comentarios");

botoesComentarios.forEach((botao) => {

    botao.addEventListener("click", () => {
        alert("Área de comentários aberta!");
    });

});