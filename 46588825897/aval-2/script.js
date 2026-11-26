document.addEventListener("DOMContentLoaded", () => {
      // Saudação dinâmica baseada no horário
        const bioElement = document.querySelector(".bio");
          if (bioElement) {
              const hora = new Date().getHours();
                  let saudacao = "";
                      
                          if (hora >= 5 && hora < 12) {
                                saudacao = "🌅 Bom dia, seja bem-vindo!";
                                    } else if (hora >= 12 && hora < 18) {
                                          saudacao = "☀️ Boa tarde, seja bem-vindo!";
                                              } else {
                                                    saudacao = "🌙 Boa noite, seja bem-vindo!";
                                                        }
                                                            
                                                                const greetingTag = document.createElement("div");
                                                                    greetingTag.style.cssText = "font-size: 13px; color: #ffb6c1; margin-bottom: 10px; font-weight: 600;";
                                                                        greetingTag.textContent = saudacao;
                                                                            bioElement.parentNode.insertBefore(greetingTag, bioElement);
                                                                              }
                                                                              });
                                                                              
})