
function curtir(botao) {
  const post = botao.closest(".post");
  const numero = post.querySelector(".curtidas span");

  if (botao.textContent === "🤍") {
    botao.textContent = "❤️";
    numero.textContent = Number(numero.textContent) + 1;
  } else {
    botao.textContent = "🤍";
    numero.textContent = Number(numero.textContent) - 1;
  }
}

function comentar() {
  const comentario = prompt("Escreva seu comentário 💬");

  if (comentario) {
    alert("Comentário enviado: " + comentario);
  }
}

function compartilhar() {
  alert("Compartilhe seu amor por dormir! 💤💗");
}
