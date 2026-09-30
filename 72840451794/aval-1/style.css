/* =========================================
   RESET
========================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family:
        "Segoe UI",
        Arial,
        sans-serif;

    background: #0d0d0d;
    color: #eeeeee;

    line-height: 1.6;
}

a {
    color: inherit;
    text-decoration: none;
}

button,
input,
select {
    font: inherit;
}


/* =========================================
   VARIÁVEIS
========================================= */

:root {

    --black: #080808;
    --dark: #101010;
    --dark-2: #171717;

    --red: #a61919;
    --red-light: #d32929;

    --gold: #c7a86b;
    --white: #f2f2f2;
    --gray: #9b9b9b;

    --border: rgba(255,255,255,.1);

    --container: 1180px;
}


/* =========================================
   GERAL
========================================= */

.container {
    width: min(
        calc(100% - 40px),
        var(--container)
    );

    margin: auto;
}

.section {
    padding: 110px 0;
}

.section-heading {
    display: flex;
    gap: 25px;
    align-items: flex-start;

    margin-bottom: 60px;
}

.section-number {
    color: var(--red-light);

    font-size: 14px;
    font-weight: 700;

    letter-spacing: 2px;
}

.section-label {
    color: var(--gold);

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 3px;

    margin-bottom: 8px;
}

.section-heading h2 {
    font-size: clamp(36px, 5vw, 58px);

    font-weight: 300;

    line-height: 1;
}


/* =========================================
   HEADER
========================================= */

.header {
    position: fixed;

    top: 0;
    left: 0;

    width: 100%;

    z-index: 1000;

    background:
        rgba(8,8,8,.88);

    backdrop-filter: blur(10px);

    border-bottom:
        1px solid var(--border);
}

.nav-container {
    min-height: 78px;

    display: flex;

    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: 17px;

    font-weight: 700;

    letter-spacing: 3px;
}

.logo span {
    color: var(--red-light);
}

.nav {
    display: flex;

    gap: 32px;
}

.nav a {
    color: #bbb;

    font-size: 13px;

    letter-spacing: 1px;

    transition:
        color .25s ease;
}

.nav a:hover {
    color: white;
}

.menu-toggle {
    display: none;

    background: none;

    border: 0;

    color: white;

    font-size: 28px;

    cursor: pointer;
}


/* =========================================
   HERO
========================================= */

.hero {
    position: relative;

    min-height: 100vh;

    display: flex;

    align-items: center;

    overflow: hidden;

    background:
        radial-gradient(
            circle at 75% 50%,
            rgba(166,25,25,.22),
            transparent 35%
        ),

        linear-gradient(
            110deg,
            #080808 30%,
            #171010 100%
        );
}

.hero::after {
    content: "";

    position: absolute;

    width: 500px;
    height: 500px;

    right: 8%;
    top: 20%;

    border-radius: 50%;

    border:
        1px solid rgba(199,168,107,.15);

    box-shadow:
        0 0 100px rgba(166,25,25,.12);

    opacity: .7;
}

.hero-overlay {
    position: absolute;

    inset: 0;

    background:
        linear-gradient(
            90deg,
            #080808 20%,
            transparent 80%
        );
}

.hero-content {
    position: relative;

    z-index: 2;

    max-width: 720px;
}

.hero-subtitle {
    color: var(--gold);

    font-size: 12px;

    font-weight: 700;

    letter-spacing: 4px;

    margin-bottom: 25px;
}

.hero h1 {
    font-size: clamp(70px, 12vw, 150px);

    line-height: .78;

    font-weight: 200;

    letter-spacing: -5px;
}

.hero h1 strong {
    color: var(--red-light);

    font-weight: 800;
}

.hero-description {
    max-width: 570px;

    color: #aaa;

    margin-top: 40px;

    font-size: 17px;
}

.hero-buttons {
    display: flex;

    gap: 15px;

    margin-top: 35px;
}

.btn {
    padding: 14px 26px;

    border: 1px solid var(--border);

    font-size: 12px;

    font-weight: 700;

    letter-spacing: 1px;

    transition: .25s ease;
}

.btn-primary {
    background: var(--red);

    border-color: var(--red);
}

.btn-primary:hover {
    background: var(--red-light);
}

.btn-secondary:hover {
    background: rgba(255,255,255,.08);
}


/* =========================================
   SOBRE
========================================= */

.about {
    background: #101010;
}

.about-grid {
    display: grid;

    grid-template-columns:
        1.4fr .8fr;

    gap: 80px;

    align-items: center;
}

