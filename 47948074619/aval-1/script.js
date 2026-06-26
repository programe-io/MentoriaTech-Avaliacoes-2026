// Mensagem de boas-vindas
window.onload = function () {
    alert("🍫 Bem-vindo(a) à Doces Encantos! Esperamos adoçar o seu dia.");
    };

    // Saudação de acordo com o horário
    const hora = new Date().getHours();
    let mensagem = "";

    if (hora < 12) {
        mensagem = "☀️ Bom dia! Seja bem-vindo(a)!";
        } else if (hora < 18) {
            mensagem = "🌸 Boa tarde! Aproveite nossos doces!";
            } else {
                mensagem = "🌙 Boa noite! Conheça as delícias da Doces Encantos!";
                }

                console.log(mensagem);

                // Data