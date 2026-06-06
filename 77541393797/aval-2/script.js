// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo ao site de Introdução ao HTML! 🚀");
    };

    // Curiosidades sobre HTML
    const curiosidades = [
        "HTML significa HyperText Markup Language.",
            "HTML foi criado por Tim Berners-Lee em 1991.",
                "HTML não é uma linguagem de programação.",
                    "A tag <h1> representa o título principal de uma página.",
                        "A tag <nav> é usada para menus de navegação.",
                            "HTML trabalha em conjunto com CSS e JavaScript.",
                                "A tag <img> é utilizada para exibir imagens.",
                                    "A tag <a> cria links para outras páginas.",
                                        "Existem seis níveis de títulos: h1 até h6.",
                                            "O HTML é a base de praticamente todos os sites da internet."
                                            ];

                                            // Exibe uma curiosidade aleatória
                                            function mostrarCuriosidade() {
                                                let numero = Math.floor(Math.random() * curiosidades.length);

                                                    document.getElementById("resultado").innerHTML =
                                                            curiosidades[numero];
                                                            }

                                                            // Contador de cliques
                                                            let cliques = 0;

                                                            function contarCliques() {
                                                                cliques++;

                                                                    document.getElementById("contador").innerHTML =
                                                                            "Botão clicado " + cliques + " vezes.";
                                                                            }

                                                                            // Exibe data e hora
                                                                            function mostrarDataHora() {
                                                                                const agora = new Date();

                                                                                    document.getElementById("dataHora").innerHTML =
                                                                                            agora.toLocaleString("pt-BR");
                                                                                            }