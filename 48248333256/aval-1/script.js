function enviar(numero) {
        let input = document.getElementById("link" + numero);
            let valor = input.value;

                if (valor === "") {
                        alert("Você precisa colocar um link antes de enviar!");
                                return;
                                    }

                                        alert("Avaliação " + numero + " enviada com sucesso!");

                                            input.style.backgroundColor = "#d1fae5"; // verde clarinho
                                            }
}