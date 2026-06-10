// Lista de dicas sobre alimentação saudável
const dicasAlimentacao = [
    "Consuma frutas e verduras diariamente.",
    "Beba bastante água ao longo do dia.",
    "Evite o consumo excessivo de alimentos ultraprocessados.",
    "Prefira alimentos naturais e ricos em nutrientes.",
    "Mantenha horários regulares para as refeições.",
    "Reduza o consumo de açúcar, sal e gorduras em excesso."
];

// Função para mostrar uma dica aleatória
function mostrarDica() {
    const indice = Math.floor(Math.random() * dicasAlimentacao.length);
    document.getElementById("mensagem").innerHTML =
        dicasAlimentacao[indice];
}

// Mensagem inicial
window.onload = function() {
    document.getElementById("mensagem").innerHTML =
        "Uma alimentação saudável melhora a qualidade de vida e ajuda a prevenir doenças.";
};