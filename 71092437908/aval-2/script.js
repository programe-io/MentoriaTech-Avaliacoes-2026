let files = JSON.parse(localStorage.getItem("fileManager")) || [];

let currentFolder = null;
let selectedItem = null;
let editingId = null;

const fileContainer = document.getElementById("fileContainer");
const emptyState = document.getElementById("emptyState");
const itemCount = document.getElementById("itemCount");
const search = document.getElementById("search");

const newBtn = document.getElementById("newBtn");
const newModal = document.getElementById("newModal");
const closeModal = document.getElementById("closeModal");

const editorModal = document.getElementById("editorModal");
const closeEditor = document.getElementById("closeEditor");

const fileName = document.getElementById("fileName");
const fileContent = document.getElementById("fileContent");

const contextMenu = document.getElementById("contextMenu");


// ==============================
// SALVAR
// ==============================

function saveData() {
    localStorage.setItem("fileManager", JSON.stringify(files));
}


// ==============================
// ID
// ==============================

function generateId() {
    return Date.now() + Math.random().toString(36).substring(2);
}


// ==============================
// RENDERIZAR
// ==============================

function render() {

    fileContainer.innerHTML = "";

    let visibleFiles = files.filter(item => {

        if (currentFolder) {
            return item.parent === currentFolder;
        }

        return item.parent === null;

    });


    const searchText = search.value.toLowerCase();

    if (searchText) {
        visibleFiles = files.filter(item =>
            item.name.toLowerCase().includes(searchText)
        );
    }


    itemCount.textContent =
        `${visibleFiles.length} ${visibleFiles.length === 1 ? "item" : "itens"}`;


    if (visibleFiles.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

        visibleFiles.forEach(item => {

            const card = document.createElement("div");

            card.className = "file-card";

            card.dataset.id = item.id;


            const icon = item.type === "folder"
                ? "📁"
                : getFileIcon(item.name);


            card.innerHTML = `
                <div class="file-icon">${icon}</div>

                <div class="file-name" title="${item.name}">
                    ${escapeHtml(item.name)}
                </div>

                <div class="file-info">
                    ${item.type === "folder"
                        ? "Pasta"
                        : formatSize(item.size || 0)}
                </div>

                <button class="more">⋮</button>
            `;


            // Abrir
            card.addEventListener("dblclick", () => {

                if (item.type === "folder") {

                    currentFolder = item.id;

                    updateBreadcrumb();

                    render();

                } else {

                    openFile(item);

                }

            });


            // Menu
            card.querySelector(".more").addEventListener("click", e => {

                e.stopPropagation();

                selectedItem = item;

                showContextMenu(
                    e.clientX,
                    e.clientY
                );

            });


            fileContainer.appendChild(card);

        });

    }

    updateStorage();
}


// ==============================
// ÍCONE
// ==============================

function getFileIcon(name) {

    const extension =
        name.split(".").pop().toLowerCase();


    const icons = {

        pdf: "📕",
        jpg: "🖼️",
        jpeg: "🖼️",
        png: "🖼️",
        gif: "🖼️",
        mp3: "🎵",
        mp4: "🎬",
        zip: "📦",
        rar: "📦",
        js: "🟨",
        html: "🌐",
        css: "🎨",
        json: "📋",
        txt: "📄",
        doc: "📘",
        docx: "📘",
        xls: "📗",
        xlsx: "📗"

    };

    return icons[extension] || "📄";
}


// ==============================
// NOVA PASTA
// ==============================

document.getElementById("createFolder")
    .addEventListener("click", () => {

        const name = prompt("Nome da pasta:");

        if (!name) return;

        files.push({

            id: generateId(),

            name: name,

            type: "folder",

            parent: currentFolder,

            created: new Date().toISOString()

        });

        saveData();

        newModal.classList.remove("show");

        render();

    });


// ==============================
// NOVO ARQUIVO
// ==============================

