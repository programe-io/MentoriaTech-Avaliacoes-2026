// Mensagem no console
console.log("JavaScript funcionando!");

// Alerta ao enviar o formulário
const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Formulário enviado com sucesso!");
});

// Desenho simples no canvas
const canvas = document.getElementById("canvas");

if (canvas.getContext) {
    canvas.width = 250;
    canvas.height = 120;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "blue";
    ctx.fillRect(20, 20, 80, 60);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(170, 50, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = "18px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Canvas", 80, 110);
}