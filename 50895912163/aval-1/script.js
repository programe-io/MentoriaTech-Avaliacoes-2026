// Função para mostrar mensagem
function mostrarMensagem() {
    alert("Olá! Você clicou no botão 🎉");
    }

    // Mudar cor de fundo ao clicar
    function mudarCor() {
        const cores = ["#f4f4f4", "#e3f2fd", "#fff3e0", "#fce4ec", "#e8f5e9"];
            const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
                document.body.style.background = corAleatoria;
                }

                // Mostrar data e hora atual
                function mostrarDataHora() {
                    const agora = new Date();
                        const texto = agora.toLocaleString("pt-BR");
                            document.getElementById("dataHora").innerText = texto;
                            }

                            // Executa automaticamente ao carregar a página
                            window.onload = function () {
                                mostrarDataHora();
                                };

                                // Atualiza a hora a cada segundo
                                setInterval(mostrarDataHora, 1000);