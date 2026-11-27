let curtidas = 0;

function curtir() {
    curtidas++;

    document.getElementById("likes").innerHTML =
        curtidas + " curtidas";
}