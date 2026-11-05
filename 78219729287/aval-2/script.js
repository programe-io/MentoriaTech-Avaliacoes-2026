
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Trebuchet MS', Arial, sans-serif;
    background: #f1f5fb;
    color: #263750;
}

/* CABEÇALHO */

.topo {
    background: #174b87;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 5%;
    gap: 20px;
    flex-wrap: wrap;
    position: sticky;
    top: 0;
    z-index: 10;
}

.logo {
    color: white;
    text-decoration: none;
    font-size: 25px;
    font-weight: bold;
}

.topo input {
    width: 40%;
    padding: 12px 18px;
    border: none;
    border-radius: 25px;
    outline: none;
}

.usuario {
    font-weight: bold;
}

/* LAYOUT */

.container {
    display: grid;
    grid-template-columns: 230px minmax(0, 650px) 260px;
    justify-content: center;
    gap: 25px;
    padding: 30px 3%;
    align-items: start;
}

.sidebar,
.painel {
    background: white;
    border-radius: 15px;
    padding: 22px;
    box-shadow: 0 3px 12px #dce5f1;
}

.sidebar {
    position: sticky;
    top: 100px;
}

/* PERFIL */

.perfil {
    text-align: center;
    border-bottom: 1px solid #e5eaf2;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.avatar {
    background: #e1edff;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin: auto auto 12px;
    display: grid;
    place-items: center;
    font-size: 35px;
}

.perfil p,
.post-header p,
.sugestao p {
    color: #8191a8;
    margin-top: 5px;
    font-size: 13px;
}

/* MENU */

.sidebar nav a {
    display: block;
    padding: 14px 8px;
    color: #365477;
    text-decoration: none;
    border-radius: 10px;
    font-weight: bold;
}

.sidebar nav a:hover {
    background: #e6f0ff;
    color: #174b87;
}

/* BOAS-VINDAS */

.boas-vindas {
    background: linear-gradient(120deg, #174b87, #3986cb);
    color: white;
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 25px;
    line-height: 1.8;
}

.boas-vindas h2 {
    margin: 10px 0;
    font-size: 25px;
}

.etiqueta {
    background: #ffdc68;
    color: #174b87;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: bold;
}

/* CRIAR PUBLICAÇÃO */

.criar,
.post {
    background: white;
    border-radius: 16px;
    padding: 22px;
    margin-bottom: 25px;
    box-shadow: 0 3px 12px #dce5f1;
}

.criar h2 {
    color: #174b87;
    margin-bottom: 15px;
}

.criar textarea,
.redacao-area textarea {
    width: 100%;
    min-height: 100px;
    resize: vertical;
    padding: 15px;
    border: 1px solid #d8e1ed;
    border-radius: 12px;
    outline: none;
    font-family: inherit;
    font-size: 14px;
}

.criar textarea:focus,
.redacao-area textarea:focus {
    border-color: #3986cb;
}

.controles {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 12px;
}

.controles select {
    flex: 1;
    min-width: 0;
    padding: 12px;
    border: 1px solid #d8e1ed;
    border-radius: 10px;
    background: white;
    color: #365477;
}

button {
    cursor: pointer;
    border: none;
    transition: 0.2s;
}

.controles button {
    background: #174b87;
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    font-weight: bold;
}

.controles button:hover {
    background: #2868ae;
    transform: translateY(-2px);
}

/* FEED */

.feed-titulo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px 0 15px;
    gap: 10px;
}

.feed-titulo h2 {
    color: #174b87;
}

.feed-titulo span {
    color: #8191a8;
    font-size: 12px;
}

.post-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
}

.mini-avatar {
    background: #e5efff;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 23px;
}

.categoria {
    display: inline-block;
    background: #e5efff;
    color: #174b87;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: bold;
    margin-bottom: 12px;
}

.redacao {
    background: #fff0ce;
    color: #966400;
}

