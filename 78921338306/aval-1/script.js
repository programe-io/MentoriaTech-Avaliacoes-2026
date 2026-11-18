
// Animação de entrada das seções

const secoes = document.querySelectorAll(".secao");

function revelarSecoes() {
    secoes.forEach(secao => {
        const posicao = secao.getBoundingClientRect().top;
        const alturaTela = window.innerHeight;

        if (posicao < alturaTela - 100) {
            secao.classList.add("visivel");
        }
    });
}

window.addEventListener("scroll", revelarSecoes);

revelarSecoes();

// Mensagem de boas-vindas

window.addEventListener("load", () => {
    console.log("Bem-vindo à página do cantor Jão!");
});
