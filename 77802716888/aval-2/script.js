
/* =========================
   DADOS DO PERFIL
========================= */

let profile = JSON.parse(
    localStorage.getItem("blinderProfile") || "null"
);

if (!profile) {
    profile = {
        name: "Maju🧡",
        bio: "Vivendo bons momentos e conhecendo pessoas novas ✨",
        photo: ""
    };
}

/* =========================
   USUÁRIOS
========================= */

const users = [
    {
        name: "Mari",
        age: 16,
        bio: "Vivendo bons momentos e conhecendo pessoas novas ✨",
        interests: [
            "🎵 Música",
            "📸 Fotos",
            "🎬 Filmes"
        ],
        compatibility: 92,
        online: true
    },

    {
        name: "Ana",
        age: 16,
        bio: "Gosto de conversar, música e novos objetivos 💜",
        interests: [
            "🎵 Música",
            "📚 Livros",
            "✈️ Viagens"
        ],
        compatibility: 84,
        online: true
    },

    {
        name: "Lucas",
        age: 17,
        bio: "Um dia de cada vez. Sempre buscando coisas novas.",
        interests: [
            "🎮 Games",
            "🎬 Filmes",
            "🎵 Música"
        ],
        compatibility: 78,
        online: true
    },

    {
        name: "Pedro",
        age: 16,
        bio: "Música, amigos e diversão 🎵",
        interests: [
            "🎵 Música",
            "⚽ Esportes",
            "🎮 Games"
        ],
        compatibility: 74,
        online: false
    }
];

/* =========================
   STORAGE
========================= */

let notifications = JSON.parse(
    localStorage.getItem("blinderNotifications") || "[]"
);

let interests = JSON.parse(
    localStorage.getItem("blinderInterests") || "[]"
);

let messages = JSON.parse(
    localStorage.getItem("blinderMessages") || "[]"
);

let selectedUser = "";
let temporaryPhoto = "";

/* =========================
   SALVAR
========================= */

function saveData() {
    localStorage.setItem(
        "blinderNotifications",
        JSON.stringify(notifications)
    );

    localStorage.setItem(
        "blinderInterests",
        JSON.stringify(interests)
    );

    localStorage.setItem(
        "blinderMessages",
        JSON.stringify(messages)
    );

    localStorage.setItem(
        "blinderProfile",
        JSON.stringify(profile)
    );
}

/* =========================
   ESCAPAR HTML
========================= */

function escapeHTML(text) {
    const div = document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;
}

/* =========================
   AVATAR
========================= */

function userAvatar(user) {
    return user.name
        .charAt(0)
        .toUpperCase();
}

function avatarHTML(letter, photo = "") {

    if (photo) {
        return `
            <img
                src="${photo}"
                alt="Foto de perfil"
            >
        `;
    }

    return escapeHTML(letter);
}

/* =========================
   ATUALIZAR PERFIL
========================= */

function updateProfileUI() {

    const miniAvatar =
        document.getElementById("miniAvatar");

    const miniName =
        document.getElementById("miniName");

    const welcomeTitle =
        document.getElementById("welcomeTitle");

    miniName.textContent = profile.name;

    welcomeTitle.textContent =
        "Olá, " +
        profile.name.replace("🧡", "") +
        "! 💖";

    miniAvatar.innerHTML =
        avatarHTML(
            profile.name.charAt(0).toUpperCase(),
            profile.photo
        );
}

/* =========================
   PERFIL EM DESTAQUE
========================= */

function renderFeatured() {

    const user = users[0];

    document.getElementById("featured").innerHTML = `
        <div class="profile-card card">

            <div class="profile-main">

                <div class="avatar">
                    ${userAvatar(user)}
                </div>

                <div class="profile-info">

                    <h2>
                        ${escapeHTML(user.name)}
                        💖
                    </h2>

                    <span class="badge">
                        🟢 Online agora
                    </span>

                    <p class="bio">
                        ${escapeHTML(user.bio)}
                    </p>

                    <div class="interests">

                        ${user.interests.map(
                            interest => `
                                <span class="interest">
                                    ${escapeHTML(interest)}
                                </span>
                            `
                        ).join("")}

                    </div>

                </div>

                <div class="match">

                    <strong>
                        ${user.compatibility}%
                    </strong>

                    <small>
                        compatível
                    </small>

                </div>

            </div>

            <div class="profile-actions">

                <button
                    class="primary"
                    onclick="likeUser('${user.name}')"
                >
                    💖 Tenho interesse
                </button>

                <button
                    class="secondary"
                    onclick="openMessage('${user.name}')"
                >
                    💌 Mensagem
                </button>

            </div>

        </div>
    `;
}

/* =========================
   PESSOAS
========================= */

