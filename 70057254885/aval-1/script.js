// Mensagem de boas-vindas
window.onload = function () {
    alert("✨ Seja bem-vindo(a) ao Blog da Thayane! Aproveite as dicas de beleza, cabelo, academia e autocuidado.");
    };

    // Data atual
    const hoje = new Date();

    const data = hoje.toLocaleDateString("pt-BR", {
        day: "2-digit",
            month: "long",
                year: "numeric"
                });

                console.log("Acesso em: " + data);

                // Mensagem no console
                console.log("Obrigado por visitar o Blog da Thayane! 💕");