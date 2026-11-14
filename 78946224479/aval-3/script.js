
// Função para abrir e fechar o menu

function abrirMenu() {

    let menu = document.getElementById("menu");

        menu.classList.toggle("ativo");

        }


        // Função para receber os dados do formulário

        document.getElementById("formulario").addEventListener("submit", function(event) {

            event.preventDefault();

                let nome = document.getElementById("nome").value;

                    let email = document.getElementById("email").value;

                        let mensagem = document.getElementById("mensagem").value;

                            let resultado = document.getElementById("resultado");

                                resultado.innerHTML = "Obrigada pelo contato, " + nome + "! Sua mensagem foi recebida.";

                                    // Limpar os campos depois do envio

                                        document.getElementById("formulario").reset();

                                        });


                                        // Mostrar o ano automaticamente

                                        let anoAtual = new Date().getFullYear();

                                        document.getElementById("ano").innerHTML = anoAtual;
                                        