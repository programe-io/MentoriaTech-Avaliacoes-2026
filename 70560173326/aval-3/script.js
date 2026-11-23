
function criarCoracoes() {

    for (let i = 0; i < 15; i++) {

        const coracao = document.createElement("div");

        coracao.innerHTML = "💜";

        coracao.classList.add("coracao-flutuante");

        coracao.style.left = Math.random() * 100 + "vw";

        coracao.style.fontSize =
            (20 + Math.random() * 25) + "px";

        document.body.appendChild(coracao);

        coracao.animate([
            {
                transform: "translateY(0) rotate(0deg)",
                opacity: 1
            },
            {
                transform: "translateY(-110vh) rotate(360deg)",
                opacity: 0
            }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: "ease-out"
        });

        setTimeout(() => {
            coracao.remove();
        }, 5000);
    }
}
