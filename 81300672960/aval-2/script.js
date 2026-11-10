

/* 6. ARROW FUNCTION */

const multiplicar = (a, b) => a * b;

function executarMultiplicacao() {
    let a = Number(document.getElementById("multiplicador1").value);
        let b = Number(document.getElementById("multiplicador2").value);

            document.getElementById("resultadoMultiplicacao").innerHTML =
                    "Resultado: " + multiplicar(a, b);
                    }


                    /* 7. FUNÇÃO ANÔNIMA E SETINTERVAL */

                    let intervalo;

                    function iniciarIntervalo() {
                        if (intervalo) return;

                            intervalo = setInterval(function() {
                                    document.getElementById("resultadoIntervalo").innerHTML =
                                                "Mensagem repetida a cada 2 segundos!";
                                                    }, 2000);
                                                    }

                                                    function pararIntervalo() {
                                                        clearInterval(intervalo);
                                                            intervalo = null;

                                                                document.getElementById("resultadoIntervalo").innerHTML =
                                                                        "Intervalo encerrado.";
                                                                        }


                                                                        /* 8. ARRAYS */

                                                                        let frutas = ["Maçã", "Banana", "Uva"];

                                                                        // PUSH: adiciona no final
                                                                        function adicionarFruta() {
                                                                            let fruta = document.getElementById("novaFruta").value;

                                                                                if (fruta.trim() !== "") {
                                                                                        frutas.push(fruta);
                                                                                                document.getElementById("novaFruta").value = "";
                                                                                                        mostrarFrutas();
                                                                                                            }
                                                                                                            }

                                                                                                            // POP: remove do final
                                                                                                            function removerFruta() {
                                                                                                                frutas.pop();
                                                                                                                    mostrarFrutas();
                                                                                                                    }

                                                                                                                    // UNSHIFT: adiciona no início
                                                                                                                    function inicioFruta() {
                                                                                                                        let fruta = document.getElementById("novaFruta").value;

                                                                                                                            if (fruta.trim() !== "") {
                                                                                                                                    frutas.unshift(fruta);
                                                                                                                                            document.getElementById("novaFruta").value = "";
                                                                                                                                                    mostrarFrutas();
                                                                                                                                                        }
                                                                                                                                                        }

                                                                                                                                                        // SHIFT: remove do início
                                                                                                                                                        function removerInicio() {
                                                                                                                                                            frutas.shift();
                                                                                                                                                                mostrarFrutas();
                                                                                                                                                                }

                                                                                                                                                                // LENGTH: mostra a quantidade
                                                                                                                                                                function mostrarFrutas() {
                                                                                                                                                                    document.getElementById("listaFrutas").innerHTML =
                                                                                                                                                                            "Frutas: " + frutas.join(", ");

                                                                                                                                                                                document.getElementById("quantidadeFrutas").innerHTML =
                                                                                                                                                                                        "Quantidade de elementos: " + frutas.length;
                                                                                                                                                                                        }

                                                                                                                                                                                        // Exibe a lista inicial
                                                                                                                                                                                        mostrarFrutas();