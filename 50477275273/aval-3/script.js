function openTab(evt, tabName) {
    // Evita o comportamento padrão da tag <a> de rolar a página
    evt.preventDefault();

    // Esconde o conteúdo de todas as abas
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Remove a classe 'active' de todos os links do menu
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Exibe a aba clicada e ativa o link correspondente
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}