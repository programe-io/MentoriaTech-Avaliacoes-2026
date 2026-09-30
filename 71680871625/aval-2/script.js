function gerarBoasVindas() {
    // Captura o input e o elemento de texto
    const inputNome = document.getElementById('nome-usuario');
    const elementoMensagem = document.getElementById('mensagem-boas-vindas');
    
    // Remove espaços extras nas pontas do nome
    const nome = inputNome.value.trim();

    // Validação simples: impede o envio se o campo estiver vazio
    if (nome === "") {
        alert("Por favor, digite um nome válido!");
        elementoMensagem.classList.add('hidden');
        return;
    }

    // Altera o texto e exibe o elemento removendo a classe 'hidden'
    elementoMensagem.textContent = `Seja bem-vindo, ${nome}!`;
    elementoMensagem.classList.remove('hidden');

    // Limpa o campo de entrada para uma próxima digitação
    inputNome.value = "";
}
