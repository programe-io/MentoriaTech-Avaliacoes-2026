document.addEventListener("DOMContentLoaded", () => {
    console.log("Site carregado com sucesso!");

    // Botão de envio do formulário
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // impede recarregar a página

            const nome = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;

            if (nome === "" || email === "") {
                alert("Preencha todos os campos!");
            } else {
                alert(`Obrigado, ${nome}! Seu formulário foi enviado.`);
                form.reset();
            }
        });
    }

    // Efeito simples no header ao clicar
    const header = document.querySelector("header");

    if (header) {
        header.addEventListener("click", () => {
            header.style.background = "#0f172a";
            header.style.transition = "0.5s";
        });
    }

    // Alterar cor dos links do nav ao passar o mouse
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "#facc15";
        });

        link.addEventListener("mouseout", () => {
            link.style.color = "white";
        });
    });

});