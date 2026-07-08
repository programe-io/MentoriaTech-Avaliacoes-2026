const bancoProdutos = [
    { id: 'maca', nome: 'Maçã', emoji: '🍎', preco: 3.25 },
    { id: 'banana', nome: 'Banana', emoji: '🍌', preco: 2.10 },
    { id: 'leite', nome: 'Leite', emoji: '🥛', preco: 5.50 },
    { id: 'pao', nome: 'Pão', emoji: '🍞', preco: 4.15 },
    { id: 'queijo', nome: 'Queijo', emoji: '🧀', preco: 11.45 },
    { id: 'ovo', nome: 'Ovo', emoji: '🥚', preco: 7.80 },
    { id: 'frango', nome: 'Frango', emoji: '🍗', preco: 14.95 },
    { id: 'refrigerante', nome: 'Refri', emoji: '🥤', preco: 6.35 },
    { id: 'chocolate', nome: 'Chocolate', emoji: '🍫', preco: 8.60 },
    { id: 'melancia', nome: 'Melancia', emoji: '🍉', preco: 12.25 },
    { id: 'pizza', nome: 'Pizza', emoji: '🍕', preco: 17.90 },
    { id: 'donut', nome: 'Donut', emoji: '🍩', preco: 4.65 }
];

let listaAtual = [];
let pontuacao = 0;
let tempo = 90;
let dinheiroRestante = 150.00; 
let totalContaCaixa = 0;
let totalEntregueCaixa = 0;

let rodadaAtual = 1;
let tamanhoListaDificuldade = 3; 

let faseAtual = "compras"; 
let metodoPagamentoAtual = "dinheiro"; 
let stringMaquininha = ""; 
let intervaloTempo;
let itemSendoArrastado = null;

// Elementos DOM
const hud = document.getElementById('hud');
const cenarioCompras = document.getElementById('cenario-compras');
const cenarioCaixa = document.getElementById('cenario-caixa');
const telaInicial = document.getElementById('tela-inicial');
const telaFinal = document.getElementById('tela-final');

const p_numFase = document.getElementById('num-fase');
const p_tempo = document.getElementById('tempo-restante');
const p_dinheiroValores = document.getElementById('dinheiro-valores');
const p_hudContexto = document.getElementById('hud-contexto');
const p_pontuacao = document.getElementById('pontuacao');

const divItensProcurados = document.getElementById('itens-procurados');
const divPrateleiras = document.getElementById('prateleiras');
const feedbackTexto = document.getElementById('feedback-texto');
const carrinhoDrop = document.getElementById('carrinho-drop');

const spanTotalConta = document.getElementById('valor-total-conta');
const spanTotalEntregue = document.getElementById('valor-entregue-jogador');
const displayMaquininha = document.getElementById('display-maquininha');
const avisoMetodo = document.getElementById('aviso-metodo');

function iniciarJogo() {
    telaInicial.classList.add('hidden');
    telaFinal.classList.add('hidden');
    cenarioCaixa.classList.add('hidden');
    hud.classList.remove('hidden');
    
    rodadaAtual = 1;
    tamanhoListaDificuldade = 3; 
    pontuacao = 0;
    tempo = 90;

    voltarAoSupermercado();

    clearInterval(intervaloTempo);
    intervaloTempo = setInterval(() => {
        tempo--;
        p_tempo.textContent = tempo;
        if (tempo <= 0) {
            finalizarJogo(false, "O tempo acabou!");
        }
    }, 1000);
}

function voltarAoSupermercado() {
    faseAtual = "compras";
    cenarioCaixa.classList.add('hidden');
    cenarioCompras.classList.remove('hidden');
    
    dinheiroRestante = tamanhoListaDificuldade * 25; 
    totalContaCaixa = 0;

    p_numFase.textContent = rodadaAtual;
    p_hudContexto.textContent = "💰 Saldo: R$";
    p_dinheiroValores.textContent = dinheiroRestante.toFixed(2);
    p_pontuacao.textContent = pontuacao;
    p_tempo.textContent = tempo;
    feedbackTexto.textContent = "Arraste os itens aqui para comprar!";

    gerarListaDinamica();
    gerarPrateleiras();
}

