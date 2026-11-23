
function animarCarinha() {

    const carinha = document.querySelector(".carinha");

    carinha.innerHTML = "🙄";

    carinha.animate([
        { transform: "rotate(0deg) scale(1)" },
        { transform: "rotate(20deg) scale(1.3)" },
        { transform: "rotate(-20deg) scale(1.3)" },
        { transform: "rotate(0deg) scale(1)" }
    ], {
        duration: 1500,
        iterations: 2
    });

    setTimeout(() => {
        carinha.innerHTML = "😜";
    }, 3000);

    setTimeout(() => {
        carinha.innerHTML = "🙄";
    }, 4500);
}
