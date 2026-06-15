/* ==========================================================================
   Lógica Dinâmica da Partida de Futebol
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Seleção de elementos do HTML (O "elenco" do site)
    const btnApito = document.getElementById("btn-apito");
    const tempoDisplay = document.querySelector("time");
    const placarGolsCasa = document.querySelectorAll(".placar span")[1];
    const placarGolsFora = document.querySelectorAll(".placar span")[3];
    const varStatus = document.querySelector("#arbitragem code");
    const estadio = document.getElementById("estadio");

    // Ativando o botão do apito que estava desativado
    if (btnApito) {
        btnApito.removeAttribute("disabled");
        btnApito.style.cursor = "pointer";
        btnApito.style.opacity = "1";
        btnApito.style.backgroundColor = "#d32f2f"; // Vermelho vivo para chamar atenção
        
        // Evento de clique para iniciar a simulação
        btnApito.addEventListener("click", () => {
            iniciarPartida();
        });
    }

    function iniciarPartida() {
        btnApito.setAttribute("disabled", "true");
        btnApito.style.backgroundColor = "#757575";
        btnApito.innerText = "⚽ Bola Rolando...";
        
        let minuto = 0;
        placarGolsCasa.innerText = "0";
        placarGolsFora.innerText = "0";
        
        // Cronômetro acelerado (cada 100ms na tela equivale a 1 minuto de jogo)
        const cronometro = setInterval(() => {
            minuto++;
            tempoDisplay.innerText = `${minuto.toString().padStart(2, '0')}:00 - Em Andamento`;

            // Eventos controlados pelo tempo do JavaScript
            switch(minuto) {
                case 15:
                    notificarVAR("Revisando falta dura...", "yellow");
                    break;
                case 16:
                    notificarVAR("Cartão amarelo confirmado.", "orange");
                    break;
                case 32:
                    marcarGol(placarGolsCasa, "Time de Casa");
                    break;
                case 45:
                    tempoDisplay.innerText = "INTERVALO";
                    notificarVAR("Checando impedimento... Tudo OK.", "green");
                    break;
                case 75:
                    marcarGol(placarGolsFora, "Time de Fora");
                    break;
                case 88:
                    notificarVAR("🚨 ANALISANDO PÊNALTI NO VAR...", "red");
                    break;
                case 89:
                    notificarVAR("Pênalti Confirmado!", "green");
                    marcarGol(placarGolsCasa, "Time de Casa");
                    break;
                case 90:
                    clearInterval(cronometro);
                    tempoDisplay.innerText = "90:00 - FIM DE JOGO!";
                    btnApito.innerText = "Partida Encerrada";
                    notificarVAR("Sem erros detectados. Arbitragem finalizada.", "green");
                    break;
            }

        }, 100); // Velocidade da simulação
    }

    // Função que manipula o placar e cria um efeito visual de "Gol"
    function marcarGol(elementoPlacar, time) {
        // Atualiza o número no HTML
        let golsAtuais = parseInt(elementoPlacar.innerText);
        elementoPlacar.innerText = golsAtuais + 1;

        // Efeito Visual: Pisca o estádio em dourado com a vibração do gol
        estadio.style.transition = "background-color 0.3s ease";
        estadio.style.backgroundColor = "#fff9c4"; // Amarelo festivo
        
        console.log(`⚽ GOOOL do ${time}!`);

        // Retorna a cor original do estádio após 1 segundo
        setTimeout(() => {
            estadio.style.backgroundColor = "#ffffff";
        }, 1000);
    }

    // Função para mudar o texto e a cor do VAR dinamicamente
    function notificarVAR(mensagem, cor) {
        varStatus.innerText = mensagem;
        
        // Traduzindo cores de texto para o painel do VAR
        const cores = {
            green: "#00ff00",
            yellow: "#ffeb3b",
            orange: "#ff9800",
            red: "#ff3d00"
        };
        
        varStatus.style.color = cores[cor] || "#ffffff";
    }
});