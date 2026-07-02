/* Configurações Gerais */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f4f6f4;
    color: #333;
}

/* Cabeçalho */
header {
    background-color: #2e6f40;
    color: white;
    padding: 15px 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
}

header nav a {
    color: white;
    text-decoration: none;
    margin-left: 20px;
    font-weight: bold;
}

header nav a:hover {
    color: #a3e2a4;
}

/* Banner */
.banner {
    background-color: #8d6e63;
    color: white;
    text-align: center;
    padding: 60px 20px;
}

.banner h2 {
    font-size: 2rem;
    margin-bottom: 10px;
}

/* Vitrine de Produtos */
.titulo-secao {
    text-align: center;
    margin: 40px 0 20px 0;
    color: #2e6f40;
}

.grade-produtos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 0 5%;
    margin-bottom: 50px;
}

.cartao-produto {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 280px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.foto-produto {
    font-size: 4rem;
    margin-bottom: 15px;
}

.cartao-produto h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
}

.descricao {
    font-size: 0.9rem;
    color: #666;
    height: 40px;
    margin-bottom: 15px;
}

.preco {
    font-size: 1.3rem;
    font-weight: bold;
    color: #2e6f40;
    margin-bottom: 15px;
}

.cartao-produto button {
    background-color: #2e6f40;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
}

.cartao-produto button:hover {
    background-color: #1e4b2b;
}

/* Carrinho */
.secao-carrinho {
    background-color: white;
    max-width: 600px;
    margin: 0 auto 50px auto;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.secao-carrinho h2 {
    color: #8d6e63;
    margin-bottom: 20px;
    border-bottom: 2px solid #f4f6f4;
    padding-bottom: 10px;
}

#itens-carrinho {
    list-style: none;
    margin-bottom: 20px;
}

#itens-carrinho li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.carrinho-vazio {
    color: #999;
    font-style: italic;
}

.total-carrinho {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.btn-finalizar {
    background-color: #8d6e63;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
}

.btn-finalizar:hover {
    background-color: #5d4037;
}

/* Rodapé */
footer {
    background-color: #222;
    color: #aaa;
    text-align: center;
    padding: 20px;
    font-size: 0.9rem;
}