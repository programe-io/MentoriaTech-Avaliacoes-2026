// Banco de dados de "códigos de treino"
const codigosDeTreino = [
    "atleta.fazerFlexao(10);",
        "atleta.levantarPeso('20kg');",
            "atleta.correrNaEsteira();",
                "atleta.tomarWheyProtein();",
                    "atleta.agachamentoSubir();",
                        "atleta.descansarMusculo();"
                        ];

                        // Evolução do Personagem
                        const patamaresEvolucao = [
                            { nivel: 1, nome: "👶 Iniciante", cor: "#00ff88" },
                                { nivel: 2, nome: "🏃‍♂️ focado", cor: "#00b37e" },
                                    { nivel: 3, nome: "💪 Monstro", cor: "#ffb800" },
                                        { nivel: 4, nome: "🔱 Hulk Dev", cor: "#ff79c6" }
                                        ];

                                        let forcaAtual = 0;
                                        let nivelAtual = 1;
                                        let codigoAlvoAtual = "";

                                        // Elementos HTML
                                        const elCodigoAlvo = document.getElementById('codigo-alvo');
                                        const elInputCodigo = document.getElementById('input-codigo');
                                        const elForca = document.getElementById('forca');
                                        const elNivel = document.getElementById('nivel');
                                        const elProgresso = document.getElementById('progresso');
                                        const elFeedback = document.getElementById('feedback');
                                        const elAvatar = document.getElementById('avatar');

                                        // Função para sortear um novo comando de treino
                                        function gerarNovoComando() {
                                            const indice = Math.floor(Math.random() * codigosDeTreino.length);
                                                codigoAlvoAtual = codigosDeTreino[indice];
                                                    elCodigoAlvo.textContent = codigoAlvoAtual;
                                                        elInputCodigo.value = ""; // Limpa o campo
                                                        }

                                                        // Verifica o que o jogador está digitando
                                                        elInputCodigo.addEventListener('keydown', (evento) => {
                                                            // Só roda a validação se o jogador apertar "Enter"
                                                                if (evento.key === 'Enter') {
                                                                        const textoDigitado = elInputCodigo.value;

                                                                                if (textoDigitado === codigoAlvoAtual) {
                                                                                            // Ganha pontos de força
                                                                                                        forcaAtual += 25; 
                                                                                                                    elFeedback.textContent = "✅ Repetição perfeita! +25 XP de Força!";
                                                                                                                                elFeedback.style.color = "#00ff88";

                                                                                                                                            // Verifica se subiu de nível (limite 100)
                                                                                                                                                        if (forcaAtual >= 100) {
                                                                                                                                                                        nivelAtual++;
                                                                                                                                                                                        forcaAtual = 0;
                                                                                                                                                                                                        elNivel.textContent = nivelAtual;
                                                                                                                                                                                                                        atualizarAvatar();
                                                                                                                                                                                                                                        elFeedback.textContent = "🔥 INCRÍVEL! Você codificou duro e subiu de nível!";
                                                                                                                                                                                                                                                        elFeedback.style.color = "#ffb800";
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                // Atualiza a tela
                                                                                                                                                                                                                                                                                            elForca.textContent = `${forcaAtual}`;
                                                                                                                                                                                                                                                                                                        elProgresso.style.width = `${forcaAtual}%`;
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                // Próximo desafio
                                                                                                                                                                                                                                                                                                                                            gerarNovoComando();
                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                // Errou o código
                                                                                                                                                                                                                                                                                                                                                                            elFeedback.textContent = "❌ Erro de sintaxe! O músculo falhou. Tente novamente.";
                                                                                                                                                                                                                                                                                                                                                                                        elFeedback.style.color = "#ff5555";
                                                                                                                                                                                                                                                                                                                                                                                                    elInputCodigo.select(); // Seleciona o texto para facilitar a correção
                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                // Atualiza o visual do boneco baseado no nível
                                                                                                                                                                                                                                                                                                                                                                                                                function atualizarAvatar() {
                                                                                                                                                                                                                                                                                                                                                                                                                    const estagio = patamaresEvolucao.find(p => p.nivel === nivelAtual) || patamaresEvolucao[patamaresEvolucao.length - 1];
                                                                                                                                                                                                                                                                                                                                                                                                                        elAvatar.textContent = estagio.nome;
                                                                                                                                                                                                                                                                                                                                                                                                                            elAvatar.style.borderColor = estagio.cor;
                                                                                                                                                                                                                                                                                                                                                                                                                                elAvatar.style.color = estagio.cor;
                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                // Inicializa o primeiro comando ao abrir o jogo
                                                                                                                                                                                                                                                                                                                                                                                                                                gerarNovoComando();
                                                                                                                                                                                                                                                                                                                                                                                                                                