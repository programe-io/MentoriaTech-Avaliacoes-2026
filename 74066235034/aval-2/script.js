function calcular() {
    const input = document.getElementById('indice');
    const res = document.getElementById('resultado');
    const valor = parseFloat(input.value);

    if (isNaN(valor)) {
        alert("Por favor, digite um número.");
        return;
    }

    // Mostra o elemento de resultado e limpa classes antigas
    res.style.display = "block";
    res.className = ""; 

    // Lógica do desafio
    if (valor < 35) {
        res.innerHTML = "Classificação: Agradável";
        res.classList.add("agradavel");
    } 
    else if (valor >= 35 && valor <= 60) {
        res.innerHTML = "Classificação: Desagradável";
        res.classList.add("desagradavel");
    } 
    else {
        res.innerHTML = "Classificação: Perigoso";
        res.classList.add("perigoso");
    }
}