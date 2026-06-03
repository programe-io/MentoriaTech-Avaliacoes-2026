/* ==========================================================================
   SISTEMA DE E-COMMERCE - CÁLCULO DE CARRINHO DE COMPRAS
   ========================================================================== */

// 1. Definição dos dados (Variáveis em português)
const nomeDoCliente = "Mariana Silva";
const valorDoCarrinho = 250.00; // Valor em Reais (R$)
const cupomDesconto = "QUERO10";
const estadoEntrega = "SP";

// 2. Função para calcular o valor do frete com base no estado
function calcularFrete(estado) {
    // Usando a estrutura condicional Switch
    switch (estado.toUpperCase()) {
        case "SP":
            return 15.00;
        case "RJ":
            return 22.00;
        case "MG":
            return 25.00;
        default:
            return 40.00; // Valor padrão para outros estados
    }
}

// 3. Função principal para processar o pedido do cliente
function processarPedido(cliente, valorTotal, cupom, estado) {
    let desconto = 0;

    // Condicional (Se o cupom for válido, aplica 10% de desconto)
    if (cupom === "QUERO10") {
        desconto = valorTotal * 0.10; // 10% de desconto
        console.log(`🎉 Cupom aceito! Desconto de: R$ ${desconto.toFixed(2)}`);
    } else {
        console.log("❌ Cupom inválido ou expirado.");
    }

    // Calcula o frete chamando a função anterior
    const valorDoFrete = calcularFrete(estado);

    // Conta final
    const valorFinalComDesconto = valorTotal - desconto;
    const totalA_Pagar = valorFinalComDesconto + valorDoFrete;

    // 4. Exibindo o resumo no console (ou na tela)
    console.log("\n--- RESUMO DO PEDIDO ---");
    console.log(`Cliente: ${cliente}`);
    console.log(`Subtotal dos produtos: R$ ${valorTotal.toFixed(2)}`);
    console.log(`Valor do Frete (${estado}): R$ ${valorDoFrete.toFixed(2)}`);
    console.log(`------------------------`);
    console.log(`💰 TOTAL A PAGAR: R$ ${totalA_Pagar.toFixed(2)}`);
    console.log("------------------------\n");
}

// 5. Executando a função para testar o código
processarPedido(nomeDoCliente, valorDoCarrinho, cupomDesconto, estadoEntrega);