function mostrarMensagem(){
        alert("Bem-vindo ao Meu Blog de Games!");
        }

        const cards = document.querySelectorAll(".card");

        cards.forEach(function(card){

            card.addEventListener("click",function(){

                    alert("Você selecionou: " + card.querySelector("h3").textContent);

                        });

                        });

                        let visitas = 0;

                        function contarVisitas(){

                            visitas++;

                                console.log("Visitas: " + visitas);

                                }

                                contarVisitas();

                                setInterval(contarVisitas,10000);

                                console.log("Site carregado com sucesso!");
}