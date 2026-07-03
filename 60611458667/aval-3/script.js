// Variáveis para guardar o visor e a conta matemática
const visor = document.getElementById('visor');
let expressao = '';

// Função que adiciona números e operadores na tela
function inserir(valor) {
    // Não deixa colocar dois operadores seguidos no início
    if (expressao === '' && (valor === '*' || valor === '/')) {
        return; 
    }
    
    expressao += valor;
    atualizarVisor();
}

// Limpa tudo (Botão C)
function limpar() {
    expressao = '';
    visor.innerText = '0';
}

// Apaga apenas o último número digitado (Botão ⌫)
function apagar() {
    expressao = expressao.slice(0, -1);
    atualizarVisor();
}

// Função que faz a conta
function calcular() {
    try {
        // Usa a função nativa 'eval' do JavaScript para calcular a expressão matemática
        let resultado = eval(expressao);
        
        // Verifica se houve uma divisão por zero (que dá erro matemático)
        if (!isFinite(resultado) || isNaN(resultado)) {
            visor.innerText = "Erro";
            expressao = "";
            return;
        }

        // Atualiza a tela com o resultado
        visor.innerText = resultado;
        expressao = resultado.toString();
        
    } catch (e) {
        // Se a conta for inválida (ex: 5++5), mostra Erro
        visor.innerText = "Erro";
        expressao = "";
    }
}

// Função auxiliar para mostrar a conta na tela de forma bonita
function atualizarVisor() {
    if (expressao === '') {
        visor.innerText = '0';
    } else {
        // Troca os símbolos do código (* e /) pelos símbolos reais na tela (× e ÷)
        let expressaoVisual = expressao.replace(/\*/g, '×').replace(/\//g, '÷');
        visor.innerText = expressaoVisual;
    }
}