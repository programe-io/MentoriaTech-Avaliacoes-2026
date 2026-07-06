// ============================================
// CURIOSIDADES - Cachorros & Cavalos
// ============================================

const curiosities = [
    // Cachorros
    "O olfato dos cachorros é entre 10.000 e 100.000 vezes mais potente que o dos humanos!",
    "O cão mais velho da história viveu 29 anos e 282 dias — era um Boiadeiro Australiano chamado Bluey.",
    "O focinho de cada cachorro é único, como uma impressão digital humana.",
    "Cachorros entendem até 250 palavras e gestos humanos — o mesmo que uma criança de 2 anos.",
    "A raça de cachorro mais rápida é o Galgo, que pode atingir 72 km/h.",
    "Cachorros suam pelas patas. Para se refrescar, eles ofegam.",
    "O cão mais pesado da história foi um São Bernardo de 166 kg.",
    "Existem mais de 340 raças de cachorro no mundo todo.",
    "Cachorros sonham! As ondas cerebrais deles durante o sono são semelhantes às dos humanos.",
    "A raça mais popular no Brasil é o Shih Tzu, seguido pelo Lulu da Pomerânia.",
    "Cachorros podem sentir cheiros a até 20 km de distância em condições ideais.",
    "O cão mais alto do mundo foi um Great Dane chamado Zeus, com 1,12 m de altura.",

    // Cavalos
    "Cavalos dormem de pé! Para um sono profundo, deitam-se por apenas 3 horas por dia.",
    "O maior cavalo do mundo se chamava Sampson — 2,19 m de altura e 1.520 kg!",
    "Cavalos têm o maior olho entre todos os mamíferos terrestres.",
    "O cavalo mais rápido já registrado atingiu 70,76 km/h.",
    "Cavalos conseguem ver quase 360 graus ao redor — só não enxergam diretamente à frente e atrás.",
    "Um cavalo precisa comer cerca de 2% do seu peso corporal em comida por dia.",
    "O Mangalarga Marchador é uma raça genuinamente brasileira de cavalo.",
    "Cavalos vivem em média 25 a 35 anos, dependendo da raça e dos cuidados.",
    "Cavalos têm memória excelente — eles reconhecem pessoas mesmo após anos sem ver.",
    "Os dentes de um cavalo continuam crescendo ao longo da vida toda.",
    "Cavalos emitem sons diferentes: relincho (longa distância), sopro (curiosidade) e chiado (medo/alerta).",
    "O Puro Sangue Inglês pode correr 1,6 km em menos de 1 minuto e 40 segundos.",
];

const curiosityText = document.getElementById('curiosityText');
const curiosityBtn = document.getElementById('curiosityBtn');

let lastIndex = -1;

function showRandomCuriosity() {
    let index;
    do {
        index = Math.floor(Math.random() * curiosities.length);
    } while (index === lastIndex && curiosities.length > 1);

    lastIndex = index;
    curiosityText.textContent = curiosities[index];
}

curiosityBtn.addEventListener('click', showRandomCuriosity);