document.getElementById("createFile")
    .addEventListener("click", () => {

        editingId = null;

        fileName.value = "novo-arquivo.txt";

        fileContent.value = "";

        document.getElementById("editorTitle").textContent =
            "Novo arquivo";

        newModal.classList.remove("show");

        editorModal.classList.add("show");

    });


// ==============================
// SALVAR ARQUIVO
// ==============================

document.getElementById("saveFile")
    .addEventListener("click", () => {

        const name = fileName.value.trim();

        if (!name) {

            alert("Digite um nome para o arquivo.");

            return;

        }


        if (editingId) {

            const file = files.find(
                item => item.id === editingId
            );

            file.name = name;

            file.content = fileContent.value;

            file.size =
                new Blob([file.content]).size;

        } else {

            files.push({

                id: generateId(),

                name: name,

                type: "file",

                parent: currentFolder,

                content: fileContent.value,

                size:
                    new Blob([fileContent.value]).size,

                created:
                    new Date().toISOString()

            });

        }


        saveData();

        editorModal.classList.remove("show");

        render();

    });


// ==============================
// ABRIR ARQUIVO
// ==============================

function openFile(file) {

    editingId = file.id;

    fileName.value = file.name;

    fileContent.value = file.content || "";

    document.getElementById("editorTitle").textContent =
        "Editar arquivo";

    editorModal.classList.add("show");

}


// ==============================
// MENU CONTEXTO
// ==============================

function showContextMenu(x, y) {

    contextMenu.style.left = x + "px";

    contextMenu.style.top = y + "px";

    contextMenu.classList.add("show");

}


// Abrir
document.getElementById("openItem")
    .addEventListener("click", () => {

        if (!selectedItem) return;

        if (selectedItem.type === "folder") {

            currentFolder = selectedItem.id;

            updateBreadcrumb();

            render();

        } else {

            openFile(selectedItem);

        }

        contextMenu.classList.remove("show");

    });


// ==============================
// RENOMEAR
// ==============================

document.getElementById("renameItem")
    .addEventListener("click", () => {

        if (!selectedItem) return;

        const newName =
            prompt(
                "Novo nome:",
                selectedItem.name
            );

        if (!newName) return;

        selectedItem.name = newName;

        saveData();

        render();

        contextMenu.classList.remove("show");

    });


// ==============================
// EXCLUIR
// ==============================

document.getElementById("deleteItem")
    .addEventListener("click", () => {

        if (!selectedItem) return;

        const confirmed =
            confirm(
                `Excluir "${selectedItem.name}"?`
            );

        if (!confirmed) return;


        deleteRecursive(selectedItem.id);

        saveData();

        selectedItem = null;

        render();

        contextMenu.classList.remove("show");

    });


function deleteRecursive(id) {

    const children =
        files.filter(item => item.parent === id);

    children.forEach(child => {

        deleteRecursive(child.id);

    });

    files =
        files.filter(item => item.id !== id);

}


// ==============================
// DOWNLOAD
// ==============================

document.getElementById("downloadItem")
    .addEventListener("click", () => {

        if (!selectedItem) return;

        if (selectedItem.type === "folder") {

            alert("Pastas não podem ser baixadas nesta versão.");

            return;

        }


        const blob = new Blob(
            [selectedItem.content || ""],
            {
                type: "text/plain"
            }
        );


        const url =
            URL.createObjectURL(blob);


        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            selectedItem.name;

        a.click();


        URL.revokeObjectURL(url);

        contextMenu.classList.remove("show");

    });


// ==============================
// UPLOAD
// ==============================

document.getElementById("fileInput")
    .addEventListener("change", async function () {

        const selectedFiles = [...this.files];


        for (const file of selectedFiles) {

            const content =
                await readFile(file);


            files.push({

                id: generateId(),

                name: file.name,

                type: "file",

                parent: currentFolder,

                content: content,

                size: file.size,

                created:
                    new Date().toISOString()

            });

        }


        saveData();

        render();

        this.value = "";

    });


