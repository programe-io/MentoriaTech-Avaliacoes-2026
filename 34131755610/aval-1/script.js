/* ==========================
   MENSAGEM DOS PROJETOS
========================== */

function mostrarMensagem(projeto) {
    alert("Você selecionou o " + projeto + "!");
}


/* ==========================
   MOSTRAR CONTATO
========================== */

function mostrarContato() {
    let mensagem = document.getElementById("mensagem");
    mensagem.innerHTML =
        "Entre em contato pelo Instagram, WhatsApp ou e-mail.";
}