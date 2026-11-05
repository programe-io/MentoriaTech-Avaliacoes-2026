
function abrirAba(id, botao) {

    // Esconde todas as abas
    document.querySelectorAll(".aba").forEach(aba => {
        aba.classList.remove("ativa");
    });

    // Mostra a aba selecionada
    document.getElementById(id).classList.add("ativa");

    // Remove a seleção dos botões
    document.querySelectorAll("nav button").forEach(btn => {
        btn.classList.remove("ativo");
    });

    // Destaca o botão selecionado
    botao.classList.add("ativo");
}
