// Mensagem ao carregar a página
console.log("Página carregada com sucesso!");

// Função para exibir um alerta
function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
}

// Função para alterar o texto de um elemento
function alterarTexto() {
    const titulo = document.getElementById("titulo");
    titulo.textContent = "Texto alterado com JavaScript!";
}

// Exemplo de contador
let contador = 0;

function aumentarContador() {
    contador++;
    document.getElementById("contador").textContent = contador;
}

// Exemplo de mudança de cor aleatória
function mudarCor() {
    const cores = [
        "#e74c3c",
        "#3498db",
        "#2ecc71",
        "#f1c40f",
        "#9b59b6"
    ];

    const corAleatoria =
        cores[Math.floor(Math.random() * cores.length)];

    document.body.style.backgroundColor = corAleatoria;
}