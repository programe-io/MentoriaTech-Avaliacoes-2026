
let seguindo = false;
let seguidores = 120;

function seguirPerfil() {
    const botao = document.getElementById("seguir");
    const numero = document.getElementById("seguidores");

    if (!seguindo) {
        seguidores++;
        botao.textContent = "Seguindo";
        seguindo = true;
    } else {
        seguidores--;
        botao.textContent = "Seguir";
        seguindo = false;
    }

    numero.textContent = seguidores;
}

function mensagem() {
    alert("Olá! Obrigada por visitar meu perfil! 💜");
}
