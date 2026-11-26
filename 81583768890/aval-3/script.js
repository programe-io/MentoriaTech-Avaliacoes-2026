const likeBtn = document.getElementById("like-btn");
const saveBtn = document.getElementById("save-btn");
const likesCountEl = document.getElementById("likes-count");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentsList = document.getElementById("comments-list");

let liked = false;
let likesCount = Number(likesCountEl.textContent);

likeBtn.addEventListener("click", () => {
  liked = !liked;
  likesCount = liked ? likesCount + 1 : likesCount - 1;

  likesCountEl.textContent = likesCount;
  likeBtn.textContent = liked ? "♥" : "♡";
  likeBtn.classList.toggle("liked", liked);
});

saveBtn.addEventListener("click", () => {
  saveBtn.classList.toggle("saved");
});

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = commentInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  const author = document.createElement("strong");
  author.textContent = "voce ";

  li.appendChild(author);
  li.appendChild(document.createTextNode(text));
  commentsList.appendChild(li);

  commentInput.value = "";
});