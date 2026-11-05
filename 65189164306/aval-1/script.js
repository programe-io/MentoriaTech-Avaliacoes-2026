document.addEventListener('DOMContentLoaded', () => {

    // 1. Mini-jogo interativo: Patrick Jane adivinha o seu pensamento
    const btnTruque = document.getElementById('btn-truque');
    const resultadoTruque = document.getElementById('resultado-truque');

    btnTruque.addEventListener('click', () => {
        btnTruque.textContent = "A ler a sua mente...";
        btnTruque.disabled = true;

        // Simula o processo de dedução do Jane
        setTimeout(() => {
            // Um truque clássico de mentalismo focado em respostas estatisticamente comuns (ex: número 7)
            resultadoTruque.innerHTML = `O número em que pensou foi o <strong>7</strong>!<br><small>"As pessoas são mais previsíveis do que pensam." - Patrick Jane</small>`;
            resultadoTruque.classList.remove('hidden');
            btnTruque.textContent = "Tentar novamente";
            btnTruque.disabled = false;
        }, 1500);
    });

    // 2. Modais/Alertas simples para os botões do Menu
    const btnRegras = document.getElementById('btn-regras');
    const btnSobre = document.getElementById('btn-sobre');

    btnRegras.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Regra Número 1 do Mentalista:\nNão existem médiuns reais. Tudo se resume a observação, sugestão e atenção aos detalhes.");
    });

    btnSobre.addEventListener('click', (e) => {
        e.preventDefault();
        alert("The Mentalist foi uma série de TV norte-americana exibida de 2008 a 2015, que segue Patrick Jane na sua busca por vingança contra o assassino em série Red John.");
    });
});
