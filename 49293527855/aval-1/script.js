const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "🌙 Modo branco";
  } else {
    themeBtn.textContent = "☀️ Modo escuro";
  }
});