
let quantidadeCurtidas = 0;

function curtir() {
    quantidadeCurtidas++;

        document.getElementById("curtidas").textContent =
                quantidadeCurtidas + " curtidas";
                }

                function comentar() {
                    let campo = document.getElementById("comentario");
                        let texto = campo.value.trim();

                            if (texto === "") {
                                    alert("Digite um comentário!");
                                            return;
                                                }

                                                    let lista = document.getElementById("lista-comentarios");
                                                        let item = document.createElement("li");

                                                            item.textContent = texto;
                                                                lista.appendChild(item);

                                                                    campo.value = "";
                                                                    }
                                                                    