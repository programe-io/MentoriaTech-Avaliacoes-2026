function mostrarMensagem() {
        alert(
                "A internet continua evoluindo e está cada vez mais presente nos estudos, trabalho, comunicação e entretenimento!"
                    );
                    }

                    function mostrarCuriosidade() {

                        const curiosidades = [
                                "A internet permite que pessoas de diferentes países se comuniquem em poucos segundos.",
                                        "Hoje, muitos serviços podem ser acessados diretamente pelo celular.",
                                                "A computação em nuvem permite acessar arquivos de diferentes dispositivos.",
                                                        "A inteligência artificial está sendo integrada a diversos serviços digitais.",
                                                                "A internet é utilizada para educação, trabalho, comunicação, compras e entretenimento."
                                                                    ];

                                                                        const numero = Math.floor(
                                                                                Math.random() * curiosidades.length
                                                                                    );

                                                                                        document.getElementById("textoCuriosidade").textContent =
                                                                                                curiosidades[numero];
                                                                                                }
}