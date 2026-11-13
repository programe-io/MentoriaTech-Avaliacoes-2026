
// Array de objetos
let beneficios = [
    {
        id: 1,
        titulo: "Rapidez",
        descricao: "Permite atualizar funcionalidades com mais agilidade."
    },
    {
        id: 2,
        titulo: "Escalabilidade",
        descricao: "Cada serviço pode crescer de acordo com a demanda."
    },
    {
        id: 3,
        titulo: "Segurança",
        descricao: "Permite aplicar controles de segurança em cada serviço."
    },
    {
        id: 4,
        titulo: "Flexibilidade",
        descricao: "Cada serviço pode ser desenvolvido separadamente."
    }
];

// Função responsável por renderizar os dados
function render() {

    const container = document.getElementById("lista-beneficios");

    // 1. Limpar o container
    container.innerHTML = "";

    // 2. Percorrer o Array
    beneficios.forEach(function(item) {

        // 3. Criar o HTML
        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
            <button onclick="removerBeneficio(${item.id})">
                Remover
            </button>
        `;

        // 4. Inserir no DOM
        container.appendChild(card);
    });
}

// Adicionar um novo benefício
function adicionarBeneficio() {

    const novoId = beneficios.length > 0
        ? Math.max(...beneficios.map(item => item.id)) + 1
        : 1;

    beneficios.push({
        id: novoId,
        titulo: "Novo benefício",
        descricao: "Os microsserviços facilitam a evolução dos aplicativos."
    });

    render();
}

// Remover benefício
function removerBeneficio(id) {

    beneficios = beneficios.filter(function(item) {
        return item.id !== id;
    });

    render();
}

// Renderização inicial
render();
