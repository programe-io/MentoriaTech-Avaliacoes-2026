const botao = document.getElementById("tema");

botao.addEventListener("click", () => {
    document.body.classList.toggle("claro");
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

card.addEventListener("mouseenter", () => {

card.style.transform = "translateY(-10px) scale(1.05)";

});

card.addEventListener("mouseleave", () => {

card.style.transform = "translateY(0) scale(1)";

});

});