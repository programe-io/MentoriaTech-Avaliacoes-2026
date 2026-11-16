
function likePost(button) {
  const post = button.closest(".post");
  const likes = post.querySelector(".likes");

  let count = Number(likes.dataset.count || 0);

  if (button.dataset.liked === "true") {
    count--;
    button.dataset.liked = "false";
    button.innerHTML = "🤍 Curtir";
  } else {
    count++;
    button.dataset.liked = "true";
    button.innerHTML = "❤️ Curtido";
  }

  likes.dataset.count = count;
  likes.textContent = count + " curtidas";
}

function addPost() {
  const username = document.getElementById("username").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const caption = document.getElementById("caption").value.trim();

  if (!username || !imageUrl || !caption) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const url = new URL(imageUrl);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("URL inválida");
    }

    const post = document.createElement("article");
    post.className = "post";

    const title = document.createElement("h3");
    title.textContent = username;

    const img = document.createElement("img");
    img.src = url.href;
    img.alt = "Imagem publicada";

    const actions = document.createElement("div");
    actions.className = "actions";

    const button = document.createElement("button");
    button.textContent = "🤍 Curtir";
    button.addEventListener("click", function() {
      likePost(button);
    });

    actions.appendChild(button);

    const description = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = username + ": ";
    description.append(strong, document.createTextNode(caption));

    const likes = document.createElement("span");
    likes.className = "likes";
    likes.dataset.count = "0";
    likes.textContent = "0 curtidas";

    post.append(title, img, actions, description, likes);

    document.getElementById("feed").prepend(post);

    document.getElementById("username").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("caption").value = "";

  } catch {
    alert("Digite uma URL de imagem válida!");
  }
}
