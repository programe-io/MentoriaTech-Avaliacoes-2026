/**
 * 1. Função Surpresa: Alternador de Tema (Dark Mode)
 */
function alternarTema() {
    const body = document.documentElement;
    const botao = document.getElementById('theme-toggle');
    
    // Verifica o tema atual e inverte
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        botao.innerHTML = '🌙 Modo Escuro';
    } else {
        body.setAttribute('data-theme', 'dark');
        botao.innerHTML = '☀️ Modo Claro';
    }
}

/**
 * 2. Cálculo em Tempo Real (Sem precisar clicar em botão!)
 */
function calcularMediaDinâmica() {
    const n1 = parseFloat(document.getElementById('nota1').value);
    const n2 = parseFloat(document.getElementById('nota2').value);
    const painelResultado = document.getElementById('resultado-painel');
    const mediaValor = document.getElementById('media-valor');
    const statusValor = document.getElementById('status-valor');

    // Se um dos campos estiver vazio, esconde o painel e para
    if (isNaN(n1) || isNaN(n2)) {
        painelResultado.classList.add('hidden');
        return;
    }

    // Mostra o painel se ambos os números forem válidos
    painelResultado.classList.remove('hidden');

    // Calcula a média
    const media = (n1 + n2) / 2;
    mediaValor.innerText = media.toFixed(2);

    // Regra de Negócio Dinâmica (Aprovado / Recuperação / Reprovado)
    statusValor.className = 'badge'; // limpa classes anteriores

    if (media >= 7.0) {
        statusValor.innerText = 'Aprovado';
        statusValor.classList.add('badge-approved');
    } else if (media >= 5.0 && media < 7.0) {
        statusValor.innerText = 'Recuperação';
        statusValor.classList.add('badge-attention');
    } else {
        statusValor.innerText = 'Reprovado';
        statusValor.classList.add('badge-danger');
    }
}