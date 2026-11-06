document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem');

    if (nome.trim() === "" || email.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    mensagem.textContent = `Olá, ${nome}! Seus dados foram validados com sucesso.`;
    
    // Limpa o formulário
    document.getElementById('meuFormulario').reset();
});
