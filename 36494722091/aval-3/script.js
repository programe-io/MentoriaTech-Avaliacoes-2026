/* =========================
   MENSAGEM AO CLICAR
========================= */
function mostrarMensagem() {
    alert("Você clicou no botão!");
}

/* =========================
   MODO ESCURO (DARK MODE)
========================= */
function alternarTema() {
    document.body.classList.toggle("dark");
}

/* =========================
   VALIDAÇÃO DE FORMULÁRIO
========================= */
function validarFormulario() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;

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

function contarCliques() {
    contador++;
    document.getElementById("contador").innerText = contador;
}

/* =========================
   TROCAR TEXTO
========================= */
function trocarTexto() {
    let elemento = document.getElementById("texto");
    elemento.innerText = "O texto foi alterado!";
}

/* =========================
   RELÓGIO EM TEMPO REAL
========================= */
function atualizarRelogio() {
    let agora = new Date();
    let hora = agora.toLocaleTimeString();
    document.getElementById("relogio").innerText = hora;
}

setInterval(atualizarRelogio, 1000);

/* =========================
   CARREGAMENTO DA PÁGINA
========================= */
window.onload = function() {
    console.log("Página carregada com sucesso!");
};