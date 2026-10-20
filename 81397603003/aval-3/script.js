
let curtidas = 0;

const botao = document.getElementById("curtir");
const contador = document.getElementById("contador");

botao.addEventListener("click", function() {
    curtidas++;

        contador.textContent = curtidas + " curtidas";
        });

        const formulario = document.getElementById("formulario");

        formulario.addEventListener("submit", function(evento) {
            evento.preventDefault();

                const campo = document.getElementById("comentario");
                    const texto = campo.value.trim();

                        if (texto === "") {
                                return;
                                    }

                                        const item = document.createElement("li");
                                            item.textContent = texto;

                                                document.getElementById("comentarios").appendChild(item);

                                                    campo.value = "";
                                                    });
                                                    