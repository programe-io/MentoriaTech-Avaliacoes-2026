
// Atualiza automaticamente o ano do rodapé
document.getElementById("ano").textContent =
  new Date().getFullYear();

// Abre uma notícia em uma janela simples
function lerNoticia(titulo, texto) {
  alert(titulo + "\n\n" + texto);
}

// Interação com a torcida
function mostrarApoio() {
  const mensagem = document.getElementById("mensagem");

  mensagem.textContent =
    "🔴⚪⚫ Saudações Tricolores! O orgulho é nosso!";

  mensagem.style.fontWeight = "bold";
}

// Botão de voltar ao topo
const botaoTopo = document.getElementById("topo");

// Mostra o botão durante a rolagem da página
window.addEventListener("scroll", function() {
  botaoTopo.style.display =
    window.scrollY > 300 ? "block" : "none";
});
