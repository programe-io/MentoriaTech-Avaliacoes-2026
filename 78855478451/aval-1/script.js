
console.log("🦊 BEM-VINDO AO MUNDO DAS RAPOSAS 🦊");
console.log("==============================");

const raposa = {
    nome: "Raposa-vermelha",
    habitat: "Florestas, campos e montanhas",
    alimentacao: "Onívora",
    familia: "Canídeos",
    expectativaDeVida: "3 a 5 anos na natureza"
};

console.log("🌳 INFORMAÇÕES DA RAPOSA");
console.log("Nome:", raposa.nome);
console.log("Habitat:", raposa.habitat);
console.log("Alimentação:", raposa.alimentacao);
console.log("Família:", raposa.familia);
console.log("Expectativa de vida:", raposa.expectativaDeVida);

const curiosidades = [
    "As raposas possuem uma audição excelente! 👂",
    "Elas conseguem usar a cauda para manter o equilíbrio.",
    "São animais muito inteligentes.",
    "Possuem hábitos principalmente noturnos.",
    "Podem viver em diferentes tipos de ambiente."
];

console.log("\n✨ CURIOSIDADES:");

curiosidades.forEach((curiosidade, index) => {
    console.log(`${index + 1}. ${curiosidade}`);
});

console.log("\n🦊 A RAPOSA É UM ANIMAL INCRÍVEL!");
console.log("================================");
