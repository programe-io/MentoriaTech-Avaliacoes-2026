
const pessoas = [];

function criarIdentidade(nome, nascimento, nacionalidade) {
  if (!nome || !nascimento || !nacionalidade) {
    console.log("Preencha todos os campos!");
    return null;
  }

  const identidade = {
    id: crypto.randomUUID(),
    numero: Math.floor(100000 + Math.random() * 900000),
    nome: nome,
    nascimento: nascimento,
    nacionalidade: nacionalidade,
    dataCriacao: new Date().toLocaleDateString("pt-BR")
  };

  pessoas.push(identidade);

  console.log("Identidade criada com sucesso!");
  console.log(identidade);

  return identidade;
}

function listarIdentidades() {
  console.table(pessoas);
}

function buscarIdentidade(numero) {
  const pessoa = pessoas.find(
    pessoa => pessoa.numero === Number(numero)
  );

  if (pessoa) {
    console.log("Identidade encontrada:", pessoa);
    return pessoa;
  }

  console.log("Identidade não encontrada.");
  return null;
}

// Exemplo de utilização
criarIdentidade(
  "João da Silva",
  "01/01/2000",
  "Brasileira"
);

criarIdentidade(
  "Maria Oliveira",
  "15/05/2002",
  "Brasileira"
);

listarIdentidades();
