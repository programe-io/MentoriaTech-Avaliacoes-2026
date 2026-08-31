const formulario = document.getElementById("avaliacaoForm");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
  event.preventDefault();

    const nome = document.getElementById("nome").value;

      mensagem.innerHTML = `
          ✅ Avaliação enviada com sucesso, ${nome}!<br>
              Seus dados foram registrados para a mentoria técnica.
                `;

                  formulario.reset();

                    setTimeout(() => {
                        mensagem.innerHTML = "";
                          }, 5000);
                          });