document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");
  const container = document.querySelector(".container");

  // 1. Cria e adiciona um botão para alternar Modo Claro / Modo Escuro
  const btnTema = document.createElement("button");
  btnTema.textContent = "Alternar Tema Escuro";
  btnTema.style.marginTop = "15px";
  btnTema.style.padding = "8px 16px";
  btnTema.style.border = "none";
  btnTema.style.borderRadius = "5px";
  btnTema.style.backgroundColor = "#3b82f6";
  btnTema.style.color = "#ffffff";
  btnTema.style.fontWeight = "bold";
  btnTema.style.cursor = "pointer";

  let modoEscuro = false;

  btnTema.addEventListener("click", () => {
    modoEscuro = !modoEscuro;

    if (modoEscuro) {
      document.body.style.backgroundColor = "#0f172a";
      container.style.backgroundColor = "#1e293b";
      container.style.color = "#f1f5f9";
      btnTema.textContent = "Alternar Tema Claro";

      sections.forEach((sec) => {
        sec.style.backgroundColor = "#334155";
        sec.style.color = "#f8fafc";
      });

      document.querySelectorAll("h2").forEach((h2) => {
        h2.style.color = "#60a5fa";
      });

      document.querySelectorAll(".destaque").forEach((span) => {
        span.style.color = "#93c5fd";
      });
    } else {
      document.body.style.backgroundColor = "#f0f2f5";
      container.style.backgroundColor = "#ffffff";
      container.style.color = "#333333";
      btnTema.textContent = "Alternar Tema Escuro";

      sections.forEach((sec) => {
        sec.style.backgroundColor = "#f8fafc";
        sec.style.color = "#333333";
      });

      document.querySelectorAll("h2").forEach((h2) => {
        h2.style.color = "#1e293b";
      });

      document.querySelectorAll(".destaque").forEach((span) => {
        span.style.color = "#0f172a";
      });
    }
  });

  if (header) {
    header.appendChild(btnTema);
  }

  // 2. Permite clicar nos itens das listas para marcar/desmarcar como concluído
  const itensLista = document.querySelectorAll("li");

  itensLista.forEach((item) => {
    item.style.cursor = "pointer";
    item.title = "Clique para marcar ou desmarcar esta etapa";

    item.addEventListener("click", () => {
      if (item.style.textDecoration === "line-through") {
        item.style.textDecoration = "none";
        item.style.opacity = "1";
      } else {
        item.style.textDecoration = "line-through";
        item.style.opacity = "0.6";
      }
    });
  });

  // 3. Adiciona um botão de "Voltar ao Topo" no rodapé
  const footer = document.querySelector("footer");
  if (footer) {
    const btnTopo = document.createElement("button");
    btnTopo.textContent = "↑ Voltar ao topo";
    btnTopo.style.display = "block";
    btnTopo.style.margin = "10px auto 0";
    btnTopo.style.padding = "6px 12px";
    btnTopo.style.border = "1px solid #94a3b8";
    btnTopo.style.borderRadius = "4px";
    btnTopo.style.backgroundColor = "transparent";
    btnTopo.style.color = "#cbd5e1";
    btnTopo.style.cursor = "pointer";

    btnTopo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    footer.appendChild(btnTopo);
  }
});
