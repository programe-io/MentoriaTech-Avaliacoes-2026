
function mostrarDica(numero) {

    let resultado = document.getElementById("resultado");

        if (numero === 1) {
                resultado.innerHTML = `
                            <h3>Cuidados com os cílios ✨</h3>
                                        <p>
                                                        Evite esfregar os olhos, higienize os cílios
                                                                        diariamente com produto adequado e siga as
                                                                                        orientações da sua profissional.
                                                                                                    </p>
                                                                                                            `;
                                                                                                                }

                                                                                                                    else if (numero === 2) {
                                                                                                                            resultado.innerHTML = `
                                                                                                                                        <h3>Tipos de extensão 💗</h3>
                                                                                                                                                    <p>
                                                                                                                                                                    O clássico proporciona um efeito natural.
                                                                                                                                                                                    O híbrido mistura fios clássicos e volume.
                                                                                                                                                                                                    O brasileiro traz um efeito mais marcado.
                                                                                                                                                                                                                    O russo proporciona bastante volume.
                                                                                                                                                                                                                                </p>
                                                                                                                                                                                                                                        `;
                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                else if (numero === 3) {
                                                                                                                                                                                                                                                        resultado.innerHTML = `
                                                                                                                                                                                                                                                                    <h3>Valorize seu olhar 👁️</h3>
                                                                                                                                                                                                                                                                                <p>
                                                                                                                                                                                                                                                                                                O efeito ideal depende do formato dos seus
                                                                                                                                                                                                                                                                                                                olhos, da saúde dos fios naturais e do
                                                                                                                                                                                                                                                                                                                                resultado desejado. Converse com uma
                                                                                                                                                                                                                                                                                                                                                profissional especializada!
                                                                                                                                                                                                                                                                                                                                                            </p>
                                                                                                                                                                                                                                                                                                                                                                    `;
                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                        document.getElementById("formulario")
                                                                                                                                                                                                                                                                                                                                                                        .addEventListener("submit", function(event) {

                                                                                                                                                                                                                                                                                                                                                                            event.preventDefault();

                                                                                                                                                                                                                                                                                                                                                                                let nome = document.getElementById("nome").value;

                                                                                                                                                                                                                                                                                                                                                                                    document.getElementById("resposta").innerText =
                                                                                                                                                                                                                                                                                                                                                                                            "Obrigada pela mensagem, " + nome + "! 💗";

                                                                                                                                                                                                                                                                                                                                                                                                document.getElementById("formulario").reset();

                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                