function gerarListaDinamica() {
    const maxItens = Math.min(tamanhoListaDificuldade, bancoProdutos.length - 1);
    const embaralhado = [...bancoProdutos].sort(() => 0.5 - Math.random());
    listaAtual = embaralhado.slice(0, maxItens).map(p => ({ ...p, comprado: false }));
    renderizarLista();
}

function renderizarLista() {
    divItensProcurados.innerHTML = '';
    listaAtual.forEach(item => {
        const div = document.createElement('div');
        div.className = `item-lista ${item.comprado ? 'checked' : ''}`;
        div.innerText = `${item.comprado ? '✅' : '⬜'} ${item.emoji} ${item.nome}`;
        divItensProcurados.appendChild(div);
    });
}

function gerarPrateleiras() {
    divPrateleiras.innerHTML = '';
    const produtosExibidos = [...bancoProdutos].sort(() => 0.5 - Math.random());
    produtosExibidos.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'produto';
        div.draggable = true;
        div.innerHTML = `${prod.emoji} <span>${prod.nome}</span> <span class="preco">R$ ${prod.preco.toFixed(2)}</span>`;
        div.ondragstart = () => itemSendoArrastado = prod;
        divPrateleiras.appendChild(div);
    });
}

function permitirDrop(e) { e.preventDefault(); carrinhoDrop.classList.add('dragover'); }
function sairDrag() { carrinhoDrop.classList.remove('dragover'); }

function soltarItem(e) {
    e.preventDefault();
    carrinhoDrop.classList.remove('dragover');
    if (!itemSendoArrastado) return;

    const produto = itemSendoArrastado;
    itemSendoArrastado = null;

    if (dinheiroRestante < produto.preco) return;

    const itemNaLista = listaAtual.find(item => item.id === produto.id && !item.comprado);

    if (itemNaLista) {
        itemNaLista.comprado = true;
        dinheiroRestante -= produto.preco;
        totalContaCaixa += produto.preco; 
        pontuacao += 15;
        
        p_dinheiroValores.textContent = dinheiroRestante.toFixed(2);
        p_pontuacao.textContent = pontuacao;
        renderizarLista();

        if (listaAtual.every(item => item.comprado)) {
            setTimeout(mudarParaCenarioCaixa, 800);
        }
    } else {
        pontuacao = Math.max(0, pontuacao - 5);
        tempo = Math.max(0, tempo - 4); 
        p_pontuacao.textContent = pontuacao;
    }
}

/* --- SISTEMA DO CAIXA COM PROBABILIDADE AJUSTADA --- */
function mudarParaCenarioCaixa() {
    faseAtual = "caixa";
    cenarioCompras.classList.add('hidden');
    cenarioCaixa.classList.remove('hidden');
    spanTotalConta.textContent = totalContaCaixa.toFixed(2);

    // SISTEMA DE PESOS (70% Dinheiro / 30% Cartão)
    const randomizador = Math.random();
    const sorteio = randomizador < 0.70 ? 'dinheiro' : 'cartao';
    
    aplicarMetodoSorteado(sorteio);
}

function aplicarMetodoSorteado(metodo) {
    metodoPagamentoAtual = metodo;
    
    const areaDinheiro = document.getElementById('area-pagamento-dinheiro');
    const areaCartao = document.getElementById('area-pagamento-cartao');

    if (metodo === 'dinheiro') {
        avisoMetodo.innerHTML = "💵 O cliente quer pagar em: <strong>DINHEIRO (Notas/Moedas)</strong>";
        avisoMetodo.style.borderColor = "#2ecc71";
        
        areaDinheiro.classList.remove('hidden');
        areaCartao.classList.add('hidden');
        
        p_hudContexto.textContent = "💵 Falta: R$";
        totalEntregueCaixa = 0;
        atualizarDisplayDinheiro();
    } else {
        avisoMetodo.innerHTML = "💳 O cliente quer pagar no: <strong>CARTÃO (Use a Maquininha)</strong>";
        avisoMetodo.style.borderColor = "#0984e3";
        
        areaDinheiro.classList.add('hidden');
        areaCartao.classList.remove('hidden');
        
        p_hudContexto.textContent = "💳 Máquina: R$";
        limparMaquininha();
    }
}

