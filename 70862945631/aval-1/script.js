let produtos = [];
function validarProdutos(descricao, quantidade, valor){
	if(descricao.length<5){
		console.log("Descrição deve ter no minimo 5 caracteres");
	}
	if(quantidade<1){
		console.log("Quantidade deve ser maior que zero");
	}
	if(valor<0){
		console.log("Valor deve ser maior que zero!");
	}
}
function cadastrarProduto(descricao, quantidade, valor){
	validarProdutos(descricao, quantidade, valor);
	let novoProduto = {
		"codigo":produtos.length+1,
		"descricao":descricao,
		"quantidade":quantidade,
		"valor":valor
	}
	produtos.push(novoProduto);
}
function listarProdutos(){
	console.log(produtos);
}
function atualizarValor(codigoProduto,novoValor){
	if (novoValor<0){
		console.log("Valor deve ser maior que zero");
	}
	const produto = produtos.find(prod=>prod.codigo===codigoProduto);
	if(produto){
		produto.valor = novoValor;
	} else{ 
		console.log("Produto não encontrado");
	}
}
function atualizarQuantidade(codigoProduto, novaQuantidade){
	if (novaQuantidade<1){
		console.log("Quantidade deve ser maior que zero");
	}
	const produto=produtos.find(prod=>prod.codigo===codigoProduto);
	if (produto){
		produto.quantidade+=novaQuantidade;
	} else { 
		console.log("Produto não encontrado");
	}
}