function renderPeople(list = users.slice(1)) {

    const container =
        document.getElementById("people");

    container.innerHTML = "";

    if (!list.length) {

        container.innerHTML = `
            <div
                class="card"
                style="
                    padding:25px;
                    grid-column:1/-1;
                    text-align:center
                "
            >
                🔎 Nenhuma pessoa encontrada.
            </div>
        `;

        return;
    }

    list.forEach(user => {

        const interested =
            interests.includes(user.name);

        const div =
            document.createElement("div");

        div.className = "person";

        div.innerHTML = `
            <div class="avatar">
                ${userAvatar(user)}
            </div>

            <h3>
                ${escapeHTML(user.name)}, ${user.age}
            </h3>

            <p>
                ${escapeHTML(user.bio)}
            </p>

            <div class="interests">

                ${user.interests.map(
                    interest => `
                        <span class="interest">
                            ${escapeHTML(interest)}
                        </span>
                    `
                ).join("")}

            </div>

            <p style="margin-top:12px">
                💕 ${user.compatibility}% compatível
            </p>

            <button
                onclick="likeUser('${user.name}')"
            >
                ${
                    interested
                        ? "💖 Interessado"
                        : "💕 Tenho interesse"
                }
            </button>

            <button
                onclick="openMessage('${user.name}')"
                style="
                    margin-top:7px;
                    background:#ffe1f0;
                    color:#ff1493;
                "
            >
                💌 Mensagem
            </button>
        `;

        container.appendChild(div);
    });
}

/* =========================
   INTERESSE
========================= */

function likeUser(name) {

    if (!interests.includes(name)) {

        interests.push(name);

        addNotification(
            "💖 Você demonstrou interesse em " +
            name +
            "!"
        );

    } else {

        interests =
            interests.filter(
                user => user !== name
            );

        addNotification(
            "Você removeu " +
            name +
            " dos seus interesses."
        );
    }

    saveData();

    renderPeople();
}

/* =========================
   MENSAGEM
========================= */

function openMessage(name) {

    selectedUser = name;

    document.getElementById(
        "messageUser"
    ).textContent = name;

    document.getElementById(
        "messageText"
    ).value = "";

    document.getElementById(
        "messageModal"
    ).style.display = "flex";
}

function closeMessage() {

    document.getElementById(
        "messageModal"
    ).style.display = "none";
}

function sendMessage() {

    const text =
        document
            .getElementById("messageText")
            .value
            .trim();

    if (!text) {

        alert(
            "Escreva uma mensagem primeiro."
        );

        return;
    }

    messages.push({

        to: selectedUser,

        from: profile.name,

        text: text,

        time:
            new Date().toLocaleTimeString(
                "pt-BR",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )
    });

    addNotification(
        "💌 Mensagem enviada para " +
        selectedUser +
        "!"
    );

    saveData();

    closeMessage();
}

/* =========================
   NOTIFICAÇÕES
========================= */

function addNotification(text) {

    notifications.unshift({

        text: text,

        time:
            new Date().toLocaleTimeString(
                "pt-BR",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )
    });

    notifications =
        notifications.slice(0, 20);

    saveData();

    renderNotifications();
}

function renderNotifications() {

    const list =
        document.getElementById(
            "notificationList"
        );

    if (!notifications.length) {

        list.innerHTML = `
            <p
                class="muted"
                style="margin-top:10px"
            >
                Nenhuma notificação.
            </p>
        `;

        return;
    }

    list.innerHTML =
        notifications.map(
            notification => `
                <div class="notification-item">

                    ${escapeHTML(notification.text)}

                    <br>

                    <small class="muted">
                        ${escapeHTML(notification.time)}
                    </small>

                </div>
            `
        ).join("");
}

function toggleNotifications() {

    const box =
        document.getElementById(
            "notificationBox"
        );

    box.style.display =
        box.style.display === "block"
            ? "none"
            : "block";
}

/* =========================
   PESQUISA
========================= */

function searchPeople(query) {

    query =
        query.trim().toLowerCase();

    if (!query) {

        renderPeople();

        return;
    }

    const result =
        users.filter(
            user =>
                user.name
                    .toLowerCase()
                    .includes(query) ||

                user.bio
                    .toLowerCase()
                    .includes(query) ||

                user.interests.some(
                    interest =>
                        interest
                            .toLowerCase()
                            .includes(query)
                )
        );

    renderPeople(
        result.filter(
            user =>
                user.name !== "Majucuja"
        )
    );
}

/* =========================
   INTERESSES
========================= */

