// BOTÃO DE TEMA
const body = document.querySelector("body");

const btnTema = document.createElement("button");
btnTema.innerText = "🌗 Mudar Tema";
btnTema.style.position = "fixed";
btnTema.style.top = "10px";
btnTema.style.right = "10px";
btnTema.style.padding = "10px";
btnTema.style.cursor = "pointer";

document.body.appendChild(btnTema);

btnTema.addEventListener("click", () => {
  body.classList.toggle("light-mode");
});

// CURTIDAS
const posts = document.querySelectorAll(".post");

posts.forEach(post => {
  const likeBtn = document.createElement("button");
  likeBtn.innerText = "👍 Curtir";
  likeBtn.style.marginTop = "10px";

  post.appendChild(likeBtn);

  let likes = 0;

  likeBtn.addEventListener("click", () => {
    likes++;
    likeBtn.innerText = `👍 Curtido (${likes})`;
  });
});

// BUSCA
const search = document.createElement("input");
search.placeholder = "🔎 Buscar posts...";
search.style.display = "block";
search.style.margin = "20px auto";
search.style.padding = "10px";
search.style.width = "60%";

document.body.insertBefore(search, document.querySelector(".container"));

search.addEventListener("keyup", () => {
  const value = search.value.toLowerCase();

  posts.forEach(post => {
    post.style.display = post.innerText.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
});