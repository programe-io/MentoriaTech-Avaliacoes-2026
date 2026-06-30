// Array com várias frases pra você
const frases = [
  "Desenvolvedora em formação na Mentoriatec. Aprendendo na prática! 💻",
  "Oi! Eu sou a Maria e amo transformar ideias em código. 🚀",
  "De Teresina pro mundo tech. Bora codar? #Mentoriatec",
  "Futura dev: 1 bug resolvido, 10 pra aparecer. E tá tudo bem 😂"
];

const fraseEl = document.getElementById("frase");
const btnEl = document.getElementById("btn");

// Mostra uma frase aleatória quando a página carrega
fraseEl.textContent = frases[Math.floor(Math.random() * frases.length)];

// Troca a frase toda vez que clicar no botão
btnEl.addEventListener("click", () => {
  fraseEl.textContent = frases[Math.floor(Math.random() * frases.length)];
});