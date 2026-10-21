
function iniciarBiometria() {
    const resultado = document.getElementById("resultado");
        const botao = document.getElementById("botaoBiometria");

            resultado.textContent = "Iniciando reconhecimento facial...";
                botao.disabled = true;

                    setTimeout(function() {
                            resultado.textContent =
                                        "✅ Simulação concluída! Identidade verificada.";
                                                botao.disabled = false;
                                                    }, 2000);
                                                    }

                                                    function limparTela() {
                                                        document.getElementById("resultado").textContent =
                                                                "Aguardando início da simulação...";
                                                                }
                                                                