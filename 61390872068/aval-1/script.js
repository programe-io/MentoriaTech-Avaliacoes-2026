document.addEventListener('DOMContentLoaded', () => {
    const mundo = document.getElementById('mundo');
    const slots = document.querySelectorAll('.slot');
    
    let blocoSelecionado = 'grama';
    const iconesBlocos = {
        grama: '🌿',
        terra: '🟫',
        pedra: '⬜',
        madeira: '🪵'
    };

    // Selecionar bloco na Hotbar
    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            slots.forEach(s => s.classList.remove('selecionado'));
            slot.classList.add('selecionado');
            blocoSelecionado = slot.getAttribute('data-bloco');
        });
    });

    // Criar o grid do mundo (8x5 = 40 blocos)
    const totalBlocos = 40;
    for (let i = 0; i < totalBlocos; i++) {
        const divBloco = document.createElement('div');
        divBloco.classList.add('bloco');
        
        // Define alguns blocos iniciais de grama na última linha
        if (i >= 32) {
            divBloco.textContent = iconesBlocos.grama;
            divBloco.dataset.tipo = 'grama';
        } else {
            divBloco.textContent = '';
            divBloco.dataset.tipo = 'vazio';
        }

        // Clicar no bloco para colocar ou remover
        divBloco.addEventListener('click', () => {
            if (divBloco.dataset.tipo === 'vazio') {
                divBloco.textContent = iconesBlocos[blocoSelecionado];
                divBloco.dataset.tipo = blocoSelecionado;
            } else {
                // Se já tem bloco, limpa
                divBloco.textContent = '';
                divBloco.dataset.tipo = 'vazio';
            }
        });

        mundo.appendChild(divBloco);
    }
}