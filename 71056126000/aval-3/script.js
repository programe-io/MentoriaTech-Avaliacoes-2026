/* ==========================================================================
   1. ESPERAR O DOCUMENTO CARREGAR
   ========================================================================== */
// Garante que o código só vai rodar após o HTML estar totalmente carregado pelo navegador
document.addEventListener('DOMContentLoaded', () => {
    
    console.log("JavaScript carregado com sucesso e pronto para rodar!");

    /* ==========================================================================
       2. INTERAÇÃO 1: Contador de Cliques na Imagem
       ========================================================================== */
    // Selecionamos a tag <img> da página
    const imagem = document.querySelector('main img');
    let contador = 0;

    if (imagem) {
        // Adicionamos um "escutador" para detectar cliques na imagem
        imagem.addEventListener('click', () => {
            contador++;
            console.log(`A imagem foi clicada ${contador} vezes.`);
            
            // Cria ou atualiza um texto abaixo da imagem mostrando a contagem
            let legendaContador = document.getElementById('contador-texto');
            if (!legendaContador) {
                legendaContador = document.createElement('p');
                legendaContador.id = 'contador-texto';
                legendaContador.style.textAlign = 'center';
                legendaContador.style.fontWeight = 'bold';
                legendaContador.style.color = '#e74c3c';
                imagem.after(legendaContador); // Insere o parágrafo logo após a imagem
            }
            legendaContador.innerText = `Você clicou nesta imagem ${contador} vezes!`;
        });
    }

    /* ==========================================================================
       3. INTERAÇÃO 2: Criar um Botão de "Modo Escuro" Dinamicamente
       ========================================================================== */
    // Vamos criar um botão usando apenas JS e inseri-lo no cabeçalho (<header>)
    const header = document.querySelector('header');
    
    if (header) {
        const botaoAlternar = document.createElement('button');
        botaoAlternar.innerText = "🌓 Alternar Tema";
        
        // Estilizando o botão diretamente pelo JavaScript
        botaoAlternar.style.marginTop = "15px";
        botaoAlternar.style.padding = "8px 16px";
        botaoAlternar.style.cursor = "pointer";
        botaoAlternar.style.borderRadius = "20px";
        botaoAlternar.style.border = "none";
        botaoAlternar.style.fontWeight = "bold";

        header.appendChild(botaoAlternar);

        // Lógica para mudar as cores da página (Modo Escuro / Modo Claro)
        botaoAlternar.addEventListener('click', () => {
            const body = document.body;
            
            if (body.style.backgroundColor === 'rgb(44, 62, 80)') {
                // Voltar para o modo claro
                body.style.backgroundColor = '#f4f6f9';
                body.style.color = '#333';
            } else {
                // Ativar modo escuro
                body.style.backgroundColor =