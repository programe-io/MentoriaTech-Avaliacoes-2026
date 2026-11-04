function voltarInicio() {
        window.scrollTo({
                top: 0,
                        behavior: "smooth"
                            });
                            }

                            function maximizar() {
                                let editor = document.getElementById("codigo");

                                    if (editor.style.height === "700px") {
                                            editor.style.height = "400px";
                                                } else {
                                                        editor.style.height = "700px";
                                                            }
                                                            }

                                                            function publicar() {
                                                                let codigo = document.getElementById("codigo").value;
                                                                    let mensagem = document.getElementById("mensagem");

                                                                        if (codigo.trim() === "") {
                                                                                mensagem.textContent = "Digite seu código antes de publicar!";
                                                                                        mensagem.style.color = "red";
                                                                                            } else {
                                                                                                    mensagem.textContent = "Código preparado para envio!";
                                                                                                            mensagem.style.color = "#10ae87";
                                                                                                                }
                                                                                                                }
}