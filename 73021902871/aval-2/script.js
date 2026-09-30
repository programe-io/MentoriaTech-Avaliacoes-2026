
<script>

function getPosts() {
    return JSON.parse(localStorage.getItem("posts") || "[]");
}

function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}


function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


function getInitial(name) {
    return name.trim().charAt(0).toUpperCase() || "A";
}


function formatDate(timestamp) {

    const date = new Date(timestamp);

    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });

}


function render() {

    const container = document.getElementById("posts");
    const postCount = document.getElementById("postCount");

    container.innerHTML = "";

    let posts = getPosts();

    posts.sort((a, b) => b.id - a.id);

    postCount.textContent =
        `${posts.length} ${posts.length === 1 ? "risada" : "risadas"}`;


    if (posts.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">＋</div>
                <h3>Ninguém riu ainda 😶</h3>
                <p>Seja a primeira pessoa a soltar uma gargalhada.</p>
            </div>
        `;

        return;
    }


    posts.forEach(post => {

        const div = document.createElement("article");

        div.className = "post";


        div.innerHTML = `

            <div class="post-head">

                <div class="avatar">
                    ${escapeHTML(getInitial(post.name))}
                </div>

                <div class="user-info">

                    <strong>
                        ${escapeHTML(post.name)}
                    </strong>

                    <span>
                        ${formatDate(post.id)}
                    </span>

                </div>

                <div class="post-id">
                    #${String(post.id).slice(-4)}
                </div>

            </div>


            <div class="post-content">

                ${
                    post.text
                    ? `<p>${escapeHTML(post.text)}</p>`
                    : ""
                }

                ${
                    post.image
                    ? `
                        <div class="post-image">
                            <img src="${post.image}" alt="Imagem da publicação">
                        </div>
                    `
                    : ""
                }

            </div>


            <div class="post-actions">

                <button class="like">
                    <span class="heart">😂</span>
                    <span>${post.likes}</span>
                </button>

            </div>

        `;


        const likeButton = div.querySelector(".like");


        likeButton.onclick = () => {

            post.likes++;

            savePosts(posts);

            render();

        };


        container.appendChild(div);

    });

}


function postComment() {

    const nameInput = document.getElementById("name");
    const textInput = document.getElementById("comment");
    const fileInput = document.getElementById("imageUpload");

    const name = nameInput.value.trim() || "Risonho Anônimo";
    const text = textInput.value.trim();
    const file = fileInput.files[0];


    if (!text && !file) {

        textInput.focus();

        return;

    }


    const posts = getPosts();


    if (file) {

        const reader = new FileReader();


        reader.onload = function(e) {

            posts.push({

                id: Date.now(),

                name: name,

                text: text,

                image: e.target.result,

                likes: 0

            });


            savePosts(posts);

            clearForm();

            render();

        };


        reader.readAsDataURL(file);

    }

    else {

        posts.push({

            id: Date.now(),

            name: name,

            text: text,

            image: null,

            likes: 0

        });


        savePosts(posts);

        clearForm();

        render();

    }

}


function clearForm() {

    document.getElementById("comment").value = "";
    document.getElementById("imageUpload").value = "";
    document.getElementById("fileName").textContent = "";

}


document.getElementById("imageUpload").addEventListener(
    "change",
    function () {

        const fileName = document.getElementById("fileName");

        if (this.files[0]) {

            fileName.textContent =
                "Meme selecionado: " + this.files[0].name;

        }

        else {

            fileName.textContent = "";

        }

    }
);


render();

</script>
