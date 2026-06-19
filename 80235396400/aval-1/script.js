/* ======================
   JAVASCRIPT COMPLETO
   Funcionalidades diversas para exemplo
====================== */

// Executa o código somente após todo o conteúdo da página ser carregado
document.addEventListener('DOMContentLoaded', function() {

    // 1. Exibir mensagem de boas-vindas
    function exibirBoasVindas() {
        const nomeUsuario = prompt("Digite o seu nome:");
        if (nomeUsuario && nomeUsuario.trim() !== "") {
            alert(`Olá, \${nomeUsuario\}! Seja bem-vindo(a) à nossa página!`);
            // Adiciona a mensagem diretamente na página
            const mensagem = document.createElement('p');
            mensagem.textContent = `Olá, \${nomeUsuario\}! Que bom ter você aqui.`;
            mensagem.style.color = '#1a5fb4';
            mensagem.style.fontWeight = 'bold';
            document.querySelector('main').prepend(mensagem);
        \}
    \}

    // 2. Função para alterar a cor de fundo da página
    function alterarCorFundo() {
        const cores = ['#f5f7fa', '#e8f4f8', '#f8f4e8', '#f4e8f8', '#e8f8e8'];
        const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
        document.body.style.backgroundColor = corAleatoria;
    \}

    // 3. Função para contar caracteres de um texto
    function contarCaracteres(texto) {
        return texto.length;
    \}

    // 4. Adiciona botões interativos dinamicamente na página
    function adicionarBotoes() {
        const container = document.createElement('div');
        container.style.marginTop = '25px';
        container.style.padding = '15px';
        container.style.border = '1px solid #e0e7f1';
        container.style.borderRadius = '8px';

        // Botão de alterar cor
        const botaoCor = document.createElement('button');
        botaoCor.textContent = 'Mudar cor de fundo';
        botaoCor.style.padding = '10px 15px';
        botaoCor.style.marginRight = '10px';
        botaoCor.style.border = 'none';
        botaoCor.style.borderRadius = '5px';
        botaoCor.style.backgroundColor = '#1a5fb4';
        botaoCor.style.color = 'white';
        botaoCor.style.cursor = 'pointer';
        botaoCor.addEventListener('click', alterarCorFundo);

        // Botão de contagem de caracteres
        const botaoContar = document.createElement('button');
        botaoContar.textContent = 'Contar caracteres';
        botaoContar.style.padding = '10px 15px';
        botaoContar.style.border = 'none';
        botaoContar.style.borderRadius = '5px';
        botaoContar.style.backgroundColor = '#2c70c7';
        botaoContar.style.color = 'white';
        botaoContar.style.cursor = 'pointer';
        botaoContar.addEventListener('click', function() {
            const texto = prompt("Digite um texto para contar os caracteres:");
            if (texto !== null) {
                alert(`Seu texto tem \${contarCaracteres(texto)\} caracteres.`);
            \}
        \});

        container.appendChild(botaoCor);
        container.appendChild(botaoContar);
        document.querySelector('main').appendChild(container);
    \}

    // Chamada das funções ao carregar a página
    exibirBoasVindas();
    adicionarBotoes();

\});$0