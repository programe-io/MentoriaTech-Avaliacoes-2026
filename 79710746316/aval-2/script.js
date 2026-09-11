function mostrarAba(abaEscolhida) {

        const abas = document.querySelectorAll(".aba");

            abas.forEach(function(aba) {
                    aba.classList.remove("ativa");
                        });

                            document.getElementById(abaEscolhida).classList.add("ativa");
                            }

                            // Abre a página inicial
                            mostrarAba("inicio");
}