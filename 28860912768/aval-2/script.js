```javascript
// Mensagem de boas-vindas
window.addEventListener("load", function () {
    alert("🌸 Bem-vinda ao Blog da Valeria! 🌸");
});

// Efeito nos posts
const posts = document.querySelectorAll(".post");

posts.forEach(function (post) {
    post.addEventListener("click", function () {
        post.style.transform = "scale(1.02)";
        
        setTimeout(function () {
            post.style.transform = "scale(1)";
        }, 200);
    });
});

// Data atual no rodapé
const footer = document.querySelector("footer");

const data = new Date();
const ano = data.getFullYear();

footer.innerHTML = `<p>© ${ano} Blog da Valeria 💕</p>`;
```
