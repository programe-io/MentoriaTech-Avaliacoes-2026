
function entrar() {
  const link = "https://www.sa-mp.mp/";

    const confirmar = confirm(
        "Bem-vindo ao Brasil Roleplay! Deseja acessar o site do SA-MP?"
          );

            if (confirmar) {
                window.open(link, "_blank");
                  }
                  }

                  document.querySelectorAll('nav a').forEach(link => {
                    link.addEventListener('click', () => {
                        console.log("Navegando para: " + link.textContent);
                          });
                          });
                          