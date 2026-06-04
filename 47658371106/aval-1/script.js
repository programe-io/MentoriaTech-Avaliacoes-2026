// Mensagem de boas-vindas
window.onload = function(){
  alert("Bem-vindo ao site de Educação Financeira!");
  };

  // Função para mostrar dica financeira
  function mostrarDica(){

    const dicas = [
        "Economize pelo menos 10% da sua renda.",
            "Evite compras por impulso.",
                "Tenha uma reserva de emergência.",
                    "Anote seus gastos mensais.",
                        "Invista pensando no futuro."
                          ];

                            let numeroAleatorio = Math.floor(Math.random() * dicas.length);

                              document.getElementById("dica