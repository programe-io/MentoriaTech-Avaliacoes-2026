
function calcular(operacao) {
    let n1 = Number(document.getElementById("numero1").value);
        let n2 = Number(document.getElementById("numero2").value);
            let resultado;

                if (operacao === "+") {
                        resultado = n1 + n2;
                            } else if (operacao === "-") {
                                    resultado = n1 - n2;
                                        } else if (operacao === "*") {
                                                resultado = n1 * n2;
                                                    } else if (operacao === "/") {
                                                            if (n2 === 0) {
                                                                        document.getElementById("resultado").innerText =
                                                                                        "Não é possível dividir por zero!";
                                                                                                    return;
                                                                                                            }
                                                                                                                    resultado = n1 / n2;
                                                                                                                        }

                                                                                                                            document.getElementById("resultado").innerText =
                                                                                                                                    "Resultado: " + resultado;
                                                                                                                                    }

                                                                                                                                    function limpar() {
                                                                                                                                        document.getElementById("numero1").value = "";
                                                                                                                                            document.getElementById("numero2").value = "";
                                                                                                                                                document.getElementById("resultado").innerText = "Resultado: 0";
                                                                                                                                                }
                                                                                                                                                