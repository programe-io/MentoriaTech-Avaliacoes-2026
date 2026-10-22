// Selecionando os elementos que serão manipulados
const card = document.getElementById("meuCard");
const titulo = document.getElementById("tituloCard");

// Selecionando os botões de ação
const btnAlternarTema = document.getElementById("btnAlternarTema");
const btnDestacar = document.getElementById("btnDestacar");
const btnAumentarFonte = document.getElementById("btnAumentarFonte");

// Variável de controle para o tamanho da fonte
let tamanhoFonteAtual = 16;

/* -------------------------------------------------------------
   1. ALTERNANDO CLASSES CSS COM classList.toggle()
   ------------------------------------------------------------- */
btnAlternarTema.addEventListener("click", () => {
    // Se a classe 'modo-escuro' já existir, ela é removida. Se não existir, é adicionada.
    card.classList.toggle("modo-escuro");
});

/* -------------------------------------------------------------
   2. ADICIONANDO / REMOVENDO CLASSES COM classList.contains()
   ------------------------------------------------------------- */
btnDestacar.addEventListener("click", () => {
    // Verifica se a classe já está aplicada no elemento
    if (card.classList.contains("borda-destacada")) {
        card.classList.remove("borda-destacada");
        btnDestacar.textContent = "Destacar Borda";
    } else {
        card.classList.add("borda-destacada");
        btnDestacar.textContent = "Remover Destaque";
    }
});

/* -------------------------------------------------------------
   3. MODIFICANDO ESTILOS INLINE DIRETAMENTE COM .style
   ------------------------------------------------------------- */
btnAumentarFonte.addEventListener("click", () => {
    tamanhoFonteAtual += 2;
    
    // Injeta a propriedade inline style="font-size: Xpx" diretamente na tag do título
    titulo.style.fontSize = `${tamanhoFonteAtual}px`;
    
    // Altera a cor diretamente via estilo inline como exemplo adicional
    titulo.style.color = "#e67e22"; 
    
    if (tamanhoFonteAtual >= 30) {
        btnAumentarFonte.disabled = true;
        btnAumentarFonte.textContent = "Limite de tamanho atingido";
        btnAumentarFonte.style.backgroundColor = "#95a5a6";
    }
});
