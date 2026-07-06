document.getElementById("btn").addEventListener("click", () => {
  document.querySelector(".content").scrollIntoView({
    behavior: "smooth"
  });
});

// efeito simples de "pássaros voando"
const createBird = () => {
  const bird = document.createElement("div");
  bird.innerText = "🦜";
  bird.style.position = "fixed";
  bird.style.left = "-50px";
  bird.style.top = Math.random() * window.innerHeight + "px";
  bird.style.fontSize = "24px";
  bird.style.transition = "left 6s linear";
  document.body.appendChild(bird);

  setTimeout(() => {
    bird.style.left = window.innerWidth + "px";
  }, 100);

  setTimeout(() => {
    bird.remove();
  }, 7000);
};

setInterval(createBird, 2000);