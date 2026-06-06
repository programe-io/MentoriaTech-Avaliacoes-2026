// Mensagem ao carregar a página
window.onload = function() {
    console.log("Página HTML na Prática carregada!");
    };

    // Função do formulário
    function enviarFormulario() {

        let nome = document.getElementById("nome").value;

            if(nome === "") {
                    document.getElementById("mensagem").innerHTML =
                            "⚠️ Digite seu nome!";
                                } else {
                                        document.getElementById("mensagem").innerHTML =
                                                "✅ Olá, " + nome + "! Formulário enviado com sucesso.";
                                                    }
                                                    }