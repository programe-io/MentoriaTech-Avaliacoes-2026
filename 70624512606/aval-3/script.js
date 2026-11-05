
function saudacao() {
    alert("Olá! Que bom ter você aqui! 💗 Meu nome é Victoria!");
}

function mudarCor() {
    const cores = [
        "#fff0f6",
        "#f3e8ff",
        "#e0f2fe",
        "#fef3c7",
        "#dcfce7"
    ];

    const cor = Math.floor(Math.random() * cores.length);

    document.body.style.backgroundColor = cores[cor];
}

function mostrarData() {
    const hoje = new Date();

    const dataFormatada = hoje.toLocaleDateString("pt-BR");

    document.getElementById("resultado").textContent =
        "A data de hoje é: " + dataFormatada;
}
