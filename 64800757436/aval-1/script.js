// MENSAGEM DE MATRÍCULA
function matricular() {
    alert(
        "💪 Seja bem-vindo à Power Fitness!\n\n" +
        "Estamos felizes pelo seu interesse.\n" +
        "Venha transformar sua vida com a gente!"
    );
}

// ESCOLHA DE PLANOS
function contratar(plano) {

    let mensagem = "";

    switch (plano) {

        case "Básico":
            mensagem = "Você escolheu o Plano Básico - R$ 69,90";
            break;

        case "Premium":
            mensagem = "Você escolheu o Plano Premium - R$ 99,90";
            break;

        case "VIP":
            mensagem = "Você escolheu o Plano VIP - R$ 129,90";
            break;

        default:
            mensagem = "Plano não encontrado!";
    }

    alert(mensagem + "\n\nEntre em contato para finalizar sua inscrição!");
}

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao site Power Fitness!");
});

// FORMULÁRIO DE CONTATO
function enviarMensagem() {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem").value;

    if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    alert(
        "Mensagem enviada com sucesso!\n\n" +
        "Nome: " + nome +
        "\nEmail: " + email
    );
}

// MENU PARA CELULAR
function abrirMenu() {

    let menu = document.getElementById("menu");

    menu.classList.toggle("ativo");
}

// BOTÃO DE VOLTAR AO TOPO
function voltarTopo() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ANO AUTOMÁTICO NO RODAPÉ
document.addEventListener("DOMContentLoaded", function() {

    let ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

});

// EFEITO DE ANIMAÇÃO AO ROLAR A PÁGINA
window.addEventListener("scroll", function() {

    let botao = document.getElementById("voltarTopo");

    if (botao) {
        if (window.scrollY > 300) {
            botao.style.display = "block";
        } else {
            botao.style.display = "none";
        }
    }

});