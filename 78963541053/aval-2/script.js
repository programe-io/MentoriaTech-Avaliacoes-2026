
const botao = document.querySelector(".botao");

botao.addEventListener("click", () => {
    document.querySelector("#lugares").scrollIntoView({
        behavior: "smooth"
    });
});

document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("selecionado");
    });
});
