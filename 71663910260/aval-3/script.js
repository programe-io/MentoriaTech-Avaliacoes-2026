/**
 * 1. Introdução
 * O JavaScript interage com a página web através da árvore do DOM (Document Object Model).
 * Cada tag HTML torna-se um objeto que podemos criar, alterar ou deletar dinamicamente.
 */
console.log("Módulo de Manipulação do DOM Iniciado!");

/**
 * 2. Aplicações da criação e remoção de elementos
 * - Sistemas de e-commerce (adicionar/remover produtos do carrinho).
 * - Feeds de redes sociais (carregar novos posts ao rolar a página).
 * - Listas de tarefas, notificações em tempo real e pop-ups de alerta.
 */


/**
 * 3. Criando elementos com createElement
 * Cria um novo elemento HTML na memória, mas ainda não o exibe na página.
 */
// Criando uma tag <li> para nossa lista e um botão de exclusão
const novoItemElemento = document.createElement("li");
const botaoExcluirElemento = document.createElement("button");


/**
 * 4. Criando conteúdo textual com createTextNode
 * Cria um nó de texto puro de forma segura, evitando falhas de segurança (XSS).
 */
const textoDoItem = document.createTextNode("Aprender JavaScript Dinâmico");
const textoDoBotao = document.createTextNode("Excluir");


/**
 * 6. Criando uma estrutura completa dinamicamente
 * Aqui juntamos os blocos de memória que criamos nos passos 3 e 4.
 * Estrutura desejada: <li>Aprender JavaScript Dinâmico <button>Excluir</button></li>
 */
botaoExcluirElemento.appendChild(textoDoBotao); // Coloca o texto dentro do botão
novoItemElemento.appendChild(textoDoItem);       // Coloca o texto principal dentro do <li>
novoItemElemento.appendChild(botaoExcluirElemento); // Adiciona o botão dentro do <li>


/**
 * 5. Vinculando elementos com appendChild
 * Adiciona o elemento criado como o ÚLTIMO filho de um elemento pai na página.
 */
// Supondo que temos uma <ul id="lista"> no HTML
const listaPai = document.getElementById("lista");

// Só executa se o elemento pai realmente existir na página HTML
if (listaPai) {
    listaPai.appendChild(novoItemElemento); // Agora ele aparece no final da lista!
}


/**
 * 7. Diferença entre appendChild e prepend
 * - appendChild(): Adiciona obrigatoriamente no FINAL do elemento pai. Só aceita nós do DOM.
 * - prepend(): Adiciona no INÍCIO do elemento pai. Aceita tanto nós quanto texto puro diretamente.
 */
function adicionarNoInicio(texto) {
    if (!listaPai) return;
    
    const itemInicio = document.createElement("li");
    itemInicio.textContent = texto; // Atalho moderno para injetar texto rápido
    
    listaPai.prepend(itemInicio); // Entra no topo da lista
}


/**
 * 8. Removendo elementos filhos com removeChild
 * Remove um nó filho específico de um elemento pai. Exige que você selecione o pai primeiro.
 */
function removerUltimoItem() {
    if (listaPai && listaPai.lastElementChild) {
        const ultimoFilho = listaPai.lastElementChild;
        listaPai.removeChild(ultimoFilho); // O pai remove o filho
    }
}


/**
 * 9. Removendo o próprio elemento com remove
 * Método moderno. O próprio elemento se auto-exclui, sem precisar chamar o pai.
 */
// Atribuindo a função de auto-remoção ao botão que criamos no tópico 6
botaoExcluirElemento.addEventListener("click", function() {
    novoItemElemento.remove(); // O <li> apaga a si mesmo da tela!
});


/**
 * 10. Comparação entre removeChild e remove
 * 
 * +----------------------------------+----------------------------------+
 * |          removeChild()           |             remove()             |
 * +----------------------------------+----------------------------------+
 * | Suportado em navegadores antigos. | Mais moderno (IE não suporta).   |
 * | Precisa referenciar o elemento pai| Chamado direto no elemento que   |
 * | (pai.removeChild(filho)).        | deseja apagar (elemento.remove()).|
 * | Retorna o elemento removido da   | Retorna 'undefined' após a       |
 * | memória para reuso futuro.       | exclusão.                        |
 * +----------------------------------+----------------------------------+
 */


/**
 * 11. Conclusão
 * Dominar esses métodos permite criar interfaces ricas e reativas sem a necessidade 
 * obrigatória de frameworks pesados, utilizando apenas JavaScript puro (Vanilla JS).
 */
console.log("Código de exemplo carregado com sucesso!");
