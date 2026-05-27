document.querySelectorAll(".like-btn").forEach(button => {
  button.addEventListener("click", () => {
    button.textContent = "✔ Curtido!";
    button.style.backgroundColor = "#4CAF50";
  });
});
