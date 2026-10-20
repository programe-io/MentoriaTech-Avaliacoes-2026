/**
 * PROJETO: CRUD E ESTOQUE EM JAVASCRIPT (VERSÃO AVANÇADA / ES6+)
 * Focado em Programação Orientada a Objetos e Persistência de Dados (Tópico 21)
 */

// ==========================================================================
// 3. Estrutura dos dados do produto (Classe para modelar o Objeto Produto)
// ==========================================================================
class Produto {
    constructor(id, descricao, quantidade, valor) {
        this.id = id;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valor = valor;
    }

    // Método computado para calcular o valor total deste item em estoque
    get totalEmEstoque() {
        return this.quantidade * this.valor;
    }
}

// ==========================================================================
// GERENCIADOR DE ESTOQUE (Encapsula toda a lógica do CRUD)
// ==========================================================================
class GerenciadorEstoque {
    constructor() {
        // 4. Criação da lista de produtos (Carrega do LocalStorage ou inicia vazio)
        const dadosSalvos = localStorage.getItem('PROJETO_ESTOQUE_CRUD');
        this.produtos = dadosSalvos ? JSON.parse(dadosSalvos) : [];
        
        // 12. Geração automática do código do produto (Busca o maior ID existente)
        this.proximoId = this.produtos.length > 0 
            ? Math.max(...this.produtos.map(p => p.id)) + 1 
            : 1;
    }

    // Salva o estado atual do array no navegador do usuário
    _salvarNoLocalStorage() {
        localStorage.setItem('PROJETO_ESTOQUE_CRUD', JSON.stringify(this.produtos));
    }

    // ==========================================================================
    // 6, 7, 8, 9. Validações Robustas
    // ==========================================================================
    _validar(descricao, quantidade, valor) {
        if (!descricao || typeof descricao !== 'string' || descricao.trim().length < 3) {
            throw new Error("A descrição do produto deve conter pelo menos 3 caracteres.");
        }
        if (isNaN(quantidade) || quantidade < 0) {
            throw new Error("A quantidade de produtos em estoque não pode ser negativa.");
        }
        if (isNaN(valor) || valor <= 0) {
            throw new Error("O valor unitário do produto deve ser maior que zero R\$.");
        }
        return true;
    }

    // ==========================================================================
    // 10. Função para cadastrar produto (Create)
    // ==========================================================================
    cadastrar(descricao, quantidade, valor) {
        try {
            this._validar(descricao, quantidade, valor);

            // 11. Criação do objeto produto a partir da classe
            const novoItem = new Produto(
                this.proximoId++, 
                descricao.trim(), 
                parseInt(quantidade), 
                parseFloat(valor)
            );

            // 13. Adição de produtos ao array
            this.produtos.push(novoItem);
            this._salvarNoLocalStorage();

            return { sucesso: true, mensagem: `Produto #${novoItem.id} cadastrado com sucesso!`, produto: novoItem };
        } catch (error) {
            return { sucesso: false, mensagem: error.message };
        }
    }

    // ==========================================================================
    // 14. Função para listar produtos (Read)
    // ==========================================================================
    listar() {
        // Retorna uma cópia mapeada contendo o getter do total calculada
        return this.produtos.map(p => ({
            ...p,
            totalItem: p.quantidade * p.valor
        }));
    }

    // ==========================================================================
    // 17. Busca de produto com find (Search)
    // ==========================================================================
    buscarPorId(idBusca) {
        const item = this.produtos.find(p => p.id === parseInt(idBusca));
        
        // 18. Tratamento de produto não encontrado
        if (!item) {
            console.warn(`Código #${idBusca} não localizado.`);
            return null;
        }
        return item;
    }

    // ==========================================================================
    // 16. Função para atualizar o valor do produto (Update Valor)
    // ==========================================================================
    atualizarValor(id, novoValor) {
        const item = this.buscarPorId(id);
        if (!item) return { sucesso: false, mensagem: "Produto não encontrado." };

        if (isNaN(novoValor) || novoValor <= 0) {
            return { sucesso: false, mensagem: "Novo valor informado é inválido." };
        }

        // 20. Diferença: Substituição total do preço
        item.valor = parseFloat(novoValor);
        this._salvarNoLocalStorage();
        return { sucesso: true, mensagem: `Preço atualizado para R$ ${item.valor.toFixed(2)}` };
    }

    // ==========================================================================
    // 19. Função para atualizar a quantidade do produto (Update Qtd)
    // ==========================================================================
    atualizarEstoque(id, qtdAlteracao, tipoOperacao = 'somar') {
        const item = this.buscarPorId(id);
        if (!item) return { sucesso: false, mensagem: "Produto não encontrado." };

        const qtd = parseInt(qtdAlteracao);
        if (isNaN(qtd) || qtd <= 0) return { sucesso: false, mensagem: "Quantidade inválida." };

        // 20. Diferença: Lógica de adição ou subtração cumulativa
        if (tipoOperacao === 'somar') {
            item.quantidade += qtd;
        } else if (tipoOperacao === 'subtrair') {
            if (item.quantidade - qtd < 0) {
                return { sucesso: false, mensagem: `Estoque insuficiente. Saldo atual: ${item.quantidade}` };
            }
            item.quantidade -= qtd;
        } else {
            return { sucesso: false, mensagem: "Operação inválida. Use 'somar' ou 'subtrair'." };
        }

        this._salvarNoLocalStorage();
        return { sucesso: true, mensagem: `Estoque atualizado. Nova quantidade: ${item.quantidade}` };
    }
}

// ==========================================================================
// 15. Testando o cadastro e a listagem via Console (Exemplo prático)
// ==========================================================================
const meuEstoque = new GerenciadorEstoque();

console.log("--- Executando Novo Fluxo de Testes ---");
// Criando itens se o banco do navegador estiver limpo
if (meuEstoque.listar().length === 0) {
    console.log(meuEstoque.cadastrar("Cadeira Gamer Pro", 5, 1200.00).mensagem);
    console.log(meuEstoque.cadastrar("Headset Bluetooth 7.1", 12, 350.00).mensagem);
}

// Exibindo dados atuais estruturados em formato de tabela no terminal/console
console.table(meuEstoque.listar());

