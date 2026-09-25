// ===== JOGO DA ADIVINHAÇÃO =====
const Jogo = {
    numeroSecreto: 0,
    tentativas: 0,
    maxTentativas: 5,
    pontuacao: 0,
    faixaMin: 1,
    faixaMax: 100,
    historico: [],

    // Iniciar nova partida
    iniciar() {
        this.numeroSecreto = Math.floor(Math.random() * (this.faixaMax - this.faixaMin + 1)) + this.faixaMin;
        this.tentativas = 0;
        this.historico = [];
        console.log(`(Dica: o número é ${this.numeroSecreto})`); // Para testes
        return `Pensei em um número entre ${this.faixaMin} e ${this.faixaMax}! Você tem ${this.maxTentativas} chances.`;
    },

    // Fazer um palpite
    palpitar(valor) {
        const palpite = parseInt(valor);

        // Validações
        if (isNaN(palpite)) return { acertou: false, mensagem: '⚠️ Digite um número válido!' };
        if (palpite < this.faixaMin || palpite > this.faixaMax) {
            return { acertou: false, mensagem: `⚠️ Escolha entre ${this.faixaMin} e ${this.faixaMax}!` };
        }
        if (this.tentativas >= this.maxTentativas) {
            return { acertou: false, mensagem: `❌ Suas chances acabaram! O número era ${this.numeroSecreto}.`, acabou: true };
        }

        this.tentativas++;
        this.historico.push(palpite);

        // Acertou
        if (palpite === this.numeroSecreto) {
            const pontos = Math.max(100 - (this.tentativas - 1) * 15, 10);
            this.pontuacao += pontos;
            return {
                acertou: true,
                mensagem: `🎉 Parabéns! Acertou em ${this.tentativas} tentativa(s)! +${pontos} pontos`,
                pontos,
                encerrado: true
            };
        }

        // Dica
        const dica = palpite < this.numeroSecreto ? '🔼 Tente um número MAIOR!' : '🔽 Tente um número MENOR!';
        const restantes = this.maxTentativas - this.tentativas;

        if (restantes === 0) {
            return {
                acertou: false,
                mensagem: `❌ Fim de jogo! O número era ${this.numeroSecreto}.`,
                dica,
                acabou: true
            };
        }

        return {
            acertou: false,
            mensagem: `${dica} Restam ${restantes} tentativa(s).`,
            dica
        };
    },

    // Alterar dificuldade
    definirDificuldade(nivel) {
        switch (nivel) {
            case 'facil':
                this.faixaMin = 1; this.faixaMax = 50; this.maxTentativas = 8;
                break;
            case 'medio':
                this.faixaMin = 1; this.faixaMax = 100; this.maxTentativas = 5;
                break;
            case 'dificil':
                this.faixaMin = 1; this.faixaMax = 200; this.maxTentativas = 4;
                break;
        }
        return `Dificuldade: ${nivel.toUpperCase()} — ${this.faixaMin} a ${this.faixaMax}, ${this.maxTentativas} tentativas`;
    }
};

// ===== INTERFACE =====
const UI = {
    init() {
        this.atualizarStatus(Jogo.iniciar());
        this.vincularEventos();
    },

    vincularEventos() {
        document.getElementById('form-palpite').addEventListener('submit', e => {
            e.preventDefault();
            const input = document.getElementById('palpite');
            const res = Jogo.palpitar(input.value);
            this.atualizarStatus(res.mensagem);
            this.atualizarHistorico();
            this.atualizarPontuacao();
            input.value = '';
            input.focus();

            if (res.encerrado || res.acabou) {
                document.getElementById('btn-reiniciar').style.display = 'inline-block';
                input.disabled = true;
            }
        });

        document.getElementById('btn-reiniciar').addEventListener('click', () => {
            this.atualizarStatus(Jogo.iniciar());
            document.getElementById('btn-reiniciar').style.display = 'none';
            document.getElementById('palpite').disabled = false;
            document.getElementById('historico').innerHTML = '';
        });

        document.getElementById('dificuldade').addEventListener('change', e => {
            const msg = Jogo.definirDificuldade(e.target.value);
            this.atualizarStatus(msg + '. Jogo reiniciado!');
            document.getElementById('historico').innerHTML = '';
            document.getElementById('btn-reiniciar').style.display = 'none';
            document.getElementById('palpite').disabled = false;
            Jogo.pontuacao = 0;
            this.atualizarPontuacao();
        });
    },

    atualizarStatus(texto) {
        document.getElementById('status').textContent = texto;
    },

    atualizarHistorico() {
        const el = document.getElementById('historico');
        el.innerHTML = Jogo.historico.map((n, i) => `<span class="item">${i + 1}º: ${n}</span>`).join('');
    },

    atualizarPontuacao() {
        document.getElementById('pontos').textContent = Jogo.pontuacao;
    }
};

// ===== INICIAR JOGO =====
document.addEventListener('DOMContentLoaded', () => UI.init());