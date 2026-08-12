function mostrarSecao(nomeAba) {
    let containerAbas = document.getElementById("secao-abas");
    containerAbas.classList.add("visivel");
    containerAbas.scrollIntoView({ behavior: 'smooth' });
    mudarAba(nomeAba);
}

function mudarAba(nomeAba) {
    let conteudos = document.getElementsByClassName("conteudo-aba");
    for (let i = 0; i < conteudos.length; i++) {
        conteudos[i].classList.remove("ativo-aba");
    }

    let botoes = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove("ativo");
    }

    document.getElementById(nomeAba).classList.add("ativo-aba");
    document.getElementById("btn-" + nomeAba).classList.add("ativo");
}

function voltarInicio() {
    document.getElementById("secao-abas").classList.remove("visivel");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}