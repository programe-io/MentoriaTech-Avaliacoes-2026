
const botao = document.getElementById("botaoMensagem");
const frase = document.getElementById("frase");

const mensagens = [
    "Você merece respeito exatamente como é!",
    "Ser gentil também é uma forma de coragem.",
    "Não fique em silêncio diante do bullying. Peça ajuda!",
    "As diferenças nos tornam únicos.",
    "Uma palavra gentil pode mudar o dia de alguém.",
    "Respeito não é favor, é direito de todos!"
];

botao.addEventListener("click", function() {
    const numero = Math.floor(Math.random() * mensagens.length);

    frase.textContent = mensagens[numero];
});
