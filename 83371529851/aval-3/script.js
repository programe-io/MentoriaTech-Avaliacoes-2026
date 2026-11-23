
let seguindo = false;
let seguidores = 4600;

function follow() {
  seguindo = !seguindo;

  if (seguindo) {
    seguidores++;
  } else {
    seguidores--;
  }

  document.getElementById("followers").textContent =
    seguidores.toLocaleString("pt-BR");

  document.getElementById("followBtn").textContent =
    seguindo ? "Seguindo ✓" : "Seguir";
}
