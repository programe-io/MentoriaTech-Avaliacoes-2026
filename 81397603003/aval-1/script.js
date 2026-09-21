// ==============================
// BLOG DA BETÂNIA
// ==============================

// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vinda ao Blog da Betânia! 💙");
    });


    // ==============================
    // BOTÃO DE MENSAGEM
    // ==============================

    function mostrarMensagem() {
        alert(
                "Olá! Eu sou a Betânia! 💙\n" +
                        "Tenho 15 anos, gosto de estudar " +
                                "e quero realizar todos os meus sonhos! ✨"
                                    );
                                    }


                                    // ==============================
                                    // MENSAGEM DOS SONHOS
                                    // ==============================

                                    function mostrarSonhos() {
                                        const mensagem = document.getElementById("mensagem-sonhos");

                                            mensagem.innerHTML =
                                                    "✨ Nunca desista dos seus sonhos! " +
                                                            "Com dedicação e estudos, podemos conquistar nossos objetivos. 💙";

                                                                mensagem.style.color = "#00c99a";
                                                                    mensagem.style.fontWeight = "bold";
                                                                    }


                                                                    // ==============================
                                                                    // DATA ATUAL
                                                                    // ==============================

                                                                    const data = new Date();

                                                                    console.log(
                                                                        "Blog acessado em: " +
                                                                            data.toLocaleDateString("pt-BR")
                                                                            );