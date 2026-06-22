const dicas = [
    "Transforme potes de vidro em organizadores para cozinha.",
    "Use caixas de papelão para criar divisórias de gavetas.",
    "Garrafas PET podem virar vasos para plantas.",
    "Roupas antigas podem ser transformadas em panos de limpeza.",
    "Latas vazias podem servir como porta-lápis.",
    "Pneus usados podem virar bancos ou jardins decorativos.",
    "Reaproveite água da chuva para regar plantas.",
    "Potes de sorvete são ótimos para armazenar alimentos.",
    "Paletes de madeira podem virar móveis sustentáveis.",
    "Revistas antigas podem ser usadas em trabalhos artesanais."
];

function novaDica() {
    const indice = Math.floor(Math.random() * dicas.length);
    document.getElementById("dica").textContent = dicas[indice];
}