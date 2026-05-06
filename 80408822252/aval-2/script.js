function mudarSecao(secaoId) {
    const secoes = document.querySelectorAll("section");
    
    secoes.forEach(secao => {
        secao.classList.remove("ativo");
    });

    document.getElementById(secaoId).classList.add("ativo");

    document.getElementById("status").innerText = 
        "Você acessou: " + secaoId;
}

function mudarCor() {
    const cores = ["#ffffff", "#f0f8ff", "#ffe4e1", "#e6ffe6"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    document.body.style.backgroundColor = corAleatoria;

    document.getElementById("status").innerText = 
        "Cor alterada!";
}