/* MECÂNICA A: DINHEIRO */
function entregarDinheiro(valorAdicionado) {
    if (metodoPagamentoAtual !== "dinheiro") return;
    totalEntregueCaixa = Math.round((totalEntregueCaixa + valorAdicionado) * 100) / 100;
    atualizarDisplayDinheiro();
}

function atualizarDisplayDinheiro() {
    spanTotalEntregue.textContent = totalEntregueCaixa.toFixed(2);
    let restante = Math.round((totalContaCaixa - totalEntregueCaixa) * 100) / 100;
    
    if (restante > 0) {
        p_dinheiroValores.textContent = restante.toFixed(2);
    } else if (restante === 0) {
        sucessoNoPagamento();
    } else {
        erroNoCaixa("Dinheiro sobrou! O caixa não dá troco automático, digite/entregue o valor exato.");
        limparDinheiroEntregue();
    }
}

function limparDinheiroEntregue() {
    totalEntregueCaixa = 0;
    spanTotalEntregue.textContent = "0.00";
    p_dinheiroValores.textContent = totalContaCaixa.toFixed(2);
}

/* MECÂNICA B: CARTÃO */
function digitarNumero(num) {
    if (metodoPagamentoAtual !== "cartao") return;
    if (stringMaquininha.length >= 6) return;
    stringMaquininha += num;
    atualizarTelaMaquininha();
}

function limparMaquininha() {
    stringMaquininha = "";
    atualizarTelaMaquininha();
}

function atualizarTelaMaquininha() {
    if (stringMaquininha === "") {
        displayMaquininha.textContent = "0,00";
        p_dinheiroValores.textContent = totalContaCaixa.toFixed(2);
        spanTotalEntregue.textContent = "0.00";
        return;
    }
    let valorFloat = parseFloat(stringMaquininha) / 100;
    displayMaquininha.textContent = valorFloat.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    p_dinheiroValores.textContent = valorFloat.toFixed(2);
    spanTotalEntregue.textContent = valorFloat.toFixed(2);
}

function confirmarCartao() {
    if (metodoPagamentoAtual !== "cartao" || stringMaquininha === "") return;
    
    let valorInserido = parseFloat(stringMaquininha) / 100;
    let contaArredondada = Math.round(totalContaCaixa * 100) / 100;

    if (Math.abs(valorInserido - contaArredondada) < 0.01) {
        sucessoNoPagamento();
    } else {
        erroNoCaixa(`Valor incorreto! Você tentou passar R$ ${valorInserido.toFixed(2)}, mas a conta é R$ ${totalContaCaixa.toFixed(2)}.`);
        limparMaquininha();
    }
}

/* REGRAS GERAIS DE FLUXO */
function erroNoCaixa(mensagem) {
    pontuacao = Math.max(0, pontuacao - 10);
    tempo = Math.max(0, tempo - 6); 
    p_pontuacao.textContent = pontuacao;
    p_tempo.textContent = tempo;
    alert(`❌ ${mensagem} (-6 segundos)`);
}

function sucessoNoPagamento() {
    pontuacao += 70;
    tempo += 35;
    alert(`✔ Excelente! Compra paga com sucesso! Ganhou +35s.`);
    
    rodadaAtual++;
    if (rodadaAtual === 2) {
        tamanhoListaDificuldade = 6; 
    } else {
        tamanhoListaDificuldade += 1;
    }
    setTimeout(voltarAoSupermercado, 300);
}

function finalizarJogo(vitoria, motivo) {
    clearInterval(intervaloTempo);
    cenarioCompras.classList.add('hidden');
    cenarioCaixa.classList.add('hidden');
    hud.classList.add('hidden');
    telaFinal.classList.remove('hidden');
    
    document.getElementById('fases-finais').textContent = rodadaAtual - 1;
    document.getElementById('motivo-fim').textContent = motivo;
    document.getElementById('pontos-finais').textContent = pontuacao;
}