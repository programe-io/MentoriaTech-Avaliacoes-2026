javascript
// Classe que representa um Aluno da escola particular
class Aluno {
    constructor(id, nome, curso, mensalidadeBase, descontoPercentual = 0) {
        this.id = id;
        this.nome = nome;
        this.curso = curso;
        this.mensalidadeBase = mensalidadeBase;
        this.descontoPercentual = descontoPercentual;
        this.pago = false; // Status inicial da mensalidade do mês atual
    \}

    // Calcula o valor final da mensalidade com o desconto aplicado
    calcularMensalidade() {
        const desconto = (this.mensalidadeBase * this.descontoPercentual) / 100;
        return this.mensalidadeBase - desconto;
    \}

    // Registra o pagamento da mensalidade
    registrarPagamento() {
        this.pago = true;
        console.log(`✅ Pagamento confirmado para o aluno(a) \${this.nome\}.`);
    \}

    // Exibe o extrato/status do aluno
    obterStatus() {
        const valorFinal = this.calcularMensalidade();
        return {
            ID: this.id,
            Nome: this.nome,
            Curso: this.curso,
            ValorOriginal: `R\$ \${this.mensalidadeBase.toFixed(2)\}`,
            Desconto: `\${this.descontoPercentual\}%`,
            ValorA_Pagar: `R\$ \${valorFinal.toFixed(2)\}`,
            Status: this.pago ? "PAGO" : "PENDENTE"
        \};
    \}
\}

// Classe que gerencia a Escola
class Escola {
    constructor(nome) {
        this.nome = nome;
        this.alunos = [];
    \}

    // Matricula um novo aluno na escola
    matricularAluno(aluno) {
        this.alunos.push(aluno);
        console.log(`🎓 \${aluno.nome\} matriculado(a) com sucesso no curso de \${aluno.curso\}!`);
    \}

    // Busca um aluno pelo ID
    buscarAluno(id) {
        return this.alunos.find(aluno => aluno.id === id);
    \}

    // Gera o relatório financeiro geral da escola
    gerarRelatorioFinanceiro() {
        console.log(`\\n--- RELATÓRIO FINANCEIRO: \${this.nome.toUpperCase()\} ---`);
        let faturamentoTotal = 0;
        let totalPendente = 0;

        this.alunos.forEach(aluno => {
            const status = aluno.obterStatus();
            console.log(`Aluno: \${status.Nome\} | Curso: \${status.Curso\} | Valor: \${status.ValorA_Pagar\} | Status: \${status.Status\}`);
            
            const valor = aluno.calcularMensalidade();
            if (aluno.pago) {
                faturamentoTotal += valor;
            \} else {
                totalPendente += valor;
            \}
        \});

        console.log(`--------------------------------------------------`);
        console.log(`💰 Total Arrecadado: R\$ \${faturamentoTotal.toFixed(2)\}`);
        console.log(`⚠️ Total Inadimplente: R\$ \${totalPendente.toFixed(2)\}`);
        console.log(`--------------------------------------------------\\n`);
    \}
\}

// ==========================================
// EXEMPLO PRÁTICO DE USO do sistema
// ==========================================

// 1. Criando a escola
const minhaEscola = new Escola("Colégio Visão do Futuro");

// 2. Criando os alunos (ID, Nome, Curso, Mensalidade Base, % de Desconto)
const aluno1 = new Aluno(1, "Ana Silva", "Ensino Médio", 1200, 10); // 10% de desconto (bolsista)
const aluno2 = new Aluno(2, "Carlos Souza", "Ensino Fundamental", 950, 0); // Sem desconto
const aluno3 = new Aluno(3, "Mariana Costa", "Educação Infantil", 800, 5); // 5% de desconto irmão

// 3. Matriculando os alunos na escola
minhaEscola.matricularAluno(aluno1);
minhaEscola.matricularAluno(aluno2);
minhaEscola.matricularAluno(aluno3);

// 4. Exibindo o relatório antes de qualquer pagamento (Tudo Pendente)
minhaEscola.gerarRelatorioFinanceiro();

// 5. Simulando pagamentos
console.log("--- Processando Pagamentos ---");
const alunoEncontrado = minhaEscola.buscarAluno(1); // Busca Ana Silva
if (alunoEncontrado) alunoEncontrado.registrarPagamento();

minhaEscola.buscarAluno(3).registrarPagamento(); // Mariana pagou também

// 6. Gerando novo relatório após os pagamentos
minhaEscola.gerarRelatorioFinanceiro();
$0