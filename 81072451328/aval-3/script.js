// Quando clicar em Agendar, mostra um aviso
const botoes = document.querySelectorAll("button");
botoes.forEach(function(botao) {
  botao.addEventListener("click", function() {
      alert("Obrigada! Seu agendamento foi recebido 💄");
        });
        });

        // Quando enviar o formulário
        const form = document.querySelector("form");
        form.addEventListener("submit", function(evento) {
          evento.preventDefault();
            alert("Agendamento enviado com sucesso! Entraremos em contato no WhatsApp.");
            });