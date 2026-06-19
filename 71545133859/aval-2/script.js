const game = document.getElementById("game");
const msg = document.getElementById("msg");

let tiles = [1,2,3,4,5,6,7,8,""];

function render() {
  game.innerHTML = "";

  tiles.forEach((value, index) => {
    const div = document.createElement("div");
    div.classList.add("tile");

    if (value === "") div.classList.add("empty");

    div.textContent = value;

    div.addEventListener("click", () => move(index));

    game.appendChild(div);
  });

  checkWin();
}

function move(index) {
  const emptyIndex = tiles.indexOf("");

  const validMoves = [
    emptyIndex - 1,
    emptyIndex + 1,
    emptyIndex - 3,
    emptyIndex + 3
  ];

  if (validMoves.includes(index)) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    render();
  }
}

function shuffle() {
  tiles = tiles.sort(() => Math.random() - 0.5);
  msg.innerHTML = "";
  render();
}

function checkWin() {
  if (tiles.join() === "1,2,3,4,5,6,7,8,") {
    msg.innerHTML = "🎉 Você venceu!";
  }
}

render();