const checkboxes = document.querySelectorAll(".check");

checkboxes.forEach(check => {
    check.addEventListener("change", atualizarProgresso);
    });


    function atualizarProgresso() {

        const total = checkboxes.length;

            const concluidas =
                    document.querySelectorAll(".check:checked").length;

                        const porcentagem =
                                Math.round((concluidas / total) * 100);

                                    document.getElementById("progresso").style.width =
                                            porcentagem + "%";

                                                document.getElementById("numero").textContent =
                                                        porcentagem + "%";

                                                        }


                                                        function marcar(botao) {

                                                            botao.classList.toggle("feito");

                                                                if (botao.classList.contains("feito")) {

                                                                        botao.textContent = "✓ Concluído";

                                                                            } else {

                                                                                    botao.textContent = "💧 Hidratação";

                                                                                        }
                                                                                        }


                                                                                        document.getElementById("tema").addEventListener("click", function() {

                                                                                            document.body.classList.toggle("dark");

                                                                                                if (document.body.classList.contains("dark")) {

                                                                                                        this.textContent = "☀️";

                                                                                                            } else {

                                                                                                                    this.textContent = "🌙";

                                                                                                                        }

                                                                                                                        });