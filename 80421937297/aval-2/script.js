const frases = [
  '"Floresça no seu próprio tempo." 🦋',
  '"Nunca deixe de acreditar nos seus sonhos." 💙',
  '"As coisas bonitas levam tempo." 🌷',
  '"Cada dia é uma nova oportunidade." ✨',
  '"Seja você mesma, sempre!" ☁️'
];

const frase = document.getElementById("frase");
const botao = document.getElementById("trocarFrase");

botao.addEventListener("click", () => {
  const atual = frase.textContent;
  let novaFrase;

  do {
    novaFrase = frases[Math.floor(Math.random() * frases.length)];
  } while (novaFrase === atual && frases.length > 1);

  frase.textContent = novaFrase;
});

document.getElementById("ano").textContent =
  new Date().getFullYear();