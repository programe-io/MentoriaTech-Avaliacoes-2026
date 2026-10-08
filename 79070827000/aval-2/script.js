```javascript
const botaoCurtir = document.querySelector(".curtir");

botaoCurtir.addEventListener("click", function () {

    if (botaoCurtir.textContent === "♡ Curtir") {

        botaoCurtir.textContent = "♥ Curtido";

    } else {

        botaoCurtir.textContent = "♡ Curtir";

    }

});
```
