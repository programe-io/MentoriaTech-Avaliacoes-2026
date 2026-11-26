
/* CONFIGURAÇÕES GERAIS */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #fafafa;
    color: #262626;
}

button {
    border: none;
    background: none;
    cursor: pointer;
}


/* CABEÇALHO */

.header {
    height: 60px;
    background: white;
    border-bottom: 1px solid #dbdbdb;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 20px;

    position: sticky;
    top: 0;
    z-index: 50;
}

.logo h1 {
    font-family: cursive;
    font-size: 26px;
}

.menu-mobile {
    font-size: 28px;
}

.desktop-menu {
    display: none;
}


/* STORIES */

.container {
    width: 100%;
    margin: auto;
    padding-bottom: 70px;
}

.feed {
    width: 100%;
}

.stories {
    display: flex;
    gap: 15px;
    padding: 20px 15px;

    overflow-x: auto;
    background: white;
    border-bottom: 1px solid #eee;
}

.story {
    min-width: 65px;
    text-align: center;
}

.story img {
    width: 60px;
    height: 60px;
    border-radius: 50%;

    padding: 3px;
    border: 2px solid #e1306c;

    object-fit: cover;
}

.story span {
    display: block;
    font-size: 11px;
    margin-top: 5px;
}


/* POSTAGENS */

.post {
    background: white;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 12px;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user-info img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
}

.username {
    font-size: 14px;
    font-weight: 600;
}

.location {
    font-size: 12px;
    color: #777;
    margin-top: 3px;
}

.options {
    font-size: 25px;
}


/* IMAGEM DA POSTAGEM */

.post-image {
    width: 100%;
    background: #eee;
}

.post-image img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: cover;
}


/* CONTEÚDO DA POSTAGEM */

.post-content {
    padding: 12px;
}

.interaction {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.interaction button {
    font-size: 26px;
    margin-right: 12px;
}

.interaction button:hover {
    color: #777;
}

.interaction-left {
    display: flex;
    align-items: center;
}

.likes {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
}

.description {
    font-size: 14px;
    line-height: 1.5;
}

.description strong {
    margin-right: 5px;
}

.description span {
    color: #555;
}

.comments {
    color: #888;
    font-size: 13px;
    margin-top: 8px;
}

.time {
    font-size: 10px;
    color: #999;
    margin-top: 10px;
    text-transform: uppercase;
}


/* MENU INFERIOR MOBILE */

.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    height: 55px;
    background: white;

    border-top: 1px solid #ddd;

    display: flex;
    align-items: center;
    justify-content: space-around;

    z-index: 50;
}

.bottom-nav button {
    font-size: 26px;
}


/* BARRA LATERAL */

.sidebar {
    display: none;
}


/* RESPONSIVIDADE DESKTOP */

@media (min-width: 768px) {

    /* CABEÇALHO */

    .header {
        height: 65px;
        padding: 0 30px;
    }

    .menu-mobile {
        display: none;
    }

    .desktop-menu {
        display: flex;
        align-items: center;
        gap: 40px;
    }

    .desktop-menu input {
        width: 250px;
        height: 36px;

        background: #efefef;
        border: none;
        border-radius: 8px;

        padding: 0 15px;
        font-size: 14px;
        outline: none;
    }

    .header-icons {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .header-icons button {
        font-size: 25px;
    }

    .profile-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;

        background: linear-gradient(
            45deg,
            #feda75,
            #fa7e1e,
            #d62976,
            #962fbf
        );
    }


    /* CONTEÚDO PRINCIPAL */

    .container {
        max-width: 1100px;
        margin: auto;

        display: flex;
        justify-content: center;
        gap: 35px;

        padding: 30px 20px;
    }

    .feed {
        width: 500px;
        flex-shrink: 0;
    }


    /* STORIES */

    .stories {
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 20px;
        gap: 20px;
    }

    .story img {
        width: 70px;
        height: 70px;
    }


    /* POSTAGENS */

    .post {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 25px;
    }

    .post-image img {
        max-height: 550px;
    }


    /* ESCONDER MENU MOBILE */

    .bottom-nav {
        display: none;
    }


    /* SIDEBAR */

    .sidebar {
        display: block;
        width: 300px;
        flex-shrink: 0;
    }

    .profile {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 30px;
    }

    .profile img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        object-fit: cover;
    }

    .profile-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
        flex: 1;
        font-size: 13px;
    }

    .profile-info span {
        color: #888;
    }

    .profile button {
        color: #0095f6;
        font-size: 12px;
        font-weight: bold;
    }


    /* SUGESTÕES */

    .suggestions-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        font-size: 13px;
        color: #888;
    }

    .suggestions-header strong {
        color: #262626;
        cursor: pointer;
    }

    .suggestion {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
    }

    .suggestion img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
    }

    .suggestion div {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        font-size: 12px;
    }

    .suggestion div span {
        color: #999;
        font-size: 11px;
    }

    .suggestion button {
        color: #0095f6;
        font-size: 12px;
        font-weight: bold;
    }


    /* RODAPÉ SIDEBAR */

    .sidebar-footer {
        margin-top: 35px;
        color: #bbb;
        font-size: 11px;
        line-height: 1.7;
    }

    .sidebar-footer p:last-child {
        margin-top: 15px;
    }

}


/* TELAS GRANDES */

@media (min-width: 1200px) {

    .container {
        max-width: 1150px;
        gap: 60px;
    }

    .feed {
        width: 500px;
    }

    .sidebar {
        width: 320px;
    }

}
