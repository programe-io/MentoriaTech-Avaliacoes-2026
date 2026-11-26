function lerMais(tema) {

        const artigos = {
                democracia: "A democracia é um sistema político no qual o poder pertence ao povo. Os cidadãos participam das decisões por meio do voto e de outras formas de participação.",
                        
                                poderes: "O Brasil possui três poderes independentes: Executivo, Legislativo e Judiciário. Cada um possui funções específicas para organizar e administrar o país.",
                                        
                                                voto: "O voto permite que os cidadãos escolham seus representantes políticos. É uma das principais formas de participação democrática.",
                                                        
                                                                jovens: "Os jovens podem participar da política por meio de debates, projetos sociais, grêmios estudantis e acompanhamento das decisões públicas."
                                                                    };

                                                                        alert(artigos[tema]);
                                                                        }

                                                                        function enviarMensagem() {

                                                                            const nome = document.getElementById("nome").value;
                                                                                const mensagem = document.getElementById("mensagem").value;

                                                                                    if (nome.trim() === "" || mensagem.trim() === "") {
                                                                                            alert("Preencha todos os campos!");
                                                                                                    return;
                                                                                                        }

                                                                                                            alert("Obrigado pela mensagem, " + nome + "!");

                                                                                                                document.getElementById("nome").value = "";
                                                                                                                    document.getElementById("mensagem").value = "";
                                                                                                                    }
}