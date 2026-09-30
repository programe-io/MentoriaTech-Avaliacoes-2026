function calcularMedia() {
    // Captura os valores digitados nos inputs e converte para número decimal (float)
    const n1 = parseFloat(document.getElementById('nota1').value);
    const n2 = parseFloat(document.getElementById('nota2').value);
    const n3 = parseFloat(document.getElementById('nota3').value);
    const n4 = parseFloat(document.getElementById('nota4').value);

    // Captura os elementos de exibição do resultado
    const container = document.getElementById('resultado-container');
    const elementoMedia = document.getElementById('valor-media');
    const elementoStatus = document.getElementById('status-aluno');

    // Validação: Verifica se algum campo está vazio ou se os valores estão fora do intervalo de 0 a 10
    if (isNaN(n1) || isNaN(n2) || isNaN(n3) || isNaN(n4) ||
        n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || 
        n3 < 0 || n3 > 10 || n4 < 0 || n4 > 10) {
        
        alert("Por favor, preencha as 4 notas corretamente com valores de 0 a 10.");
        container.classList.add('hidden');
        return;
    }

    // Calcula a média aritmética
    const media = (n1 + n2 + n3 + n4) / 4;

    // Atualiza o texto da média na tela (com apenas 1 casa decimal)
    elementoMedia.textContent = media.toFixed(1);

    // Limpa as classes de estilo anteriores do container
    container.className = ""; 

    // Verifica a condição de aprovação (Critério: Média igual ou maior que 7.0)
    if (media >= 7) {
        elementoStatus.textContent = "ALUNO APROVADO! 🎉";
        container.classList.add('aprovado');
    } else {
        elementoStatus.textContent = "ALUNO REPROVADO. ❌";
        container.classList.add('reprovado');
    }
}
