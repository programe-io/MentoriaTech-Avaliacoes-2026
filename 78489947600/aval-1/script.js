// Espera a página carregar toda
document.addEventListener("DOMContentLoaded", function() {

  // Pega o botão e o texto escondido
    const botao = document.getElementById("btnProximo");
      const proximoCapitulo = document.getElementById("proximoCapitulo");

        // Quando clicar no botão
          botao.addEventListener("click", function() {
              proximoCapitulo.style.display = "block"; // mostra o texto
                  botao.style.display = "none"; // esconde o botão
                    });

                    });