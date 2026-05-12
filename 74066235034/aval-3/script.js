function calcular() {
    // Pegando os elementos do HTML
    const inputIndice = document.getElementById('valorIndice');
    const displayResultado = document.getElementById('caixaResposta');
    
    // Transformando em número real
    const indice = parseFloat(inputIndice.value);

    // Validação básica
    if (isNaN(indice)) {
        alert("Por favor, informe um valor numérico!");
        return;
    }

    // Limpar estilos anteriores e mostrar a div
    displayResultado.className = ""; 
    displayResultado.style.display = "block";

    // Regras de negócio da Prática 03
    if (indice < 35) {
        displayResultado.innerText = "Classificação: Agradável";
        displayResultado.classList.add("cor-bom");
    } 
    else if (indice <= 60) {
        displayResultado.innerText = "Classificação: Desagradável";
        displayResultado.classList.add("cor-medio");
    } 
    else {
        displayResultado.innerText = "Classificação: Perigoso";
        displayResultado.classList.add("cor-ruim");
    }
}