function readFile(file) {

    return new Promise(resolve => {

        const reader =
            new FileReader();

        reader.onload =
            () => resolve(reader.result);

        reader.readAsText(file);

    });

}


// ==============================
// PESQUISA
// ==============================

search.addEventListener("input", render);


// ==============================
// NOVO MENU
// ==============================

newBtn.addEventListener("click", () => {

    newModal.classList.add("show");

});

closeModal.addEventListener("click", () => {

    newModal.classList.remove("show");

});

closeEditor.addEventListener("click", () => {

    editorModal.classList.remove("show");

});


// ==============================
// CLICAR FORA
// ==============================

document.addEventListener("click", e => {

    if (!e.target.closest(".context-menu") &&
        !e.target.closest(".more")) {

        contextMenu.classList.remove("show");

    }

});


// ==============================
// BREADCRUMB
// ==============================

function updateBreadcrumb() {

    if (!currentFolder) {

        document.getElementById("breadcrumb")
            .textContent = "🏠 Início";

        return;

    }


    const folder =
        files.find(item => item.id === currentFolder);


    document.getElementById("breadcrumb")
        .textContent =
        `🏠 Início / ${folder.name}`;

}


// ==============================
// VISUALIZAÇÃO
// ==============================

document.getElementById("gridView")
    .addEventListener("click", () => {

        fileContainer.classList.remove("list");

        document.getElementById("gridView")
            .classList.add("active");

        document.getElementById("listView")
            .classList.remove("active");

    });


document.getElementById("listView")
    .addEventListener("click", () => {

        fileContainer.classList.add("list");

        document.getElementById("listView")
            .classList.add("active");

        document.getElementById("gridView")
            .classList.remove("active");

    });


// ==============================
// FILTROS
// ==============================

document.querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll(".nav-item")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            const filter =
                button.dataset.filter;


            if (filter === "all") {

                currentFolder = null;

                render();

                return;

            }


            let filtered =
                files.filter(item =>
                    item.type === filter
                );


            fileContainer.innerHTML = "";

            emptyState.style.display =
                filtered.length
                    ? "none"
                    : "block";


            filtered.forEach(item =>
                createFilteredCard(item)
            );

        });

    });


function createFilteredCard(item) {

    const card =
        document.createElement("div");

    card.className = "file-card";

    card.innerHTML = `

        <div class="file-icon">
            ${item.type === "folder"
                ? "📁"
                : getFileIcon(item.name)}
        </div>

        <div class="file-name">
            ${escapeHtml(item.name)}
        </div>

        <div class="file-info">
            ${item.type === "folder"
                ? "Pasta"
                : formatSize(item.size || 0)}
        </div>

    `;

    card.addEventListener("dblclick", () => {

        if (item.type === "folder") {

            currentFolder = item.id;

            updateBreadcrumb();

            render();

        } else {

            openFile(item);

        }

    });

    fileContainer.appendChild(card);

}


// ==============================
// ARMAZENAMENTO
// ==============================

function updateStorage() {

    const total =
        files.reduce(
            (sum, item) =>
                sum + (item.size || 0),
            0
        );


    document.getElementById("storageText")
        .textContent =
        formatSize(total) +
        " utilizados";


    const percentage =
        Math.min(
            (total / (50 * 1024 * 1024)) * 100,
            100
        );


    document.querySelector(".progress-bar")
        .style.width =
        Math.max(percentage, 2) + "%";

}


// ==============================
// FORMATA TAMANHO
// ==============================

function formatSize(bytes) {

    if (bytes === 0)
        return "0 B";

    const units =
        ["B", "KB", "MB", "GB"];

    const i =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );

    return (
        (bytes / Math.pow(1024, i))
            .toFixed(1)
        + " " +
        units[i]
    );

}


// ==============================
// SEGURANÇA HTML
// ==============================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ==============================
// INICIALIZAR
// ==============================

render();