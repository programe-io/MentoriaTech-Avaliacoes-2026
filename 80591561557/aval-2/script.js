```javascript
function mostrarMensagem() {
    alert("Olá, Ananda! Obrigado por visitar o meu blog 💜");
}

// Mensagem no console
console.log("Blog da Ananda carregado com sucesso!");

// Efeito simples ao clicar nos links do menu
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", function() {
        console.log("Você clicou em: " + this.textContent);
    });
});
```
