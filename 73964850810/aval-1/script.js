/* ========================= */
/* BARATIER SYSTEM */
/* SCRIPT.JS */
/* ========================= */


/* MENU MOBILE */

const menuBtn = document.getElementById("menu-btn");

const nav = document.getElementById("nav");


menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    });


    /* FECHAR MENU AO CLICAR */

    document.querySelectorAll("nav a")

    .forEach(link => {

        link.addEventListener("click", () => {

                nav.classList.remove("active");

                    });

                    });


                    /* BOTÃO HERO */

                    function scrollReserva(){

                        document.getElementById(

                                "cadastro"

                                    ).scrollIntoView({

                                            behavior:"smooth"

                                                });

                                                }


                                                /* COMPRAR PRODUTO */

                                                function comprar(prato){

                                                    alert(

                                                            "✅ Você escolheu: " +

                                                                    prato +

                                                                            "\n\nPedido adicionado."

                                                                                );

                                                                                }


                                                                                /* CADASTRO */

                                                                                const form =

                                                                                document.getElementById(

                                                                                "formCadastro"

                                                                                );


                                                                                const senha =

                                                                                document.getElementById(

                                                                                "senha"

                                                                                );


                                                                                const confirmar =

                                                                                document.getElementById(

                                                                                "confirmar"

                                                                                );


                                                                                const mensagem =

                                                                                document.getElementById(

                                                                                "mensagem"

                                                                                );


                                                                                form.addEventListener(

                                                                                "submit",

                                                                                function(event){

                                                                                event.preventDefault();


                                                                                if(

                                                                                senha.value !==

                                                                                confirmar.value

                                                                                ){

                                                                                mensagem.innerHTML =

                                                                                "As senhas não coincidem.";

                                                                                mensagem.style.color =

                                                                                "red";

                                                                                return;

                                                                                }


                                                                                mensagem.innerHTML =

                                                                                "Cadastro realizado com sucesso!";

                                                                                mensagem.style.color =

                                                                                "#16a34a";


                                                                                form.reset();

                                                                                }

                                                                                );


                                                                                /* CONTADOR DE ACESSOS */

                                                                                let acessos =

                                                                                localStorage.getItem(

                                                                                "acessos"

                                                                                );


                                                                                if(

                                                                                acessos == null

                                                                                ){

                                                                                acessos = 0;

                                                                                }


                                                                                acessos++;

                                                                                localStorage.setItem(

                                                                                "acessos",

                                                                                acessos

                                                                                );


                                                                                /* CAIXA FLUTUANTE */

                                                                                const contador =

                                                                                document.createElement(

                                                                                "div"

                                                                                );


                                                                                contador.innerHTML =

                                                                                "👁️ Acessos: " +

                                                                                acessos;


                                                                                contador.style.position =

                                                                                "fixed";

                                                                                contador.style.right =

                                                                                "20px";

                                                                                contador.style.bottom =

                                                                                "20px";

                                                                                contador.style.background =

                                                                                "#38bdf8";

                                                                                contador.style.padding =

                                                                                "14px 22px";

                                                                                contador.style.borderRadius =

                                                                                "12px";

                                                                                contador.style.color =

                                                                                "white";

                                                                                contador.style.fontWeight =

                                                                                "bold";

                                                                                contador.style.boxShadow =

                                                                                "0 0 20px rgba(0,0,0,.3)";

                                                                                contador.style.zIndex =

                                                                                "9999";


                                                                                document.body.appendChild(

                                                                                contador

                                                                                );


                                                                                /* ANIMAÇÕES */

                                                                                const elementos =

                                                                                document.querySelectorAll(

                                                                                ".card, .sobre, .box, .grid img"

                                                                                );


                                                                                function revelar(){

                                                                                const altura =

                                                                                window.innerHeight;


                                                                                elementos.forEach(

                                                                                item=>{

                                                                                const topo =

                                                                                item.getBoundingClientRect()

                                                                                .top;


                                                                                if(

                                                                                topo <

                                                                                altura - 120

                                                                                ){

                                                                                item.style.opacity =

                                                                                "1";

                                                                                item.style.transform =

                                                                                "translateY(0)";

                                                                                }

                                                                                }

                                                                                );

                                                                                }


                                                                                elementos.forEach(

                                                                                item=>{

                                                                                item.style.opacity =

                                                                                "0";

                                                                                item.style.transform =

                                                                                "translateY(40px)";

                                                                                item.style.transition =

                                                                                ".8s";

                                                                                }

                                                                                );


                                                                                window.addEventListener(

                                                                                "scroll",

                                                                                revelar

                                                                                );


                                                                                revelar();


                                                                                /* HEADER DINÂMICO */

                                                                                window.addEventListener(

                                                                                "scroll",

                                                                                ()=>{

                                                                                const header =

                                                                                document.querySelector(

                                                                                "header"

                                                                                );


                                                                                if(

                                                                                window.scrollY > 80

                                                                                ){

                                                                                header.style.background =

                                                                                "rgba(2,6,23,.98)";

                                                                                }

                                                                                else{

                                                                                header.style.background =

                                                                                "rgba(15,23,42,.95)";

                                                                                }

                                                                                }

                                                                                );


                                                                                /* FORM CONTATO */

                                                                                const contato =

                                                                                document.querySelector(

                                                                                ".contato form"

                                                                                );


                                                                                contato.addEventListener(

                                                                                "submit",

                                                                                function(e){

                                                                                e.preventDefault();

                                                                                alert(

                                                                                "Mensagem enviada com sucesso!"

                                                                                );

                                                                                contato.reset();

                                                                                }

                                                                                );


                                                                                /* TEMA ESCURO / CLARO */

                                                                                let temaEscuro = true;


                                                                                function alternarTema(){

                                                                                if(

                                                                                temaEscuro

                                                                                ){

                                                                                document.body.style.background =

                                                                                "#ffffff";

                                                                                document.body.style.color =

                                                                                "#111827";

                                                                                temaEscuro = false;

                                                                                }

                                                                                else{

                                                                                document.body.style.background =

                                                                                "#0f172a";

                                                                                document.body.style.color =

                                                                                "#ffffff";

                                                                                temaEscuro = true;

                                                                                }

                                                                                }


                                                                                /* BOAS-VINDAS */

                                                                                setTimeout(

                                                                                ()=>{

                                                                                console.log(

                                                                                "BARATIER SYSTEM carregado."

                                                                                );

                                                                                },

                                                                                1000

                                                                                );


                                                                                /* RELÓGIO */

                                                                                function atualizarHora(){

                                                                                const agora =

                                                                                new Date();


                                                                                const hora =

                                                                                agora.toLocaleTimeString();


                                                                                console.log(

                                                                                "Horário:",

                                                                                hora

                                                                                );

                                                                                }


                                                                                setInterval(

                                                                                atualizarHora,

                                                                                1000

                                                                                );