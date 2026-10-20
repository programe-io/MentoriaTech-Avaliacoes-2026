const mensagens = {
      music: "🎧 Coloque sua música favorita, curta o momento e deixe o ritmo combinar com você!",
        happy: "💗 Que hoje não faltem motivos para sorrir, se divertir e aproveitar as pequenas coisas!",
          calm: "☁️ Respire, relaxe e lembre-se de que você também merece momentos de tranquilidade."
          };

          const resultado = document.getElementById("resultado");
          const botoesVibe = document.querySelectorAll("[data-vibe]");

          botoesVibe.forEach((botao) => {
            botao.addEventListener("click", () => {
                const vibe = botao.dataset.vibe;

                    resultado.textContent = mensagens[vibe];

                        botoesVibe.forEach((item) => {
                              item.classList.remove("ativo");
                                  });

                                      botao.classList.add("ativo");
                                        });
                                        });

                                        const frases = [
                                          '"A vida também é feita dos pequenos momentos felizes." 💜',
                                            '"Seja a sua própria inspiração." ✨',
                                              '"Sua história merece ser vivida do seu jeito." 🦋',
                                                '"Não tenha pressa para descobrir todas as respostas." ☁️',
                                                  '"Continue encontrando beleza nas pequenas coisas." 🌷',
                                                    '"Faça mais daquilo que deixa seu coração feliz." 🎧'
                                                    ];

                                                    const fraseTexto = document.getElementById("fraseTexto");
                                                    const novaFrase = document.getElementById("novaFrase");

                                                    novaFrase.addEventListener("click", () => {
                                                      const anterior = fraseTexto.textContent;
                                                        let indice;

                                                          do {
                                                              indice = Math.floor(Math.random() * frases.length);
                                                                } while (frases[indice] === anterior);

                                                                  fraseTexto.textContent = frases[indice];
                                                                  });

                                                                  document.getElementById("ano").textContent =
                                                                    new Date().getFullYear();
}