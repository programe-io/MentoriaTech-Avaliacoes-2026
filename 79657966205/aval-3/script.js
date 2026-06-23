// Lista de dicas de tênis masculinos
const dicasTenis = [
    "👟 Escolha o tamanho correto para evitar machucados e desconforto.",
    "🧼 Limpe seu tênis regularmente para aumentar sua durabilidade.",
    "🏃 Use tênis de corrida para atividades físicas e modelos casuais para o dia a dia.",
    "☀️ Evite deixar o tênis exposto ao sol por muito tempo.",
    "📏 Confira o formato do seu pé antes de comprar um novo modelo.",
    "💨 Deixe o tênis respirar após o uso para evitar mau cheiro.",
    "⭐ Invista em modelos de qualidade para ter mais conforto."
];


// Função para mostrar uma dica aleatória
function mostrarDicaTenis() {

    let numero = Math.floor(Math.random() * dicasTenis.length);

    document.getElementById("dica").innerHTML = dicasTenis[numero];

}