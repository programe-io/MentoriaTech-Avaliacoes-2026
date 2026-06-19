 JavaScript (script.js)

function mostrarMensagem() {
    alert("🎮 Seja bem-vindo ao GameZone, Vinícius Vianna!");
}
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("mouseover", () => {
        card.style.boxShadow = "0 0 25px #00c3ff";
    });
    card.addEventListener("mouseout", () => {
        card.style.boxShadow = "none";
    });
});