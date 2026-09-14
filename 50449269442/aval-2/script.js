// =========================================
// PROJETO - PERFIL DE RAIMUNDA NETA
// =========================================

// Boas-vindas
window.onload = function () {

    alert("Seja bem-vindo(a) ao perfil de Raimunda Neta!");

    saudacao();
    mostrarDataHora();
    contadorVisitas();

};

// =========================================
// SAUDAÇÃO
// =========================================

function saudacao(){

    let hora = new Date().getHours();

    if(hora < 12){
        console.log("Bom dia, Raimunda Neta!");
    }
    else if(hora < 18){
        console.log("Boa tarde, Raimunda Neta!");
    }
    else{
        console.log("Boa noite, Raimunda Neta!");
    }

}

// =========================================
// DATA E HORA
// =========================================

function mostrarDataHora(){

    const agora = new Date();

    const data = agora.toLocaleDateString("pt-BR");
    const hora = agora.toLocaleTimeString("pt-BR");

    const local = document.getElementById("dataHora");

    if(local){
        local.innerHTML =
        "📅 Data: " + data + " | ⏰ Hora: " + hora;
    }

}

// Atualiza o relógio a cada segundo
setInterval(mostrarDataHora,1000);

// =========================================
// CLIQUE NOS INTERESSES
// =========================================

const interesses = document.querySelectorAll("ul li");

interesses.forEach(function(item){

    item.style.cursor="pointer";

    item.addEventListener("click",function(){

        alert("Você selecionou: " + this.innerText);

    });

});

// =========================================
// EFEITO NAS IMAGENS
// =========================================

const imagens = document.querySelectorAll(".galeria img");

imagens.forEach(function(img){

    img.style.cursor="pointer";

    img.addEventListener("click",function(){

        this.style.transform="scale(1.15)";
        this.style.transition=".4s";

        setTimeout(()=>{

            this.style.transform="scale(1)";

        },500);

    });

});

// =========================================
// EMAIL
// =========================================

const email = document.querySelector("a");

if(email){

email.addEventListener("click",function(){

alert("Abrindo o e-mail de Raimunda Neta.");

});

}

// =========================================
// CONTADOR DE VISITAS
// =========================================

function contadorVisitas(){

    let visitas = sessionStorage.getItem("visitas");

    if(visitas == null){
        visitas = 1;
    }else{
        visitas = parseInt(visitas) + 1;
    }

    sessionStorage.setItem("visitas", visitas);

    const contador = document.getElementById("contador");

    if(contador){
        contador.innerHTML = "👥 Visitas nesta sessão: " + visitas;
    }

}

// =========================================
// BOTÃO VOLTAR AO TOPO
// =========================================

const botao = document.createElement("button");

botao.innerHTML = "⬆ Topo";

botao.style.position="fixed";
botao.style.bottom="20px";
botao.style.right="20px";
botao.style.padding="12px 18px";
botao.style.background="#6a0dad";
botao.style.color="white";
botao.style.border="none";
botao.style.borderRadius="8px";
botao.style.cursor="pointer";
botao.style.fontWeight="bold";

document.body.appendChild(botao);

botao.onclick = function(){

window.scrollTo({

top:0,
behavior:"smooth"

});

};

// =========================================
// MENSAGEM AO SAIR DA PÁGINA
// =========================================

window.addEventListener("beforeunload",function(){

console.log("Obrigado por visitar o perfil de Raimunda Neta!");

});