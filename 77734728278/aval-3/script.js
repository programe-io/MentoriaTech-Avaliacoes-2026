const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });

    card.addEventListener("click", () => {
        alert("Você selecionou uma paisagem da Era Moderna!");
    });

});

console.log("Galeria de Paisagens da Era Moderna carregada com sucesso!");