```javascript
// Rolagem suave ao clicar nos links do menu
const links = document.querySelectorAll("nav a");

links.forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();

    const destino = document.querySelector(link.getAttribute("href"));

    destino.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Mensagem ao clicar na imagem principal
const imagemHero = document.querySelector(".hero img");

imagemHero.addEventListener("click", () => {
  alert("Ethan Winters nunca desiste de proteger sua família!");
});

// Efeito de aparecer nas seções
const secoes = document.querySelectorAll("section, aside");

const mostrarSecoes = () => {
  secoes.forEach((secao) => {
    const posicao = secao.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;

    if (posicao < alturaTela - 100) {
      secao.style.opacity = "1";
      secao.style.transform = "translateY(0)";
    }
  });
};

secoes.forEach((secao) => {
  secao.style.opacity = "0";
  secao.style.transform = "translateY(30px)";
  secao.style.transition = "0.6s";
});

window.addEventListener("scroll", mostrarSecoes);

mostrarSecoes();
```
