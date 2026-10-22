document.querySelectorAll(".post").forEach((post) => {
  const botao = post.querySelector(".curtir");
  const likes = post.querySelector(".likes");

  let curtido = false;
  let total = 0;

  botao.addEventListener("click", () => {
    curtido = !curtido;
    total = curtido ? 1 : 0;

    botao.textContent = curtido
      ? "❤️ Curtido"
      : "♡ Curtir";

    likes.textContent = `${total} curtidas`;
  });

  post.querySelector(".comentar").addEventListener("click", () => {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim()) {
      alert("Comentário registrado nesta demonstração!");
    }
  });
});

const seguir = document.getElementById("seguir");

seguir.addEventListener("click", () => {
  const seguindo = seguir.textContent === "Seguir";

  seguir.textContent = seguindo ? "Seguindo" : "Seguir";
  seguir.style.background = seguindo ? "#777" : "#0095f6";
});

document.getElementById("entrar").addEventListener("click", () => {
  alert("Página de demonstração. Login real não implementado.");
});