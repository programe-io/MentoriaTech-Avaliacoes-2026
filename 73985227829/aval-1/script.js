function calcular(){

        let salario = Number(
                document.getElementById("salario").value
                    );

                        let porcentagem = Number(
                                document.getElementById("porcentagem").value
                                    );

                                        let economia = salario * (porcentagem / 100);

                                            document.getElementById("resultado").innerHTML =
                                                    "Você poderá guardar R$ " +
                                                            economia.toFixed(2) +
                                                                    " por mês.";
                                                                    }

                                                                    
}