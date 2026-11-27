
const followButton = document.getElementById("follow");

let following = false;

followButton.addEventListener("click", () => {
  following = !following;

  followButton.textContent = following
    ? "Seguindo"
    : "Seguir";

  followButton.style.background = following
    ? "#777"
    : "#0095f6";
});
