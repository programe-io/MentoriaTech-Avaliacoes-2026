javascript
function responder(resposta) {

    if (resposta == "HTML") {
            document.getElementById("resultado").innerHTML =
                    "Resposta correta!";
                        } else {
                                document.getElementById("resultado").innerHTML =
                                        "Resposta errada. Tente novamente!";
                                            }

                                            }