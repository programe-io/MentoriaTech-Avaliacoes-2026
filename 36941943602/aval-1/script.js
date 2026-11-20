// SISTEMA SIMPLES DE PRODUTOS
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descricao deve ter no minimo cinco caracteres");
    }
    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    if (valor <= 0) {
        throw new Error("Valor deve ser maior igual a zero"); 
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);
    var novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    };
    produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero");
  }

  const produto = produtos.find(prod => prod.codigo === codigoProduto);
  if (produto) {
    produto.valor = novoValor;
  }


else{

  throw new Error("Produto não Encontrado!")
  
  }
}
function atualizarQuantidade(codigoProduto, novaQuantidade){


}
 
listarProdutos(); cadastrarProduto('Cadeira Gamer', 12, 450.00); cadastrarProduto('Mouse Logi', 50, 99.00);
listarProdutos(); atualizarValor(2, 47.00);
listarProdutos();

atualizarQuantidade(1, 3);
listarProdutos();

// Array que vai guardar o conjunto de todas as tarefas
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade){
    if(titulo.length < 5){
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }
    if(prioridade < 1 || prioridade > 3){
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa){
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);
    
    if(!tarefaBuscada){
        throw new Error('Código de tarefa não encontrado');
    }
    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade){
    validarDadosTarefa(titulo, prioridade);
    
    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    }
    
    tarefas.push(tarefa);
}

function listarTarefas(){
    return tarefas;
}

function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);
    
    // Verifica se o status já é falso (tarefa já concluída)
    if (!tarefa.status) {
        throw new Error('Tarefa já estava como concluída');
    }
    
    tarefa.status = false;
}
function alterarPrioridade(codigo, novaPrioridade){
    let tarefa = buscarTarefa(codigo);
    
    // É importante validar se a nova prioridade é válida (entre 1 e 3)
    if(novaPrioridade < 1 || novaPrioridade > 3){
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
    
    tarefa.prioridade = novaPrioridade;
}









cadastrarTarefa('cadastrar Clientes', 1);
console.log(listarTarefas());

alterarPrioridade(1, 2);

console.log(listarTarefas());