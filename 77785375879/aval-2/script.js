let currentUser =
localStorage.getItem("travelUser") || "";

let notifications =
JSON.parse(
    localStorage.getItem("travelNotifications")
) || [];


/* =====================================================
   TEMA CLARO / ESCURO
===================================================== */

function loadTheme(){

    const savedTheme =
        localStorage.getItem("travelTheme");

    const button =
        document.getElementById("themeButton");


    if(savedTheme === "dark"){

        document.body.classList.add("dark-theme");

        button.textContent="☀️";

        button.title="Ativar tema claro";

    }else{

        document.body.classList.remove("dark-theme");

        button.textContent="🌙";

        button.title="Ativar tema escuro";

    }

}


function toggleTheme(){

    document.body.classList.toggle("dark-theme");


    const isDark =
        document.body.classList.contains("dark-theme");


    localStorage.setItem(
        "travelTheme",
        isDark ? "dark" : "light"
    );


    const button =
        document.getElementById("themeButton");


    if(isDark){

        button.textContent="☀️";

        button.title="Ativar tema claro";

    }else{

        button.textContent="🌙";

        button.title="Ativar tema escuro";

    }

}


/* =====================================================
   PRIMEIRO ACESSO
===================================================== */

function checkFirstAccess(){

    const registeredUser =
    localStorage.getItem("registeredUser");

    const profileName =
    localStorage.getItem("profileName");


    if(
        !registeredUser ||
        !profileName
    ){

        document.body.classList.add("first-time");

        document
            .getElementById("firstAccess")
            .classList.add("show");

    }

}


/* =====================================================
   PRIMEIRO CADASTRO
===================================================== */

function finishFirstAccess(event){

    event.preventDefault();


    const name =
    document
        .getElementById("firstName")
        .value
        .trim();


    const user =
    document
        .getElementById("firstUser")
        .value
        .trim();


    const password =
    document
        .getElementById("firstPassword")
        .value;


    const description =
    document
        .getElementById("firstDescription")
        .value
        .trim();


    const error =
    document.getElementById("accessError");


    if(
        !name ||
        !user ||
        !password
    ){

        error.textContent =
        "❌ Preencha seu nome, usuário e senha.";

        error.classList.add("show");

        return;

    }


    error.classList.remove("show");


    localStorage.setItem(
        "registeredUser",
        user
    );


    localStorage.setItem(
        "registeredPassword",
        password
    );


    localStorage.setItem(
        "profileName",
        name
    );


    localStorage.setItem(
        "profileDescription",
        description ||
        "✈️ Viajante"
    );


    localStorage.setItem(
        "travelUser",
        user
    );


    currentUser=user;


    const photoInput =
    document.getElementById("firstPhoto");


    if(
        photoInput.files &&
        photoInput.files[0]
    ){

        const reader =
        new FileReader();


        reader.onload=function(e){

            localStorage.setItem(
                "profilePhoto",
                e.target.result
            );


            finishAccessScreen();

        };


        reader.readAsDataURL(
            photoInput.files[0]
        );

    }else{

        finishAccessScreen();

    }

}


/* =====================================================
   FINALIZAR PRIMEIRO ACESSO
===================================================== */

function finishAccessScreen(){

    document.body.classList.remove("first-time");


    document
        .getElementById("firstAccess")
        .classList.remove("show");


    loadProfile();

    updateNotificationCount();


    alert(
        "🎉 Perfil criado com sucesso!\n\n" +
        "Bem-vindo ao TravelFeed."
    );

}


/* =====================================================
   PRÉ-VISUALIZAÇÃO DA FOTO
===================================================== */

document
    .getElementById("firstPhoto")
    .addEventListener(
        "change",
        function(){

            const file =
            this.files[0];


            if(!file) return;


            const reader =
            new FileReader();


            reader.onload=function(e){

                document
                    .getElementById("photoPreview")
                    .innerHTML =
                    "<img src='" +
                    e.target.result +
                    "' alt='Prévia da foto'>";

            };


            reader.readAsDataURL(file);

        }
    );


/* =====================================================
   CURTIR COM CORAÇÕES
===================================================== */

function likePost(button){

    const article =
        button.closest(".trip-step");


    const imageArea =
        article.querySelector(".like-area");


    const liked =
        button.classList.toggle("liked");


    if(liked){

        button.innerHTML =
        "❤️ Curtido";


        /* Cria vários corações */

        for(let i=0;i<7;i++){

            createHeart(imageArea);

        }


        createNotification(
            currentUser
            ? currentUser + " curtiu uma publicação."
            : "Sua publicação recebeu uma curtida."
        );

    }else{

        button.innerHTML =
        "♡ Curtir";

    }

}


/* =====================================================
   ANIMAÇÃO DOS CORAÇÕES
===================================================== */

function createHeart(container){

    if(!container) return;


    const heart =
        document.createElement("div");


    heart.className="floating-heart";

    heart.textContent="❤️";


    const randomX =
        (Math.random() * 160 - 80) + "px";


    const randomDelay =
        (Math.random() * .35) + "s";


    heart.style.setProperty(
        "--heart-x",
        randomX
    );


    heart.style.animationDelay =
        randomDelay;


    heart.style.left =
        (30 + Math.random() * 40) + "%";


    container.appendChild(heart);


    setTimeout(
        function(){

            heart.remove();

        },
        1800
    );

}


/* =====================================================
   DUPLO CLIQUE NA FOTO = CURTIR
===================================================== */

document.addEventListener(
    "dblclick",
    function(event){

        const image =
            event.target.closest(
                ".like-area img"
            );


        if(!image) return;


        const article =
            image.closest(".trip-step");


        const button =
            article.querySelector(
                ".actions button"
            );


        if(!button.classList.contains("liked")){

            likePost(button);

        }else{

            const area =
                image.closest(".like-area");


            for(let i=0;i<7;i++){

                createHeart(area);

            }

        }

    }
);


/* =====================================================
   COMENTÁRIOS PÚBLICOS
===================================================== */

function toggleComments(button){

    const article =
    button.closest(".trip-step");


    const comments =
    article.querySelector(".comments");


    comments.style.display =
    comments.style.display === "none"
    ? "block"
    : "none";

}


function addComment(button){

    if(!currentUser){

        openLogin();

        return;

    }


    const form =
    button.closest(".comment-form");


    const input =
    form.querySelector("input");


    const text =
    input.value.trim();


    if(!text){

        alert(
            "Digite um comentário."
        );

        return;

    }


    const article =
    button.closest(".trip-step");


    const list =
    article.querySelector(".comment-list");


    const comment =
    document.createElement("div");


    comment.className="comment";


    comment.innerHTML =
        "<strong>" +
        escapeHTML(currentUser) +
        "</strong><br>" +
        escapeHTML(text) +
        "<br><small>agora mesmo</small>";


    /*
       O comentário é colocado diretamente
       na publicação, ficando visível
       publicamente para quem estiver
       vendo esta página no navegador.
    */

    list.appendChild(comment);


    input.value="";


    createNotification(
        currentUser +
        " comentou em uma publicação."
    );


    alert(
        "Comentário publicado! 💚"
    );

}


