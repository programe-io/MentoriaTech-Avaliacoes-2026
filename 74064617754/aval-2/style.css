@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');

:root {
    --fundo: #f3f6fb;
    --superficie: #ffffff;
    --texto: #182235;
    --muted: #738096;
    --azul: #4968e8;
    --azul-escuro: #3452ce;
    --borda: #e7ebf2;
    --verde: #16845d;
    --vermelho: #c44e59;
    --sombra: 0 18px 50px rgba(32, 48, 86, .08);
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    min-height: 100vh;
    background:
        radial-gradient(
            circle at 8% 0%,
            rgba(73, 104, 232, .10),
            transparent 28rem
        ),
        var(--fundo);

    color: var(--texto);
    font-family: 'DM Sans', sans-serif;
}

.container {
    width: min(980px, calc(100% - 36px));
    margin: 56px auto;
}

.topo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 30px;
}

.eyebrow {
    margin: 0 0 8px;
    color: var(--azul);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .16em;
}

h1, h2, p {
    margin-top: 0;
}

h1 {
    margin-bottom: 8px;
    font: 800 clamp(28px, 5vw, 40px)/1.15 'Manrope', sans-serif;
    letter-spacing: -.04em;
}

h2 {
    margin-bottom: 18px;
    font: 700 19px 'Manrope', sans-serif;
}

.subtitulo {
    margin-bottom: 0;
    color: var(--muted);
}

.resumo {
    min-width: 132px;
    padding: 16px 20px;
    border: 1px solid var(--borda);
    border-radius: 16px;
    background: rgba(255,255,255,.8);
    text-align: center;
}

.resumo span {
    display: block;
    color: var(--azul);
    font: 800 28px 'Manrope', sans-serif;
}

.resumo small {
    color: var(--muted);
    font-size: 11px;
}

.painel, .tarefa {
    border: 1px solid var(--borda);
    border-radius: 18px;
    background: var(--superficie);
    box-shadow: var(--sombra);
}

.formulario-painel {
    padding: 25px;
    margin-bottom: 36px;
}

.campos {
    display: grid;
    grid-template-columns: 1fr 190px auto;
    align-items: end;
    gap: 14px;
}

.campo {
    display: grid;
    gap: 8px;
    color: #4c5870;
    font-size: 13px;
    font-weight: 600;
}

input, select {
    width: 100%;
    min-height: 46px;
    padding: 0 13px;
    border: 1px solid var(--borda);
    border-radius: 10px;
    outline: none;
    background: #fbfcfe;
    color: var(--texto);
    font: 500 14px 'DM Sans', sans-serif;
}

input:focus, select:focus {
    border-color: var(--azul);
    box-shadow: 0 0 0 3px rgba(73,104,232,.12);
}

.botao {
    min-height: 46px;
    padding: 0 18px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    font: 700 13px 'DM Sans', sans-serif;
    transition: .2s ease;
}

.principal {
    background: var(--azul);
    color: white;
}

.principal:hover {
    background: var(--azul-escuro);
    transform: translateY(-1px);
}

.ajuda {
    margin: 12px 0 0;
    color: var(--muted);
    font-size: 12px;
}

.lista-cabecalho {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
}

.lista-cabecalho h2 {
    margin-bottom: 5px;
}

.lista-cabecalho .subtitulo {
    font-size: 13px;
}

.filtro {
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--muted);
    font-size: 12px;
}

.filtro select {
    width: 145px;
    min-height: 38px;
}

.lista-tarefas {
    display: grid;
    gap: 12px;
}

.tarefa {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    box-shadow: 0 6px 20px rgba(32,48,86,.04);
}

.tarefa-info {
    flex: 1;
    min-width: 0;
}

.tarefa-titulo {
    margin: 0 0 7px;
    font-size: 15px;
    font-weight: 700;
    overflow-wrap: anywhere;
}

.meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    color: var(--muted);
    font-size: 11px;
}

.etiqueta {
    padding: 5px 9px;
    border-radius: 20px;
    background: #f0f3f9;
    color: #66738a;
    font-weight: 700;
}

.prioridade-1 {
    background: #fff0ed;
    color: #c45c4b;
}

.prioridade-2 {
    background: #fff7e6;
    color: #a97819;
}

.prioridade-3 {
    background: #eaf7f1;
    color: #27805d;
}

.status-concluida {
    background: #eaf7f1;
    color: var(--verde);
}

.concluida .tarefa-titulo {
    color: #8993a4;
    text-decoration: line-through;
}

.acoes {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: 7px;
}

.botao-secundario {
    min-height: 34px;
    padding: 0 11px;
    border: 1px solid var(--borda);
    background: white;
    color: #59667d;
    font-size: 11px;
}

.botao-secundario:hover {
    border-color: #b9c5e8;
    background: #f7f8ff;
}

.botao-concluir {
    color: var(--verde);
}

.vazio {
    padding: 38px 20px;
    border: 1px dashed #cfd6e3;
    border-radius: 16px;
    color: var(--muted);
    text-align: center;
    font-size: 13px;
}

.mensagem {
    min-height: 22px;
    margin-top: 16px;
    color: var(--verde);
    font-size: 13px;
    text-align: center;
}

.mensagem.erro {
    color: var(--vermelho);
}

footer {
    margin-top: 34px;
    color: #9aa4b5;
    text-align: center;
    font-size: 11px;
}

@media (max-width: 700px) {

    .container {
        margin: 30px auto;
    }

    .topo {
        align-items: flex-start;
    }

    .resumo {
        min-width: 105px;
        padding: 12px;
    }

    .campos {
        grid-template-columns: 1fr;
    }

    .lista-cabecalho {
        align-items: flex-start;
        flex-direction: column;
    }

    .tarefa {
        align-items: flex-start;
        flex-direction: column;
    }

    .acoes {
        justify-content: flex-start;
    }
}