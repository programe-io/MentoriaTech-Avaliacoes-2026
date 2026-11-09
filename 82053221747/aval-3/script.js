let produtos = [
    { nome: "Camisa", preco: 50 },
    { nome: "Tênis", preco: 120 },
    { nome: "Mochila", preco: 80 }
];

// Carrinho de compras
let carrinho = [];

// Função para adicionar produto
function adicionarProduto(indice) {

    let produto = produtos[indice];

    carrinho.push(produto);

    console.log(produto.nome + " foi adicionado ao carrinho!");
}

// Função para mostrar o carrinho
function mostrarCarrinho() {

    console.log("===== MEU CARRINHO =====");

    let total = 0;

    for (let i = 0; i < carrinho.length; i++) {

        console.log(
            carrinho[i].nome + " - R$ " + carrinho[i].preco
        );

        total += carrinho[i].preco;
    }

    console.log("Total da compra: R$ " + total);
}

// Adicionando produtos
adicionarProduto(0);
adicionarProduto(1);
adicionarProduto(2);

// Mostrando a compra
mostrarCarrinho();



2. Explicação do código
1. Criando a lista de produtos
let produtos = [
    { nome: "Camisa", preco: 50 },
    { nome: "Tênis", preco: 120 },
    { nome: "Mochila", preco: 80 }
];


Essa parte guarda os produtos e seus preços.

2. Criando o carrinho
let carrinho = [];


Cria uma lista vazia para guardar os produtos escolhidos.

3. Criando uma função
function adicionarProduto(indice) {
    let produto = produtos[indice];
    carrinho.push(produto);
}


A função adiciona um produto ao carrinho.

4. Mostrando os produtos
console.log("Meu Carrinho");


O console.log() mostra informações no console do navegador ou do programa.

5. Calculando o total
total += carrinho[i].preco;


Soma os preços de todos os produtos adicionados.
3. Resultado esperado
Minha Loja – Carrinho
Camisa
R$ 50,00

Tênis
R$ 120,00

Mochila
R$ 80,00


Total da compra
R$ 250,00

Compra calculada

4. Principais comandos JavaScript
Comando	Função
let	Cria uma variável.
const	Cria uma constante.
function	Cria uma função.
if	Faz uma condição.
else	Executa outra possibilidade.
for	Cria uma repetição.
push()	Adiciona um item à lista.
console.log()	Exibe informações.
return	Retorna um resultado.