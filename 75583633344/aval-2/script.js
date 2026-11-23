
function lerMais(id) {
    const texto = document.getElementById(id);

    if (texto.style.display === "block") {
        texto.style.display = "none";
    } else {
        texto.style.display = "block";
    }
}

function agradecer() {
    alert("Obrigada pela visita! 💜 Assinado: Isadora.");
}
