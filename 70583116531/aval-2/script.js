// ======================================
// ELEMENTOS
// ======================================

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const themeBtn =
    document.getElementById("themeBtn");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const videoGrid =
    document.getElementById("videoGrid");

const noResults =
    document.getElementById("noResults");

const videoModal =
    document.getElementById("videoModal");

const closeModal =
    document.getElementById("closeModal");

const playerTitle =
    document.getElementById("playerTitle");

const modalVideoTitle =
    document.getElementById("modalVideoTitle");

const likeBtn =
    document.getElementById("likeBtn");

const subscribeBtn =
    document.getElementById("subscribeBtn");


// ======================================
// MENU LATERAL
// ======================================

menuBtn.addEventListener(
    "click",
    function () {

        if (
            window.innerWidth <= 900 &&
            window.innerWidth > 450
        ) {

            if (
                sidebar.style.width === "240px"
            ) {

                sidebar.style.width = "80px";

            } else {

                sidebar.style.width = "240px";

            }

        }

    }
);


// ======================================
// MODO ESCURO
// ======================================

themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle("dark");

        const darkMode =
            document.body.classList.contains(
                "dark"
            );

        themeBtn.textContent =
            darkMode ? "☀️" : "🌙";

        localStorage.setItem(
            "videoHubDarkMode",
            darkMode
        );

    }
);


// Recuperar preferência

const savedTheme =
    localStorage.getItem(
        "videoHubDarkMode"
    );

if (savedTheme === "true") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


// ======================================
// PESQUISA
// ======================================

function searchVideos() {

    const query =
        searchInput.value
            .toLowerCase()
            .trim();

    const videos =
        document.querySelectorAll(
            ".video-card"
        );

    let results = 0;


    videos.forEach(function (video) {

        const title =
            video.dataset.title
                .toLowerCase();

        const category =
            video.dataset.category
                .toLowerCase();

        const content =
            video.textContent
                .toLowerCase();


        const found =
            title.includes(query) ||
            category.includes(query) ||
            content.includes(query);


        if (found) {

            video.style.display = "";

            results++;

        } else {

            video.style.display = "none";

        }

    });


    if (results === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


searchBtn.addEventListener(
    "click",
    searchVideos
);


searchInput.addEventListener(
    "input",
    searchVideos
);


searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchVideos();

        }

    }
);


// ======================================
// CATEGORIAS
// ======================================

const categories =
    document.querySelectorAll(
        ".category"
    );


categories.forEach(function (category) {

    category.addEventListener(
        "click",
        function () {

            categories.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            category.classList.add(
                "active"
            );


            const selected =
                category.textContent
                    .trim();


            const videos =
                document.querySelectorAll(
                    ".video-card"
                );


            let results = 0;


            videos.forEach(function (video) {

                const videoCategory =
                    video.dataset.category;


                if (
                    selected === "Todos" ||
                    videoCategory === selected
                ) {

                    video.style.display = "";

                    results++;

                } else {

                    video.style.display =
                        "none";

                }

            });


            if (results === 0) {

                noResults.style.display =
                    "block";

            } else {

                noResults.style.display =
                    "none";

            }

        }
    );

});


// ======================================
// ABRIR VÍDEO
// ======================================

const thumbnails =
    document.querySelectorAll(
        ".thumbnail"
    );


thumbnails.forEach(function (thumbnail) {

    thumbnail.addEventListener(
        "click",
        function () {

            const title =
                thumbnail.dataset.video;


            playerTitle.textContent =
                title;


            modalVideoTitle.textContent =
                title;


            videoModal.classList.remove(
                "hidden"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});


// ======================================
// FECHAR MODAL
// ======================================

closeModal.addEventListener(
    "click",
    closeVideo
);


videoModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === videoModal
        ) {

            closeVideo();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeVideo();

        }

    }
);


function closeVideo() {

    videoModal.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";

}


// ======================================
// CURTIR VÍDEO
// ======================================

let liked = false;


likeBtn.addEventListener(
    "click",
    function () {

        liked = !liked;


        if (liked) {

            likeBtn.innerHTML =
                "👍 <span>Curtido</span>";

            likeBtn.style.background =
                "#dbeafe";

        } else {

            likeBtn.innerHTML =
                "👍 <span>Gostei</span>";

            likeBtn.style.background =
                "";

        }

    }
);


// ======================================
// INSCRIÇÃO
// ======================================

let subscribed = false;


subscribeBtn.addEventListener(
    "click",
    function () {

        subscribed = !subscribed;


        if (subscribed) {

            subscribeBtn.textContent =
                "Inscrito ✓";

            subscribeBtn.style.background =
                "#333";

        } else {

            subscribeBtn.textContent =
                "Inscrever-se";

            subscribeBtn.style.background =
                "";

        }

    }
);


// ======================================
// MENU LATERAL ATIVO
// ======================================

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );


menuItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            menuItems.forEach(
                function (menu) {

                    menu.classList.remove(
                        "active"
                    );

                }
            );


            item.classList.add("active");

        }
    );

});
