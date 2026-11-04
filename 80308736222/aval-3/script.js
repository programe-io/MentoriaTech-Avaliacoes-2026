function curtir(botao) {

  let postagem = botao.closest(".publicacao");
  let texto = postagem.querySelector("p");
  let numero = Number(
    texto.textContent.replace(/\D/g, "")
  );

  if (botao.textContent === "♡") {

    botao.textContent = "♥";
    botao.style.color = "red";
    numero++;

  } else {

    botao.textContent = "♡";
    botao.style.color = "black";
    numero--;

  }

  texto.textContent = numero + " curtidas";
}

function comentar() {

  let comentario = prompt("Digite seu comentário:");

  if (comentario && comentario.trim()) {
    alert("Comentário enviado com sucesso!");
  }

}