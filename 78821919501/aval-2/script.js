javascript
// Classe para representar um Aluno
class Aluno {
  constructor(nome, idade, plano) {
    this.nome = nome;
    this.idade = idade;
    this.plano = plano; // Ex: 'Mensal', 'Trimestral', 'Anual'
    this.ativo = true;
  \}

  exibirInfo() {
    console.log(`Nome: \${this.nome\} | Idade: \${this.idade\} | Plano: \${this.plano\} | Status: \${this.ativo ? 'Ativo' : 'Inativo'\}`);
  \}
\}

// Classe para gerenciar a Academia
class Academia {
  constructor(nome) {
    this.nome = nome;
    this.alunos = [];
  \}

  // Adicionar um novo aluno
  adicionarAluno(nome, idade, plano) {
    const novoAluno = new Aluno(nome, idade, plano);
    this.alunos.push(novoAluno);
    console.log(`Aluno \${nome\} cadastrado com sucesso na \${this.nome\}!`);
  \}

  // Listar todos os alunos
  listarAlunos() {
    console.log(`\\n--- Lista de Alunos da \${this.nome\} ---`);
    if (this.alunos.length === 0) {
      console.log("Nenhum aluno cadastrado.");
      return;
    \}
    this.alunos.forEach((aluno, index) => {
      console.log(`\${index + 1\}.`, end = ""); // apenas numerando
      aluno.exibirInfo();
    \});
  \}

  // Buscar aluno por nome
  buscarAluno(nome) {
    const encontrado = this.alunos.find(a => a.nome.toLowerCase() === nome.toLowerCase());
    if (encontrado) {
      console.log(`\\nAluno encontrado:`);
      encontrado.exibirInfo();
    \} else {
      console.log(`\\nAluno "\${nome\}" não encontrado.`);
    \}
  \}
\}

// --- Exemplo de Uso ---

// 1. Criar a academia
const minhaAcademia = new Academia("FitPower Gym");

// 2. Cadastrar alunos
minhaAcademia.adicionarAluno("Carlos Silva", 28, "Anual");
minhaAcademia.adicionarAluno("Mariana Souza", 22, "Mensal");
minhaAcademia.adicionarAluno("Rafael Oliveira", 35, "Trimestral");

// 3. Listar alunos
minhaAcademia.listarAlunos();

// 4. Buscar um aluno específico
minhaAcademia.buscarAluno("Mariana Souza");$0