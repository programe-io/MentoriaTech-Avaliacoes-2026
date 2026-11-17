HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema Bancário em JavaScript</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between p-4 md:p-8">

    <!-- Cabeçalho -->
    <header class="max-w-2xl w-full mx-auto mb-6 flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
            <h1 class="text-xl font-bold text-indigo-400">🏦 JSBank System</h1>
            <p class="text-xs text-slate-400">Simulador de Conta Corrente em POO & JavaScript</p>
        </div>
        <div id="conta-info" class="text-right text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            Titular: <span class="font-semibold text-white">Alexandre Silva</span>
        </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="max-w-2xl w-full mx-auto space-y-6">
        
        <!-- Card de Saldo -->
        <div class="bg-gradient-to-r from-indigo-900 to-slate-800 p-6 rounded-2xl border border-indigo-500/30 shadow-xl flex justify-between items-center">
            <div>
                <p class="text-xs uppercase tracking-wider text-indigo-300 font-medium">Saldo Disponível</p>
                <h2 id="saldo-display" class="text-3xl md:text-4xl font-extrabold text-white mt-1">R\$ 0,00</h2>
            </div>
            <div class="p-3 bg-indigo-600/30 rounded-xl border border-indigo-500/40 text-2xl">
                💳
            </div>
        </div>

        <!-- Painel de Ações -->
        <div class="bg-slate-800/80 backdrop-blur p-6 rounded-2xl border border-slate-700 shadow-md">
            <h3 class="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Realizar Operação</h3>
            <form id="operacao-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs text-slate-400 mb-1">Tipo de Operação</label>
                        <select id="tipo-operacao" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                            <option value="deposito">📈 Depósito</option>
                            <option value="saque">📉 Saque</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs text-slate-400 mb-1">Valor (R\$)</label>
                        <input type="number" id="valor-input" step="0.01" min="0.01" placeholder="0.00" required
                            class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                    </div>
                </div>
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-colors cursor-pointer text-sm shadow-lg shadow-indigo-600/25">
                    Confirmar Transação
                </button>
            </form>
            <div id="mensagem-feedback" class="mt-3 text-xs text-center hidden"></div>
        </div>

        <!-- Extrato / Histórico -->
        <div class="bg-slate-800/80 backdrop-blur p-6 rounded-2xl border border-slate-700 shadow-md">
            <h3 class="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Extrato de Transações</h3>
            <div class="overflow-x-auto max-h-60 overflow-y-auto">
                <ul id="extrato-list" class="space-y-2 text-sm">
                    <li class="text-slate-500 text-center py-4 text-xs">Nenhuma transação realizada ainda.</li>
                </ul>
            </div>
        </div>

    </main>

    <!-- Rodapé -->
    <footer class="max-w-2xl w-full mx-auto text-center py-4 text-xs text-slate-500 border-t border-slate-800 mt-6">
        Desenvolvido com JavaScript ES6+ (Classes, Métodos e Lógica de Estado).
    </footer>

    <!-- Lógica JavaScript (Engine do Sistema) -->
    <script>
        // --- 1. CLASSE DA CONTA BANCÁRIA (POO) ---
        class ContaBancaria {
            constructor(titular, saldoInicial = 0) {
                this.titular = titular;
                this.saldo = saldoInicial;
                this.transacoes = [];
            \}

            depositar(valor) {
                if (valor <= 0) return { sucesso: false, mensagem: "O valor do depósito deve ser maior que zero." \};
                
                this.saldo += valor;
                this.registrarTransacao("Depósito", valor, "text-emerald-400");
                return { sucesso: true, mensagem: `Depósito de R\$ \${valor.toFixed(2)\} realizado com sucesso!` \};
            \}

            sacar(valor) {
                if (valor <= 0) return { sucesso: false, mensagem: "O valor do saque deve ser maior que zero." \};
                if (valor > this.saldo) return { sucesso: false, mensagem: "Saldo insuficiente para realizar esta operação." \};

                this.saldo -= valor;
                this.registrarTransacao("Saque", valor, "text-rose-400");
                return { sucesso: true, mensagem: `Saque de R\$ \${valor.toFixed(2)\} realizado com sucesso!` \};
            \}

            registrarTransacao(tipo, valor, corClasse) {
                const dataHora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' \});
                this.transacoes.unshift({
                    tipo,
                    valor,
                    dataHora,
                    corClasse
                \});
            \}

            obterSaldoFormatado() {
                return this.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' \});
            \}
        \}

        // --- 2. INSTANCIAÇÃO DO SISTEMA ---
        const minhaConta = new ContaBancaria("Alexandre Silva", 1500.00); // Começa com saldo inicial de teste

        // --- 3. SELEÇÃO DE ELEMENTOS DO DOM ---
        const saldoDisplay = document.getElementById('saldo-display');
        const operacaoForm = document.getElementById('operacao-form');
        const tipoOperacaoSelect = document.getElementById('tipo-operacao');
        const valorInput = document.getElementById('valor-input');
        const mensagemFeedback = document.getElementById('mensagem-feedback');
        const extratoList = document.getElementById('extrato-list');

        // --- 4. FUNÇÕES DE RENDERIZAÇÃO DA INTERFACE ---
        function atualizarUI() {
            // Atualizar saldo
            saldoDisplay.innerText = minhaConta.obterSaldoFormatado();

            // Atualizar lista de transações
            if (minhaConta.transacoes.length === 0) {
                extratoList.innerHTML = `<li class="text-slate-500 text-center py-4 text-xs">Nenhuma transação realizada ainda.</li>`;
                return;
            \}

            extratoList.innerHTML = '';
            minhaConta.transacoes.forEach(t => {
                const li = document.createElement('li');
                li.className = "flex justify-between items-center bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-700/50";
                li.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <span class="text-xs text-slate-400">\${t.dataHora\}</span>
                        <span class="font-medium text-slate-200">\${t.tipo\}</span>
                    </div>
                    <span class="font-semibold \${t.corClasse\}">R\$ \${t.valor.toFixed(2)\}</span>
                `;
                extratoList.appendChild(li);
            \});
        \}

        function exibirFeedback(mensagem, sucesso) {
            mensagemFeedback.innerText = mensagem;
            mensagemFeedback.className = `mt-3 text-xs text-center p-2 rounded-lg font-medium \${sucesso ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950/50 text-rose-400 border border-rose-500/30'\}`;
            mensagemFeedback.classList.remove('hidden');

            setTimeout(() => {
                mensagemFeedback.classList.add('hidden');
            \}, 4000);
        \}

        // --- 5. EVENT LISTENERS E CONTROLE DE FLUXO ---
        operacaoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const tipo = tipoOperacaoSelect.value;
            const valor = parseFloat(valorInput.value);

            let resultado;
            if (tipo === 'deposito') {
                resultado = minhaConta.depositar(valor);
            \} else {
                resultado = minhaConta.sacar(valor);
            \}

            exibirFeedback(resultado.mensagem, resultado.sucesso);
            if (resultado.sucesso) {
                valorInput.value = '';
            \}
            atualizarUI();
        \});

        // Inicializar painel com transação inicial simulada
        minhaConta.registrarTransacao("Saldo Inicial", 1500.00, "text-indigo-400");
        atualizarUI();
    </script>
</body>
</html>$0