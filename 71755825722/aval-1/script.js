```javascript id="8lf6is"
function mostrarMensagem() {

  const mensagens = [
    "Você é capaz de aprender qualquer coisa! 🚀",
    "Pequenos estudos diários geram grandes resultados 📚",
    "A disciplina vence a preguiça 💪",
    "Seu futuro depende do esforço de hoje 🌟",
    "Nunca desista dos seus sonhos 🎯"
  ];

  // Escolhe uma mensagem aleatória
  const aleatoria = Math.floor(Math.random() * mensagens.length);

  // Mostra a mensagem na tela
  document.getElementById("mensagem").innerHTML = mensagens[aleatoria];
}
```
