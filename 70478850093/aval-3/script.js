
function criarUvas() {

    for (let i = 0; i < 15; i++) {

        const uva = document.createElement("div");

        uva.innerHTML = "🍇";

        uva.classList.add("uva-flutuante");

        uva.style.left = Math.random() * 100 + "vw";

        uva.style.fontSize =
            (20 + Math.random() * 25) + "px";

        document.body.appendChild(uva);

        uva.animate([
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
            uva.remove();
        }, 5000);
    }
}
