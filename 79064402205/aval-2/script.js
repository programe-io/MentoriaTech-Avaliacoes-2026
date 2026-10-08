```javascript
// ================================
// CURTIR PUBLICAÇÃO
// ================================

const botoesCurtir = document.querySelectorAll(".btn-curtir");

botoesCurtir.forEach((botao) => {

    botao.addEventListener("click", () => {

        botao.classList.toggle("curtido");

        if (botao.classList.contains("curtido")) {

            botao.textContent = "♥";

        } else {

            botao.textContent = "♡";

        }

    });

});


// ================================
// SALVAR PUBLICAÇÃO
// ================================

const botoesSalvar = document.querySelectorAll(".btn-salvar");

botoesSalvar.forEach((botao) => {

    botao.addEventListener("click", () => {

        if (botao.classList.contains("salvo")) {

            botao.classList.remove("salvo");

            botao.textContent = "♧";

        } else {

            botao.classList.add("salvo");

            botao.textContent = "♣";

        }

    });

});


// ================================
// SEGUIR USUÁRIO
// ================================

const botoesSeguir = document.querySelectorAll(".seguir");

botoesSeguir.forEach((botao) => {

    botao.addEventListener("click", () => {

        if (botao.textContent.trim() === "Seguir") {

            botao.textContent = "Seguindo";

        } else {

            botao.textContent = "Seguir";

        }

    });

});
```
