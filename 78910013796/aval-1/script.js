// Seleciona todos os botões de curtir da página
const botoesCurtir = document.querySelectorAll('.btn-curtir');

botoesCurtir.forEach((botao) => {
    let contador = 0;
    const spanContador = botao.querySelector('span');

    botao.addEventListener('click', () => {
        contador++;
        spanContador.textContent = contador;
    });
});
