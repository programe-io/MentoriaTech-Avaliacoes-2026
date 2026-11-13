
// Animação ao aparecer na tela

const elementos = document.querySelectorAll(
    ".album, .song, .about"
);

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
        }
    });
}, {
    threshold: 0.2
});

elementos.forEach(elemento => {
    observador.observe(elemento);
});

// Clique nas músicas

const musicas = document.querySelectorAll(".song");

musicas.forEach(musica => {
    musica.addEventListener("click", () => {
        alert("🎧 Música selecionada: " +
            musica.textContent);
    });
});

// Mensagem de boas-vindas

console.log("Welcome to Frank Ocean's world!");
