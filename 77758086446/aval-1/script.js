
body {
    font-family: Arial, sans-serif;
        margin: 0;
            background-color: #f0f4ff;
                color: #222;
                }

                /* Cabeçalho */
                header {
                    background-color: #4936a5;
                        color: white;
                            text-align: center;
                                padding: 30px;
                                }

                                nav {

                                            nav a {
                                                color: white;
                                                    text-decoration: none;
                                                        margin: 15px;
                                                        }

                                                        nav a:hover {
                                                            color: #c9c0ff;
                                                                text-decoration: underline;
                                                                }

                                                                /* Conteúdo principal */
                                                                main {
                                                                    max-width: 850px;
                                                                        margin: 25px auto;
                                                                            padding: 20px;
                                                                            }

                                                                            /* Seções */
                                                                            section {
                                                                                background-color: white;
                                                                                    padding: 20px;
                                                                                        margin-bottom: 20px;
                                                                                            border-radius: 10px;
                                                                                                box-shadow: 0 2px 8px #cccccc;
                                                                                                }

                                                                                                /* Títulos */
                                                                                 
                                                                                 /* Mensagem de boas-vindas */
                                                                                 window.addEventListener("load", function () {
                                                                                     alert("Bem-vindo ao site de Introdução à Web e Internet!");
                                                                                     });
                                                                                     
                                                                                     /* Destacar o menu ao clicar */
                                                                                     const links = document.querySelectorAll("nav a");
                                                                                     
                                                                                     links.forEach(function (link) {
                                                                                         link.addEventListener("click", function () {
                                                                                                 links.forEach(function (item) {
                                                                                                             item.style.fontWeight = "normal";
                                                                                                                     });
                                                                                                                     
                                                                                                                                                                                                                                 border: none;
                                                                                                                                                                 border-radius: 8px;
                                                                                                                                                                     cursor: pointer;
                                                                                                                                                                     `;
                                                                                                                                                                     
                                                                                                                                                                     document.body.appendChild(botao);
                                                                                                                                                                     
                                                                                                                                                                     botao.addEventListener("click", function () {
                                                                                                                                                                         window.scrollTo({
                                                                                                                                                                                 top: 0,
                                                                                                                                                                                         behavior: "smooth"
                                                                                                                                                                                             });
                                                                                                                                                                                             });
                                                                                                                                                                                             
                                                                                                                                                                                             /* Mensagem na conclusão */
                                                                                                                                                                                             const conclusao = document.querySelector("main section:last-child");
                                                                                                                                                                                             
                                                                                                                                                                                             if (conclusao) {
                                                                            