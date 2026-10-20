// ============================================================================
// Tópico 4: Aplicando propriedades CSS via JavaScript (Estilização direta/inline)
// Nota (Tópico 5): Útil para mudanças rápidas, mas evite usar em excesso, pois 
// adiciona estilo inline e dificulta a manutenção do código.
// ============================================================================
const aviso = document.getElementById('aviso');
if (aviso) {
    aviso.style.borderRadius = '8px';
    aviso.style.marginTop = '15px';
}

// ============================================================================
// Tópico 10: Selecionando vários elementos com getElementsByClassName
// Retorna uma HTMLCollection com todas as células que possuem a classe indicada.
// ============================================================================
const celulasSituacao = document.getElementsByClassName('coluna-situacao');

// ============================================================================
// Tópico 11: Percorrendo elementos e aplicando estilos condicionais
// Convertemos a HTMLCollection em um Array para usar o método .forEach()
// ============================================================================
Array.from(celulasSituacao).forEach(celula => {
    // Normaliza o texto de dentro da célula (remove espaços e põe em minúsculo)
    const textoStatus = celula.textContent.trim().toLowerCase();

    // Lógica condicional para decidir qual estilo aplicar baseado na situação
    // Tópicos 6 e 7: Manipulando classes com classList usando o método .add()
    if (textoStatus === 'aprovado') {
        celula.classList.add('situacao-aprovado');
    } else if (textoStatus === 'pendente') {
        celula.classList.add('situacao-pendente');
    } else if (textoStatus === 'reprovado') {
        celula.classList.add('situacao-reprovado');
    }
});

// ============================================================================
// Tópico 7: Exemplo com o método .toggle() e .remove()
// O toggle adiciona a classe se ela não existir, ou remove se ela já existir.
// ============================================================================
const botaoAlternar = document.getElementById('btnAlternarAviso');

if (botaoAlternar && aviso) {
    botaoAlternar.addEventListener('click', () => {
        // Altera a cor da borda diretamente usando a propriedade style (Estilização direta)
        if (aviso.style.borderColor === 'red') {
            aviso.style.borderColor = 'black';
        } else {
            aviso.style.borderColor = 'red';
        }
        
        // Exemplo extra de toggle: se quiséssemos ligar/desligar uma classe no aviso
        // aviso.classList.toggle('destaque-aviso');
    });
}
