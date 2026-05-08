// Selecionando elementos
const chat = document.getElementById("chat");
const input = document.getElementById("mensagem");

// Adicionar mensagem no chat
function adicionarMensagem(texto, tipo = "Jogador") {
  const msg = document.createElement("div");
    msg.classList.add("msg");

      const hora = new Date().toLocaleTimeString();

        msg.innerHTML = `<strong>${tipo}:</strong> ${texto} <small style="opacity:0.6;">(${hora})</small>`;
          
            chat.appendChild(msg);
              chat.scrollTop = chat.scrollHeight;
              }

              // Enviar mensagem digitada
              function enviarMensagem() {
                const texto = input.value.trim();

                  if (texto !== "") {
                      adicionarMensagem(texto);
                          input.value = "";
                            }
                            }

                            // Enviar com ENTER
                            input.addEventListener("keypress", function(e) {
                              if (e.key === "Enter") {
                                  enviarMensagem();
                                    }
                                    });

                                    // Reconhecimento de voz
                                    function iniciarVoz() {
                                      if (!('webkitSpeechRecognition' in window)) {
                                          alert("Seu navegador não suporta reconhecimento de voz.");
                                              return;
                                                }

                                                  const recognition = new webkitSpeechRecognition();
                                                    recognition.lang = "pt-BR";
                                                      recognition.interimResults = false;
                                                        recognition.maxAlternatives = 1;

                                                          recognition.start();

                                                            adicionarMensagem("Ouvindo...", "Sistema");

                                                              recognition.onresult = function(event) {
                                                                  const texto = event.results[0][0].transcript;
                                                                      adicionarMensagem(texto, "🎤 Voz");
                                                                        };

                                                                          recognition.onerror = function(event) {
                                                                              adicionarMensagem("Erro no microfone", "Sistema");
                                                                                };

                                                                                  recognition.onend = function() {
                                                                                      adicionarMensagem("Microfone desligado", "Sistema");
                                                                                        };
                                                                                        }

                                                                                        // Mensagem inicial
                                                                                        window.onload = function() {
                                                                                          adicionarMensagem("Bem-vindo ao jogo de comunicação!", "Sistema");
                                                                                          };