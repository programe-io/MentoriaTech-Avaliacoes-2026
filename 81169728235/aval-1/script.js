// Quando clicar em um item do menu (nav)
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        alert("Você clicou em: " + this.textContent);
    });
});

// Quando passar o mouse na imagem
const imagem = document.querySelector("img");

imagem.addEventListener("mouseover", function() {
    this.style.transform = "scale(1.1)";
    this.style.transition = "0.3s";
});

imagem.addEventListener("mouseout", function() {
    this.style.transform = "scale(1)";
});

// Alterar conteúdo do aside
const aside = document.querySelector("aside");

aside.addEventListener("click", function() {
    this.innerHTML = "<h3>Atualizado!</h3><p>Você clicou no aside.</p>";
});