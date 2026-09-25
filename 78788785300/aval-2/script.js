// ===== GERENCIADOR DE TAREFAS =====
const Tarefa = {
    lista: [],
    filtroAtual: 'todas',

    // Adicionar nova tarefa
    adicionar(texto) {
        if (!texto.trim()) return { sucesso: false, mensagem: 'Digite uma tarefa válida!' };
        
        const nova = {
            id: Date.now(),
            texto: texto.trim(),
            concluida: false,
            data: new Date().toLocaleString('pt-BR')
        };
        
        this.lista.unshift(nova);
        this.salvar();
        return { sucesso: true, tarefa: nova };
    },

    // Alternar status (concluída/não)
    alternar(id) {
        const tarefa = this.lista.find(t => t.id === id);
        if (tarefa) {
            tarefa.concluida = !tarefa.concluida;
            this.salvar();
        }
    },

    // Remover tarefa
    remover(id) {
        this.lista = this.lista.filter(t => t.id !== id);
        this.salvar();
    },

    // Filtrar tarefas
    filtrar(tipo) {
        this.filtroAtual = tipo;
        switch(tipo) {
            case 'concluidas': return this.lista.filter(t => t.concluida);
            case 'pendentes': return this.lista.filter(t => !t.concluida);
            default: return this.lista;
        }
    },

    // Salvar no navegador
    salvar() {
        localStorage.setItem('tarefas', JSON.stringify(this.lista));
    },

    // Carregar do navegador
    carregar() {
        const dados = localStorage.getItem('tarefas');
        if (dados) this.lista = JSON.parse(dados);
    },

    // Estatísticas
    estatisticas() {
        const total = this.lista.length;
        const concluidas = this.lista.filter(t => t.concluida).length;
        const pendentes = total - concluidas;
        return { total, concluidas, pendentes };
    }
};

// ===== INTERFACE =====
const UI = {
    init() {
        Tarefa.carregar();
        this.vincularEventos();
        this.renderizar();
    },

    vincularEventos() {
        document.getElementById('form-tarefa').addEventListener('submit', (e) => {
            e.preventDefault();
            this.adicionarTarefa();
        });

        document.querySelectorAll('[data-filtro]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                Tarefa.filtroAtual = e.target.dataset.filtro;
                this.atualizarBotoesFiltro();
                this.renderizar();
            });
        });
    },

    adicionarTarefa() {
        const input = document.getElementById('nova-tarefa');
        const resultado = Tarefa.adicionar(input.value);
        
        if (resultado.sucesso) {
            input.value = '';
            this.renderizar();
        } else {
            this.mensagem(resultado.mensagem, 'erro');
        }
    },

    renderizar() {
        const listaEl = document.getElementById('lista-tarefas');
        const dados = Tarefa.filtrar(Tarefa.filtroAtual);
        const stats = Tarefa.estatisticas();

        listaEl.innerHTML = dados.length ? dados.map(t => `
            <div class="tarefa ${t.concluida ? 'concluida' : ''}" data-id="${t.id}">
                <input type="checkbox" class="check" ${t.concluida ? 'checked' : ''}>
                <div class="conteudo">
                    <span class="texto">${t.texto}</span>
                    <span class="data">${t.data}</span>
                </div>
                <button class="excluir">✕</button>
            </div>
        `).join('') : '<p class="vazia">Nenhuma tarefa encontrada ✨</p>';

        document.getElementById('estat-total').textContent = stats.total;
        document.getElementById('estat-concluidas').textContent = stats.concluidas;
        document.getElementById('estat-pendentes').textContent = stats.pendentes;

        this.vincularAcoesItens();
    },

    vincularAcoesItens() {
        document.querySelectorAll('.tarefa').forEach(item => {
            const id = parseInt(item.dataset.id);
            
            item.querySelector('.check').addEventListener('change', () => {
                Tarefa.alternar(id);
                this.renderizar();
            });
            
            item.querySelector('.excluir').addEventListener('click', () => {
                if (confirm('Excluir esta tarefa?')) {
                    Tarefa.remover(id);
                    this.renderizar();
                }
            });
        });
    },

    atualizarBotoesFiltro() {
        document.querySelectorAll('[data-filtro]').forEach(btn => {
            btn.classList.toggle('ativo', btn.dataset.filtro === Tarefa.filtroAtual);
        });
    },

    mensagem(texto, tipo) {
        const el = document.getElementById('aviso');
        el.textContent = texto;
        el.className = tipo;
        setTimeout(() => el.textContent = '', 3000);
    }
};

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', () => UI.init());