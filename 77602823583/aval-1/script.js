// Banco de dados local simulado para demonstração sem chaves de API externas
const climaMock = {
    "sao paulo": { cidade: "São Paulo", temp: 26, desc: "Ensolarado", umidade: 60, vento: 14, sensacao: 28, alerta: "Nenhum alerta crítico para a região no momento. Índice UV moderado." },
    "rio de janeiro": { cidade: "Rio de Janeiro", temp: 32, desc: "Muito Quente", umidade: 70, vento: 18, sensacao: 36, alerta: "ALERTA DE CALOR: Evite exposição direta ao sol entre as 11h e 16h." },
    "nova york": { cidade: "Nova York", temp: 12, desc: "Chuvoso", umidade: 85, vento: 22, sensacao: 10, alerta: "AVISO DE CHUVA: Possibilidade de pequenos alagamentos em áreas de baixa altitude." },
    "lisboa": { cidade: "Lisboa", temp: 20, desc: "Parcialmente Nublado", umidade: 55, vento: 10, sensacao: 20, alerta: "Tempo estável em toda a região metropolitana." }
};

function buscarClima(event) {
    // Evita o recarregamento padrão do formulário HTML
    event.preventDefault();

    const inputCidade = document.getElementById("city-input").value.trim().toLowerCase();
    
    // Elementos da interface que serão atualizados
    const txtCidade = document.getElementById("w-city");
    const txtDesc = document.getElementById("w-desc");
    const txtTemp = document.getElementById("w-temp");
    const txtUmidade = document.getElementById("w-humidity");
    const txtVento = document.getElementById("w-wind");
    const txtSensacao = document.getElementById("w-feels");
    const txtAlerta = document.querySelector("#weather-alerts .alert-text");

    // Verifica se a cidade digitada existe no nosso banco de dados simulado
    if (climaMock[inputCidade]) {
        const dados = climaMock[inputCidade];

        // Atualização dinâmica da DOM
        txtCidade.innerText = dados.cidade;
        txtDesc.innerText = dados.desc;
        txtTemp.innerText = dados.temp;
        txtUmidade.innerText = dados.umidade;
        txtVento.innerText = dados.vento;
        txtSensacao.innerText = dados.sensacao;
        txtAlerta.innerText = dados.alerta;
    } else {
        // Resposta caso a cidade digitada não esteja cadastrada na simulação
        alert("Cidade não encontrada no simulador! Tente pesquisar por 'Sao Paulo', 'Rio de Janeiro', 'Nova York' ou 'Lisboa'.");
    }

    // Limpa o campo de texto de busca para a próxima pesquisa
    document.getElementById("city-input").value = "";
}