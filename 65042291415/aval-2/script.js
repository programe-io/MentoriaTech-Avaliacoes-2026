```javascript
// ===================================
// 1. MENSAGEM DE BOAS-VINDAS
// ===================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Site carregado com sucesso!");

    // Adiciona uma mensagem no console
    console.log("Bem-vindo ao meu site!");
});


// ===================================
// 2. BOTÃO DE MODO ESCURO
// ===================================

const botaoTema = document.createElement("button");

botaoTema.textContent = "🌙 Modo escuro";
botaoTema.id = "botao-tema";

document.body.prepend(botaoTema);

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("modo-escuro");

    const escuro = document.body.classList.contains("modo-escuro");

    botaoTema.textContent = escuro
        ? "☀️ Modo claro"
        : "🌙 Modo escuro";
});


// ===================================
// 3. ESTILOS DO MODO ESCURO
// ===================================

const estiloEscuro = document.createElement("style");

estiloEscuro.textContent = `
    body.modo-escuro {
        background-color: #111827;
        color: #f9fafb;
    }

    body.modo-escuro main,
    body.modo-escuro nav,
    body.modo-escuro form {
        background-color: #1f2937;
        color: #f9fafb;
    }

    body.modo-escuro h2,
    body.modo-escuro h3,
    body.modo-escuro label {
        color: #93c5fd;
    }

    body.modo-escuro input,
    body.modo-escuro select,
    body.modo-escuro textarea {
        background-color: #374151;
        color: white;
        border-color: #64748b;
    }

    body.modo-escuro details,
    body.modo-escuro blockquote {
        background-color: #374151;
        color: white;
    }

    body.modo-