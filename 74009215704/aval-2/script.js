
document.addEventListener("DOMContentLoaded", () => {

  // Mensagem de boas-vindas
  alert("⛏️ Bem-vindo ao Fórum Minecraft!");

  // Botões de responder
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const resposta = prompt("Digite sua resposta:");
      if (resposta) {
        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + resposta;
        btn.parentElement.appendChild(novoComentario);
      \}
    \});
  \});

  // Efeito de clique nos links do menu
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      alert("🚧 Página em construção!");
    \});
  \});

  // Alternar modo claro/escuro estilo Minecraft
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🌙 Alternar Tema";
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  \});

\});$0