// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {

    // Seleciona os elementos
    const botao = document.getElementById("btn-interacao");
    const mensagem = document.getElementById("mensagem-retorno");

    // Verifica se os elementos existem
    if (!botao || !mensagem) {
        console.error("Elementos do botão ou da mensagem não foram encontrados.");
        return;
    }

    // Evento executado quando o botão é clicado
    botao.addEventListener("click", () => {

        // Obtém a hora atual
        const agora = new Date();
        const horaAtual = agora.getHours();

        // Define a saudação
        let saudacao;

        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = "☀️ Bom dia!";
        } 
        else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = "🌤️ Boa tarde!";
        } 
        else {
            saudacao = "🌙 Boa noite!";
        }

        // Formata a data
        const data = agora.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

        // Cria a mensagem
        mensagem.textContent =
            `${saudacao} Obrigado por visitar meu portfólio! 🚀`;

        // Adiciona a data
        mensagem.innerHTML +=
            `<br>Hoje é ${data}. Bora codar! 💻`;

        // Estiliza a mensagem
        mensagem.style.color = "#18bc9c";
        mensagem.style.fontWeight = "bold";

        // Animação da mensagem
        mensagem.style.opacity = "0";
        mensagem.style.transform = "translateY(10px)";

        setTimeout(() => {
            mensagem.style.transition = "all 0.5s ease";
            mensagem.style.opacity = "1";
            mensagem.style.transform = "translateY(0)";
        }, 100);

        // Altera o botão
        botao.textContent = "👋 Olá novamente!";

        // Efeito visual no botão
        botao.style.transform = "scale(1.05)";

        setTimeout(() => {
            botao.style.transform = "scale(1)";
        }, 200);
    });

});