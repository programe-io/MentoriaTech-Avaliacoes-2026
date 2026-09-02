```javascript
// ======================================
// FUTEBOL BRASIL - JAVASCRIPT
// ======================================

// Placar inicial
let golsTimeAzul = 2;
let golsTimeVermelho = 1;

// Elementos do placar
const placar = document.querySelector(".placar");

// Função para atualizar o placar
function atualizarPlacar() {
    placar.textContent = golsTimeAzul + " × " + golsTimeVermelho;
}

// Função para adicionar gol ao Time Azul
function golAzul() {
    golsTimeAzul++;
    atualizarPlacar();

    alert("⚽ Gol do Time Azul!");
}

// Função para adicionar gol ao Time Vermelho
function golVermelho() {
    golsTimeVermelho++;
    atualizarPlacar();

    alert("⚽ Gol do Time Vermelho!");
}

// Mostrar mensagem de boas-vindas
function boasVindas() {
    console.log("⚽ Bem-vindo ao Futebol Brasil!");
}

// Executar quando a página carregar
boasVindas();
atualizarPlacar();
```