.about-text p {
    color: #aaa;

    margin-bottom: 22px;

    font-size: 16px;
}

.about-text .lead {
    color: #ddd;

    font-size: 21px;
}

.about-card {
    min-height: 350px;

    padding: 50px;

    display: flex;

    flex-direction: column;

    justify-content: center;

    background:
        linear-gradient(
            145deg,
            #1d1d1d,
            #111
        );

    border:
        1px solid var(--border);

    box-shadow:
        20px 20px 0 var(--red);
}

.card-icon {
    color: var(--red-light);

    font-size: 55px;

    margin-bottom: 20px;
}

.about-card h3 {
    font-size: 35px;

    line-height: 1.1;

    font-weight: 300;
}

.about-card p {
    color: var(--gold);

    margin-top: 25px;
}


/* =========================================
   PERSONAGENS
========================================= */

.characters {
    background: #0d0d0d;
}

.character-grid {
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 20px;
}

.character-card {
    background: #151515;

    border:
        1px solid var(--border);

    transition:
        transform .3s ease,
        border-color .3s ease;
}

.character-card:hover {
    transform: translateY(-8px);

    border-color:
        rgba(211,41,41,.5);
}

.character-image {
    height: 270px;

    display: flex;

    align-items: center;
    justify-content: center;

    font-size: 55px;

    font-weight: 800;

    position: relative;

    overflow: hidden;
}

.character-image::after {
    content: "";

    position: absolute;

    inset: 0;

    background:
        linear-gradient(
            transparent 30%,
            rgba(0,0,0,.8)
        );
}

.character-image span {
    position: relative;

    z-index: 2;

    color: rgba(255,255,255,.15);

    font-size: 90px;
}

.patrick {
    background:
        linear-gradient(
            135deg,
            #493c30,
            #111
        );
}

.lisbon {
    background:
        linear-gradient(
            135deg,
            #422f2f,
            #111
        );
}

.cho {
    background:
        linear-gradient(
            135deg,
            #26353b,
            #111
        );
}

.rigsby {
    background:
        linear-gradient(
            135deg,
            #3d3528,
            #111
        );
}

.character-info {
    padding: 25px;
}

.character-role {
    color: var(--gold);

    font-size: 10px;

    font-weight: 700;

    letter-spacing: 2px;
}

.character-info h3 {
    font-size: 25px;

    margin: 8px 0 12px;
}

.character-info p {
    color: #888;

    font-size: 13px;

    min-height: 75px;
}

.details-button {
    margin-top: 18px;

    border: 0;

    background: none;

    color: var(--red-light);

    cursor: pointer;

    font-size: 12px;

    font-weight: 700;
}


/* =========================================
   EPISÓDIOS
========================================= */

.episodes {
    background: #121212;
}

.episode-controls {
    display: flex;

    gap: 15px;

    margin-bottom: 30px;
}

.search-box {
    flex: 1;

    display: flex;

    align-items: center;

    gap: 10px;

    background: #1b1b1b;

    border:
        1px solid var(--border);

    padding: 0 18px;
}

.search-box span {
    color: var(--gold);

    font-size: 22px;
}

.search-box input {
    width: 100%;

    padding: 15px 0;

    border: 0;

    outline: 0;

    background: transparent;

    color: white;
}

#seasonFilter {
    min-width: 220px;

    padding: 0 15px;

    background: #1b1b1b;

    color: white;

    border:
        1px solid var(--border);

    outline: none;
}

.episode-list {
    border-top:
        1px solid var(--border);
}

.episode {
    display: grid;

    grid-template-columns:
        100px 1fr 40px;

    align-items: center;

    gap: 25px;

    padding: 25px 10px;

    border-bottom:
        1px solid var(--border);

    cursor: pointer;

    transition:
        background .25s ease;
}

.episode:hover {
    background: rgba(255,255,255,.04);
}

.episode-number {
    color: var(--red-light);

    font-size: 12px;

    font-weight: 700;
}

.episode-info h3 {
    font-size: 18px;

    margin-bottom: 4px;
}

.episode-info p {
    color: #777;

    font-size: 13px;
}

.episode-arrow {
    color: var(--gold);

    font-size: 20px;
}

.no-results {
    display: none;

    color: #777;

    padding: 30px 0;

    text-align: center;
}


/* =========================================
   FRASE
========================================= */

.quote-section {
    padding: 120px 0;

    background:
        linear-gradient(
            135deg,
            #280909,
            #100909
        );

    text-align: center;
}

.quote-content {
    max-width: 800px;

    margin: auto;
}

.quote-mark {
    color: var(--red-light);

    font-size: 80px;

    line-height: .5;
}

