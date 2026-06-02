// Criar imagem dinamicamente
const foto = document.createElement("img");

foto.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200";
foto.alt = "Educação";
foto.style.width = "100%";
foto.style.borderRadius = "10px";
foto.style.marginBottom = "20px";

// Adicionar a foto na página
document.body.prepend(foto);

// Criar botão
const botao = document.createElement("button");
botao.textContent = "Mensagem sobre Educação";
botao.style.padding = "12px 20px";
botao.style.backgroundColor = "#0066cc";
botao.style.color = "white";
botao.style.border = "none";
botao.style.borderRadius = "5px";
botao.style.cursor = "pointer";

document.body.appendChild(botao);

// Criar área da mensagem
const mensagem = document.createElement("p");
mensagem.style.marginTop = "15px";
mensagem.style.fontSize = "18px";

document.body.appendChild(mensagem);

// Evento do botão
botao.addEventListener("click", () => {
    mensagem.textContent =
        "📚 A educação é a chave para transformar vidas e construir um futuro melhor!";
});