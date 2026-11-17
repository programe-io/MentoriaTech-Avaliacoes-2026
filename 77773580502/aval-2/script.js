
function addPost() {
  const textArea = document.getElementById("postText");
  const postList = document.getElementById("postList");

  const message = textArea.value.trim();

  if (message === "") {
    alert("Escreva alguma coisa antes de publicar!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  const title = document.createElement("h3");
  title.textContent = "STAY 💗";

  const paragraph = document.createElement("p");
  paragraph.textContent = message;

  const button = document.createElement("button");
  button.textContent = "♡ Curtir";
  button.onclick = function() {
    likePost(button);
  };

  post.appendChild(title);
  post.appendChild(paragraph);
  post.appendChild(button);

  postList.prepend(post);

  textArea.value = "";
}

function likePost(button) {
  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
    button.textContent = "♡ Curtir";
  } else {
    button.classList.add("liked");
    button.textContent = "♥ Curtido";
  }
}
