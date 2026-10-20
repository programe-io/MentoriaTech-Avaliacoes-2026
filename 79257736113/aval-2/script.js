// Função que é acionada quando o usuário clica em um card
function mostrarLutador(nome, detalhes) {
    const nomeElemento = document.getElementById('nome-lutador');
    const detalhesElemento = document.getElementById('detalhes-lutador');

    // Atualiza o texto na tela com as informações do lutador selecionado
    nomeElemento.textContent = nome;
    detalhesElemento.textContent = detalhes;
}
