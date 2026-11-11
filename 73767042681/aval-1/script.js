// Lista (Array) de Produtos 
let  produtos  = [];

function  validarProduto ( descrição , quantidade , valor ) {
     if ( descrição . length  <  5 ) {
         throw  new  Error ( "A descrição deve ter no mínimo cinco caracteres" );
    \}
    if (quantidade <=  0 ) {
         throw  new  Error ( "Quantidade deve ser valor maior que zero" );
    \}
    if (valor <  0 ) {
         throw  new  Error ( "Valor deve ser maior igual a zero" );
    \}
\}

function  cadastrarProduto ( descrição , quantidade , valor ) {
     validarProduto ( descrição, quantidade, valor );
     let  novoProduto  = {
         "código" : produtos . length  +  1 ,
         "descricao" : descrição,
         "quantidade" : quantidade,
         "valor" : valor
    \};
    produtos . push (novoProduto);
\}

função  listarProdutos () {
    console.log ( produtos) ;
\}

function  atualizarValor ( codigoProduto , novoValor ) {
     if (novoValor <  0 ) {
         throw  new  Error ( "Valor deve ser maior igual a zero" );
    \}

    const  produto  = produtos . find ( prod => prod . codigo  === codigoProduto);
     if (produto) {
        produto . valor  = novoValor;
    \} else {
         throw  new  Error ( "Produto não encontrado" );
    \}
\}

function  atualizarQuantidade ( codigoProd uto , novaQuantidade ) {
     if (novaQuantidade <  1 ) {
         throw  new  Error ( "Quantidade deve ser maior que zero" );
    \}

    const  produto  = produtos . find ( prod => prod . codigo  === codigoProduto);
     if (produto) {
        produto . quantidade  += novaQuantidade;
    \} else {
         throw  new  Error ( "Produto não encontrado" );
    \}
\}

// .............................. ............... 
listarProdutos ();

cadastrarProduto ( "Cadeira Gamer" , 12 , 599,00 );
 cadastrarProduto ( "Mouse Logi" , 10 , 99.00 );

listarProdutos ();

atualizarValor ( 2 , 97.00 );

listarProdutos ();

atualizarQuantidade ( 1 , 5 );

listarProdutos ();
