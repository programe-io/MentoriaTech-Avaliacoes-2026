```javascript
// BOTÃO SAIBA MAIS

const btnSaibaMais = document.getElementById("btnSaibaMais");

btnSaibaMais.addEventListener("click", function () {

    alert(
        "A Honda Pop 110i é uma motocicleta voltada para praticidade e mobilidade no dia a dia."
    );

});


// BOTÕES CURTIR

const botoesCurtir = document.querySelectorAll(".btnCurtir");

botoesCurtir.forEach(function (botao) {

    botao.addEventListener("click", function () {

        if (botao.classList.contains("curtido")) {

            botao.innerHTML = "❤️ Curtir";

            botao.classList.remove("curtido");

        } else {

            botao.innerHTML = "❤️ Curtido!";

            botao.classList.add("curtido");

        }

    });

});
```
