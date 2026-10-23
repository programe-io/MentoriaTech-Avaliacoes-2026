/* ==========================================================================
   6 e 7. PRIMEIRO EXEMPLO COM EVENTO DE CLIQUE (EXECUTANDO APENAS UMA VEZ)
   ========================================================================== */

// 6. Capturando o elemento utilizando querySelector (necessita do símbolo # para ID)
const botaoUnico = document.querySelector("#btn-unico");

// 6. Associando o evento de clique através de uma arrow function
// 7. Utilizando a opção 'once: true' para que o evento seja executado apenas uma vez
botaoUnico.addEventListener("click", () => {
    console.log("O botão foi acionado");
}, { once: true });


/* ==========================================================================
   8, 9, 10 e 11. PROJETO PRÁTICO: SOMA DE DOIS VALORES
   ========================================================================== */

// 9. Capturando os elementos do formulário pelo DOM usando getElementById
// Nota: getElementById busca diretamente pelo ID, por isso NÃO usa o símbolo #
const inputValor1 = document.getElementById("valor1");
const inputValor2 = document.getElementById("valor2");
const botaoSomar = document.getElementById("btn-somar");

// 11. Associando a ação de cálculo ao evento de clique do botão de soma
botaoSomar.addEventListener("click", () => {
    
    // 10. Acessando os conteúdos digitados nos inputs através da propriedade .value
    const texto1 = inputValor1.value;
    const texto2 = inputValor2.value;

    // 10. Convertendo os valores de texto para números decimais com parseFloat
    const num1 = parseFloat(texto1);
    const num2 = parseFloat(texto2);

    // Validação extra: verifica se os campos não estão vazios e são números válidos
    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, introduza números válidos.");
        return;
    }

    // Realizando a operação matemática de soma
    const resultado = num1 + num2;

    // 11. Apresentando o resultado ao utilizador de duas formas diferentes:
    console.log("Resultado no Console: " + resultado); // Exibe no console de desenvolvimento
    alert("O resultado da soma é: " + resultado);      // Exibe numa caixa de diálogo
});
