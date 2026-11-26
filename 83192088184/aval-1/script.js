
// Efeito de clique nos links
const links = document.querySelectorAll(".links a");

links.forEach(link => {
  link.addEventListener("click", () => {
      console.log("Link clicado:", link.textContent);
        });
        });
        