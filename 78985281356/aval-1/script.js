// Aguarda todo o conteúdo da página ser carregado antes de executar
document.addEventListener('DOMContentLoaded', function() {

    // 1. Mensagem de boas-vindas personalizada
    function mostrarBoasVindas() {
        const horaAtual = new Date().getHours();
        let mensagem;

        if (horaAtual < 12) {
            mensagem = "Bom dia! Que seu dia seja produtivo 😊";
        \} else if (horaAtual < 18) {
            mensagem = "Boa tarde! Tudo bem por aí? ☀️";
        \} else {
            mensagem = "Boa noite! Hora de descansar um pouco 🌙";
        \}

        // Cria um elemento para exibir a mensagem
        const caixaMensagem = document.createElement('div');
        caixaMensagem.style.backgroundColor = '#d4edda';
        caixaMensagem.style.color = '#155724';
        caixaMensagem.style.padding = '1rem';
        caixaMensagem.style.margin = '1rem auto';
        caixaMensagem.style.borderRadius = '8px';
        caixaMensagem.style.textAlign = 'center';
        caixaMensagem.style.maxWidth = '800px';
        caixaMensagem.textContent = mensagem;

        // Adiciona a mensagem logo após o cabeçalho
        const cabecalho = document.querySelector('header');
        cabecalho.parentNode.insertBefore(caixaMensagem, cabecalho.nextSibling);
    \}

    // 2. Função para alterar cor dos cartões ao clicar
    function adicionarInteracaoCartoes() {
        const cartoes = document.querySelectorAll('.card');

        cartoes.forEach(cartao => {
            cartao.style.cursor = 'pointer'; // Mostra que é clicável

            cartao.addEventListener('click', function() {
                // Altera a cor de fundo aleatoriamente
                const cores = ['#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0'];
                const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
                this.style.backgroundColor = corAleatoria;

                // Mostra um aviso
                alert('Você clicou em um cartão! 🎨');
            \});
        \});
    \}

    // 3. Exibe data e hora atual no rodapé
    function atualizarRodape() {
        const rodape = document.querySelector('footer');
        const dataAtual = new Date();
        const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        \});

        // Adiciona informação no rodapé
        const infoData = document.createElement('p');
        infoData.textContent = `Última atualização: \${dataFormatada\}`;
        rodape.appendChild(infoData);
    \}

    // 4. Botão para voltar ao topo da página
    function criarBotaoTopo() {
        const botao = document.createElement('button');
        botao.textContent = '⬆️ Voltar ao Topo';
        botao.style.position = 'fixed';
        botao.style.bottom = '2rem';
        botao.style.right = '2rem';
        botao.style.padding = '0.8rem 1.2rem';
        botao.style.backgroundColor = '#2c3e50';
        botao.style.color = 'white';
        botao.style.border = 'none';
        botao.style.borderRadius = '8px';
        botao.style.cursor = 'pointer';
        botao.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';

        // Ação ao clicar
        botao.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Rolagem suave
            \});
        \});

        document.body.appendChild(botao);
    \}

    // Chamar todas as funções
    mostrarBoasVindas();
    adicionarInteracaoCartoes();
    atualizarRodape();
    criarBotaoTopo();

\});$0