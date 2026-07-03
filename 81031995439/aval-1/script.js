const bloco = document.getElementById("grama");

bloco.addEventListener("click", () => {
    bloco.style.transform = "scale(0.9)";

    setTimeout(() => {
        bloco.style.transform = "scale(1)";
    }, 100);
});