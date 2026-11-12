function estruturaIniciada() {
  console.log("Clone do Instagram carregado com sucesso!");
}

function toggleLike(button) {
  // Simples interação de clique no botão de curtir
  if (button.style.transform === "scale(1.2)") {
    button.style.transform = "scale(1)";
  } else {
    button.style.transform = "scale(1.2)";
  }
}

estruturaIniciada();
