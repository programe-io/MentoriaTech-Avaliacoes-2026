
function criarBolhas() {

    for (let i = 0; i < 12; i++) {

        const bolha = document.createElement("div");

        bolha.innerHTML = "🫧";

        bolha.style.position = "fixed";
        bolha.style.left = Math.random() * 100 + "vw";
        bolha.style.bottom = "-40px";
        bolha.style.fontSize = "25px";
        bolha.style.zIndex = "3";
        bolha.style.pointerEvents = "none";

        document.body.appendChild(bolha);

        bolha.animate([
            {
                transform: "translateY(0)",
                opacity: 1
            },
            {
                transform: "translateY(-100vh)",
                opacity: 0
            }
        ], {
            duration: 3000,
            easing: "ease-out"
        });

        setTimeout(() => {
            bolha.remove();
        }, 3000);
    }
}
