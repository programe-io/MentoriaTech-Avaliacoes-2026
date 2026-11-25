
const alimentos = [
    {
        nome: "Banana",
        beneficio: "Fornece energia e potássio, ajudando no funcionamento dos músculos.",
        momento: "Antes ou depois do treino"
    },
    {
        nome: "Ovos",
        beneficio: "São ricos em proteínas, importantes para a recuperação muscular.",
        momento: "Café da manhã ou após o treino"
    },
    {
        nome: "Batata-doce",
        beneficio: "É fonte de carboidratos, que ajudam a fornecer energia para jogar futebol.",
        momento: "Antes dos treinos e jogos"
    },
    {
        nome: "Frutas",
        beneficio: "Fornecem vitaminas, minerais e fibras importantes para a saúde.",
        momento: "Durante o dia"
    },
    {
        nome: "Água",
        beneficio: "Ajuda a manter o corpo hidratado durante os exercícios físicos.",
        momento: "Antes, durante e depois do jogo"
    },
    {
        nome: "Frango",
        beneficio: "Possui proteínas que contribuem para a manutenção e recuperação dos músculos.",
        momento: "Nas refeições principais"
    }
];

// Seleciona os elementos da página
const botao = document.getElementById("mostrarAlimentos");
const resultado = document.getElementById("resultado");

// Mostra os alimentos saudáveis
botao.addEventListener("click", function () {
    resultado.innerHTML = "";

    alimentos.forEach(function(alimento) {
        const card = document.createElement("div");

        card.classList.add("card-alimento");

        card.innerHTML = `
            <h3>${alimento.nome}</h3>
            <p>${alimento.beneficio}</p>
            <strong>${alimento.momento}</strong>
        `;

        resultado.appendChild(card);
    });
});

// Mensagem de boas-vindas
console.log("Bem-vindo ao site de alimentação saudável no futebol!");
