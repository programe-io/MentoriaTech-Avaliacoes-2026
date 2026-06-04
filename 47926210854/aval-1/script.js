const dicas = [
"Beba bastante água todos os dias.",
"Pratique atividades físicas regularmente.",
"Durma bem para manter a saúde.",
"Consuma frutas e verduras diariamente.",
"Cuide da sua saúde mental."
];

let numeroAleatorio = Math.floor(Math.random() * dicas.length);

alert("Vida Saudável\n\nDica do dia:\n" + dicas[numeroAleatorio]);