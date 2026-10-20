// ==========================================
 // 📌 Função simples: Mostrar uma mensagem
  // ==========================================
   function saudacao() {
        let nome = prompt("Qual é o seu nome?");
             if (nome) {
                      alert(`Olá, ${nome}! 👋 Bem-vindo ao JavaScript!`);
                           } else {
                                    alert("Olá! 👋 Bem-vindo ao JavaScript!");
                                         }
                                          }
                                           // ==========================================
                                            // 📌 Função: Calcular soma de dois números
                                             // ==========================================
                                              function somar() {
                                                   let num1 = parseFloat(prompt("Digite o primeiro número:"));
                                                        let num2 = parseFloat(prompt("Digite o segundo número:"));
                                                             
                                                                  if (isNaN(num1) || isNaN(num2)) {
                                                                           alert("⚠️ Por favor, digite números válidos!");
                                                                                    return;
                                                                                         }
                                                                                              
                                                                                                   let resultado = num1 + num2;
                                                                                                        alert(`✅ Resultado: ${num1} + ${num2} = ${resultado}`);
                                                                                                         }
                                                                                                          // ==========================================
                                                                                                           // 📌 Função: Mudar texto na página
                                                                                                            // ==========================================
                                                                                                             function mudarTexto() {
                                                                                                                  let elemento = document.getElementById("mensagem");
                                                                                                                       elemento.textContent = "✨ O texto mudou! JavaScript é incrível!";
                                                                                                                            elemento.style.color = "#e74c3c";
                                                                                                                                 elemento.style.fontWeight = "bold";
                                                                                                                                  }