.humanas {
    background: #e7f6eb;
    color: #287344;
}

.natureza {
    background: #e3f6f2;
    color: #167c69;
}

.legenda {
    white-space: pre-line;
    line-height: 1.8;
    color: #40536b;
    margin: 5px 0 18px;
}

/* AÇÕES */

.acoes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    border-top: 1px solid #edf0f5;
    padding-top: 14px;
}

.acoes button {
    background: transparent;
    color: #536b88;
    padding: 8px;
    border-radius: 8px;
    font-weight: bold;
}

.acoes button:hover {
    background: #edf4ff;
    color: #174b87;
}

.acoes .curtido {
    color: #e63955;
}

/* COMENTÁRIOS */

.comentarios {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 15px;
}

.comentarios input {
    flex: 1;
    min-width: 130px;
    padding: 10px;
    border: 1px solid #dce5f1;
    border-radius: 20px;
    outline: none;
}

.comentarios button {
    background: #174b87;
    color: white;
    padding: 9px 15px;
    border-radius: 20px;
}

.lista-comentarios {
    width: 100%;
}

.comentario-item {
    background: #f1f5fb;
    padding: 10px;
    border-radius: 10px;
    margin-top: 8px;
    font-size: 13px;
    overflow-wrap: anywhere;
}

/* COLUNA DIREITA */

.direita {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.painel h3 {
    color: #174b87;
    margin-bottom: 18px;
}

.sugestao {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
}

.sugestao > span {
    font-size: 22px;
}

.sugestao div {
    flex: 1;
    min-width: 0;
}

.sugestao strong {
    font-size: 12px;
}

.sugestao button {
    background: #e5efff;
    color: #174b87;
    padding: 7px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: bold;
}

.materias a {
    display: block;
    text-decoration: none;
    color: #536b88;
    padding: 10px 0;
    border-bottom: 1px solid #edf0f5;
    font-size: 14px;
}

.materias a:hover {
    color: #174b87;
}

.dica {
    background: #fff5d9;
}

.dica h3 {
    color: #966400;
}

.dica p {
    line-height: 1.6;
    color: #715a27;
}

/* REDAÇÃO */

.redacao-area {
    max-width: 900px;
    margin: 20px auto;
    padding: 30px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 3px 12px #dce5f1;
}

.redacao-area h2 {
    color: #174b87;
    margin-bottom: 10px;
}

.redacao-area p {
    color: #8191a8;
    margin-bottom: 20px;
}

.redacao-area textarea {
    min-height: 250px;
    line-height: 1.7;
}

.contador {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    color: #536b88;
    font-size: 13px;
}

.contador button {
    background: #e5efff;
    color: #174b87;
    padding: 9px 14px;
    border-radius: 8px;
    font-weight: bold;
}

/* PESQUISA */

.sem-resultados {
    text-align: center;
    padding: 25px;
    color: #8191a8;
}

/* RODAPÉ */

footer {
    background: #174b87;
    color: white;
    text-align: center;
    padding: 30px;
    margin-top: 40px;
    line-height: 2;
}

/* RESPONSIVIDADE */

@media (max-width: 1050px) {
    .container {
        grid-template-columns: 190px minmax(0, 1fr);
    }

    .direita {
        grid-column: 2;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 700px) {
    .topo {
        justify-content: center;
        text-align: center;
    }

    .topo input {
        width: 100%;
        order: 3;
    }

    .container {
        display: flex;
        flex-direction: column;
        padding: 15px;
    }

    .sidebar,
    .principal,
    .direita {
        width: 100%;
    }

    .sidebar {
        position: static;
    }

    .sidebar nav {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    .sidebar nav a {
        font-size: 13px;
        padding: 9px;
    }

    .direita {
        display: flex;
    }

    .boas-vindas h2 {
        font-size: 21px;
    }

    .controles {
        flex-direction: column;
    }

    .redacao-area {
        margin: 15px;
        padding: 20px;
    }
}
