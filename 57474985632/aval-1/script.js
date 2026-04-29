let curtidas = 0;

function curtir() {
  curtidas++;
  document.getElementById("contador").innerText = "Curtidas: " + curtidas;
}