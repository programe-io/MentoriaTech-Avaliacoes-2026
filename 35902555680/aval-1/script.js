Li seu resumo da *Aula 14 - Projeto CRUD e Estoque* ✅

É um sistema de estoque em JavaScript, só com criar, listar e atualizar. Sem excluir ainda.

*O que você precisa saber:*

- *Produto:* objeto com `codigo, descricao, quantidade, valor`
- *Lista:* `let produtos = []`
- *Código:* automático com `produtos.length + 1`

*Funções principais:*

- *validarProduto:* descrição >= 5 caracteres, quantidade >= 1, valor >= 0. Se falhar, `throw new Error`
- *cadastrarProduto:* valida, cria o objeto e faz `produtos.push(novoProduto)`
- *listarProdutos:* `console.log(produtos)`
- *atualizarValor(codigo, novoValor):* busca com `find`, *substitui* o valor: `produto.valor = novoValor`
- *atualizarQuantidade(codigo, novaQuantidade):* busca com `find`, *soma* no estoque: `produto.quantidade = produto.quantidade + novaQuantidade`

*Ponto que mais cai na prova:*
Valor *substitui*, quantidade *soma*. E se não achar o produto, dá erro `"Produto não encontrado"`.

Quer que eu monte o código completo pronto pra colar no Programiz e testar, ou faço umas perguntinhas pra você revisar? 