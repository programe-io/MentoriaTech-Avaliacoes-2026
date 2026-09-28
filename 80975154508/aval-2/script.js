```javascript
// ================================
// VARIÁVEIS
// ================================

const messageInput =
    document.getElementById("messageInput");

const messages =
    document.getElementById("messages");

const chatName =
    document.getElementById("chatName");

const chatStatus =
    document.getElementById("chatStatus");


// ================================
// ENVIAR MENSAGEM
// ================================

function enviarMensagem() {

    const texto =
        messageInput.value.trim();


    // Não enviar mensagem vazia
    if (texto === "") {
        return;
    }


    // Criar mensagem
    const message =
        document.createElement("div");

    message.className =
        "message sent";


    // Pegar horário atual
    const agora =
        new Date();


    const horas =
        String(agora.getHours()).padStart(2, "0");


    const minutos =
        String(agora.getMinutes()).padStart(2, "0");


    const horario =
        `${horas}:${minutos}`;


    message.innerHTML = `

        <div class="bubble">

            ${texto}

            <span>
                ${horario}
            </span>

        </div>

    `;


    // Adicionar mensagem
    messages.appendChild(message);


    // Limpar input
    messageInput.value = "";


    // Rolar para o final
    messages.scrollTop =
        messages.scrollHeight;


    // Simular resposta
    respostaAutomatica();
}



// ================================
// ENTER PARA ENVIAR
// ================================

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            enviarMensagem();

        }

    }
);



// ================================
// RESPOSTA AUTOMÁTICA
// ================================

function respostaAutomatica() {

    setTimeout(function() {

        const respostas = [

            "Legal! 😄",

            "Entendi!",

            "Haha, verdade 😂",

            "Que interessante!",

            "Também acho! 👍",

            "Vamos conversar sobre isso!",

            "Boa ideia! 🎵"

        ];


        const resposta =
            respostas[
                Math.floor(
                    Math.random() *
                    respostas.length
                )
            ];


        const message =
            document.createElement("div");


        message.className =
            "message received";


        const agora =
            new Date();


        const horas =
            String(agora.getHours()).padStart(2, "0");


        const minutos =
            String(agora.getMinutes()).padStart(2, "0");


        message.innerHTML = `

            <div class="bubble">

                ${resposta}

                <span>
                    ${horas}:${minutos}
                </span>

            </div>

        `;


        messages.appendChild(message);


        messages.scrollTop =
            messages.scrollHeight;


    }, 1000);

}



// ================================
// ABRIR CONVERSA
// ================================

function abrirConversa(nome) {

    chatName.innerText =
        nome;


    chatStatus.innerText =
        "🟢 Online";


    // Remover seleção
    document
        .querySelectorAll(".contact")
        .forEach(function(contact) {

            contact.classList.remove("active");

        });


    // Encontrar contato
    document
        .querySelectorAll(".contact")
        .forEach(function(contact) {

            if (
                contact.dataset.name === nome
            ) {

                contact.classList.add("active");

            }

        });

}



// ================================
// PESQUISAR CONTATOS
// ================================

const searchContact =
    document.getElementById(
        "searchContact"
    );


searchContact.addEventListener(
    "input",
    function() {

        const texto =
            searchContact.value
                .toLowerCase();


        const contatos =
            document.querySelectorAll(
                ".contact"
            );


        contatos.forEach(
            function(contato) {

                const nome =
                    contato.dataset.name
                        .toLowerCase();


                if (
                    nome.includes(texto)
                ) {

                    contato.style.display =
                        "flex";

                } else {

                    contato.style.display =
                        "none";

                }

            }
        );

    }
);



// ================================
// EMOJI
// ================================

function adicionarEmoji() {

    messageInput.value += " 😊";

    messageInput.focus();

}



// ================================
// NOVA CONVERSA
// ================================

function novaConversa() {

    const nome =
        prompt(
            "Digite o nome do novo contato:"
        );


    if (
        nome === null ||
        nome.trim() === ""
    ) {
        return;
    }


    alert(
        "Conversa com " +
        nome +
        " criada! 💬"
    );

}
```
