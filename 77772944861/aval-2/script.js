
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorInput = document.getElementById("color");
const sizeInput = document.getElementById("size");
const sizeValue = document.getElementById("sizeValue");

const brushButton = document.getElementById("brush");
const eraserButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");

let drawing = false;
let currentTool = "brush";

// Configuração inicial da tela
function setupCanvas() {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = rect.width * pixelRatio;
    canvas.height = rect.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = sizeInput.value;
    ctx.strokeStyle = colorInput.value;
}

setupCanvas();

// Selecionar posição do mouse ou dedo
function getPosition(event) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Começar desenho
canvas.addEventListener("pointerdown", (event) => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);

    const position = getPosition(event);

    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(position.x + 0.1, position.y + 0.1);
    ctx.stroke();
});

// Desenhar
canvas.addEventListener("pointermove", (event) => {
    if (!drawing) return;

    const position = getPosition(event);

    ctx.lineWidth = Number(sizeInput.value);

    if (currentTool === "eraser") {
        ctx.strokeStyle = "#ffffff";
    } else {
        ctx.strokeStyle = colorInput.value;
    }

    ctx.lineTo(position.x, position.y);
    ctx.stroke();
});

// Parar desenho
function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);

// Alterar cor
colorInput.addEventListener("input", () => {
    currentTool = "brush";
    updateButtons();
});

// Alterar tamanho
sizeInput.addEventListener("input", () => {
    sizeValue.textContent = sizeInput.value + " px";
});

// Selecionar pincel
brushButton.addEventListener("click", () => {
    currentTool = "brush";
    updateButtons();
});

// Selecionar borracha
eraserButton.addEventListener("click", () => {
    currentTool = "eraser";
    updateButtons();
});

// Atualizar botões selecionados
function updateButtons() {
    brushButton.classList.toggle(
        "active", currentTool === "brush"
    );

    eraserButton.classList.toggle(
        "active", currentTool === "eraser"
    );
}

// Limpar desenho
clearButton.addEventListener("click", () => {
    if (confirm("Deseja apagar todo o seu desenho?")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Salvar desenho
saveButton.addEventListener("click", () => {
    const image = document.createElement("canvas");
    image.width = canvas.width;
    image.height = canvas.height;

    const imageContext = image.getContext("2d");

    imageContext.fillStyle = "#ffffff";
    imageContext.fillRect(0, 0, image.width, image.height);
    imageContext.drawImage(canvas, 0, 0);

    const link = document.createElement("a");

    link.download = "desenho-do-jean.png";
    link.href = image.toDataURL("image/png");
    link.click();
});
