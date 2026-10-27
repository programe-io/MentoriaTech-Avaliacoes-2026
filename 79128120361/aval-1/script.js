
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (evento) {
    const id = link.getAttribute("href").slice(1);
    const destino = document.getElementById(id);

    if (destino && destino.classList.contains("extra")) {
      evento.preventDefault();
      destino.hidden = !destino.hidden;
      link.textContent = destino.hidden ? "Leia mais" : "Leia menos";
    }
  });
});