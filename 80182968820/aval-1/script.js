// Mensagem de boas-vindas
window.onload = function () {
  console.log("Site carregado com sucesso!");
  };

  // Função do botão principal
  function mostrarMensagem() {
    alert("Bem-vindo ao meu projeto desenvolvido com JavaScript!");
    }

    // Alterar tema claro/escuro
    function trocarTema() {
      document.body.classList.toggle("dark-mode");
      }

      // Mostrar data e hora atual
      function mostrarDataHora() {
        const data = new Date();

          const dia = data.toLocaleDateString("pt-BR");
            const hora = data.toLocaleTimeString("pt-BR");

              document.getElementById("dataHora").innerHTML =
                  `Data: ${dia} | Hora: ${hora}`;
                  }

                  // Contador de cliques
                  let contador = 0;

                  function contarCliques() {
                    contador++;

                      document.getElementById("contador").innerHTML =
                          `Cliques: ${contador}`;
                          }

                          // Validação simples de formulário
                          function validarFormulario() {
                            let nome = document.getElementById("nome").value;

                              if (nome === "") {
                                  alert("Por favor, digite seu nome.");
                                    } else {
                                        alert(`Olá, ${nome}! Formulário enviado com sucesso.`);
                                          }
                                          }