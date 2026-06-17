// Dados das leis com links de imagens revisados e altamente estáveis
const thermodynamicLaws = [
    {
        title: "Lei Zero",
        description: "Trata do equilíbrio térmico. Se dois corpos A e B estão em equilíbrio térmico com um terceiro corpo C, então A e B estão em equilíbrio térmico entre si.",
        formula: "Se TA = TC e TB = TC -> TA = TB",
        image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=500&auto=format&fit=crop&q=60"
    },
    {
        title: "Primeira Lei",
        description: "A lei da conservação da energia. A energia não pode ser criada nem destruída, apenas transformada. O calor recebido vira trabalho e variação de energia interna.",
        formula: "ΔU = Q - W",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=500&auto=format&fit=crop&q=60"
    },
    {
        title: "Segunda Lei",
        description: "Afirma que os processos naturais são irreversíveis e que a entropia (desordem) do universo sempre tende a aumentar. O calor flui espontaneamente do quente para o frio.",
        formula: "ΔS universo > 0",
        // 🛠️ LINK ATUALIZADO: Imagem abstrata 2D estável representando caos/dispersão
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60" 
    },
    {
        title: "Terceira Lei",
        description: "Estabelece um limite inferior para a temperatura: o zero absoluto. À medida que a temperatura aborda o zero absoluto, a entropia tende a um valor mínimo constante.",
        formula: "T -> 0 K , S -> constante",
        image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=500&auto=format&fit=crop&q=60"
    }
];

function renderCards() {
    const container = document.getElementById('laws-container');
    if (!container) return;

    container.innerHTML = thermodynamicLaws.map(law => `
        <div class="card">
            <img src="${law.image}" alt="${law.title}" class="card-img" loading="lazy">
            <div class="card-content">
                <h2 class="card-title">${law.title}</h2>
                <p class="card-desc">${law.description}</p>
                <div class="formula">${law.formula}</div>
            </div>
        </div>
    `).join('');
}

window.addEventListener('DOMContentLoaded', renderCards);