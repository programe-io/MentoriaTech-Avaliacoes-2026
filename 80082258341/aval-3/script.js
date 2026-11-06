// Banco de Dados com as informações originais mapeadas para cada publicação
const postsData = {
    1: {
        title: "1. Introdução à Redes",
        bgClass: "card-purple",
        caption: "A internet e a web estão tão presentes no cotidiano que muitas vezes utilizamos essas tecnologias sem realmente compreender como elas funcionam. Todos os dias acessamos sites, assistimos vídeos e trocamos informações online.<br><br>No entanto, por trás dessas atividades existe uma infraestrutura tecnológica complexa que conecta bilhões de dispositivos em todo o mundo. 🦋"
    },
    2: {
        title: "2. O Sistema Global",
        bgClass: "card-lavender",
        caption: "A internet pode ser definida como um sistema global de redes de computadores interligadas. Essas redes se comunicam utilizando um conjunto padronizado de regras chamado protocolos de comunicação.<br><br>Esses protocolos permitem que dispositivos diferentes — computadores, celulares e servidores — consigam trocar informações entre si. 🔮"
    },
    3: {
        title: "3. Anos 60 & ARPANET",
        bgClass: "card-dark",
        caption: "A origem da internet remonta à década de 1960, durante a Guerra Fria. Nesse contexto surgiu a ARPANET, um projeto desenvolvido pelo Departamento de Defesa dos EUA.<br><br>O objetivo era criar uma rede descentralizada para comunicação resiliente entre universidades e centros de pesquisa. ⚡"
    },
    4: {
        title: "4. O Lado Físico da Rede",
        bgClass: "card-purple",
        caption: "Embora muitas pessoas imaginem a internet como algo “virtual”, ela depende de uma enorme infraestrutura física. Essa arquitetura inclui data centers, servidores, roteadores, equipamentos de rede e satélites. Quando você acessa um site, seus dados viajam por caminhos físicos reais! 🌐"
    },
    5: {
        title: "5. Os Cabos Submarinos",
        bgClass: "card-dark",
        caption: "Grande parte da comunicação global ocorre por meio de cabos submarinos de fibra óptica. Esses cabos gigantes atravessam oceanos inteiros conectando continentes.<br><br>Eles transmitem a maior parte do tráfego internacional porque oferecem velocidade muito maior e menor latência do que conexões por satélite! 🌊"
    },
    6: {
        title: "6. O que é a Web?",
        bgClass: "card-lavender",
        caption: "A World Wide Web (Web) é um sistema que funciona SOBRE a internet. Ela consiste em um conjunto de documentos interligados por meio de hiperlinks. Esses arquivos incluem mídias como textos, imagens, vídeos, sons e animações organizados em sites. 💻"
    },
    7: {
        title: "7. Cliente x Servidor",
        bgClass: "card-purple",
        caption: "A Web funciona em uma arquitetura chamada cliente-servidor.<br><br>O Cliente é o dispositivo usado para o acesso (como o seu navegador Chrome ou Safari). O Servidor é o computador que armazena os sites. O cliente faz uma requisição HTTP, o servidor processa e envia os dados de volta! 📡"
    },
    8: {
        title: "8. Tim Berners-Lee",
        bgClass: "card-lavender",
        caption: "O cientista da computação Tim Berners-Lee criou a World Wide Web no final da década de 1980 no CERN. Ele desenvolveu as três chaves do ecossistema:<br><br>🎨 HTML (linguagem de marcação)<br>🌐 HTTP (protocolo de comunicação)<br>📍 URL (sistema de endereçamento)"
    },
    9: {
        title: "9. Internet vs Web",
        bgClass: "card-dark",
        caption: "Um erro super comum é achar que são a mesma coisa!<br><br>➡️ INTERNET = A infraestrutura de rede global que conecta os computadores pelo mundo.<br>➡️ WEB = Um dos serviços que rodam sobre essa infraestrutura (o ecossistema de páginas).<br><br>Outros serviços na internet incluem e-mail, streaming e jogos online! 🧩"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const gridItems = document.querySelectorAll(".grid-item");
    const modal = document.getElementById("postModal");
    const closeModal = document.querySelector(".close-modal");
    const modalGraphic = document.getElementById("modalGraphic");
    const modalCaption = document.getElementById("modalCaption");

    // Lógica para abrir o modal ao clicar em uma foto da grade
    gridItems.forEach(item => {
        item.addEventListener("click", () => {
            const postId = item.getAttribute("data-id");
            const data = postsData[postId];

            if (data) {
                // Configura o visual do lado esquerdo do modal
                modalGraphic.innerHTML = `<h3>${data.title}</h3>`;
                modalGraphic.className = `modal-graphic ${data.bgClass}`;
                
                // Configura a legenda do lado direito do modal
                modalCaption.innerHTML = data.caption;
                
                // Exibe o modal na tela
                modal.style.display = "flex";
            }
        });
    });

    // Fecha o modal ao clicar no 'X'
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fecha o modal se o usuário clicar fora do conteúdo principal
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