function showMatches() {

    const matched =
        users.filter(
            user =>
                interests.includes(
                    user.name
                )
        );

    document.getElementById(
        "people"
    ).innerHTML = "";

    if (!matched.length) {

        document.getElementById(
            "people"
        ).innerHTML = `
            <div
                class="card"
                style="
                    padding:30px;
                    grid-column:1/-1;
                    text-align:center
                "
            >
                💕

                <br><br>

                Você ainda não demonstrou
                interesse em ninguém.
            </div>
        `;

        return;
    }

    renderPeople(matched);
}

/* =========================
   MENSAGENS
========================= */

function showMessages() {

    const container =
        document.getElementById(
            "people"
        );

    container.innerHTML = "";

    if (!messages.length) {

        container.innerHTML = `
            <div
                class="card"
                style="
                    padding:30px;
                    grid-column:1/-1;
                    text-align:center
                "
            >
                💌

                <br><br>

                Você ainda não enviou mensagens.
            </div>
        `;

        return;
    }

    messages.forEach(message => {

        const div =
            document.createElement("div");

        div.className = "person";

        div.innerHTML = `
            <div class="avatar">
                ${escapeHTML(
                    message.to.charAt(0)
                )}
            </div>

            <h3>
                ${escapeHTML(message.to)}
            </h3>

            <p>
                "${escapeHTML(message.text)}"
            </p>

            <small class="muted">
                ${escapeHTML(message.time)}
            </small>

            <br><br>

            <button
                onclick="openMessage('${escapeHTML(message.to)}')"
            >
                💌 Enviar outra
            </button>
        `;

        container.appendChild(div);
    });
}

/* =========================
   EDITAR PERFIL
========================= */

function openProfile() {

    document.getElementById(
        "profileName"
    ).value = profile.name;

    document.getElementById(
        "profileBio"
    ).value = profile.bio;

    temporaryPhoto =
        profile.photo || "";

    updatePreview();

    document.getElementById(
        "profileModal"
    ).style.display = "flex";
}

function closeProfile() {

    document.getElementById(
        "profileModal"
    ).style.display = "none";

    temporaryPhoto = "";
}

function previewPhoto(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        alert(
            "Escolha um arquivo de imagem."
        );

        return;
    }

    const reader =
        new FileReader();

    reader.onload = function(event) {

        temporaryPhoto =
            event.target.result;

        updatePreview();
    };

    reader.readAsDataURL(file);
}

function updatePreview() {

    const preview =
        document.getElementById(
            "profilePreview"
        );

    if (temporaryPhoto) {

        preview.innerHTML = `
            <img
                src="${temporaryPhoto}"
                alt="Prévia da foto"
            >
        `;

    } else {

        const name =
            document.getElementById(
                "profileName"
            ).value || "M";

        preview.innerHTML =
            escapeHTML(
                name.charAt(0).toUpperCase()
            );
    }
}

document
    .getElementById("profileName")
    .addEventListener(
        "input",
        updatePreview
    );

function saveProfile() {

    const name =
        document
            .getElementById("profileName")
            .value
            .trim();

    const bio =
        document
            .getElementById("profileBio")
            .value
            .trim();

    if (!name) {

        alert(
            "Digite um nome para o seu perfil."
        );

        return;
    }

    profile.name = name;

    profile.bio =
        bio ||
        "Conhecendo pessoas novas ✨";

    profile.photo =
        temporaryPhoto;

    saveData();

    updateProfileUI();

    addNotification(
        "✨ Seu perfil foi atualizado!"
    );

    closeProfile();
}

/* =========================
   MODO ESCURO
========================= */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark"
    );

    const dark =
        document.body.classList.contains(
            "dark"
        );

    localStorage.setItem(
        "blinderDarkMode",
        dark
    );

    updateDarkButton();
}

function updateDarkButton() {

    const button =
        document.getElementById(
            "darkModeButton"
        );

    const dark =
        document.body.classList.contains(
            "dark"
        );

    button.textContent =
        dark ? "☀️" : "🌙";

    button.title =
        dark
            ? "Modo claro"
            : "Modo escuro";
}

/* =========================
   HOME
========================= */

function goHome() {

    renderFeatured();

    renderPeople();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =========================
   FECHAR MODAIS
========================= */

document
    .getElementById("messageModal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {
                closeMessage();
            }
        }
    );

document
    .getElementById("profileModal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {
                closeProfile();
            }
        }
    );

/* =========================
   INICIALIZAÇÃO
========================= */

if (
    localStorage.getItem(
        "blinderDarkMode"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );
}

updateDarkButton();
updateProfileUI();
renderFeatured();
renderPeople();
renderNotifications();

if (!notifications.length) {

    addNotification(
        "💖 Bem-vinda ao Blinder!"
    );

    addNotification(
        "✨ Você tem um novo perfil para conhecer: Majucuja."
    );
}
```
