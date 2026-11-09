// 1. SELEÇÃO: Captura o elemento do HTML
const caixaTexto = document.querySelector("#campo-email");
const botaoEnviar = document.querySelector(".btn-enviar");

// 2. AÇÃO (Função): Define o que vai acontecer
function validarFormulario() {
    let emailDigitado = caixaTexto.value; // Pega o texto de dentro do campo
    
    if (emailDigitado === "") {
        alert("Por favor, digite um e-mail!");
    \} else {
        console.log("E-mail enviado: " + emailDigitado);
    \}
\}

// 3. EVENTO: Junta o elemento com a ação através de um gatilho (ex: 'click')
botaoEnviar.addEventListener("click", validarFormulario);$0