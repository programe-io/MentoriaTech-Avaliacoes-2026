// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function() {
  
  // Seleciona o botão pelo elemento (ou você pode usar uma classe/ID)
  const botao = document.querySelector("button");

  // Adiciona um evento de clique ao botão
  if (botao) {
    botao.addEventListener("click", function() {
      alert("Olá! Você clicou no botão usando JavaScript.");
      
      // Exemplo adicional: altera o texto de um parágrafo na tela
      const paragrafo = document.querySelector("p");
      if (paragrafo) {
        paragrafo.textContent = "O texto foi alterado com sucesso pelo JavaScript!";
        paragrafo.style.color = "#0056b3";
      }
    });
  }

});