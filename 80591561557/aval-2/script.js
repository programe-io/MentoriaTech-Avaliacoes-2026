```javascript
// Botão Leia Mais
function lerMais(titulo) {
    alert("Você escolheu ler: " + titulo);
}

// Botão Curtir
function curtir(botao) {
    let curtidas = Number(botao.dataset.curtidas);

    curtidas++;

    botao.dataset.curtidas = curtidas;
    botao.textContent = "❤️ Curtir (" + curtidas + ")";
}

// Mensagem no console
window.addEventListener("load", function () {
    console.log("Blog carregado com sucesso!");
});
```
