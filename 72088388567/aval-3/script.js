// 1. Estilização direta via propriedade .style (Itens 2, 3 e 4)
// Exemplo de aplicação direta de CSS via JavaScript
const titulo = document.querySelector('h1');
titulo.style.textAlign = 'center';
titulo.style.color = '#007bff'; 
// Limitação (Item 5): Fazer isso para muitas propriedades polui o HTML com CSS inline.

// 2. Manipulando classes com classList.toggle (Item 6 e 7)
const btnTema = document.getElementById('btn-tema');
btnTema.addEventListener('click', () => {
    // O método toggle adiciona a classe se ela não existir, ou remove se já existir
    document.body.classList.toggle('dark-mode');
});

// 3. Selecionando múltiplos elementos e aplicando estilos condicionais (Itens 10 e 11)
const btnVerificar = document.getElementById('btn-verificar');

btnVerificar.addEventListener('click', () => {
    // Seleciona todas as linhas de alunos usando getElementsByClassName (Item 10)
    const linhasAlunos = document.getElementsByClassName('linha-aluno');

    // Convertendo a HTMLCollection em um Array para podermos percorrê-la (Item 11)
    Array.from(linhasAlunos).forEach(linha => {
        // Encontra a nota dentro da linha atual
        const notaTexto = linha.querySelector('.nota').textContent;
        const nota = parseFloat(notaTexto);
        const elementoSituacao = linha.querySelector('.situacao');

        // Lógica condicional para aplicar as classes corretas (Item 7 e 11)
        if (nota >= 6.0) {
            // Se aprovado, adiciona a classe correspondente e remove a contrária
            linha.classList.add('aprovado');
            linha.classList.remove('reprovado');
            elementoSituacao.textContent = 'Aprovado';
        } else {
            // Se reprovado, faz o inverso
            linha.classList.add('reprovado');
            linha.classList.remove('aprovado');
            elementoSituacao.textContent = 'Reprovado';
        }
    });
});
