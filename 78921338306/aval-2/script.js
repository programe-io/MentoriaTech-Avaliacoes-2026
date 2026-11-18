
// Sistema de curtidas

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(botao => {
    botao.addEventListener("click", () => {

        const post = botao.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = parseInt(
            likes.textContent.match(/\d+/)[0]
        );

        if (botao.classList.contains("liked")) {
            botao.classList.remove("liked");
            botao.textContent = "♡";
            quantidade--;
        } else {
            botao.classList.add("liked");
            botao.textContent = "♥";
            quantidade++;
        }

        likes.textContent = quantidade + " curtidas";
    });
});

// Abrir stories

const stories = document.querySelectorAll(".story");

stories.forEach(story => {
    story.addEventListener("click", () => {
        const nome = story.querySelector("p").textContent;

        alert("Você está visualizando o story de " + nome + "!");
    });
});

// Mensagem no console

console.log("Bem-vindo ao Instagram - Meu Mundo!");
console.log("Perfis: Você, Fernanda, Meu Amor, Emanuelly, Marlos, Bebela e Belly.");
