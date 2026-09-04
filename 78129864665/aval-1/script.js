let azul = 0;
let vermelho = 0;

function pontoAzul() {
    azul++;
        document.getElementById("azul").textContent = azul;
        }

        function pontoVermelho() {
            vermelho++;
                document.getElementById("vermelho").textContent = vermelho;
                }

                function zerar() {
                    azul = 0;
                        vermelho = 0;

                            document.getElementById("azul").textContent = azul;
                                document.getElementById("vermelho").textContent = vermelho;
                                }

                                function participar() {
                                    alert("🏆 Inscrição realizada! Prepare-se para os Jogos Escolares!");
                                    }