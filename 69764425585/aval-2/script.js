
function curtir(botao) {
  let contador = botao.nextElementSibling;
    let numero = Number(contador.dataset.numero || 0);

      let curtido = botao.dataset.curtido === "true";

        numero += curtido ? -1 : 1;

          botao.dataset.curtido = !curtido;
            contador.dataset.numero = numero;
              contador.innerText = numero + " curtidas";

                botao.innerText = curtido ? "❤️ Curtir" : "❤️ Curtido";
                }
                