v// Botão para alternar entre tema escuro e claro

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }
});


// Mensagem de boas-vindas

const messageButton = document.getElementById("messageButton");
const message = document.getElementById("message");

messageButton.addEventListener("click", () => {
    message.textContent =
        "Obrigado por visitar meu portfólio! 🚀";

    messageButton.textContent = "Obrigado! ❤️";
});


// Atualiza automaticamente o ano do rodapé

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


// Efeito simples ao rolar a página

const cards = document.querySelectorAll(".interest-card");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }

        });
    },
    {
        threshold: 0.2
    }
);

cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s ease";

    observer.observe(card);
});
