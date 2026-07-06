function mostrarInfo() {
  const info = document.getElementById("info");

  if (info.classList.contains("show")) {
    info.classList.remove("show");
    info.style.display = "none";
  } else {
    info.style.display = "block";
    setTimeout(() => {
      info.classList.add("show");
    }, 10);
  }
}