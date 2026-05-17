// FUNÇÃO DO BOTÃO

function mensagem(){

    alert("Bem-vinda ao Vlog Musical da Lecilana 💖");

    }

    // TEXTO NO CONSOLE

    console.log("Vlog carregado com sucesso ✨");

    // EFEITO NO BOTÃO

    const botao = document.querySelector("button");

    botao.addEventListener("mouseover", function(){

        botao.innerHTML = "🎶 Aproveite o vlog 🎶";

        });

        botao.addEventListener("mouseout", function(){

            botao.innerHTML = "Entrar no vlog 🎵";

            });

            // MENSAGEM AUTOMÁTICA

            window.onload = function(){

                console.log("Página aberta!");

                };