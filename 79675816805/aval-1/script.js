// Saudação
const nome = prompt("Qual é o seu nome?");
if (nome) {
    alert(`Bem-vindo(a) ao blog, ${nome}! 📚`);
    }

    // Lista de livros
    const livros = [
        "É Assim que Acaba",
            "Mil Partes do Meu Coração",
                "A Hipótese do Amor",
                    "O Pequeno Príncipe",
                        "Dom Casmurro",
                            "O Hobbit"
                            ];

                            // Recomendar um livro aleatório
                            function recomendarLivro() {
                                const indice = Math.floor(Math.random() * livros.length);
                                    document.getElementById("resultado").innerHTML =
                                            `📖 Recomendação: <strong>${livros[indice]}</strong>`;
                                            }

                                            // Pes