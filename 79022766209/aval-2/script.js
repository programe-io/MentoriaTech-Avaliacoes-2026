function mensagem() {
        alert("Confira mais notícias sobre jogos em breve!");
        }

        function atualizarHora() {
            const agora = new Date();

                const hora = agora.getHours().toString().padStart(2, "0");
                    const minuto = agora.getMinutes().toString().padStart(2, "0");
                        const segundo = agora.getSeconds().toString().padStart(2, "0");

                            document.getElementById("currentTime").textContent =
                                    "Horário atual: " + hora + ":" + minuto + ":" + segundo;
                                    }

                                    setInterval(atualizarHora, 1000);
                                    atualizarHora();
                                    }
                                    
}