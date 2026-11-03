
// Mensagem de boas-vindas
alert("Bem-vindo ao mundo dos cachorros! 🐶");

// Função para mostrar curiosidades
function curiosidade() {
    const curiosidades = [
            "Os cachorros têm um ótimo olfato! 🐾",
                    "Eles adoram brincar! ❤️",
                            "Existem muitas raças de cachorros!",
                                    "Os cachorros são muito companheiros!"
                                        ];

                                            let numero = Math.floor(Math.random() * curiosidades.length);

                                                document.getElementById("mensagem").innerHTML =
                                                        curiosidades[numero];
                                                        }
                                                        