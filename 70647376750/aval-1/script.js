// Informações pessoais
const nome = "Giovana Vitória";
const curso = "Desenvolvimento de Sistemas";
const escola = "Escola Francisca Trindade";

// Mostrar no console
console.log("Nome:", nome);
console.log("Curso:", curso);
console.log("Escola:", escola);

// Mostrar na página (interativo)
function mostrarInformacoes() {
    const mensagem = `
    Nome: ${nome}
    Curso: ${curso}
    Escola: ${escola}
    `;

    alert(mensagem);
}

// Criar botão dinamicamente
const botao = document.createElement("button");
botao.textContent = "Ver minhas informações";
botao.style.padding = "10px 20px";
botao.style.border = "none";
botao.style.backgroundColor = "#6c63ff";
botao.style.color = "#fff";
botao.style.borderRadius = "8px";
botao.style.cursor = "pointer";

// Ação ao clicar
botao.addEventListener("click", mostrarInformacoes);

// Adicionar botão na página
document.body.appendChild(botao);