
function curtir(botao) {
    let quantidade = Number(
        botao.textContent.match(/\d+/)[0]
    );

    quantidade++;

    botao.textContent = `❤️ Curtir (${quantidade})`;
}
