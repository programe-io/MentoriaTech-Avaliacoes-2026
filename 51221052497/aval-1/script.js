Claro! Agora vou fazer a mesma apresentação, mas usando JavaScript para criar todo o conteúdo dinamicamente, mantendo suas informações e o visual bonito. Teremos 3 arquivos separados: HTML, CSS e JavaScript.
📄 1. Arquivo HTML (index.html)

Aqui só temos a estrutura básica — todo o conteúdo será criado pelo JavaScript:
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apresentação - Iasmyn Kelly</title>
    <link rel="stylesheet" href="estilo.css">
</head>
<body>
    <!-- Todo o conteúdo será gerado pelo JavaScript -->
    <script src="script.js"></script>
</body>
</html>
🎨 2. Arquivo CSS (estilo.css)

Mesmo estilo visual de antes:
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

body {
    background: linear-gradient(135deg, #74b9ff, #a29bfe);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.cartao-apresentacao {
    background-color: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    max-width: 450px;
    width: 100%;
    text-align: center;
}

.icone-perfil {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #6c5ce7;
    color: white;
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px;
}

h1 {
    color: #2d3436;
    font-size: 28px;
    margin-bottom: 8px;
}

.idade {
    color: #636e72;
    font-size: 18px;
    margin-bottom: 5px;
}

.funcao {
    color: #6c5ce7;
    font-size: 19px;
    font-weight: 600;
    margin-bottom: 20px;
}

.descricao {
    color: #4a4e69;
    font-size: 17px;
    line-height: 1.8;
    margin-bottom: 25px;
}

.destaque {
    color: #e17055;
    font-weight: bold;
    font-size: 18px;
}

.mensagem-final {
    background-color: #f1f2f6;
    padding: 12px;
    border-radius: 12px;
    color: #2d3436;
    font-weight: 500;
}
🚀 3. Arquivo JavaScript (script.js)

Aqui é onde toda a estrutura e conteúdo são criados dinamicamente com suas informações:
// Dados da apresentação
const dados = {
    nome: "Iasmyn Kelly",
    idade: 15,
    funcao: "Estudante 📚",
    materiaFavorita: "Matemática",
    descricao: "Olá! Me chamo Iasmyn Kelly, tenho 15 anos e sou estudante. Minha matéria favorita é Matemática! Adoro resolver desafios, trabalhar com números e descobrir soluções para problemas. Estou sempre estudando e querendo aprender mais!",
    mensagemFinal: "🚀 Aprendendo e crescendo a cada dia!"
};

// Cria o cartão principal
const cartao = document.createElement('div');
cartao.className = 'cartao-apresentacao';

// Cria o ícone de perfil
const icone = document.createElement('div');
icone.className = 'icone-perfil';
icone.textContent = '👧';

// Cria o título (nome)
const nomeTitulo = document.createElement('h1');
nomeTitulo.textContent = dados.nome;

// Cria a idade
const idadeParagrafo = document.createElement('p');
idadeParagrafo.className = 'idade';
idadeParagrafo.textContent = `${dados.idade} anos`;

// Cria a função
const funcaoParagrafo = document.createElement('p');
funcaoParagrafo.className = 'funcao';
funcaoParagrafo.textContent = dados.funcao;

// Cria a descrição
const descricaoDiv = document.createElement('div');
descricaoDiv.className = 'descricao';

// Quebra o texto para destacar a matéria favorita
const textoDescricao = dados.descricao.split(dados.materiaFavorita);
descricaoDiv.innerHTML = `
    ${textoDescricao[0]}<span class="destaque">${dados.materiaFavorita}</span>${textoDescricao[1]}
`;

// Cria a mensagem final
const mensagemFinal = document.createElement('div');
mensagemFinal.className = 'mensagem-final';
mensagemFinal.textContent = dados.mensagemFinal;

// Adiciona todos os elementos dentro do cartão
cartao.appendChild(icone);
cartao.appendChild(nomeTitulo);
cartao.appendChild(idadeParagrafo);
cartao.appendChild(funcaoParagrafo);
cartao.appendChild(descricaoDiv);
cartao.appendChild(mensagemFinal);

// Adiciona o cartão na página
document.body.appendChild(cartao);
