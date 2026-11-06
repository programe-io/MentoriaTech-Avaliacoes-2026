// Função para adicionar tarefas
function adicionarTarefa() {

    const campo = document.getElementById("tarefa");

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    // Criar um novo item
    const item = document.createElement("li");

    // Criar o texto da tarefa
    const nome = document.createElement("span");

    nome.textContent = texto;

    // Concluir tarefa ao clicar no texto
    nome.addEventListener("click", function() {
        item.classList.toggle("concluida");
    });

    // Criar botão excluir
    const excluir = document.createElement("button");

    excluir.textContent = "Excluir";

    excluir.style.width = "auto";
    excluir.style.backgroundColor = "#dc2626";

    // Excluir tarefa
    excluir.addEventListener("click", function() {
        item.remove();
    });

    // Adicionar elementos à lista
    item.appendChild(nome);
    item.appendChild(excluir);

    document.getElementById("listaTarefas")
        .appendChild(item);

    // Limpar campo
    campo.value = "";
}
Explicação do JavaScript:

function: cria uma função.

document.getElementById(): encontra um elemento pelo ID.

.value: captura o texto digitado.

if: verifica uma condição.

alert(): mostra uma mensagem na tela.

createElement(): cria um elemento HTML.

addEventListener(): detecta uma ação do usuário.

classList.toggle(): adiciona ou remove uma classe CSS.

.remove(): exclui um elemento.

appendChild(): adiciona um elemento dentro de outro.