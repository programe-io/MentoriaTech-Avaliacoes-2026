const mensagens = [
      "Você é incrível, Ariadiny! 🌟",
        "Parabéns, você finalizou a Avaliação 3! 🚀",
          "Futura programadora! 💻✨",
            "Mentoria TEC 2025! 💖"
            ];
            let i = 0;
            document.getElementById("meuBotao").addEventListener("click", function() {
              document.getElementById("mensagem").innerText = mensagens[i];
                i++;
                  if(i >= mensagens.length) { i = 0; }
                  });
]