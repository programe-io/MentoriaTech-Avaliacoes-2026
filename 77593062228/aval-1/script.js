/**
 * TemaVaquejada - Gerencia a interatividade e a experiência do usuário
 * Ano: 2026
 */
class TemaVaquejada {
    constructor() {
        // Seletores principais
        this.body = document.body;
        this.header = document.querySelector('header');
        
        // Inicialização dos componentes
        this.injetarEstilosModoEscuro();
        this.criarBarraProgresso();
        this.criarBotaoTema();
        
        // Aplicar preferências salvas ou padrão do sistema
        this.carregarTemaSalvo();
        
        // Ativar os ouvintes de eventos (Listeners)
        this.registrarEventos();
    }

    /**
     * Injeta dinamicamente as regras de transição e o esquema de cores dark
     */
    injetarEstilosModoEscuro() {
        const estilos = document.createElement("style");
        estilos.innerHTML = `
            /* Transição suave para todos os elementos quando o tema mudar */
            body, main, h2, strong, blockquote, p {
                transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                            color 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                            border-color 0.4s ease;
            }

            /* Regras do Modo Escuro */
            body.dark-mode {
                background-color: #160d08 !important;
                color: #f3e9dc !important;
            }
            body.dark-mode main {
                background-color: #23150d !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
            }
            body.dark-mode h2 {
                color: #ffca28 !important;
                border-bottom-color: #4e342e !important;
            }
            body.dark-mode strong {
                color: #ffe082 !important;
            }
            body.dark-mode blockquote {
                background-color: #3e2723 !important;
                border-left-color: #ffca28 !important;
            }
            body.dark-mode blockquote p {
                color: #fff8e1 !important;
            }
            body.dark-mode footer {
                background-color: #0d0705 !important;
                color: #8d6e63 !important;
            }
        `;
        document.head.appendChild(estilos);
    }

    /**
     * Cria uma barra fina no topo do site que indica o quanto o usuário já leu
     */
    criarBarraProgresso() {
        this.progressBarra = document.createElement("div");
        Object.assign(this.progressBarra.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "0%",
            height: "5px",
            backgroundColor: "#ffb300",
            zIndex: "2000",
            transition: "width 0.1s ease-out"
        });
        this.body.appendChild(this.progressBarra);
    }

    /**
     * Cria e estiliza o botão de alternância com visual moderno (Glassmorphism)
     */
    criarBotaoTema() {
        this.btnTema = document.createElement("button");
        this.btnTema.id = "btn-tema-moderno";
        
        // Estilização avançada via JS
        Object.assign(this.btnTema.style, {
            position: "fixed",
            bottom: "30px", /* Posicionado no canto inferior direito (padrão de apps modernos) */
            right: "30px",
            padding: "12px 24px",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "30px",
            backgroundColor: "#ffb300",
            color: "#211512",
            fontFamily: "inherit",
            fontWeight: "600",
            fontSize: "0.95rem",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            zIndex: "1000",
            display: "flex",
            alignItems: "center",
            gap: "8px"
        });

        this.btnTema.innerHTML = `<span>🌙</span> Modo Noturno`;
        this.body.appendChild(this.btnTema);
    }

    /**
     * Atualiza o visual do botão dependendo do tema ativo
     */
    atualizarBotao(isDark) {
        if (isDark) {
            this.btnTema.innerHTML = `<span>☀️</span> Modo Dia`;
            this.btnTema.style.backgroundColor = "#ffffff";
            this.btnTema.style.color = "#