// Seleciona todos os botões de curtir
const likeButtons = document.querySelectorAll(".post-actions button:first-child");

// Adiciona a interação de curtida
likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("liked")) {
            button.classList.remove("liked");
            button.textContent = "❤️ Curtir";
        } else {
            button.classList.add("liked");
            button.textContent = "❤️ Curtido";
        }
    });
});


// Seleciona todos os botões de comentar
const commentButtons = document.querySelectorAll(".post-actions button:nth-child(2)");

// Adiciona uma interação simples para comentários
commentButtons.forEach((button) => {
    button.addEventListener("click", () => {
        alert("A área de comentários será disponibilizada em breve! 🚗");
    });
});


// Botão de nova publicação
const publishButton = document.querySelector(".new-post button");

publishButton.addEventListener("click", () => {
    alert("A criação de novas publicações será disponibilizada em breve! 🏎️");
});
