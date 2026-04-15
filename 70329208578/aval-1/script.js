// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Saudação Automática
    const header = document.querySelector('header');
    const saudacao = document.createElement('p');
    const hora = new Date().getHours();
    let mensagem = "";

    if (hora < 12) mensagem = "Bom dia!";
    else if (hora < 18) mensagem = "Boa tarde!";
    else mensagem = "Boa noite!";

    saudacao.innerText = mensagem + " Seja bem-vindo ao meu projeto.";
    saudacao.style.fontStyle = "italic";
    header.appendChild(saudacao);

    // 2. Validação Simples de Formulário
    const formulario = document.querySelector('form');
    
    formulario.addEventListener('submit', (evento) => {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        if (nome === "" || email === "") {
            evento.preventDefault(); // Impede o envio
            alert("Por favor, preencha os campos obrigatórios!");
        } else {
            alert(`Obrigado, ${nome}! Sua mensagem foi enviada (simulação).`);
        }
    });

    // 3. Botão para Alternar Modo Noturno
    const btnDark = document.createElement('button');
    btnDark.innerText = "Alternar Modo Noturno";
    btnDark.style.marginTop = "20px";
    
    // Insere o botão no início do "main"
    const main = document.querySelector('main');
    main.prepend(btnDark);

    btnDark.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Estilo rápido via JS para o modo noturno
        if (document.body.classList.contains('dark-mode')) {
            document.body.style.backgroundColor = "#1a1a1a";
            document.body.style.color = "#ffffff";
            main.style.backgroundColor = "#333";
        } else {
            document.body.style.backgroundColor = "#f4f4f9";
            document.body.style.color = "#333";
            main.style.backgroundColor = "#fff";
        }
    });
});