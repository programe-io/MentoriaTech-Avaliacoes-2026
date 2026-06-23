const words = ["JAVA", "HTML", "CSS", "JS"];
const gridSize = 10;

let grid = [];
let selected = [];
let foundWords = [];

function randomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}

// cria grade vazia
for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
        grid[i][j] = randomLetter();
    }
}

// coloca palavras na horizontal
function placeWord(word, row, col) {
    for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = word[i];
    }
}

placeWord("JAVA", 0, 0);
placeWord("HTML", 2, 2);
placeWord("CSS", 4, 4);
placeWord("JS", 6, 1);

const game = document.getElementById("game");

function render() {
    game.innerHTML = "";

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerText = grid[i][j];

            cell.dataset.row = i;
            cell.dataset.col = j;

            cell.addEventListener("click", () => selectCell(cell));

            game.appendChild(cell);
        }
    }
}

function selectCell(cell) {
    if (cell.classList.contains("found")) return;

    cell.classList.toggle("selected");

    selected.push(cell.innerText);

    let word = selected.join("");

    checkWord(word);
}

function checkWord(word) {
    if (words.includes(word)) {
        alert("🎉 Você encontrou: " + word);

        foundWords.push(word);

        document.querySelectorAll(".selected").forEach(c => {
            c.classList.remove("selected");
            c.classList.add("found");
        });

        selected = [];
        updateWords();
    }
}

function updateWords() {
    const div = document.getElementById("words");

    div.innerHTML =
        "<b>Palavras:</b><br>" +
        words.map(w =>
            foundWords.includes(w) ? "✅ " + w : "❌ " + w
        ).join("<br>");
}

render();
updateWords();