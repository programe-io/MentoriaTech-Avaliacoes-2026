
// Mensagem de boas-vindas
window.onload = function() {
    console.log("Bem-vindo ao Mundo do Basquete!");
    };

    // Botão interativo
    const botao = document.querySelector("button");

    botao.addEventListener("click", function() {
        alert("🏀 O basquete é paixão, talento e dedicação!");
        });

        // Curiosidades sobre basquete
        const curiosidades = [
            "O basquete foi criado em 1891.",
                "Uma cesta de lance livre vale 1 ponto.",
                    "Uma cesta dentro da linha de três vale 2 pontos.",
                        "Uma cesta de fora da linha de três vale 3 pontos.",
                            "A NBA é uma das ligas de basquete mais famosas do mundo."
                            ];

                            // Mostrar curiosidade
                            function mostrarCuriosidade() {
                                const numero = Math.floor(Math.random() * curiosidades.length);

                                    alert(curiosidades[numero]);
                                    }

                                    // Adicionar botão de curiosidades
                                    const novoBotao = document.createElement("button");

                                    novoBotao.textContent = "Ver curiosidade 🏀";

                                    novoBotao.onclick = mostrarCuriosidade;

                                    document.body.appendChild(novoBotao);
                                    