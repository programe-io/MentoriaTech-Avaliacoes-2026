/* =========================
   MENSAGEM SIMPLES
========================= */
function mostrarMensagem() {
    alert("Olá! Bem-vindo ao site 🚀");
}

/* =========================
   ALTERAR TEXTO
========================= */
function mudarTexto() {
    const texto = document.getElementById("texto");
    texto.innerHTML = "Texto alterado com sucesso!";
}

/* =========================
   MODO ESCURO (DARK MODE)
========================= */
function alternarModo() {
    document.body.classList.toggle("dark");
}

/* =========================
   VALIDAÇÃO DE FORMULÁRIO
========================= */
function validarFormulario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (nome === "" || email === "") {
        alert("Preencha todos os campos!");
        return false;
    }

    alert("Formulário enviado com sucesso!");
    return true;
}

/* =========================
   CONTADOR DE CLIQUES
========================= */
let contador = 0;

function contarClique() {
    contador++;
    document.getElementById("contador").innerText = contador;
}

/* =========================
   RELÓGIO EM TEMPO REAL
========================= */
function atualizarRelogio() {
    const agora = new Date();
    const hora = agora.toLocaleTimeString();
    document.getElementById("relogio").innerText = hora;
}

setInterval(atualizarRelogio, 1000);

/* =========================
   CARREGAMENTO DA PÁGINA
========================= */
window.onload = function () {
    console.log("Página carregada com sucesso!");
};