// 1. Exibir mensagem no navegador
alert("Olá! Bem-vindo ao JavaScript! 👋");

// 2. Saudação personalizada
let nome = prompt("Digite seu nome:");
if (nome) {
    document.write(`<h2>Olá, ${nome}! É um prazer te conhecer!</h2>`);
}

// 3. Exibir no console (aperte F12 para ver)
console.log("Script carregado com sucesso ✅");
// Mudar texto de um elemento
function mudarTexto() {
    const elemento = document.getElementById("mensagem");
    elemento.textContent = "Texto alterado com sucesso! 🎉";
    elemento.style.color = "#e74c3c";
}

// Mostrar data e hora atual
function mostrarHora() {
    const agora = new Date();
    const hora = agora.toLocaleTimeString("pt-BR");
    document.getElementById("relogio").textContent = `Agora são ${hora}`;
}

// Executar a cada segundo
setInterval(mostrarHora, 1000);
function calcular() {
    // Pegar valores
    const num1 = Number(document.getElementById("n1").value);
    const num2 = Number(document.getElementById("n2").value);
    
    // Validar
    if (isNaN(num1) || isNaN(num2)) {
        alert("Digite números válidos!");
        return;
    }
    
    // Calcular
    const soma = num1 + num2;
    const resultado = document.getElementById("resultado");
    resultado.textContent = `Resultado: ${soma}`;
    resultado.style.color = "#27ae60";
}function calcular() {
    // Pegar valores
    const num1 = Number(document.getElementById("n1").value);
    const num2 = Number(document.getElementById("n2").value);
    
    // Validar
    if (isNaN(num1) || isNaN(num2)) {
        alert("Digite números válidos!");
        return;
    }
    
    // Calcular
    const soma = num1 + num2;
    const resultado = document.getElementById("resultado");
    resultado.textContent = `Resultado: ${soma}`;
    resultado.style.color = "#27ae60";
}function calcular() {
    // Pegar valores
    const num1 = Number(document.getElementById("n1").value);
    const num2 = Number(document.getElementById("n2").value);
    
    // Validar
    if (isNaN(num1) || isNaN(num2)) {
        alert("Digite números válidos!");
        return;
    }
    
    // Calcular
    const soma = num1 + num2;
    const resultado = document.getElementById("resultado");
    resultado.textContent = `Resultado: ${soma}`;
    resultado.style.color = "#27ae60";
}// Adicionar itens a uma lista
function adicionarItem() {
    const entrada = document.getElementById("novoItem");
    const texto = entrada.value.trim();
    
    if (!texto) return;
    
    const lista = document.getElementById("lista");
    const novoLi = document.createElement("li");
    novoLi.textContent = texto;
    
    // Botão para remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.style.marginLeft = "10px";
    btnRemover.onclick = () => novoLi.remove();
    
    novoLi.appendChild(btnRemover);
    lista.appendChild(novoLi);
    entrada.value = "";
}

// Permitir com Enter
document.getElementById("novoItem")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") adicionarItem();
});