
function mostrarDica(ambiente) {
    const dica = document.getElementById("dica");

        if (ambiente === "sala") {
                dica.textContent =
                            "Dica: use almofadas, plantas e iluminação aconchegante para deixar sua sala bonita!";
                                }

                                    else if (ambiente === "cozinha") {
                                            dica.textContent =
                                                        "Dica: organize os utensílios e use potes para deixar sua cozinha prática e bonita!";
                                                            }

                                                                else if (ambiente === "quarto") {
                                                                        dica.textContent =
                                                                                    "Dica: aposte em uma iluminação suave e roupas de cama confortáveis!";
                                                                                        }
                                                                                        }

                                                                                        function inscrever() {
                                                                                            const email = document.getElementById("email").value;
                                                                                                const mensagem = document.getElementById("mensagem");

                                                                                                    if (email.trim() === "" || !email.includes("@")) {
                                                                                                            mensagem.textContent = "Digite um e-mail válido!";
                                                                                                                    mensagem.style.color = "red";
                                                                                                                        } else {
                                                                                                                                mensagem.textContent = "Inscrição realizada com sucesso!";
                                                                                                                                        mensagem.style.color = "green";

                                                                                                                                                document.getElementById("email").value = "";
                                                                                                                                                    }
                                                                                                                                                    }
                                                                                                                                                    