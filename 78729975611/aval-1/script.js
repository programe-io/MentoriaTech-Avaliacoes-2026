// ===== MANIPULAÇÃO DE ELEMENTOS E INTERAÇÃO =====

// 1. Mensagem de boas-vindas ao carregar a página
window.addEventListener('load', function() {
    console.log('Página carregada com sucesso! 🎉');
    alert('Olá! Seja muito bem-vindo(a)! 😊');
});

// 2. Função para mostrar mensagem personalizada
function mostrarMensagem() {
    const nome = prompt('Digite o seu nome:');
    if (nome && nome.trim() !== '') {
        alert(`Prazer em te conhecer, ${nome}! 🤝`);
        // Adiciona um texto na página
        const secao = document.querySelector('section');
        const paragrafo = document.createElement('p');
        paragrafo.textContent = `Olá ${nome}! Este texto foi criado com JavaScript! ✨`;
        paragrafo.style.color = '#27ae60';
        paragrafo.style.fontWeight = 'bold';
        secao.appendChild(paragrafo);
    } else {
        alert('Você não digitou um nome 😅');
    }
}

// 3. Função para alterar cor de fundo da página
function mudarCorFundo() {
    const cores = ['#f0f8ff', '#e8f5e9', '#fff8e1', '#fce4ec', '#f3e5f5'];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    document.body.style.backgroundColor = corAleatoria;
}

// 4. Contador de cliques
let contador = 0;
function contarClique() {
    contador++;
    alert(`Você clicou ${contador} vez(es)! 🔢`);
}

// 5. Validação simples de formulário
function validarFormulario() {
    const nome = document.getElementById('nome').value;
    if (nome.length < 3) {
        alert('Por favor, digite um nome com pelo menos 3 letras!');
        return false;
    }
    alert(`Obrigado por participar, ${nome}! 📝`);
    return true;
}

// ===== CÓDIGO QUE EXECUTA AO CARREGAR =====
console.log('Script JavaScript carregado!');