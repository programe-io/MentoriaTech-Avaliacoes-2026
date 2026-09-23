console.log("✅ Feed carregado com sucesso!");

const botoes = document.querySelectorAll(".btn-curtir");

botoes.forEach(botao => {
  botao.addEventListener("click", function() {
      alert("❤️ Você curtiu essa publicação!");
        });
        });
        