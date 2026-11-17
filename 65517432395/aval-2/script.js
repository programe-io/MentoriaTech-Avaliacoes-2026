const questionario = document.getElementById("questionario");
const resultado = document.getElementById("resultado");
const profissoes = document.getElementById("profissoes");

// Lista de profissões por área
const carreiras = {
    Tecnologia: ["Desenvolvedor de Software", "Analista de Sistemas", "Cientista de Dados"],
    Saúde: ["Enfermeiro", "Fisioterapeuta", "Médico"],
    Educação: ["Professor", "Pedagogo", "Coordenador Educacional"],
    Comunicação: ["Jornalista", "Publicitário", "Designer"]
};

// Função para analisar as respostas
function analisarPerfil(respostas) {

    let pontuacao = {};

    // Inicialização das pontuações
    for (let area in carreiras) {
        pontuacao[area] = 0;
    }

    // Contagem dos interesses
    respostas.forEach(function(area) {
        pontuacao[area]++;
    });

    let melhorArea = "";
    let maiorPontuacao = 0;

    // Comparação das pontuações
    for (let area in pontuacao) {

        if (pontuacao[area] > maiorPontuacao) {
            maiorPontuacao = pontuacao[area];
            melhorArea = area;
        }
    }

    return {
        area: melhorArea,
        pontuacao: maiorPontuacao
    };
}

// Evento de envio
questionario.addEventListener("submit", function(event) {

    event.preventDefault();

    let respostas = [
        document.getElementById("interesse1").value,
        document.getElementById("interesse2").value,
        document.getElementById("interesse3").value
    ];

    if (respostas.some(resposta => resposta === "")) {
        alert("Responda todas as perguntas.");
        return;
    }

    let perfil = analisarPerfil(respostas);

    let sugestoes = carreiras[perfil.area];

    resultado.innerHTML = `
        <h3>Seu perfil profissional</h3>
        <p>Área de maior interesse: <strong>${perfil.area}</strong></p>
        <p>Respostas nessa área: ${perfil.pontuacao} de 3</p>
    `;

    profissoes.innerHTML = `
        <h3>Profissões para conhecer</h3>
        <ul>
            ${sugestoes.map(profissao => `<li>${profissao}</li>`).join("")}
        </ul>
        <p>Esta é uma sugestão baseada nas suas respostas, não um teste vocacional definitivo.</p>
    `;
});