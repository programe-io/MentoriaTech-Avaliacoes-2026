// MENSAGEM AO ABRIR O SITE
window.alert("Bem-vindo ao Blog da Caatinga!");

// BOTÕES
const botoes = document.querySelectorAll("button");

// FUNÇÃO DOS BOTÕES
botoes.forEach(function(botao){

  botao.addEventListener("click", function(){

      alert("Você clicou em um botão!");

        });

        });

        // MUDA A COR DOS TÍTULOS AO PASSAR O MOUSE
        const titulos = document.querySelectorAll("h2");

        titulos.forEach(function(titulo){

          titulo.addEventListener("mouseover", function(){

              titulo.style.color = "#d2691e";

                });

                  titulo.addEventListener("mouseout", function(){

                      titulo.style.color = "#a0522d";

                        });

                        });

                        // TEXTO DINÂMICO NO HEADER
                        const header = document.querySelector("header p");

                        header.innerHTML =
                        "Explore a fauna, flora e curiosidades da Caatinga 🌵";

                        // CONTADOR DE CLIQUES
                        let cliques = 0;

                        document.addEventListener("click", function(){

                          cliques++;

                            console.log(
                                "Quantidade de cliques: " + cliques
                                  );

                                  });

                                  // MODO ESCURO
                                  const botaoTema = document.createElement("button");

                                  botaoTema.innerText = "Modo Escuro";

                                  document