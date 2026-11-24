
function mensagem() {
    alert("Bem-vindo ao universo do ORUAM! 🔥");
}

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.borderBottom = "2px solid red";
    } else {
        header.style.borderBottom = "none";
    }
});
