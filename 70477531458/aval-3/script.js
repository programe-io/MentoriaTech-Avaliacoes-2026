
function criarJoinhas() {

    for (let i = 0; i < 15; i++) {

        const joinha = document.createElement("div");

        joinha.innerHTML = "👍";

        joinha.classList.add("joinha-flutuante");

        joinha.style.left = Math.random() * 100 + "vw";

        joinha.style.fontSize =
            (20 + Math.random() * 25) + "px";

        document.body.appendChild(joinha);

        joinha.animate([
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
            joinha.remove();
        }, 5000);
    }
}
