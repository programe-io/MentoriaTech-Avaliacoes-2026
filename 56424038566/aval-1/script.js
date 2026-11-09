
const pesquisa = document.getElementById("pesquisa");
const fotos = document.querySelectorAll(".foto");
const categorias = document.querySelectorAll(".categoria");
const semResultados = document.getElementById("semResultados");

// Pesquisa de imagens
pesquisa.addEventListener("input", filtrarFotos);

function filtrarFotos() {
  const texto = pesquisa.value.toLowerCase();
  const categoriaAtiva = document.querySelector(
    ".categoria.selecionada"
  ).dataset.categoria;

  let quantidade = 0;

  fotos.forEach(foto => {
    const titulo = foto.querySelector("h3").textContent.toLowerCase();
    const categoria = foto.dataset.categoria;

    const combinaTexto = titulo.includes(texto);
    const combinaCategoria =
      categoriaAtiva === "Todas" || categoria === categoriaAtiva;

    const mostrar = combinaTexto && combinaCategoria;

    foto.style.display = mostrar ? "inline-block" : "none";

    if (mostrar) quantidade++;
  });

  semResultados.hidden = quantidade > 0;
}

// Filtro de categorias
categorias.forEach(botao => {
  botao.addEventListener("click", () => {
    categorias.forEach(item =>
      item.classList.remove("selecionada")
    );

    botao.classList.add("selecionada");
    filtrarFotos();
  });
});

// Curtir imagens
document.querySelectorAll(".curtir").forEach(botao => {
  botao.addEventListener("click", () => {
    botao.classList.toggle("liked");

    botao.textContent =
      botao.classList.contains("liked") ? "♥" : "♡";
  });
});

// Salvar imagens
document.querySelectorAll(".salvar").forEach(botao => {
  botao.addEventListener("click", () => {
    botao.classList.toggle("saved");

    botao.textContent =
      botao.classList.contains("saved") ? "Salvo ✓" : "Salvar";
  });
});
