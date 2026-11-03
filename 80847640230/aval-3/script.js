
// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo ao Mundo dos Gatos! 🐱💕");
    };

    // Botão de carinho
    function carinho() {
        alert("MIAU! 🐾 Você ganhou um carinho de gatinho! ❤️");
        }

        // Mostrar curiosidade
        function curiosidade() {
            const curiosidades = [
                    "Os gatos adoram dormir! 😴",
                            "Os gatos têm uma ótima audição! 🐱",
                                    "Cada gato tem sua própria personalidade! 💗",
                                            "Os gatos usam o ronronar para se comunicar! 🐾"
                                                ];

                                                    const numero = Math.floor(
                                                            Math.random() * curiosidades.length
                                                                );

                                                                    document.getElementById("mensagem").innerText =
                                                                            curiosidades[numero];
                                                                            }

                                                                            // Mudar a cor do fundo
                                                                            function mudarCor() {
                                                                                document.body.style.backgroundColor = "#ffe4ec";
                                                                                }
                                                                                