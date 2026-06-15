// Aguarda todo o HTML ser carregado antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    inicializarChecklist();
    inicializarCalculadoraPorcoes();
    inicializarTimer();
});

/**
 * 1. CHECKLIST DE INGREDIENTES
 * Permite riscar os ingredientes clicando neles para ajudar no preparo.
 */
function inicializarChecklist() {
    const ingredientes = document.querySelectorAll(".ingredientes ul li");
    
    ingredientes.forEach(item => {
        // Estilo inicial via JS para indicar que é clicável
        item.style.cursor = "pointer";
        item.style.transition = "all 0.2s ease";

        item.addEventListener("click", () => {
            if (item.style.textDecoration === "line-through") {
                item.style.textDecoration = "none";
                item.style.opacity = "1";
            } else {
                item.style.textDecoration = "line-through";
                item.style.opacity = "0.5";
            }
        });
    });
}

/**
 * 2. MULTIPLICADOR DE PORÇÕES
 * Altera dinamicamente as quantidades dos ingredientes com base nas porções.
 */
function inicializarCalculadoraPorcoes() {
    const infoSecao = document.querySelector(".info-rapida");
    if (!infoSecao) return;

    // Injeta o seletor de porções dentro da seção de informações rápidas do HTML
    infoSecao.innerHTML += `
        <div style="margin-top: 10px; display: flex; align-items: center; gap: 10px;">
            <label for="porcoes" style="font-weight: bold; color: #d9534f;">Multiplicar receita:</label>
            <select id="porcoes" style="padding: 5px; border-radius: 4px; border: 1px solid #d9534f; background: white; cursor: pointer;">
                <option value="1">Padrão (8 panquecas)</option>
                <option value="2">Dobrar (16 panquecas)</option>
                <option value="3">Triplicar (24 panquecas)</option>
            </select>
        </div>
    `;

    // Base de dados dos ingredientes com suas quantidades numéricas originais
    const ingredientesOriginais = [
        { texto: " xícara (chá) de farinha de trigo", valor: 1 },
        { texto: " colheres (sopa) de açúcar", valor: 2 },
        { texto: " colheres (chá) de fermento em pó", valor: 2 },
        { texto: " pitada de sal", valor: 1 },
        { texto: " ovo", valor: 1 },
        { texto: " xícara (chá) de leite", valor: 1 },
        { texto: " colheres (sopa) de manteiga derretida (ou óleo)", valor: 2 }
    ];

    const listaItens = document.querySelectorAll(".ingredientes ul li");
    const seletor = document.getElementById("porcoes");

    seletor.addEventListener("change", (e) => {
        const multiplicador = parseInt(e.target.value);

        listaItens.forEach((li, index) => {
            const ingrediente = ingredientesOriginais[index];
            if (ingrediente) {
                // Calcula o novo valor
                let novoValor = ingrediente.valor * multiplicador;
                
                // Trata a palavra "ovo" para o plural se necessário
                let textoFinal = ingrediente.texto;
                if (index === 4 && novoValor > 1) {
                    textoFinal = " ovos";
                }

                // Atualiza o texto na tela
                li.innerHTML = `<strong>${novoValor}</strong>${textoFinal}`;
                
                // Reseta o visual caso o usuário já tivesse riscado o item
                li.style.textDecoration = "none";
                li.style.opacity = "1";
            }
        });
    });
}

/**
 * 3. CRONÔMETRO (TIMER)
 * Cria um timer de 60 segundos para ajudar a saber quando virar a panqueca.
 */
function inicializarTimer() {
    const secaoPreparo = document.querySelector(".preparo");
    if (!secaoPreparo) return;

    // Cria o elemento do Timer e injeta no final da seção de Modo de Preparo
    const timerContainer = document.createElement("div");
    timerContainer.style.cssText = `
        margin-top: 20px;
        padding: 15px;
        background: #fdf8e2;
        border: 1px dashed #f0ad4e;
        border-radius: 8px;
        text-align: center;
    `;
    
    timerContainer.innerHTML = `
        <p style="margin-bottom: 10px; font-weight: bold; color: #f0ad4e;">⏱️ Timer da Frigideira (1 min)</p>
        <div id="tempo" style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px;">01:00</div>
        <button id="btn-timer" style="background: #f0ad4e; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; transition: background 0.2s;">Iniciar Tempo</button>
    `;
    
    secaoPreparo.appendChild(timerContainer);

    const btnTimer = document.getElementById("btn-timer");
    const displayTempo = document.getElementById("tempo");
    let intervalo = null;
    let tempoRestante = 60;

    btnTimer.addEventListener("click", () => {
        // Se o timer já estiver rodando, ele pausa
        if (intervalo) {
            clearInterval(intervalo);
            intervalo = null;
            btnTimer.textContent = "Retomar";
            btnTimer.style.background = "#f0ad4e";
            return;
        }

        btnTimer.textContent = "Pausar";
        btnTimer.style.background = "#d9534f";

        intervalo = setInterval(() => {
            tempoRestante--;

            // Formata o tempo em formato MM:SS
            let segundos = tempoRestante % 60;
            displayTempo.textContent = `00:${segundos < 10 ? "0" : ""}${segundos}`;

            // Quando o tempo acabar
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                intervalo = null;
                tempoRestante = 60;
                displayTempo.textContent = "01:00";
                btnTimer.textContent = "Iniciar Tempo";
                btnTimer.style.background = "#f0ad4e";
                
                // Alerta sonoro ou visual simples
                displayTempo.textContent = "🥞 VIRA A PANQUECA!";
                setTimeout(() => { displayTempo.textContent = "01:00"; }, 5000);
            }
        }, 1000);
    });
}