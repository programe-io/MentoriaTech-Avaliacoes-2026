// Curtir publicações
document.querySelectorAll(".like").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");

    button.textContent =
      button.classList.contains("active") ? "♥" : "♡";
  });
});

// Salvar publicações
document.querySelectorAll(".save").forEach(button => {
  button.addEventListener("click", () => {
    button.textContent =
      button.textContent === "♧" ? "🔖" : "♧";
  });
});

// Adicionar comentários
document.querySelectorAll(".comment-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const input = form.querySelector("input");
    const comments = form.parentElement.querySelector(".comments");

    const comment = document.createElement("p");
    comment.textContent = "Você: " + input.value;

    comments.appendChild(comment);

    input.value = "";
  });
});

// Criar nova publicação
document.getElementById("createBtn")
  .addEventListener("click", event => {

    event.preventDefault();

    const imageUrl = prompt("Digite a URL da imagem:");

    if (!imageUrl) return;

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("header");
    header.className = "post-header";

    const username = document.createElement("strong");
    username.textContent = "meu_perfil";

    header.appendChild(username);

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = imageUrl;

    image.onerror = () => {
      alert("Não foi possível carregar essa imagem.");
      post.remove();
    };

    const caption = document.createElement("p");
    caption.textContent = "Minha nova publicação! 📸";
    caption.style.padding = "12px";

    post.append(header, image, caption);

    document.getElementById("feed").prepend(post);
  });
