// BOTÃO DE TEMA
const body = document.querySelector("body");

const btnTema = document.createElement("button");
btnTema.innerText = "🌗 Mudar Tema";
btnTema.style.position = "fixed";
btnTema.style.top = "10px";
btnTema.style.right = "10px";
btnTema.style.padding = "10px";
btnTema.style.border = "none";
btnTema.style.borderRadius = "8px";

document.body.appendChild(btnTema);

btnTema.addEventListener("click", () => {
  body.classList.toggle("dark");
});

// CURTIDAS
const posts = document.querySelectorAll(".post");

posts.forEach(post => {
  const btn = document.createElement("button");
  btn.innerText = "👍 Curtir";
  btn.style.marginTop = "10px";

  post.appendChild(btn);

  let likes = 0;

  btn.addEventListener("click", () => {
    likes++;
    btn.innerText = `👍 Curtido (${likes})`;
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