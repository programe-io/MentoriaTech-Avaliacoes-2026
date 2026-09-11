// Variáveis de controle de status
let forcaAtual = 0;
let nivelAtual = 1;
const pontosParaEvoluir = 100;

// Frases motivacionais de fortalecimento
const frasesMotivacionais = [
    "Mais uma repetição concluída! 💪",
        "A dor é temporária, o orgulho é para sempre! 🔥",
            "Você está ficando visivelmente mais forte! ⚡",
                "Foco e consistência geram resultados! 🎯",
                    "Nenhum obstáculo é maior que a sua vontade! 🚀"
                    ];

                    // Mapeando os elementos do HTML
                    const btnTreinar = document.getElementById('btn-treinar');
                    const txtForca = document.getElementById('forca');
                    const txtNivel = document.getElementById('nivel');
                    const txtMensagem = document.getElementById('mensagem');
                    const barraProgresso = document.getElementById('progresso');

                    // Função executada ao clicar no botão
                    btnTreinar.addEventListener('click', () => {
                        // Adiciona entre 15 e 25 de força a cada treino
                            const ganhoDeForca = Math.floor(Math.random() * 11) + 15;
                                forcaAtual += ganhoDeForca;

                                    // Se atingir o limite, sobe de nível
                                        if (forcaAtual >= pontosParaEvoluir) {
                                                nivelAtual++;
                                                        forcaAtual = forcaAtual - pontosParaEvoluir; // Mantém o que sobrou
                                                                txtNivel.textContent = nivelAtual;
                                                                        txtMensagem.textContent = "🏆 INCRÍVEL! Você quebrou seus limites e subiu de nível!";
                                                                                txtMensagem.style.color = "#ffb800";
                                                                                    } else {
                                                                                            // Escolhe uma frase aleatória do array
                                                                                                    const fraseAleatoria = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
                                                                                                            txtMensagem.textContent = fraseAleatoria;
                                                                                                                    txtMensagem.style.color = "#00b37e";
                                                                                                                        }

                                                                                                                            // Atualiza a interface gráfica
                                                                                                                                txtForca.textContent = forcaAtual;
                                                                                                                                    
                                                                                                                                        // Calcula a porcentagem da barra de progresso
                                                                                                                                            const porcentagem = (forcaAtual / pontosParaEvoluir) * 100;
                                                                                                                                                barraProgresso.style.width = `${porcentagem}%`;
                                                                                                                                                });
                                                                                                                                                