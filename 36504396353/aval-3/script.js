/* ==========================================================
   Página de cursos: busca por texto, filtro por linguagem
   e filtro por nível, tudo combinado.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const campoBusca = document.querySelector("#busca");
  const seletorNivel = document.querySelector("#filtro-nivel");
  const chips = document.querySelectorAll(".chip-filtro");
  const cursos = document.querySelectorAll(".curso");
  const contador = document.querySelector("#contador-cursos");
  const semResultados = document.querySelector("#sem-resultados");
  const botaoLimpar = document.querySelector("#limpar-filtros");

  if (!campoBusca || cursos.length === 0) return;

  let linguagemAtual = "todas";

  /* Deixa tudo em minúsculas e sem acento: "Lógica" encontra "logica" */
  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function filtrar() {
    const termo = normalizar(campoBusca.value.trim());
    const nivel = seletorNivel.value;
    let visiveis = 0;

    cursos.forEach((curso) => {
      const bateLinguagem =
        linguagemAtual === "todas" || curso.dataset.linguagem === linguagemAtual;
      const bateNivel = nivel === "todos" || curso.dataset.nivel === nivel;
      const bateTexto = termo === "" || normalizar(curso.textContent).includes(termo);

      const mostrar = bateLinguagem && bateNivel && bateTexto;
      curso.hidden = !mostrar;
      if (mostrar) visiveis += 1;
    });

    contador.textContent =
      visiveis === 0
        ? "Nenhum curso encontrado"
        : visiveis === 1
        ? "1 curso encontrado"
        : `${visiveis} cursos encontrados`;

    semResultados.hidden = visiveis !== 0;
  }

  campoBusca.addEventListener("input", filtrar);
  seletorNivel.addEventListener("change", filtrar);

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      linguagemAtual = chip.dataset.linguagem;
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      filtrar();
    });
  });

  botaoLimpar.addEventListener("click", () => {
    campoBusca.value = "";
    seletorNivel.value = "todos";
    linguagemAtual = "todas";
    chips.forEach((c) =>
      c.setAttribute("aria-pressed", String(c.dataset.linguagem === "todas"))
    );
    filtrar();
    campoBusca.focus();
  });
});