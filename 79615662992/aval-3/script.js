
// PERFIL DO INSTAGRAM
const perfil = {
    usuario: "@wbraquell_borgesz",
    nome: "Raquell Borges",
    seguidores: 1250,
    seguindo: 980,
    publicacoes: 12
};

// MOSTRAR INFORMAÇÕES DO PERFIL
console.log("Bem-vindo ao Instagram!");
console.log("Usuário:", perfil.usuario);
console.log("Nome:", perfil.nome);

// BOTÃO SEGUIR
let seguindo = false;

function seguirPerfil() {
    seguindo = !seguindo;

    const botao = document.getElementById("seguir");

    if (seguindo) {
        perfil.seguidores++;
        botao.innerText = "Seguindo";
    } else {
        perfil.seguidores--;
        botao.innerText = "Seguir";
    }

    atualizarSeguidores();
}

// ATUALIZAR SEGUIDORES
function atualizarSeguidores() {
    document.getElementById("seguidores").innerText =
        perfil.seguidores;
}

// CURTIR PUBLICAÇÃO
function curtir(elemento) {
    elemento.classList.toggle("curtido");

    if (elemento.classList.contains("curtido")) {
        elemento.innerText = "❤️ Curtido";
    } else {
        elemento.innerText = "🤍 Curtir";
    }
}

// ADICIONAR COMENTÁRIO
function comentar() {
    const campo = document.getElementById("comentario");
    const lista = document.getElementById("comentarios");

    if (campo.value.trim() !== "") {
        const novoComentario = document.createElement("p");

        novoComentario.innerHTML =
            "<strong>Visitante:</strong> " + 
            campo.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        lista.appendChild(novoComentario);

        campo.value = "";
    }
}

// MENSAGEM DE BOAS-VINDAS
function boasVindas() {
    alert("Bem-vindo(a) ao perfil @wbraquell_borgesz! 🌸");
}

boasVindas();
