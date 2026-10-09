const btnMedo = document.getElementById("btnMedo");
const resultado = document.getElementById("resultado");

const mensagens = [
    "🟢 Baixo perigo: apenas o vento soprando entre as árvores.",
    "🟡 Atenção: algo estranho se moveu na escuridão.",
    "🟠 Perigo: sons misteriosos estão cada vez mais próximos.",
    "🔴 Corra! Uma criatura da floresta está observando você!"
];

btnMedo.addEventListener("click", () => {
    const sorteio = Math.floor(Math.random() * mensagens.length);
    resultado.textContent = mensagens[sorteio];
});