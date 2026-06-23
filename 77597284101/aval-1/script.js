// Aguarda todo o HTML ser carregado antes de rodar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Efeito de contagem progressiva nos cards de campeões
    const cartoes = document.querySelectorAll('.card');

    cartoes.forEach(cartao => {
        const elementoTacas = cartao.querySelector('.taças');
        // Pega o número de títulos tirando o símbolo da estrela
        const totalTítulos = parseInt(elementoTacas.innerText); 
        
        let contador = 0;
        elementoTacas.innerText = "0 ★";

        // Cria um intervalo para subir o número gradativamente
        const intervalo = setInterval(() => {
            if (contador < totalTítulos) {
                contador++;
                elementoTacas.innerText = `${contador} ★`;
            } else {
                clearInterval(intervalo); // Para a animação quando chega ao fim
            }
        }, 150); // Velocidade da animação (em milissegundos)
    });

    // 2. Interatividade na tabela: Mostrar mensagem ao clicar em uma linha
    const linhasTabela = document.querySelectorAll('tbody tr');

    linhasTabela.forEach(linha => {
        linha.style.cursor = 'pointer'; // Muda o mouse para indicar que é clicável
        
        linha.addEventListener('click', () => {
            const colunas = linha.querySelectorAll('td');
            const ano = colunas[0].innerText;
            const sede = colunas[1].innerText;
            const campeao = colunas[2].innerText;

            if (campeao === "A definir") {
                alert(`A Copa de ${ano} será realizada em: ${sede}. Quem você acha que ganha?`);
            } else {
                alert(`Na Copa de ${ano} (Sede: ${sede}), o grande campeão foi: ${campeao}!`);
            }
        });
    });
});