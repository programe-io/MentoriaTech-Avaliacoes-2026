
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
    }

    function addNote() {
        const title = document.getElementById("title").value.trim();
            const content = document.getElementById("content").value.trim();

                if (!title || !content) {
                        alert("Preencha o título e a anotação!");
                                return;
                                    }

                                        notes.push({
                                                id: Date.now(),
                                                        title: title,
                                                                content: content
                                                                    });

                                                                        saveNotes();

                                                                            document.getElementById("title").value = "";
                                                                                document.getElementById("content").value = "";

                                                                                    renderNotes();
                                                                                    }

                                                                                    function deleteNote(id) {
                                                                                        notes = notes.filter(note => note.id !== id);

                                                                                            saveNotes();
                                                                                                renderNotes();
                                                                                                }

                                                                                                function renderNotes() {
                                                                                                    const container = document.getElementById("notes");

                                                                                                        container.innerHTML = "";

                                                                                                            notes.forEach(note => {
                                                                                                                    const card = document.createElement("article");
                                                                                                                            card.className = "note";

                                                                                                                                    const heading = document.createElement("h3");
                                                                                                                                            heading.textContent = note.title;

                                                                                                                                                    const paragraph = document.createElement("p");
                                                                                                                                                            paragraph.textContent = note.content;

                                                                                                                                                                    const button = document.createElement("button");
                                                                                                                                                                            button.textContent = "Excluir";
                                                                                                                                                                                    button.onclick = () => deleteNote(note.id);

                                                                                                                                                                                            card.append(heading, paragraph, button);
                                                                                                                                                                                                    container.appendChild(card);
                                                                                                                                                                                                        });
                                                                                                                                                                                                        }

                                                                                                                                                                                                        renderNotes();
                                                                                                                                                                                                        