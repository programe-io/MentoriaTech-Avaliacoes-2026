document.addEventListener("DOMContentLoaded", function () {

  // Mensagem de boas-vindas
  console.log("Blog do Meio Ambiente carregado 🌿");

  // Criar botão de modo escuro
  const botao = document.createElement("button");
  botao.innerText = "🌙 Modo Escuro";
  botao.style.position = "fixed";
  botao.style.bottom = "20px";
  botao.style.right = "20px";
  botao.style.padding = "12px";
  botao.style.border = "none";
  botao.style.borderRadius = "8px";
  botao.style.cursor = "pointer";
  botao.style.backgroundColor = "#27ae60";
  botao.style.color = "white";
  botao.style.fontWeight = "bold";

  document.body.appendChild(botao);

  let escuro = false;

  botao.addEventListener("click", function () {
    escuro = !escuro;

    if (escuro) {
      document.body.style.backgroundColor = "#1e272e";
      document.body.style.color = "white";
      botao.innerText = "☀️ Modo Claro";
      botao.style.backgroundColor = "#555";

      // deixar posts escuros também
      document.querySelectorAll(".post").forEach(post => {
        post.style.backgroundColor = "#2f3640";
        post.style.color = "white";
      });

      document.querySelector("aside").style.backgroundColor = "#2d3436";
      document.querySelector("aside").style.color = "white";

    } else {
      document.body.style.backgroundColor = "#eef7ee";
      document.body.style.color = "#2c3e50";
      botao.innerText = "🌙 Modo Escuro";
      botao.style.backgroundColor = "#27ae60";

      document.querySelectorAll(".post").forEach(post => {
        post.style.backgroundColor = "white";
        post.style.color = "#2c3e50";
      });

      document.querySelector("aside").style.backgroundColor = "#dff5e1";
      document.querySelector("aside").style.color = "#2c3e50";
    }
  });

  // Efeito ao clicar nas imagens
  const imagens = document.querySelectorAll(".post img");

  imagens.forEach(img => {
    img.addEventListener("click", () => {
      img.style.transform = "scale(1.1)";
      img.style.transition = "0.3s";

      setTimeout(() => {
        img.style.transform = "scale(1)";
      }, 500);
    });
  });

  // Mensagem ao passar no aside
  const aside = document.querySelector("aside");

  aside.addEventListener("mouseover", () => {
    aside.style.transform = "scale(1.02)";
    aside.style.transition = "0.3s";
  });

  aside.addEventListener("mouseout", () => {
    aside.style.transform = "scale(1)";
  });

});