function commentEnter(event,input){

    if(event.key==="Enter"){

        event.preventDefault();


        const button =
        input
        .parentElement
        .querySelector("button");


        addComment(button);

    }

}


function escapeHTML(text){

    const div =
    document.createElement("div");


    div.textContent=text;


    return div.innerHTML;

}


/* =====================================================
   NOTIFICAÇÕES
===================================================== */

function createNotification(text){

    notifications.unshift({

        text:text,

        date:
        new Date()
        .toLocaleString("pt-BR")

    });


    localStorage.setItem(
        "travelNotifications",
        JSON.stringify(notifications)
    );


    updateNotificationCount();

}


function updateNotificationCount(){

    document.getElementById(
        "notificationCount"
    ).textContent =
    notifications.length;

}


function showNotifications(){

    const area =
    document.getElementById(
        "notifications"
    );


    area.style.display =
    area.style.display === "none"
    ? "block"
    : "none";


    const list =
    document.getElementById(
        "notificationList"
    );


    if(notifications.length===0){

        list.innerHTML =
        "<p style='margin-top:15px;color:#788487;'>" +
        "Você ainda não possui notificações." +
        "</p>";

        return;

    }


    list.innerHTML="";


    notifications.forEach(
        function(item){

            const notification =
            document.createElement("div");


            notification.className =
            "notification";


            notification.innerHTML =
            "🔔 <strong>" +
            escapeHTML(item.text) +
            "</strong><br>" +
            "<small>" +
            escapeHTML(item.date) +
            "</small>";


            list.appendChild(
                notification
            );

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

function openLogin(){

    document
        .getElementById("loginOverlay")
        .classList.add("show");

}


function closeLogin(){

    document
        .getElementById("loginOverlay")
        .classList.remove("show");

}


function login(){

    const user =
    document
        .getElementById("loginUser")
        .value
        .trim();


    const password =
    document
        .getElementById("loginPassword")
        .value;


    const savedUser =
    localStorage.getItem(
        "registeredUser"
    );


    const savedPassword =
    localStorage.getItem(
        "registeredPassword"
    );


    if(
        savedUser &&
        savedPassword &&
        user === savedUser &&
        password === savedPassword
    ){

        currentUser=user;


        localStorage.setItem(
            "travelUser",
            user
        );


        document
            .getElementById("loginError")
            .classList.remove("show");


        closeLogin();


        alert(
            "Login realizado com sucesso! 🌎"
        );

    }else{

        document
            .getElementById("loginError")
            .classList.add("show");

    }

}


/* =====================================================
   PERFIL
===================================================== */

function saveProfile(){

    const name =
    document
        .getElementById("profileName")
        .value
        .trim();


    const description =
    document
        .getElementById("profileDescription")
        .value
        .trim();


    if(!name){

        alert(
            "Digite seu nome."
        );

        return;

    }


    localStorage.setItem(
        "profileName",
        name
    );


    localStorage.setItem(
        "profileDescription",
        description
    );


    document
        .getElementById("homeProfileName")
        .textContent=name;


    document
        .getElementById("homeProfileDescription")
        .textContent=description;


    const photoInput =
    document.getElementById(
        "profilePhoto"
    );


    if(
        photoInput.files &&
        photoInput.files[0]
    ){

        const reader =
        new FileReader();


        reader.onload=function(event){

            localStorage.setItem(
                "profilePhoto",
                event.target.result
            );


            loadProfilePhoto();

        };


        reader.readAsDataURL(
            photoInput.files[0]
        );

    }


    alert(
        "Perfil atualizado com sucesso! 💚"
    );

}


function loadProfile(){

    const name =
    localStorage.getItem(
        "profileName"
    );


    const description =
    localStorage.getItem(
        "profileDescription"
    );


    if(name){

        document
            .getElementById("homeProfileName")
            .textContent=name;


        document
            .getElementById("profileName")
            .value=name;

    }


    if(description){

        document
            .getElementById("homeProfileDescription")
            .textContent=description;


        document
            .getElementById("profileDescription")
            .value=description;

    }


    loadProfilePhoto();

}


function loadProfilePhoto(){

    const photo =
    localStorage.getItem(
        "profilePhoto"
    );


    if(!photo){

        document
            .getElementById("homeAvatar")
            .innerHTML="?";

        return;

    }


    const avatar =
    document.getElementById(
        "homeAvatar"
    );


    avatar.innerHTML =
    "<img src='" +
    photo +
    "' alt='Foto do perfil'>";

}


/* =====================================================
   REINICIAR SISTEMA
===================================================== */

function restartSystem(){

    const confirmation =
    confirm(

        "🔄 Recomeçar cadastro?\n\n" +

        "Isso vai apagar o usuário, senha, " +
        "perfil, foto e notificações salvos " +
        "neste navegador.\n\n" +

        "A página será aberta como se fosse " +
        "sua primeira vez no TravelFeed."

    );


    if(!confirmation){

        return;

    }


    localStorage.removeItem(
        "travelUser"
    );

    localStorage.removeItem(
        "registeredUser"
    );

    localStorage.removeItem(
        "registeredPassword"
    );

    localStorage.removeItem(
        "profileName"
    );

    localStorage.removeItem(
        "profileDescription"
    );

    localStorage.removeItem(
        "profilePhoto"
    );

    localStorage.removeItem(
        "travelNotifications"
    );


    location.reload();

}


/* =====================================================
   NOVA VIAGEM
===================================================== */

function openTripCreator(){

    const creator =
    document.getElementById(
        "tripCreator"
    );


    creator.style.display="block";


    creator.scrollIntoView({
        behavior:"smooth"
    });

}


function createTrip(){

    if(!currentUser){

        openLogin();

        return;

    }


    const destination =
    document
        .getElementById("destination")
        .value
        .trim();


    const place =
    document
        .getElementById("place")
        .value
        .trim();


    if(!destination){

        alert(
            "Digite um destino."
        );

        return;

    }


    alert(

        "🗺️ Nova rota criada!\n\n" +

        "Destino: " +
        destination +

        "\nPonto turístico: " +
        (place || "A definir")

    );


    createNotification(
        "Sua nova viagem para " +
        destination +
        " foi criada."
    );

}


/* =====================================================
   DESTINOS
===================================================== */

function addDestination(destination){

    document
        .getElementById("destination")
        .value=destination;


    openTripCreator();


    createNotification(
        destination +
        " foi adicionada às suas ideias de viagem."
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

loadTheme();

loadProfile();

updateNotificationCount();

checkFirstAccess();let currentUser =
localStorage.getItem("travelUser") || "";

let notifications =
JSON.parse(
    localStorage.getItem("travelNotifications")
) || [];


/* =====================================================
   TEMA CLARO / ESCURO
===================================================== */

function loadTheme(){

    const savedTheme =
        localStorage.getItem("travelTheme");

    const button =
        document.getElementById("themeButton");


    if(savedTheme === "dark"){

        document.body.classList.add("dark-theme");

        button.textContent="☀️";

        button.title="Ativar tema claro";

    }else{

        document.body.classList.remove("dark-theme");

        button.textContent="🌙";

        button.title="Ativar tema escuro";

    }

}


function toggleTheme(){

    document.body.classList.toggle("dark-theme");


    const isDark =
        document.body.classList.contains("dark-theme");


    localStorage.setItem(
        "travelTheme",
        isDark ? "dark" : "light"
    );


    const button =
        document.getElementById("themeButton");


    if(isDark){

        button.textContent="☀️";

        button.title="Ativar tema claro";

    }else{

        button.textContent="🌙";

        button.title="Ativar tema escuro";

    }

}


/* =====================================================
   PRIMEIRO ACESSO
===================================================== */

function checkFirstAccess(){

    const registeredUser =
    localStorage.getItem("registeredUser");

    const profileName =
    localStorage.getItem("profileName");


    if(
        !registeredUser ||
        !profileName
    ){

        document.body.classList.add("first-time");

        document
            .getElementById("firstAccess")
            .classList.add("show");

    }

}


/* =====================================================
   PRIMEIRO CADASTRO
===================================================== */

function finishFirstAccess(event){

    event.preventDefault();


    const name =
    document
        .getElementById("firstName")
        .value
        .trim();


    const user =
    document
        .getElementById("firstUser")
        .value
        .trim();


    const password =
    document
        .getElementById("firstPassword")
        .value;


    const description =
    document
        .getElementById("firstDescription")
        .value
        .trim();


    const error =
    document.getElementById("accessError");


    if(
        !name ||
        !user ||
        !password
    ){

        error.textContent =
        "❌ Preencha seu nome, usuário e senha.";

        error.classList.add("show");

        return;

    }


    error.classList.remove("show");


    localStorage.setItem(
        "registeredUser",
        user
    );


    localStorage.setItem(
        "registeredPassword",
        password
    );


    localStorage.setItem(
        "profileName",
        name
    );


    localStorage.setItem(
        "profileDescription",
        description ||
        "✈️ Viajante"
    );


    localStorage.setItem(
        "travelUser",
        user
    );


    currentUser=user;


    const photoInput =
    document.getElementById("firstPhoto");


    if(
        photoInput.files &&
        photoInput.files[0]
    ){

        const reader =
        new FileReader();


        reader.onload=function(e){

            localStorage.setItem(
                "profilePhoto",
                e.target.result
            );


            finishAccessScreen();

        };


        reader.readAsDataURL(
            photoInput.files[0]
        );

    }else{

        finishAccessScreen();

    }

}


/* =====================================================
   FINALIZAR PRIMEIRO ACESSO
===================================================== */

function finishAccessScreen(){

    document.body.classList.remove("first-time");


    document
        .getElementById("firstAccess")
        .classList.remove("show");


    loadProfile();

    updateNotificationCount();


    alert(
        "🎉 Perfil criado com sucesso!\n\n" +
        "Bem-vindo ao TravelFeed."
    );

}


/* =====================================================
   PRÉ-VISUALIZAÇÃO DA FOTO
===================================================== */

document
    .getElementById("firstPhoto")
    .addEventListener(
        "change",
        function(){

            const file =
            this.files[0];


            if(!file) return;


            const reader =
            new FileReader();


            reader.onload=function(e){

                document
                    .getElementById("photoPreview")
                    .innerHTML =
                    "<img src='" +
                    e.target.result +
                    "' alt='Prévia da foto'>";

            };


            reader.readAsDataURL(file);

        }
    );


/* =====================================================
   CURTIR COM CORAÇÕES
===================================================== */

function likePost(button){

    const article =
        button.closest(".trip-step");


    const imageArea =
        article.querySelector(".like-area");


    const liked =
        button.classList.toggle("liked");


    if(liked){

        button.innerHTML =
        "❤️ Curtido";


        /* Cria vários corações */

        for(let i=0;i<7;i++){

            createHeart(imageArea);

        }


        createNotification(
            currentUser
            ? currentUser + " curtiu uma publicação."
            : "Sua publicação recebeu uma curtida."
        );

    }else{

        button.innerHTML =
        "♡ Curtir";

    }

}


/* =====================================================
   ANIMAÇÃO DOS CORAÇÕES
===================================================== */

function createHeart(container){

    if(!container) return;


    const heart =
        document.createElement("div");


    heart.className="floating-heart";

    heart.textContent="❤️";


    const randomX =
        (Math.random() * 160 - 80) + "px";


    const randomDelay =
        (Math.random() * .35) + "s";


    heart.style.setProperty(
        "--heart-x",
        randomX
    );


    heart.style.animationDelay =
        randomDelay;


    heart.style.left =
        (30 + Math.random() * 40) + "%";


    container.appendChild(heart);


    setTimeout(
        function(){

            heart.remove();

        },
        1800
    );

}


/* =====================================================
   DUPLO CLIQUE NA FOTO = CURTIR
===================================================== */

document.addEventListener(
    "dblclick",
    function(event){

        const image =
            event.target.closest(
                ".like-area img"
            );


        if(!image) return;


        const article =
            image.closest(".trip-step");


        const button =
            article.querySelector(
                ".actions button"
            );


        if(!button.classList.contains("liked")){

            likePost(button);

        }else{

            const area =
                image.closest(".like-area");


            for(let i=0;i<7;i++){

                createHeart(area);

            }

        }

    }
);


/* =====================================================
   COMENTÁRIOS PÚBLICOS
===================================================== */

function toggleComments(button){

    const article =
    button.closest(".trip-step");


    const comments =
    article.querySelector(".comments");


    comments.style.display =
    comments.style.display === "none"
    ? "block"
    : "none";

}


function addComment(button){

    if(!currentUser){

        openLogin();

        return;

    }


    const form =
    button.closest(".comment-form");


    const input =
    form.querySelector("input");


    const text =
    input.value.trim();


    if(!text){

        alert(
            "Digite um comentário."
        );

        return;

    }


    const article =
    button.closest(".trip-step");


    const list =
    article.querySelector(".comment-list");


    const comment =
    document.createElement("div");


    comment.className="comment";


    comment.innerHTML =
        "<strong>" +
        escapeHTML(currentUser) +
        "</strong><br>" +
        escapeHTML(text) +
        "<br><small>agora mesmo</small>";


    /*
       O comentário é colocado diretamente
       na publicação, ficando visível
       publicamente para quem estiver
       vendo esta página no navegador.
    */

    list.appendChild(comment);


    input.value="";


    createNotification(
        currentUser +
        " comentou em uma publicação."
    );


    alert(
        "Comentário publicado! 💚"
    );

}


function commentEnter(event,input){

    if(event.key==="Enter"){

        event.preventDefault();


        const button =
        input
        .parentElement
        .querySelector("button");


        addComment(button);

    }

}


function escapeHTML(text){

    const div =
    document.createElement("div");


    div.textContent=text;


    return div.innerHTML;

}


/* =====================================================
   NOTIFICAÇÕES
===================================================== */

function createNotification(text){

    notifications.unshift({

        text:text,

        date:
        new Date()
        .toLocaleString("pt-BR")

    });


    localStorage.setItem(
        "travelNotifications",
        JSON.stringify(notifications)
    );


    updateNotificationCount();

}


function updateNotificationCount(){

    document.getElementById(
        "notificationCount"
    ).textContent =
    notifications.length;

}


function showNotifications(){

    const area =
    document.getElementById(
        "notifications"
    );


    area.style.display =
    area.style.display === "none"
    ? "block"
    : "none";


    const list =
    document.getElementById(
        "notificationList"
    );


    if(notifications.length===0){

        list.innerHTML =
        "<p style='margin-top:15px;color:#788487;'>" +
        "Você ainda não possui notificações." +
        "</p>";

        return;

    }


    list.innerHTML="";


    notifications.forEach(
        function(item){

            const notification =
            document.createElement("div");


            notification.className =
            "notification";


            notification.innerHTML =
            "🔔 <strong>" +
            escapeHTML(item.text) +
            "</strong><br>" +
            "<small>" +
            escapeHTML(item.date) +
            "</small>";


            list.appendChild(
                notification
            );

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

function openLogin(){

    document
        .getElementById("loginOverlay")
        .classList.add("show");

}


function closeLogin(){

    document
        .getElementById("loginOverlay")
        .classList.remove("show");

}


function login(){

    const user =
    document
        .getElementById("loginUser")
        .value
        .trim();


    const password =
    document
        .getElementById("loginPassword")
        .value;


    const savedUser =
    localStorage.getItem(
        "registeredUser"
    );


    const savedPassword =
    localStorage.getItem(
        "registeredPassword"
    );


    if(
        savedUser &&
        savedPassword &&
        user === savedUser &&
        password === savedPassword
    ){

        currentUser=user;


        localStorage.setItem(
            "travelUser",
            user
        );


        document
            .getElementById("loginError")
            .classList.remove("show");


        closeLogin();


        alert(
            "Login realizado com sucesso! 🌎"
        );

    }else{

        document
            .getElementById("loginError")
            .classList.add("show");

    }

}


/* =====================================================
   PERFIL
===================================================== */

function saveProfile(){

    const name =
    document
        .getElementById("profileName")
        .value
        .trim();


    const description =
    document
        .getElementById("profileDescription")
        .value
        .trim();


    if(!name){

        alert(
            "Digite seu nome."
        );

        return;

    }


    localStorage.setItem(
        "profileName",
        name
    );


    localStorage.setItem(
        "profileDescription",
        description
    );


    document
        .getElementById("homeProfileName")
        .textContent=name;


    document
        .getElementById("homeProfileDescription")
        .textContent=description;


    const photoInput =
    document.getElementById(
        "profilePhoto"
    );


    if(
        photoInput.files &&
        photoInput.files[0]
    ){

        const reader =
        new FileReader();


        reader.onload=function(event){

            localStorage.setItem(
                "profilePhoto",
                event.target.result
            );


            loadProfilePhoto();

        };


        reader.readAsDataURL(
            photoInput.files[0]
        );

    }


    alert(
        "Perfil atualizado com sucesso! 💚"
    );

}


function loadProfile(){

    const name =
    localStorage.getItem(
        "profileName"
    );


    const description =
    localStorage.getItem(
        "profileDescription"
    );


    if(name){

        document
            .getElementById("homeProfileName")
            .textContent=name;


        document
            .getElementById("profileName")
            .value=name;

    }


    if(description){

        document
            .getElementById("homeProfileDescription")
            .textContent=description;


        document
            .getElementById("profileDescription")
            .value=description;

    }


    loadProfilePhoto();

}


function loadProfilePhoto(){

    const photo =
    localStorage.getItem(
        "profilePhoto"
    );


    if(!photo){

        document
            .getElementById("homeAvatar")
            .innerHTML="?";

        return;

    }


    const avatar =
    document.getElementById(
        "homeAvatar"
    );


    avatar.innerHTML =
    "<img src='" +
    photo +
    "' alt='Foto do perfil'>";

}


/* =====================================================
   REINICIAR SISTEMA
===================================================== */

function restartSystem(){

    const confirmation =
    confirm(

        "🔄 Recomeçar cadastro?\n\n" +

        "Isso vai apagar o usuário, senha, " +
        "perfil, foto e notificações salvos " +
        "neste navegador.\n\n" +

        "A página será aberta como se fosse " +
        "sua primeira vez no TravelFeed."

    );


    if(!confirmation){

        return;

    }


    localStorage.removeItem(
        "travelUser"
    );

    localStorage.removeItem(
        "registeredUser"
    );

    localStorage.removeItem(
        "registeredPassword"
    );

    localStorage.removeItem(
        "profileName"
    );

    localStorage.removeItem(
        "profileDescription"
    );

    localStorage.removeItem(
        "profilePhoto"
    );

    localStorage.removeItem(
        "travelNotifications"
    );


    location.reload();

}


/* =====================================================
   NOVA VIAGEM
===================================================== */

function openTripCreator(){

    const creator =
    document.getElementById(
        "tripCreator"
    );


    creator.style.display="block";


    creator.scrollIntoView({
        behavior:"smooth"
    });

}


function createTrip(){

    if(!currentUser){

        openLogin();

        return;

    }


    const destination =
    document
        .getElementById("destination")
        .value
        .trim();


    const place =
    document
        .getElementById("place")
        .value
        .trim();


    if(!destination){

        alert(
            "Digite um destino."
        );

        return;

    }


    alert(

        "🗺️ Nova rota criada!\n\n" +

        "Destino: " +
        destination +

        "\nPonto turístico: " +
        (place || "A definir")

    );


    createNotification(
        "Sua nova viagem para " +
        destination +
        " foi criada."
    );

}


/* =====================================================
   DESTINOS
===================================================== */

function addDestination(destination){

    document
        .getElementById("destination")
        .value=destination;


    openTripCreator();


    createNotification(
        destination +
        " foi adicionada às suas ideias de viagem."
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

loadTheme();

loadProfile();

updateNotificationCount();

checkFirstAccess();
let currentUser =
localStorage.getItem("travelUser") || "";

let notifications =
JSON.parse(
    localStorage.getItem("travelNotifications")
) || [];


/* =====================================================
   TEMA CLARO / ESCURO
===================================================== */

function loadTheme(){

    const savedTheme =
        localStorage.getItem("travelTheme");

    const button =
        document.getElementById("themeButton");


    if(savedTheme === "dark"){

        document.body.classList.add("dark-theme");

        button.textContent="☀️";

        button.title="Ativar tema claro";

    }else{

        document.body.classList.remove("dark-theme");

        button.textContent="🌙";

        button.title="Ativar tema escuro";

    }

}


function toggleTheme(){

    document.body.classList.toggle("dark-theme");


    const isDark =
        document.body.classList.contains("dark-theme");


    localStorage.setItem(
        "travelTheme",
        isDark ? "dark" : "light"
    );


    const button =
        document.getElementById("themeButton");


    if(isDark){

        button.textContent="☀️";

        button.title="Ativar tema claro";

    }else{

        button.textContent="🌙";

        button.title="Ativar tema escuro";

    }

}


/* =====================================================
   PRIMEIRO ACESSO
===================================================== */

function checkFirstAccess(){

    const registeredUser =
    localStorage.getItem("registeredUser");

    const profileName =
    localStorage.getItem("profileName");


    if(
        !registeredUser ||
        !profileName
    ){

        document.body.classList.add("first-time");

        document
            .getElementById("firstAccess")
            .classList.add("show");

    }

}


/* =====================================================
   PRIMEIRO CADASTRO
===================================================== */

function finishFirstAccess(event){

    event.preventDefault();


    const name =
    document
        .getElementById("firstName")
        .value
        .trim();


    const user =
    document
        .getElementById("firstUser")
        .value
        .trim();


    const password =
    document
        .getElementById("firstPassword")
        .value;


    const description =
    document
        .getElementById("firstDescription")
        .value
        .trim();


    const error =
    document.getElementById("accessError");


    if(
        !name ||
        !user ||
        !password
    ){

        error.textContent =
        "❌ Preencha seu nome, usuário e senha.";

        error.classList.add("show");

        return;

    }


    error.classList.remove("show");


    localStorage.setItem(
        "registeredUser",
        user
    );


    localStorage.setItem(
        "registeredPassword",
        password
    );


    localStorage.setItem(
        "profileName",
        name
    );


    localStorage.setItem(
        "profileDescription",
        description ||
        "✈️ Viajante"
    );


    localStorage.setItem(
        "travelUser",
        user
    );


    currentUser=user;


    const photoInput =
    document.getElementById("firstPhoto");


    if(
        photoInput.files &&
        photoInput.files[0]
    ){

        const reader =
        new FileReader();


        reader.onload=function(e){

            localStorage.setItem(
                "profilePhoto",
                e.target.result
            );


            finishAccessScreen();

        };


        reader.readAsDataURL(
            photoInput.files[0]
        );

    }else{

        finishAccessScreen();

    }

}


/* =====================================================
   FINALIZAR PRIMEIRO ACESSO
===================================================== */

function finishAccessScreen(){

    document.body.classList.remove("first-time");


    document
        .getElementById("firstAccess")
        .classList.remove("show");


    loadProfile();

    updateNotificationCount();


    alert(
        "🎉 Perfil criado com sucesso!\n\n" +
        "Bem-vindo ao TravelFeed."
    );

}


/* =====================================================
   PRÉ-VISUALIZAÇÃO DA FOTO
===================================================== */

document
    .getElementById("firstPhoto")
    .addEventListener(
        "change",
        function(){

            const file =
            this.files[0];


            if(!file) return;


            const reader =
            new FileReader();


            reader.onload=function(e){

                document
                    .getElementById("photoPreview")
                    .innerHTML =
                    "<img src='" +
                    e.target.result +
                    "' alt='Prévia da foto'>";

            };


            reader.readAsDataURL(file);

        }
    );


/* =====================================================
   CURTIR COM CORAÇÕES
===================================================== */

function likePost(button){

    const article =
        button.closest(".trip-step");


    const imageArea =
        article.querySelector(".like-area");


    const liked =
        button.classList.toggle("liked");


    if(liked){

        button.innerHTML =
        "❤️ Curtido";


        /* Cria vários corações */

        for(let i=0;i<7;i++){

            createHeart(imageArea);

        }


        createNotification(
            currentUser
            ? currentUser + " curtiu uma publicação."
            : "Sua publicação recebeu uma curtida."
        );

    }else{

        button.innerHTML =
        "♡ Curtir";

    }

}


/* =====================================================
   ANIMAÇÃO DOS CORAÇÕES
===================================================== */

function createHeart(container){

    if(!container) return;


    const heart =
        document.createElement("div");


    heart.className="floating-heart";

    heart.textContent="❤️";


    const randomX =
        (Math.random() * 160 - 80) + "px";


    const randomDelay =
        (Math.random() * .35) + "s";


    heart.style.setProperty(
        "--heart-x",
        randomX
    );


    heart.style.animationDelay =
        randomDelay;


    heart.style.left =
        (30 + Math.random() * 40) + "%";


    container.appendChild(heart);


    setTimeout(
        function(){

            heart.remove();

        },
        1800
    );

}


/* =====================================================
   DUPLO CLIQUE NA FOTO = CURTIR
===================================================== */

document.addEventListener(
    "dblclick",
    function(event){

        const image =
            event.target.closest(
                ".like-area img"
            );


        if(!image) return;


        const article =
            image.closest(".trip-step");


        const button =
            article.querySelector(
                ".actions button"
            );


        if(!button.classList.contains("liked")){

            likePost(button);

        }else{

            const area =
                image.closest(".like-area");


            for(let i=0;i<7;i++){

                createHeart(area);

            }

        }

    }
);


/* =====================================================
   COMENTÁRIOS PÚBLICOS
===================================================== */

function toggleComments(button){

    const article =
    button.closest(".trip-step");


    const comments =
    article.querySelector(".comments");


    comments.style.display =
    comments.style.display === "none"
    ? "block"
    : "none";

}


function addComment(button){

    if(!currentUser){

        openLogin();

        return;

    }


    const form =
    button.closest(".comment-form");


    const input =
    form.querySelector("input");


    const text =
    input.value.trim();


    if(!text){

        alert(
            "Digite um comentário."
        );

        return;

    }


    const article =
    button.closest(".trip-step");


    const list =
    article.querySelector(".comment-list");


    const comment =
    document.createElement("div");


    comment.className="comment";


    comment.innerHTML =
        "<strong>" +
        escapeHTML(currentUser) +
        "</strong><br>" +
        escapeHTML(text) +
        "<br><small>agora mesmo</small>";


    /*
       O comentário é colocado diretamente
       na publicação, ficando visível
       publicamente para quem estiver
       vendo esta página no navegador.
    */

    list.appendChild(comment);


    input.value="";


    createNotification(
        currentUser +
        " comentou em uma publicação."
    );


    alert(
        "Comentário publicado! 💚"
    );

}


function commentEnter(event,input){

    if(event.key==="Enter"){

        event.preventDefault();


        const button =
        input
        .parentElement
        .querySelector("button");


        addComment(button);

    }

}


function escapeHTML(text){

    const div =
    document.createElement("div");


    div.textContent=text;


    return div.innerHTML;

}


/* =====================================================
   NOTIFICAÇÕES
===================================================== */

function createNotification(text){

    notifications.unshift({

        text:text,

        date:
        new Date()
        .toLocaleString("pt-BR")

    });


    localStorage.setItem(
        "travelNotifications",
        JSON.stringify(notifications)
    );


    updateNotificationCount();

}


function updateNotificationCount(){

    document.getElementById(
        "notificationCount"
    ).textContent =
    notifications.length;

}


function showNotifications(){

    const area =
    document.getElementById(
        "notifications"
    );


    area.style.display =
    area.style.display === "none"
    ? "block"
    : "none";


    const list =
    document.getElementById(
        "notificationList"
    );


    if(notifications.length===0){

        list.innerHTML =
        "<p style='margin-top:15px;color:#788487;'>" +
        "Você ainda não possui notificações." +
        "</p>";

        return;

    }


    list.innerHTML="";


    notifications.forEach(
        function(item){

            const notification =
            document.createElement("div");


            notification.className =
            "notification";


            notification.innerHTML =
            "🔔 <strong>" +
            escapeHTML(item.text) +
            "</strong><br>" +
            "<small>" +
            escapeHTML(item.date) +
            "</small>";


            list.appendChild(
                notification
            );

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

function openLogin(){

    document
        .getElementById("loginOverlay")
        .classList.add("show");

}


function closeLogin(){

    document
        .getElementById("loginOverlay")
        .classList.remove("show");

}


function login(){

    const user =
    document
        .getElementById("loginUser")
        .value
        .trim();


    const password =
    document
        .getElementById("loginPassword")
        .value;


    const savedUser =
    localStorage.getItem(
        "registeredUser"
    );


    const savedPassword =
    localStorage.getItem(
        "registeredPassword"
    );


    if(
        savedUser &&
        savedPassword &&
        user === savedUser &&
        password === savedPassword
    ){

        currentUser=user;


        localStorage.setItem(
            "travelUser",
            user
        );


        document
            .getElementById("loginError")
            .classList.remove("show");


        closeLogin();


        alert(
            "Login realizado com sucesso! 🌎"
        );

    }else{

        document
            .getElementById("loginError")
            .classList.add("show");

    }

}


/* =====================================================
   PERFIL
===================================================== */

function saveProfile(){

    const name =
    document
        .getElementById("profileName")
        .value
        .trim();


    const description =
    document
        .getElementById("profileDescription")
        .value
        .trim();


    if(!name){

        alert(
            "Digite seu nome."
        );

        return;

    }


    localStorage.setItem(
        "profileName",
        name
    );


    localStorage.setItem(
        "profileDescription",
        description
    );


    document
        .getElementById("homeProfileName")
        .textContent=name;


    document
        .getElementById("homeProfileDescription")
        .textContent=description;


    const photoInput =
    document.getElementById(
        "profilePhoto"
    );


    if(
        photoInput.files &&
        photoInput.files[0]
    ){

        const reader =
        new FileReader();


        reader.onload=function(event){

            localStorage.setItem(
                "profilePhoto",
                event.target.result
            );


            loadProfilePhoto();

        };


        reader.readAsDataURL(
            photoInput.files[0]
        );

    }


    alert(
        "Perfil atualizado com sucesso! 💚"
    );

}


function loadProfile(){

    const name =
    localStorage.getItem(
        "profileName"
    );


    const description =
    localStorage.getItem(
        "profileDescription"
    );


    if(name){

        document
            .getElementById("homeProfileName")
            .textContent=name;


        document
            .getElementById("profileName")
            .value=name;

    }


    if(description){

        document
            .getElementById("homeProfileDescription")
            .textContent=description;


        document
            .getElementById("profileDescription")
            .value=description;

    }


    loadProfilePhoto();

}


function loadProfilePhoto(){

    const photo =
    localStorage.getItem(
        "profilePhoto"
    );


    if(!photo){

        document
            .getElementById("homeAvatar")
            .innerHTML="?";

        return;

    }


    const avatar =
    document.getElementById(
        "homeAvatar"
    );


    avatar.innerHTML =
    "<img src='" +
    photo +
    "' alt='Foto do perfil'>";

}


/* =====================================================
   REINICIAR SISTEMA
===================================================== */

function restartSystem(){

    const confirmation =
    confirm(

        "🔄 Recomeçar cadastro?\n\n" +

        "Isso vai apagar o usuário, senha, " +
        "perfil, foto e notificações salvos " +
        "neste navegador.\n\n" +

        "A página será aberta como se fosse " +
        "sua primeira vez no TravelFeed."

    );


    if(!confirmation){

        return;

    }


    localStorage.removeItem(
        "travelUser"
    );

    localStorage.removeItem(
        "registeredUser"
    );

    localStorage.removeItem(
        "registeredPassword"
    );

    localStorage.removeItem(
        "profileName"
    );

    localStorage.removeItem(
        "profileDescription"
    );

    localStorage.removeItem(
        "profilePhoto"
    );

    localStorage.removeItem(
        "travelNotifications"
    );


    location.reload();

}


/* =====================================================
   NOVA VIAGEM
===================================================== */

function openTripCreator(){

    const creator =
    document.getElementById(
        "tripCreator"
    );


    creator.style.display="block";


    creator.scrollIntoView({
        behavior:"smooth"
    });

}


function createTrip(){

    if(!currentUser){

        openLogin();

        return;

    }


    const destination =
    document
        .getElementById("destination")
        .value
        .trim();


    const place =
    document
        .getElementById("place")
        .value
        .trim();


    if(!destination){

        alert(
            "Digite um destino."
        );

        return;

    }


    alert(

        "🗺️ Nova rota criada!\n\n" +

        "Destino: " +
        destination +

        "\nPonto turístico: " +
        (place || "A definir")

    );


    createNotification(
        "Sua nova viagem para " +
        destination +
        " foi criada."
    );

}


/* =====================================================
   DESTINOS
===================================================== */

function addDestination(destination){

    document
        .getElementById("destination")
        .value=destination;


    openTripCreator();


    createNotification(
        destination +
        " foi adicionada às suas ideias de viagem."
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

loadTheme();

loadProfile();

updateNotificationCount();

checkFirstAccess();let currentUser =
localStorage.getItem("travelUser") || "";

let notifications =
JSON.parse(
    localStorage.getItem("travelNotifications")
) || [];


/* =====================================================
   TEMA CLARO / ESCURO
===================================================== */

function loadTheme(){

    const savedTheme =
        localStorage.getItem("travelTheme");

    const button =
        document.getElementById("themeButton");


    if(savedTheme === "dark"){

        document.body.classList.add("dark-theme");

        button.textContent="☀️";

        button.title="Ativar tema claro";

    }else{

        document.body.classList.remove("dark-theme");

        button.textContent="🌙";

        button.title="Ativar tema escuro";

    }

}


function toggleTheme(){

    document.body.classList.toggle("dark-theme");


    const isDark =
        document.body.classList.contains("dark-theme");


    localStorage.setItem(
        "travelTheme",
        isDark ? "dark" : "light"
    );


    const button =
        document.getElementById("themeButton");


    if(isDark){

        button.textContent="☀️";

        button.title="Ativar tema claro";

    }else{

        button.textContent="🌙";

        button.title="Ativar tema escuro";

    }

}


/* =====================================================
   PRIMEIRO ACESSO
===================================================== */

function checkFirstAccess(){

    const registeredUser =
    localStorage.getItem("registeredUser");

    const profileName =
    localStorage.getItem("profileName");


    if(
        !registeredUser ||
        !profileName
    ){

        document.body.classList.add("first-time");

        document
            .getElementById("firstAccess")
            .classList.add("show");

    }

}


/* =====================================================
   PRIMEIRO CADASTRO
===================================================== */

function finishFirstAccess(event){

    event.preventDefault();


    const name =
    document
        .getElementById("firstName")
        .value
        .trim();


    const user =
    document
        .getElementById("firstUser")
        .value
        .trim();


    const password =
    document
        .getElementById("firstPassword")
        .value;


    const description =
    document
        .getElementById("firstDescription")
        .value
        .trim();


    const error =
    document.getElementById("accessError");


    if(
        !name ||
        !user ||
        !password
    ){

        error.textContent =
        "❌ Preencha seu nome, usuário e senha.";

        error.classList.add("show");

        return;

    }


    error.classList.remove("show");


    localStorage.setItem(
        "registeredUser",
        user
    );


    localStorage.setItem(
        "registeredPassword",
        password
    );


    localStorage.setItem(
        "profileName",
        name
    );


    localStorage.setItem(
        "profileDescription",
        description ||
        "✈️ Viajante"
    );


    localStorage.setItem(
        "travelUser",
        user
    );


    currentUser=user;


    const photoInput =
    document.getElementById("firstPhoto");


    if(
        photoInput.files &&
        photoInput.files[0]
    ){

        const reader =
        new FileReader();


        reader.onload=function(e){

            localStorage.setItem(
                "profilePhoto",
                e.target.result
            );


            finishAccessScreen();

        };


        reader.readAsDataURL(
            photoInput.files[0]
        );

    }else{

        finishAccessScreen();

    }

}


/* =====================================================
   FINALIZAR PRIMEIRO ACESSO
===================================================== */

function finishAccessScreen(){

    document.body.classList.remove("first-time");


    document
        .getElementById("firstAccess")
        .classList.remove("show");


    loadProfile();

    updateNotificationCount();


    alert(
        "🎉 Perfil criado com sucesso!\n\n" +
        "Bem-vindo ao TravelFeed."
    );

}


/* =====================================================
   PRÉ-VISUALIZAÇÃO DA FOTO
===================================================== */

document
    .getElementById("firstPhoto")
    .addEventListener(
        "change",
        function(){

            const file =
            this.files[0];


            if(!file) return;


            const reader =
            new FileReader();


            reader.onload=function(e){

                document
                    .getElementById("photoPreview")
                    .innerHTML =
                    "<img src='" +
                    e.target.result +
                    "' alt='Prévia da foto'>";

            };


            reader.readAsDataURL(file);

        }
    );


/* =====================================================
   CURTIR COM CORAÇÕES
===================================================== */

function likePost(button){

    const article =
        button.closest(".trip-step");


    const imageArea =
        article.querySelector(".like-area");


    const liked =
        button.classList.toggle("liked");


    if(liked){

        button.innerHTML =
        "❤️ Curtido";


        /* Cria vários corações */

        for(let i=0;i<7;i++){

            createHeart(imageArea);

        }


        createNotification(
            currentUser
            ? currentUser + " curtiu uma publicação."
            : "Sua publicação recebeu uma curtida."
        );

    }else{

        button.innerHTML =
        "♡ Curtir";

    }

}


/* =====================================================
   ANIMAÇÃO DOS CORAÇÕES
===================================================== */

function createHeart(container){

    if(!container) return;


    const heart =
        document.createElement("div");


    heart.className="floating-heart";

    heart.textContent="❤️";


    const randomX =
        (Math.random() * 160 - 80) + "px";


    const randomDelay =
        (Math.random() * .35) + "s";


    heart.style.setProperty(
        "--heart-x",
        randomX
    );


    heart.style.animationDelay =
        randomDelay;


    heart.style.left =
        (30 + Math.random() * 40) + "%";


    container.appendChild(heart);


    setTimeout(
        function(){

            heart.remove();

        },
        1800
    );

}


/* =====================================================
   DUPLO CLIQUE NA FOTO = CURTIR
===================================================== */

document.addEventListener(
    "dblclick",
    function(event){

        const image =
            event.target.closest(
                ".like-area img"
            );


        if(!image) return;


        const article =
            image.closest(".trip-step");


        const button =
            article.querySelector(
                ".actions button"
            );


        if(!button.classList.contains("liked")){

            likePost(button);

        }else{

            const area =
                image.closest(".like-area");


            for(let i=0;i<7;i++){

                createHeart(area);

            }

        }

    }
);


/* =====================================================
   COMENTÁRIOS PÚBLICOS
===================================================== */

function toggleComments(button){

    const article =
    button.closest(".trip-step");


    const comments =
    article.querySelector(".comments");


    comments.style.display =
    comments.style.display === "none"
    ? "block"
    : "none";

}


function addComment(button){

    if(!currentUser){

        openLogin();

        return;

    }


    const form =
    button.closest(".comment-form");


    const input =
    form.querySelector("input");


    const text =
    input.value.trim();


    if(!text){

        alert(
            "Digite um comentário."
        );

        return;

    }


    const article =
    button.closest(".trip-step");


    const list =
    article.querySelector(".comment-list");


    const comment =
    document.createElement("div");


    comment.className="comment";


    comment.innerHTML =
        "<strong>" +
        escapeHTML(currentUser) +
        "</strong><br>" +
        escapeHTML(text) +
        "<br><small>agora mesmo</small>";


    /*
       O comentário é colocado diretamente
       na publicação, ficando visível
       publicamente para quem estiver
       vendo esta página no navegador.
    */

    list.appendChild(comment);


    input.value="";


    createNotification(
        currentUser +
        " comentou em uma publicação."
    );


    alert(
        "Comentário publicado! 💚"
    );

}


function commentEnter(event,input){

    if(event.key==="Enter"){

        event.preventDefault();


        const button =
        input
        .parentElement
        .querySelector("button");


        addComment(button);

    }

}


function escapeHTML(text){

    const div =
    document.createElement("div");


    div.textContent=text;


    return div.innerHTML;

}


/* =====================================================
   NOTIFICAÇÕES
===================================================== */

function createNotification(text){

    notifications.unshift({

        text:text,

        date:
        new Date()
        .toLocaleString("pt-BR")

    });


    localStorage.setItem(
        "travelNotifications",
        JSON.stringify(notifications)
    );


    updateNotificationCount();

}


function updateNotificationCount(){

    document.getElementById(
        "notificationCount"
    ).textContent =
    notifications.length;

}


function showNotifications(){

    const area =
    document.getElementById(
        "notifications"
    );


    area.style.display =
    area.style.display === "none"
    ? "block"
    : "none";


    const list =
    document.getElementById(
        "notificationList"
    );


    if(notifications.length===0){

        list.innerHTML =
        "<p style='margin-top:15px;color:#788487;'>" +
        "Você ainda não possui notificações." +
        "</p>";

        return;

    }


    list.innerHTML="";


    notifications.forEach(
        function(item){

            const notification =
            document.createElement("div");


            notification.className =
            "notification";


            notification.innerHTML =
            "🔔 <strong>" +
            escapeHTML(item.text) +
            "</strong><br>" +
            "<small>" +
            escapeHTML(item.date) +
            "</small>";


            list.appendChild(
                notification
            );

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

function openLogin(){

    document
        .getElementById("loginOverlay")
        .classList.add("show");

}


function closeLogin(){

    document
        .getElementById("loginOverlay")
        .classList.remove("show");

}


function login(){

    const user =
    document
        .getElementById("loginUser")
        .value
        .trim();


    const password =
    document
        .getElementById("loginPassword")
        .value;


    const savedUser =
    localStorage.getItem(
        "registeredUser"
    );


    const savedPassword =
    localStorage.getItem(
        "registeredPassword"
    );


    if(
        savedUser &&
        savedPassword &&
        user === savedUser &&
        password === savedPassword
    ){

        currentUser=user;


        localStorage.setItem(
            "travelUser",
            user
        );


        document
            .getElementById("loginError")
            .classList.remove("show");


        closeLogin();


        alert(
            "Login realizado com sucesso! 🌎"
        );

    }else{

        document
            .getElementById("loginError")
            .classList.add("show");

    }

}


/* =====================================================
   PERFIL
===================================================== */

function saveProfile(){

    const name =
    document
        .getElementById("profileName")
        .value
        .trim();


    const description =
    document
        .getElementById("profileDescription")
        .value
        .trim();


    if(!name){

        alert(
            "Digite seu nome."
        );

        return;

    }


    localStorage.setItem(
        "profileName",
        name
    );


    localStorage.setItem(
        "profileDescription",
        description
    );


    document
        .getElementById("homeProfileName")
        .textContent=name;


    document
        .getElementById("homeProfileDescription")
        .textContent=description;


    const photoInput =
    document.getElementById(
        "profilePhoto"
    );


    if(
        photoInput.files &&
        photoInput.files[0]
    ){

        const reader =
        new FileReader();


        reader.onload=function(event){

            localStorage.setItem(
                "profilePhoto",
                event.target.result
            );


            loadProfilePhoto();

        };


        reader.readAsDataURL(
            photoInput.files[0]
        );

    }


    alert(
        "Perfil atualizado com sucesso! 💚"
    );

}


function loadProfile(){

    const name =
    localStorage.getItem(
        "profileName"
    );


    const description =
    localStorage.getItem(
        "profileDescription"
    );


    if(name){

        document
            .getElementById("homeProfileName")
            .textContent=name;


        document
            .getElementById("profileName")
            .value=name;

    }


    if(description){

        document
            .getElementById("homeProfileDescription")
            .textContent=description;


        document
            .getElementById("profileDescription")
            .value=description;

    }


    loadProfilePhoto();

}


function loadProfilePhoto(){

    const photo =
    localStorage.getItem(
        "profilePhoto"
    );


    if(!photo){

        document
            .getElementById("homeAvatar")
            .innerHTML="?";

        return;

    }


    const avatar =
    document.getElementById(
        "homeAvatar"
    );


    avatar.innerHTML =
    "<img src='" +
    photo +
    "' alt='Foto do perfil'>";

}


/* =====================================================
   REINICIAR SISTEMA
===================================================== */

function restartSystem(){

    const confirmation =
    confirm(

        "🔄 Recomeçar cadastro?\n\n" +

        "Isso vai apagar o usuário, senha, " +
        "perfil, foto e notificações salvos " +
        "neste navegador.\n\n" +

        "A página será aberta como se fosse " +
        "sua primeira vez no TravelFeed."

    );


    if(!confirmation){

        return;

    }


    localStorage.removeItem(
        "travelUser"
    );

    localStorage.removeItem(
        "registeredUser"
    );

    localStorage.removeItem(
        "registeredPassword"
    );

    localStorage.removeItem(
        "profileName"
    );

    localStorage.removeItem(
        "profileDescription"
    );

    localStorage.removeItem(
        "profilePhoto"
    );

    localStorage.removeItem(
        "travelNotifications"
    );


    location.reload();

}


/* =====================================================
   NOVA VIAGEM
===================================================== */

function openTripCreator(){

    const creator =
    document.getElementById(
        "tripCreator"
    );


    creator.style.display="block";


    creator.scrollIntoView({
        behavior:"smooth"
    });

}


function createTrip(){

    if(!currentUser){

        openLogin();

        return;

    }


    const destination =
    document
        .getElementById("destination")
        .value
        .trim();


    const place =
    document
        .getElementById("place")
        .value
        .trim();


    if(!destination){

        alert(
            "Digite um destino."
        );

        return;

    }


    alert(

        "🗺️ Nova rota criada!\n\n" +

        "Destino: " +
        destination +

        "\nPonto turístico: " +
        (place || "A definir")

    );


    createNotification(
        "Sua nova viagem para " +
        destination +
        " foi criada."
    );

}


/* =====================================================
   DESTINOS
===================================================== */

function addDestination(destination){

    document
        .getElementById("destination")
        .value=destination;


    openTripCreator();


    createNotification(
        destination +
        " foi adicionada às suas ideias de viagem."
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

loadTheme();

loadProfile();

updateNotificationCount();

checkFirstAccess();