// Seleção dos elementos do DOM
const btnTema = document.getElementById('btnTema');
const inputNome = document.getElementById('inputNome');
const feedback = document.getElementById('feedback');

/**
 * Lógica para Alternar Tema (Dark Mode)
 */
btnTema.addEventListener('click', () => {
    // Alterna a classe 'dark-mode' no corpo da página
    document.body.classList.toggle('dark-mode');
    
    // Atualiza o texto do botão conforme o estado do tema
    if (document.body.classList.contains('dark-mode')) {
        btnTema.textContent = "Modo Claro";
    } else {
        btnTema.textContent = "Modo Escuro";
    }
});

/**
 * Lógica para Processar o Nome
 */
function processarNome() {
    const nome = inputNome.value.trim();

    // Validação simples
    if (nome === "") {
        feedback.textContent = "Por favor, digite um nome válido! ❌";
        feedback.style.color = "#ef4444"; // Cor de erro (vermelho)
    } else {
        feedback.textContent = `Olá, ${nome}! Seu projeto escolar está funcionando! ✅`;
        feedback.style.color = "#10b981"; // Cor de sucesso (verde)
        
        // Limpa o campo de texto após o envio
        inputNome.value = "";
    }
}

/**
 * Atalho de teclado: permite usar a tecla "Enter" para enviar
 */
inputNome.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        processarNome();
    }
});f