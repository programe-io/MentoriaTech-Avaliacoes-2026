// MENU ATIVO

const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(link => {

  link.addEventListener("click", function () {

    menuLinks.forEach(item => {
      item.classList.remove("active");
    });

    this.classList.add("active");

  });

});

// ANIMAÇÃO SUAVE AO ROLAR A PÁGINA

const articles = document.querySelectorAll("article");

window.addEventListener("scroll", () => {

  articles.forEach(article => {

    const articleTop = article.getBoundingClientRect().top;

    if(articleTop < window.innerHeight - 100){

      article.style.opacity = "1";
      article.style.transform = "translateY(0px)";

    }

  });

});

// ESTILO INICIAL DOS ARTIGOS

articles.forEach(article => {

  article.style.opacity = "0";
  article.style.transform = "translateY(40px)";
  article.style.transition = "0.6s";

});

// BOTÃO HERO

const heroButton = document.querySelector(".btn");

heroButton.addEventListener("mouseenter", () => {

  heroButton.style.transform = "scale(1.05)";

});

heroButton.addEventListener("mouseleave", () => {

  heroButton.style.transform = "scale(1)";

});

// EFEITO NAS IMAGENS

const images = document.querySelectorAll(".grid img");

images.forEach(image => {

  image.addEventListener("mouseover", () => {

    image.style.filter = "brightness(1.2)";
    image.style.transform = "scale(1.05)";

  });

  image.addEventListener("mouseout", () => {

    image.style.filter = "brightness(1)";
    image.style.transform = "scale(1)";

  });

});

// MENSAGEM DE BOAS-VINDAS

window.addEventListener("load", () => {

  console.log("AI Future Blog carregado com sucesso!");

});

// BOTÃO VOLTAR AO TOPO

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.bottom = "20px";
topButton.style.right = "20px";
topButton.style.padding = "12px 16px";
topButton.style.border = "none";
topButton.style.borderRadius = "10px";
topButton.style.background = "#38bdf8";
topButton.style.color = "#0f172a";
topButton.style.fontSize = "20px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.transition = "0.3s";

window.addEventListener("scroll", () => {

  if(window.scrollY > 300){

    topButton.style.display = "block";

  } else {

    topButton.style.display = "none";

  }

});

topButton.addEventListener("click", () => {

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

});