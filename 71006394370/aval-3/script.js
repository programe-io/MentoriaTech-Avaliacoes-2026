```javascript
// ============================================
// 3.01 - INTRODUÇÃO AO DOM
// ============================================

// Pegando elementos do HTML

const input = document.getElementById("atividadeInput");

const botaoAdicionar = document.getElementById("adicionarBtn");

const lista = document.getElementById("lista");

const contador = document.getElementById("contador");

const mensagem = document.getElementById("mensagem");

const temaBtn = document.getElementById("temaBtn");


// ============================================
// ARRAY PARA GUARDAR AS ATIVIDADES
// ============================================

let atividades = [];


// ============================================
// 3.02 - EVENTOS NO JAVASCRIPT
// ============================================

// Evento de clique

botaoAdicionar.addEventListener("click", adicionar);


// Evento de teclado

input.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {

        adicionar();

    }

});


// Evento para mudar o tema

temaBtn.addEventListener("click", mudarTema);


// ============================================
// FUNÇÃO ADICIONAR
// ============================================

function adicionar() {

    const texto = input.value.trim();


    // Verifica se o campo está vazio

    if (texto === "") {

        alert("Digite uma atividade!");

        input.focus();

        return;
    }


    // ========================================
    // 3.03 - CRIAÇÃO DE ELEMENTOS
    // ========================================

    // Criando o elemento LI

    const item = document.createElement("li");


    // Criando o texto

    const span = document.createElement("span");

    span.textContent = texto;

    span.classList.add("texto");


    // Criando botão concluir

    const botaoConcluir = document.createElement("button");

    botaoConcluir.textContent = "✓";

    botaoConcluir.classList.add("concluir");


    // Criando botão remover

    const botaoRemover = document.createElement("button");

    botaoRemover.textContent = "✕";

    botaoRemover.classList.add("remover");


    // ========================================
    // COLOCANDO ELEMENTOS DENTRO DO LI
    // ========================================

    item.appendChild(span);

    item.appendChild(botaoConcluir);

    item.appendChild(botaoRemover);


    // Adicionando classe

    item.classList.add("item");


    // Colocando o item na lista

    lista.appendChild(item);


    // ========================================
    // 3.02 - EVENTO DE CONCLUIR
    // ========================================

    botaoConcluir.addEventListener("click", function() {

        // ====================================
        // 3.04 - CLASSE VIA JAVASCRIPT
        // ====================================

        item.classList.toggle("concluida");

    });


    // ========================================
    // 3.03 - REMOÇÃO DE ELEMENTOS
    // ========================================

    botaoRemover.addEventListener("click", function() {

        // Remove o elemento da página

        item.remove();


        // Atualiza o contador

        atualizarContador();

    });


    // Atualiza contador

    atualizarContador();


    // Limpa o input

    input.value = "";

    input.focus();

}


// ============================================
// CONTADOR
// ============================================

function atualizarContador() {

    const quantidade = lista.children.length;

    contador.textContent = quantidade;


    // Mostra ou esconde mensagem

    if (quantidade === 0) {

        mensagem.style.display = "block";

    } else {

        mensagem.style.display = "none";

    }

}


// ============================================
// 3.04 - CLASSES E ESTILOS
// ============================================

function mudarTema() {

    // Adiciona ou remove a classe escuro

    document.body.classList.toggle("escuro");


    // Verifica qual tema está ativo

    if (document.body.classList.contains("escuro")) {

        temaBtn.textContent = "☀️ Modo claro";

    } else {

        temaBtn.textContent = "🌙 Modo escuro";

    }

}
```
