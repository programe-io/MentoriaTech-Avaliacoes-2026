function enviar() {
    alert("Formulário enviado!");
}

const canvas = document.getElementById("canvas");

if(canvas){
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "green";
    ctx.fillRect(20,20,100,50);
}

const saida = document.getElementById("saida");

if(saida){
    saida.textContent = "100";
}