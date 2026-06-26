let curtidas = 0;

function curtir() {
    curtidas++;
        document.getElementById("likes").innerText = "Curtidas: " + curtidas;
}