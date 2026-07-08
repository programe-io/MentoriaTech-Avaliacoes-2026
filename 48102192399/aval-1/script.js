
window.onload = function () {
    console.log("Página carregada com sucesso!");
    };

    
    function mostrarMensagem() {
        alert("Olá! Bem-vindo ao JavaScript.");
        }

        
        function somar(a, b) {
            return a + b;
            }

            
            let resultado = somar(10, 20);
            console.log("Resultado da soma:", resultado);

            
            function alterarTexto() {
                document.getElementById("texto").textContent = "O texto foi alterado!";
                }

                
                document.addEventListener("DOMContentLoaded", function () {
                    const botao = document.getElementById("botao");

                        if (botao) {
                                botao.addEventListener("click", mostrarMensagem);
                                    }
                                    });