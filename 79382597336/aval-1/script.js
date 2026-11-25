
// Dicas especiais
function mostrarDica() {
    const dicas = [
        "Escove os pelos do seu Shih Tzu diariamente para evitar nós! 🐾",
        "Mantenha os olhinhos sempre limpos! 👀",
        "Ofereça água fresca durante todo o dia! 💧",
        "Não esqueça de passear e brincar com seu amiguinho! 🧸",
        "Leve seu Shih Tzu ao veterinário regularmente! ❤️"
    ];

    const sorteio = Math.floor(Math.random() * dicas.length);

    document.getElementById("dica-especial").textContent =
        dicas[sorteio];
}

// Curiosidades
function mostrarCuriosidade() {
    const curiosidades = [
        "O Shih Tzu é uma raça originária do Tibete e desenvolvida na China! 🐶",
        "É conhecido por ser um excelente cão de companhia! ❤️",
        "Seu nome significa cão-leão! 🦁",
        "É uma raça de pequeno porte! 🐾",
        "Pode apresentar diversas combinações de cores na pelagem! 🌈"
    ];

    const sorteio = Math.floor(Math.random() * curiosidades.length);

    document.getElementById("curiosidade").textContent =
        curiosidades[sorteio];
}

// Enviar comentários
function enviarComentario() {
    const nome = document.getElementById("nome").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (nome === "" || comentario === "") {
        alert("Preencha seu nome e comentário! 💗");
        return;
    }

    const novoComentario = document.createElement("div");
    novoComentario.className = "comentario-card";

    const titulo = document.createElement("strong");
    titulo.textContent = nome + " diz:";

    const texto = document.createElement("p");
    texto.textContent = comentario;

    novoComentario.appendChild(titulo);
    novoComentario.appendChild(texto);

    document.getElementById("comentarios").appendChild(novoComentario);

    document.getElementById("nome").value = "";
    document.getElementById("comentario").value = "";

    alert("Comentário enviado com sucesso! 🐶❤️");
}
