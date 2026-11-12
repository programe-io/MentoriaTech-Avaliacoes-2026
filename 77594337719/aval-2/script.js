
// Mensagem de boas-vindas
alert("Seja bem-vindo ao meu site!");

// Selecionar o título principal
const titulo = document.querySelector("h1");

// Alterar o título
titulo.addEventListener("click", function() {
    alert("Você clicou no título!");
    });

    // Criar uma mensagem de apresentação
    function apresentar() {
        alert("Olá! Este site foi desenvolvido utilizando HTML, CSS e JavaScript.");
        }

        // Mostrar a data atual
        function mostrarData() {
            const data = new Date();

                alert("Hoje é: " + data.toLocaleDateString("pt-BR"));
                }

                // Mudar a cor do fundo
                function mudarCor() {
                    document.body.style.backgroundColor = "#eadcf8";
                    }

                    // Voltar à cor original
                    function voltarCor() {
                        document.body.style.backgroundColor = "#f5f0fa";
                        }

                        // Mostrar mensagem sobre HTML
                        function explicarHTML() {
                            alert("HTML é utilizado para estruturar páginas da internet.");
                            }

                            // Mostrar mensagem sobre CSS
                            function explicarCSS() {
                                alert("CSS é utilizado para estilizar e decorar páginas da internet.");
                                }

                                // Mostrar mensagem sobre JavaScript
                                function explicarJavaScript() {
                                    alert("JavaScript permite adicionar interatividade às páginas.");
                                    }

                                    // Mensagem final
                                    function mensagemFinal() {
                                        alert("Obrigado por visitar meu site! Volte sempre!");
                                        }

                                        console.log("JavaScript funcionando corretamente!");
                                        