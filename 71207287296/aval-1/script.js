const dicas = [
    "Use ingredientes em temperatura ambiente para melhor textura.",
    "Peneire a farinha para deixar a massa mais leve.",
    "Não abra o forno nos primeiros 30 minutos.",
    "Unte a forma corretamente para evitar que o bolo grude.",
    "Meça os ingredientes com precisão.",
    "Teste o ponto do bolo com um palito.",
    "Deixe o bolo esfriar antes de desenformar.",
    "Adicione uma pitada de sal para realçar o sabor."
];

function mostrarDica() {
    const indice = Math.floor(Math.random() * dicas.length);
    document.getElementById("dica").textContent = dicas[indice];
}