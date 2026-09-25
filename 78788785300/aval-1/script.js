// ===== 1. Variáveis e tipos =====
let nome = "Visitante";
const idadeMinima = 18;
let pontuacao = 0;

// ===== 2. Função de saudação =====
function saudar(usuario = nome) {
    const agora = new Date();
    const hora = agora.getHours();
    let periodo = "dia";
    if (hora >= 12 && hora < 18) periodo = "tarde";
    if (hora >= 18 || hora < 6) periodo = "noite";
    
    return `Boa ${periodo}, ${usuario}! Bem-vindo(a)! 🎉`;
}

// ===== 3. Calculadora simples =====
function calcular(a, b, operador = "+") {
    switch (operador) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b !== 0 ? a / b : "Erro: divisão por zero";
        default: return "Operador inválido";
    }
}

// ===== 4. Manipulação de lista =====
const itens = ["HTML", "CSS", "JavaScript"];

function adicionarItem(linguagem) {
    if (!itens.includes(linguagem)) {
        itens.push(linguagem);
        return `"${linguagem}" adicionada!`;
    }
    return `"${linguagem}" já está na lista!`;
}

// ===== 5. Interação com a página =====
function atualizarInterface() {
    const saudacaoEl = document.getElementById("saudacao");
    const listaEl = document.getElementById("lista-itens");
    const btnCalcular = document.getElementById("btn-calcular");

    if (saudacaoEl) saudacaoEl.textContent = saudar();
    
    if (listaEl) {
        listaEl.innerHTML = "";
        itens.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            listaEl.appendChild(li);
        });
    }

    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const n1 = Number(document.getElementById("num1").value);
            const n2 = Number(document.getElementById("num2").value);
            const op = document.getElementById("operador").value;
            const resultado = calcular(n1, n2, op);
            document.getElementById("resultado").textContent = `Resultado: ${resultado}`;
        });
    }
}

// ===== 6. Execução quando a página carrega =====
document.addEventListener("DOMContentLoaded", () => {
    atualizarInterface();
    console.log("✅ JavaScript carregado com sucesso!");
    console.log("Lista inicial:", itens);
    console.log("Teste 5 + 3 =", calcular(5, 3, "+"));
});