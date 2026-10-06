let apoios = 0;

function votar() {
    apoios++;
    document.getElementById("resultado").innerText =
        apoios + " apoios";
}
