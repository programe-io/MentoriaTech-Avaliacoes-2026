```javascript
console.log("Página de aprendizados carregada!");

const aprendizados = document.querySelectorAll(".aprendizado");

aprendizados.forEach(function (item) {
    item.addEventListener("click", function () {
        item.classList.toggle("selecionado");
    });
});
```