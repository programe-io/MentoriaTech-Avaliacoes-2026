```javascript
const atividades = [
    "⚽ Jogar futebol",
    "🏃 Fazer uma corrida",
    "💃 Dançar uma música",
    "🦘 Pular corda",
    "🏀 Jogar basquete",
    "🚲 Andar de bicicleta",
    "🐸 Imitar animais",
    "🧘 Fazer alongamento"
];

function sortearBrincadeira() {

    let numero = Math.floor(Math.random() * atividades.length);

    let resultado = document.getElementById("resultado");

    resultado.innerHTML =
        "🎉 Vamos fazer: " + atividades[numero] + "!";
}
```
