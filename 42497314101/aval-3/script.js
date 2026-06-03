// Aguarda o DOM (toda a estrutura do HTML) carregar antes de rodar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. ANIMAÇÃO DO CONTADOR DE DENÚNCIAS (Efeito de Impacto)
    // ==========================================================================
    // Vamos criar um pequeno elemento de impacto visual logo no início da página
    const mainSection = document.querySelector('#o-que-e');
    const contadorContainer = document.createElement('div');
    contadorContainer.style.margin = "20px 0";
    contadorContainer.style.fontSize = "1.1rem";
    contadorContainer.innerHTML = `
        <p style="color: #d32f2f; font-weight: bold; margin-bottom: 5px;">
            A cada hora, dezenas de jovens sofrem calados.
        </p>
        <span style="font-size: 1.5rem; font-weight: bold; color: #4a148c;" id="numero-contador">0</span> 
        casos estimados de violência escolar foram reportados globalmente hoje.
    `;
    mainSection.appendChild(contadorContainer);

    let numeroAtual = 0;
    const numeroFinal = 1450; // Alvo da animação
    const incremento = Math.ceil(numeroFinal / 100);

    const atualizarContador = setInterval(() => {
        numeroAtual += incremento;
        if (numeroAtual >= numeroFinal) {
            document.getElementById('numero-contador').innerText = numeroFinal.toLocaleString();
            clearInterval(atualizarContador);
        } else {
            document.getElementById('numero-contador').innerText = numeroAtual.toLocaleString();
        }
    }, 20);


    // ==========================================================================
    // 2. INTERATIVIDADE NAS LISTAS (Expandir e Recolher Informações)
    // ==========================================================================
    const itensLista = document.querySelectorAll('#tipos li');

    itensLista.forEach(item => {
        // Estiliza os itens via JS para parecerem clicáveis
        item.style.cursor = 'pointer';
        item.title = 'Clique para ver mais';

        // Cria o texto extra que ficará escondido inicialmente
        const infoExtra = document.createElement('p');
        infoExtra.style.display = 'none';
        infoExtra.style.fontSize = '0.95rem';
        infoExtra.style.color = '#666';
        infoExtra.style.marginTop = '5px';
        infoExtra.style.paddingLeft = '15px';
        infoExtra.style.borderLeft = '2px solid #7b1fa2';

        // Adiciona descrições baseadas no tipo de bullying
        if (item.innerText.includes('Verbal')) {
            infoExtra.innerText = "Geralmente deixa marcas psicológicas profundas. O silêncio da vítima muitas vezes esconde a gravidade do insulto.";
        } else if (item.innerText.includes('Físico')) {
            infoExtra.innerText = "É a forma mais visível, mas muitas vezes a vítima esconde as marcas por medo de retaliação. Deve ser reportado imediatamente.";
        } else if (item.innerText.includes('Psicológico')) {
            infoExtra.innerText = "Pode ser sutil e difícil de flagrar por professores e pais, pois envolve exclusão proposital e isolamento da vítima.";
        } else if (item.innerText.includes('Cyberbullying')) {
            infoExtra.innerText = "Agressões na internet se espalham em segundos e a vítima sente que não tem para onde fugir, mesmo estando em casa.";
        }

        item.appendChild(infoExtra);

        // Evento de clique para abrir/fechar
        item.addEventListener('click', (e) => {
            // Evita bugs caso clique