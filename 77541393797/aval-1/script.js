// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo ao site sobre Introdução à Web e à Internet! 🌐");
    };

    // Lista de curiosidades
    const curiosidades = [
        "A Internet surgiu na década de 1960.",
            "WWW significa World Wide Web.",
                "O primeiro site da história foi criado em 1991.",
                    "Bilhões de pessoas utilizam a Internet diariamente.",
                        "A Web é apenas um dos serviços da Internet."
                        ];

                        // Função para mostrar uma curiosidade aleatória
                        function mostrarCuriosidade() {
                            const indice = Math.floor(Math.random() * curiosidades.length);
                                document.getElementById("curiosidade").innerHTML =
                                        curiosidades[indice];
                                        }