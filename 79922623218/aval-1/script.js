
function mostrarMensagem() {
    alert("Bem-vindo ao Meu Blog! Aqui você aprende sobre tecnologia e educação.");
}

// Mensagem no console
console.log("Meu Blog foi carregado com sucesso!");

// Destaca os artigos ao passar o mouse
const posts = document.querySelectorAll(".post");

posts.forEach(function(post) {
    post.addEventListener("mouseenter", function() {
        post.style.transform = "scale(1.02)";
        post.style.transition = "0.3s";
    });

    post.addEventListener("mouseleave", function() {
        post.style.transform = "scale(1)";
    });
});
