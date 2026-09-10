let produtos = [];
function ValidarProdutos(Descricao, Quantidade, Valor){
if (Descricao.length<5){
Console.log("quantidade deve ter no minimo 5 caracteres!");
}
if(quantidade<1){
Console.Log("quantidade deve ser maior que zero!");
}
}
function CadastrarProduto(Descricao,Quantidade,Valor){
 ValidarProdutos(Descricao,Quantidade,Valor);
 let NovoProduto = {
 	"Codigo" : Produtos.length +1,
 	"descrição": Descricao,
 	"Quantidade":Quantidade,
 	"Valor": Valor 
 }
 Produtos.push(NovoProduto);
}
function ListarProdutos(){
	Console.Log(produtos);
}
function AtualizarProdutos(CodigoProdutos,NovoValor){
	if (NovoValor<0){
		Console.Log("valor deve ser maior que 0!");
	}
	const Produtos = Produtos.find(prod =>prod.Codigo== CodigoProdutos);
	if (Produtos){
		Produtos.Valor = NovoValor;
	}else{
	Console.Log("produto nao encontrado");
  }
 }
 function AtualizarQuantidade(CodigoProdutos,NovoValor,NovaQuantidade){
if(NovaQuantidade<1){
Console.Log("quantidade deve ser maior que zero");
}
const Produto = Produtos.find(prod => prod Codigo=== CodigoProdutos);
if(produtos){
	produtos.Quantidade += NovaQuantidade;

}else{
	Console.Log("produto nao encontrado");
	 }
	}