blockquote {
    font-size: clamp(28px, 5vw, 55px);

    line-height: 1.15;

    font-weight: 300;

    margin: 30px 0;
}

.quote-button {
    border:
        1px solid rgba(255,255,255,.25);

    background: transparent;

    color: white;

    padding: 12px 22px;

    cursor: pointer;

    transition: .25s;
}

.quote-button:hover {
    background: white;

    color: #111;
}


/* =========================================
   CURIOSIDADES
========================================= */

.curiosities {
    background: #0d0d0d;
}

.curiosity-grid {
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 1px;

    background: var(--border);
}

.curiosity {
    background: #111;

    padding: 35px;
}

.curiosity > span {
    color: var(--red-light);

    font-size: 12px;

    font-weight: 700;
}

.curiosity h3 {
    margin: 25px 0 12px;

    font-size: 22px;
}

.curiosity p {
    color: #777;

    font-size: 14px;
}


/* =========================================
   MODAL
========================================= */

.modal {
    position: fixed;

    inset: 0;

    z-index: 2000;

    display: none;

    align-items: center;
    justify-content: center;

    padding: 20px;
}

.modal.active {
    display: flex;
}

.modal-overlay {
    position: absolute;

    inset: 0;

    background: rgba(0,0,0,.85);

    backdrop-filter: blur(5px);
}

.modal-content {
    position: relative;

    z-index: 2;

    width: min(600px, 100%);

    padding: 50px;

    background: #171717;

    border:
        1px solid var(--border);

    box-shadow:
        0 20px 80px rgba(0,0,0,.6);

    animation:
        modalIn .3s ease;
}

@keyframes modalIn {

    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-close {
    position: absolute;

    top: 15px;
    right: 20px;

    background: none;

    border: 0;

    color: #aaa;

    font-size: 32px;

    cursor: pointer;
}

.modal-role {
    color: var(--gold);

    font-size: 11px;

    letter-spacing: 2px;

    font-weight: 700;
}

.modal-content h2 {
    font-size: 40px;

    margin: 10px 0 20px;
}

.modal-content p {
    color: #999;
}


/* =========================================
   FOOTER
========================================= */

.footer {
    background: #070707;

    border-top:
        1px solid var(--border);
}

.footer-content {
    display: flex;

    justify-content: space-between;

    gap: 50px;

    padding: 60px 0;
}

.footer-content p {
    color: #666;

    max-width: 400px;

    margin-top: 15px;

    font-size: 13px;
}

.footer-links {
    display: flex;

    gap: 25px;

    align-items: flex-start;
}

.footer-links a {
    color: #777;

    font-size: 12px;
}

.footer-links a:hover {
    color: white;
}

.copyright {
    padding: 20px;

    text-align: center;

    color: #555;

    border-top:
        1px solid var(--border);

    font-size: 11px;
}


/* =========================================
   RESPONSIVIDADE
========================================= */

@media (max-width: 900px) {

    .character-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .curiosity-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .about-grid {
        grid-template-columns: 1fr;

        gap: 50px;
    }

    .hero h1 {
        font-size: 90px;
    }
}


@media (max-width: 700px) {

    .nav {
        position: absolute;

        top: 78px;

        left: 0;

        width: 100%;

        display: none;

        flex-direction: column;

        gap: 0;

        background: #101010;

        border-bottom:
            1px solid var(--border);
    }

    .nav.active {
        display: flex;
    }

    .nav a {
        padding: 18px 20px;

        border-bottom:
            1px solid var(--border);
    }

    .menu-toggle {
        display: block;
    }

    .section {
        padding: 80px 0;
    }

    .hero h1 {
        font-size: 65px;

        letter-spacing: -3px;
    }

    .hero-description {
        font-size: 15px;
    }

    .hero-buttons {
        flex-direction: column;

        width: fit-content;
    }

    .character-grid {
        grid-template-columns: 1fr;
    }

    .curiosity-grid {
        grid-template-columns: 1fr;
    }

    .episode-controls {
        flex-direction: column;
    }

    #seasonFilter {
        min-height: 50px;
    }

    .episode {
        grid-template-columns:
            70px 1fr 20px;

        gap: 12px;
    }

    .episode-info h3 {
        font-size: 15px;
    }

    .episode-info p {
        font-size: 12px;
    }

    .footer-content {
        flex-direction: column;
    }

    .footer-links {
        flex-wrap: wrap;
    }

    .modal-content {
        padding: 35px 25px;
    }

    .modal-content h2 {
        font-size: 30px;
    }
}
