/* ==========================================
   JAVASCRIPT (A LÓGICA) - TEMA: FORTALECIMENTO
      ========================================== */

      // 1. Variáveis de controle de status (Banco de dados interno do jogo)
      let poderForca = 0;
      let nivelAtleta = 1;
      const metaEvolucao = 100; // Pontos de XP necessários para subir de nível

      // 2. Banco de frases motivacionais exibidas aleatoriamente ao treinar
      const feedbacksDeTreino = [
          "Mais uma repetição concluída! 💪",
              "A dor é temporária, o orgulho é eterno! 🔥",
                  "Você sente suas fibras se fortalecendo! ⚡",
                      "Consistência supera o talento! 🎯",
                          "Nenhum peso é grande demais para sua mente! 🚀"
                          ];

                          // 3. Função principal ativada pelo clique do botão de treino
                          function executarTreino() {
                              // Sorteia um ganho de força aleatório entre 15 e 25 XP por clique
                                  const ganhoDoTurno = Math.floor(Math.random() * 11) + 15;
                                      poderForca += ganhoDoTurno;

                                          // Captura os elementos HTML da tela para atualização imediata
                                              const txtNivel = document.getElementById('nivel');
                                                  const txtForca = document.getElementById('forca');
                                                      const txtMensagem = document.getElementById('mensagem');
                                                          const barra = document.getElementById('progresso');

                                                              // 4. Regra de Negócio: Verifica se o atleta mudou de nível
                                                                  if (poderForca >= metaEvolucao) {
                                                                          nivelAtleta++;
                                                                                  poderForca = poderForca - metaEvolucao; // Deduz os 100 XP e mantém a sobra
                                                                                          
                                                                                                  // Atualiza a tela com o novo nível e mensagem especial dourada
                                                                                                          if (txtNivel) txtNivel.textContent = nivelAtleta;
                                                                                                                  if (txtMensagem) {
                                                                                                                              txtMensagem.textContent = "🏆 INCRÍVEL! Você superou seus limites e subiu de nível!";
                                                                                                                                          txtMensagem.style.color = "#ffb800"; 
                                                                                                                                                  }
                                                                                                                                                      } else {
                                                                                                                                                              // Se não subiu de nível, escolhe uma frase motivacional aleatória
                                                                                                                                                                      const indiceAleatorio = Math.floor(Math.random() * feedbacksDeTreino.length);
                                                                                                                                                                              const mensagemAleatoria = feedbacksDeTreino[indiceAleatorio];
                                                                                                                                                                                      
                                                                                                                                                                                              if (txtMensagem) {
                                                                                                                                                                                                          txtMensagem.textContent = messageAleatoria;
                                                                                                                                                                                                                      txtMensagem.style.color = "#00ff88"; // Retorna para o verde neon padrão
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                      // 5. Atualização visual dos dados e da Barra de Progresso (CSS)
                                                                                                                                                                                                                                          if (txtForca) txtForca.textContent = poderForca + " XP";
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                  if (barra) {
                                                                                                                                                                                                                                                          // Calcula a porcentagem exata que a barra deve preencher (de 0% a 100%)
                                                                                                                                                                                                                                                                  const porcentagemBarra = (poderForca / metaEvolucao) * 100;
                                                                                                                                                                                                                                                                          barra.style.width = porcentagemBarra + "%";
                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                              