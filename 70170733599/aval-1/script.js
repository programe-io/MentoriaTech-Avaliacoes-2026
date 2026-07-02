// Mensagem ao carregar o site
window.onload = function () {
    alert("Bem-vindo à JunizX23 Transportes!");
};

// Destaca o menu ao passar o mouse
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("mouseover", () => {
        link.style.color = "#FFD700";
    });

    link.addEventListener("mouseout", () => {
        link.style.color = "white";
    });
});

// Mensagem ao clicar no contato
const contato = document.getElementById("contato");

contato.addEventListener("click", () => {
    alert("Entre em contato conosco pelo telefone (86) 99999-9999 ou pelo e-mail contato@junizx23.com");
});