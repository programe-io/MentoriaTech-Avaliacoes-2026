
function mostrarMagia(poder) {

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "Seu poder mágico é: " + poder + "!";

    resultado.style.color = "#bd50ff";

    resultado.style.transform = "scale(1.1)";

    setTimeout(() => {
        resultado.style.transform = "scale(1)";
    }, 300);
}
