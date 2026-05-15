/* =========================================================
   JAVASCRIPT COMPLETO PROFISSIONAL
   DOM + EVENTOS + API + FORM + DARK MODE + ANIMAÇÕES
========================================================= */

"use strict";

/* =========================================================
   SELETORES
========================================================= */

const body = document.body;

const botaoModo =
document.getElementById("modoEscuro");

const botaoTopo =
document.getElementById("btnTopo");

const formulario =
document.getElementById("formulario");

const relogio =
document.getElementById("relogio");

/* =========================================================
   MODO ESCURO
========================================================= */

function ativarModoEscuro(){

    body.classList.toggle("dark-mode");

    if(
        body.classList.contains("dark-mode")
    ){

        localStorage.setItem(
            "tema",
            "escuro"
        );

    }else{

        localStorage.setItem(
            "tema",
            "claro"
        );

    }

}

/* =========================
   CARREGAR TEMA SALVO
========================= */

window.addEventListener("load",()=>{

    const temaSalvo =
    localStorage.getItem("tema");

    if(temaSalvo === "escuro"){

        body.classList.add("dark-mode");

    }

});

/* =========================
   EVENTO BOTÃO
========================= */

if(botaoModo){

    botaoModo.addEventListener(
        "click",
        ativarModoEscuro
    );

}

/* =========================================================
   RELÓGIO DIGITAL
========================================================= */

function atualizarRelogio(){

    if(!relogio) return;

    const agora = new Date();

    let horas =
    agora.getHours();

    let minutos =
    agora.getMinutes();

    let segundos =
    agora.getSeconds();

    horas =
    horas < 10 ?
    "0" + horas :
    horas;

    minutos =
    minutos < 10 ?
    "0" + minutos :
    minutos;

    segundos =
    segundos < 10 ?
    "0" + segundos :
    segundos;

    relogio.innerHTML =
    `${horas}:${minutos}:${segundos}`;

}

setInterval(
    atualizarRelogio,
    1000
);

/* =========================================================
   MUDAR COR
========================================================= */

function mudarCor(){

    const cores = [

        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
        "#ffa500",
        "#6f42c1",
        "#20c997"

    ];

    const corAleatoria =

    cores[
        Math.floor(
            Math.random() *
            cores.length
        )
    ];

    body.style.background =
    corAleatoria;

}

/* =========================================================
   VALIDAÇÃO FORMULÁRIO
========================================================= */

if(formulario){

    formulario.addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            const nome =
            document.getElementById("nome");

            const email =
            document.getElementById("email");

            if(
                nome.value.trim() === ""
            ){

                alert(
                    "Digite seu nome!"
                );

                nome.focus();

                return;

            }

            if(
                email.value.trim() === ""
            ){

                alert(
                    "Digite seu e-mail!"
                );

                email.focus();

                return;

            }

            alert(
                "Formulário enviado!"
            );

            formulario.reset();

        }
    );

}

/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

window.addEventListener(
    "scroll",
    ()=>{

        if(!botaoTopo) return;

        if(
            window.scrollY > 300
        ){

            botaoTopo.style.display =
            "block";

        }else{

            botaoTopo.style.display =
            "none";

        }

    }
);

if(botaoTopo){

    botaoTopo.addEventListener(
        "click",
        ()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );

}

/* =========================================================
   MENU MOBILE
========================================================= */

const menuBtn =
document.getElementById("menuBtn");

const menu =
document.getElementById("menu");

if(menuBtn){

    menuBtn.addEventListener(
        "click",
        ()=>{

            menu.classList.toggle(
                "ativo"
            );

        }
    );

}

/* =========================================================
   SLIDER AUTOMÁTICO
========================================================= */

let slideIndex = 0;

const slides =
document.querySelectorAll(".slide");

function mostrarSlides(){

    slides.forEach(slide=>{

        slide.style.display =
        "none";

    });

    slideIndex++;

    if(
        slideIndex > slides.length
    ){

        slideIndex = 1;

    }

    if(slides.length > 0){

        slides[
            slideIndex - 1
        ].style.display = "block";

    }

    setTimeout(
        mostrarSlides,
        3000
    );

}

mostrarSlides();

/* =========================================================
   ANIMAÇÃO AO ROLAR
========================================================= */

const elementos =
document.querySelectorAll(".animar");

function animarScroll(){

    const topoTela =
    window.innerHeight * 0.85;

    elementos.forEach(elemento=>{

        const posicao =

        elemento.getBoundingClientRect()
        .top;

        if(posicao < topoTela){

            elemento.classList.add(
                "mostrar"
            );

        }

    });

}

window.addEventListener(
    "scroll",
    animarScroll
);

/* =========================================================
   CONSUMO API
========================================================= */

async function carregarUsuarios(){

    try{

        const resposta =

        await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios =
        await resposta.json();

        console.log(
            "Usuários:",
            usuarios
        );

    }catch(erro){

        console.error(
            "Erro API:",
            erro
        );

    }

}

carregarUsuarios();

/* =========================================================
   CALCULADORA
========================================================= */

function calcular(){

    const n1 =
    parseFloat(
        document.getElementById("n1").value
    );

    const n2 =
    parseFloat(
        document.getElementById("n2").value
    );

    const resultado =
    document.getElementById("resultado");

    if(isNaN(n1) || isNaN(n2)){

        resultado.innerHTML =
        "Digite números válidos";

        return;

    }

    resultado.innerHTML =
    `Resultado: ${n1 + n2}`;

}

/* =========================================================
   DATA ATUAL
========================================================= */

function mostrarData(){

    const data =
    new Date();

    console.log(

        data.toLocaleDateString(
            "pt-BR"
        )

    );

}

mostrarData();

/* =========================================================
   ARRAY + LOOP
========================================================= */

const frutas = [

    "Maçã",
    "Banana",
    "Laranja",
    "Uva"

];

frutas.forEach(fruta=>{

    console.log(fruta);

});

/* =========================================================
   OBJETOS
========================================================= */

const usuario = {

    nome:"Carlos",

    idade:25,

    cidade:"São Paulo"

};

console.log(
    usuario.nome
);

/* =========================================================
   TEMPORIZADOR
========================================================= */

let segundos = 10;

const timer =
setInterval(()=>{

    console.log(
        segundos
    );

    segundos--;

    if(segundos < 0){

        clearInterval(timer);

        console.log(
            "Tempo encerrado!"
        );

    }

},1000);

/* =========================================================
   MENSAGEM FINAL
========================================================= */

console.log(
    "JavaScript carregado com sucesso!"
);

/* =========================================================
   FIM DO JAVASCRIPT
========================================================= */