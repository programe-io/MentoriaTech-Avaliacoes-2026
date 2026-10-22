
"use strict";

// Atualiza o ano automaticamente
const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}

// Alterna entre modo claro e escuro
const botaoTema = document.getElementById("tema");

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("escuro");

        const escuro = document.body.classList.contains("escuro");

        botaoTema.textContent = escuro
            ? "☀️ Modo claro"
            : "🌙 Modo escuro";
    });
}

// Valida o formulário
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

if (formulario && resultado) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (!nome || !email || !mensagem) {
            resultado.textContent = "Preencha todos os campos.";
            resultado.style.color = "#d63031";
            return;
        }

        resultado.textContent =
            `Obrigado, ${nome}! Seu formulário foi validado.`;

        resultado.style.color = "#00b894";

        formulario.reset();
    });
}

// Animação suave nos cards
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transition = "transform 0.3s ease";
    });
});

// Mensagem no console
console.log("Site carregado com sucesso!");
