// Captura dos elementos do DOM
const form = document.querySelector("#form-item");
const inputItem = document.querySelector("#input-item");
const listaCompras = document.querySelector("#lista-compras");

// Função para adicionar item na lista
function adicionarItem(event) {
    event.preventDefault(); // Evita recarregar a página ao enviar o formulário

    const textoItem = inputItem.value.trim();
    if (textoItem === "") return;

    // Criar o elemento <li>
    const li = document.createElement("li");
    li.classList.add("item-lista");

    // Criar o <span> com o nome do item
    const span = document.createElement("span");
    span.textContent = textoItem;
    span.classList.add("item-texto");

    // Marcar/desmarca como comprado ao clicar no texto
    span.addEventListener("click", () => {
        li.classList.toggle("concluido");
    });

    // Criar o botão de exclusão
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Excluir";
    btnRemover.classList.add("btn-remover");

    // Remover item da lista ao clicar no botão
    btnRemover.addEventListener("click", () => {
        li.remove();
    });

    // Inserir o span e o botão dentro do <li>
    li.appendChild(span);
    li.appendChild(btnRemover);

    // Adicionar o <li> dentro da lista <ul>
    listaCompras.appendChild(li);

    // Limpar o campo e focar nele novamente
    inputItem.value = "";
    inputItem.focus();
}

// Escutar o evento de envio do formulário
form.addEventListener("submit", adicionarItem);