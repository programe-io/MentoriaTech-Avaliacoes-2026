// 1. Selecionando os elementos do HTML pelos IDs
const botaoIncrementar = document.getElementById('btn-clique');
const displayContagem = document.getElementById('contador');

// 2. Criando uma variável para armazenar o estado (o valor atual)
let contagem = 0;

// 3. Adicionando um "Escutador de Eventos" (EventListener)
// Ele fica "ouvindo" até que o usuário clique no botão
botaoIncrementar.addEventListener('click', () => {
    
    // Incrementa o valor da variável
    contagem++;
    
    // 4. Atualiza o conteúdo do HTML com o novo valor
    displayContagem.textContent = contagem;

    // Exemplo de lógica condicional (Feedback visual)
    if (contagem >= 10) {
        displayContagem.style.color = 'green';
        console.log("Meta atingida! Você clicou 10 vezes.");
    }
});