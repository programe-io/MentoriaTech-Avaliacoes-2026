
const beneficios = [
    "⚡ Mais rapidez: cada serviço pode ser atualizado independentemente.",
    "📈 Escalabilidade: os serviços podem crescer conforme a demanda.",
    "🔒 Segurança: cada serviço pode ter seus próprios controles de proteção.",
    "⚙️ Flexibilidade: diferentes equipes podem trabalhar em serviços separados.",
    "🚀 Inovação: novas funcionalidades podem ser desenvolvidas com agilidade."
];

let indice = 0;

function mostrarBeneficio() {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = beneficios[indice];

    indice++;

    if (indice >= beneficios.length) {
        indice = 0;
    }
}