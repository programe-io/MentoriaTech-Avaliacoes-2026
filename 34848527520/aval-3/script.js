 function openTab(event, tabId) {
        // 1. Esconde todo o conteúdo das abas
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(content => content.classList.remove('active'));

        // 2. Remove o estilo de 'ativo' de todos os botões do menu
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(button => button.classList.remove('active'));

        // 3. Exibe a aba clicada e adiciona a cor de destaque ao botão
        document.getElementById(tabId).classList.add('active');
        event.currentTarget.classList.add('active');
    }