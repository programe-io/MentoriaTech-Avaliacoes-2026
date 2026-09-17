:root {
    --background: #f7f7f5;
    --white: #ffffff;
    --text: #252525;
    --muted: #858585;
    --border: #e9e8e4;

    --primary: #7467d8;
    --primary-light: #eeeaff;

    --green: #62a985;
    --green-light: #eaf6ef;

    --orange: #e7a45d;
    --orange-light: #fff2df;

    --blue: #6498d8;
    --blue-light: #eaf2fc;

    --red: #d87575;
    --red-light: #fcecec;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background: var(--background);
    color: var(--text);
    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
}

button,
input,
textarea,
select {
    font: inherit;
}

button {
    cursor: pointer;
}


/* APP */

.app {
    display: flex;
    min-height: 100vh;
}


/* SIDEBAR */

.sidebar {
    width: 250px;
    background: #fff;
    border-right: 1px solid var(--border);

    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;

    padding: 30px 18px;

    display: flex;
    flex-direction: column;

    z-index: 20;
}

.brand {
    display: flex;
    align-items: center;
    gap: 11px;

    padding: 0 10px 35px;
}

.brand-icon {
    width: 40px;
    height: 40px;

    border-radius: 12px;

    background: var(--primary-light);
    color: var(--primary);

    display: grid;
    place-items: center;

    font-weight: 800;
}

.brand strong {
    display: block;
    font-size: 15px;
}

.brand span {
    display: block;

    color: var(--muted);

    font-size: 10px;

    margin-top: 2px;
}


.menu {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.menu-item {
    width: 100%;

    display: flex;
    align-items: center;
    gap: 12px;

    border: 0;
    background: transparent;

    padding: 12px 13px;

    border-radius: 9px;

    color: #777;

    font-size: 13px;

    text-align: left;
}

.menu-item:hover {
    background: #f7f7f7;
    color: var(--text);
}

.menu-item.active {
    background: var(--primary-light);
    color: var(--primary);
    font-weight: 600;
}

.menu-item span {
    width: 20px;
    text-align: center;
}

.menu-item b {
    margin-left: auto;

    font-size: 10px;

    background: #eee;

    padding: 3px 7px;

    border-radius: 20px;

    color: #888;
}


.sidebar-section {
    margin-top: 38px;
}

.sidebar-section > p {
    color: #aaa;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: .1em;

    margin: 0 13px 12px;
}

.category {
    width: 100%;

    border: 0;
    background: transparent;

    padding: 10px 13px;

    display: flex;
    align-items: center;
    gap: 10px;

    color: #777;

    font-size: 12px;

    text-align: left;
}

.category:hover {
    color: var(--text);
}

.dot {
    width: 7px;
    height: 7px;

    border-radius: 50%;
}

.purple {
    background: var(--primary);
}

.blue {
    background: var(--blue);
}

.green {
    background: var(--green);
}

.orange {
    background: var(--orange);
}


.sidebar-footer {
    margin-top: auto;

    border-top: 1px solid var(--border);

    padding: 17px 8px 0;

    display: flex;
    align-items: center;
    gap: 9px;
}

.mini-avatar,
.avatar {
    width: 34px;
    height: 34px;

    border-radius: 50%;

    display: grid;
    place-items: center;

    background: #eeeafc;
    color: var(--primary);

    font-size: 10px;
    font-weight: 700;
}

.sidebar-footer strong {
    display: block;
    font-size: 11px;
}

.sidebar-footer span {
    display: block;
    color: #999;
    font-size: 9px;
    margin-top: 2px;
}


/* MAIN */

.content {
    margin-left: 250px;

    width: calc(100% - 250px);

    min-height: 100vh;
}


/* TOPBAR */

.topbar {
    height: 72px;

    background: white;

    border-bottom: 1px solid var(--border);

    display: flex;
    align-items: center;

    padding: 0 38px;

    gap: 20px;
}

.search {
    width: 330px;

    display: flex;
    align-items: center;
    gap: 8px;

    background: #f8f8f7;

    border: 1px solid transparent;

    border-radius: 9px;

    padding: 9px 12px;
}

.search:focus-within {
    border-color: #ddd8f7;
    background: white;
}

.search span {
    color: #999;
}

.search input {
    width: 100%;

    border: 0;
    outline: 0;

    background: transparent;

    font-size: 12px;
}

.profile {
    border: 0;
    background: transparent;

    margin-left: auto;
}

.mobile-brand {
    display: none;
}


/* PAGE */

.page {
    max-width: 1200px;

    margin: 0 auto;

    padding: 40px;
}


/* WELCOME */

.welcome {
    display: flex;

    align-items: center;
    justify-content: space-between;

    margin-bottom: 28px;
}

.date {
    display: block;

    color: var(--muted);

    font-size: 11px;

    margin-bottom: 7px;

    text-transform: capitalize;
}

.welcome h1 {
    font-family: Georgia, serif;

    font-size: 28px;
    font-weight: 500;
}

.welcome p {
    color: var(--muted);

    font-size: 12px;

    margin-top: 6px;
}


.new-task {
    display: flex;
    align-items: center;
    gap: 8px;

    border: 0;

    background: var(--primary);
    color: white;

    border-radius: 9px;

    padding: 11px 16px;

    font-size: 12px;
    font-weight: 600;

    box-shadow: 0 5px 14px rgba(116, 103, 216, .18);

    transition: .2s;
}

.new-task:hover {
    transform: translateY(-1px);
    background: #6759ce;
}

.new-task span {
    font-size: 18px;
    font-weight: 300;
}


/* SUMMARY */

.summary {
    display: grid;

    grid-template-columns: 2fr 1fr 1fr;

    gap: 14px;

    margin-bottom: 35px;
}

.summary-card {
    background: white;

    border: 1px solid var(--border);

    border-radius: 13px;

    padding: 20px;
}

.summary-card > span {
    display: block;

    color: var(--muted);

    font-size: 11px;

    margin-bottom: 10px;
}

.summary-card > strong {
    font-size: 25px;
    font-weight: 600;
}

.summary-card small {
    display: block;

    color: #aaa;

    font-size: 10px;

    margin-top: 5px;
}


.main-summary {
    padding: 18px 20px;
}

.summary-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.summary-top span {
    display: block;

    color: var(--muted);

    font-size: 11px;
}

.summary-top strong {
    display: block;

    margin-top: 4px;

    font-size: 21px;
}

.progress-circle {
    width: 42px;
    height: 42px;

    border-radius: 50%;

    background: var(--green-light);

    color: var(--green);

    display: grid;
    place-items: center;

    font-size: 16px;
}

.progress-bar {
    height: 7px;

    background: #eee;

    border-radius: 20px;

    margin-top: 18px;

    overflow: hidden;
}

.progress-bar div {
    height: 100%;

    width: 0%;

    background: var(--green);

    border-radius: 20px;

    transition: .4s;
}

.main-summary p {
    color: #999;

    font-size: 10px;

    margin-top: 8px;
}


/* TASK HEADER */

.task-header {
    display: flex;

    align-items: end;

    justify-content: space-between;

    margin-bottom: 15px;
}

.task-header h2 {
    font-family: Georgia, serif;

    font-size: 19px;
    font-weight: 500;
}

.task-header p {
    color: var(--muted);

    font-size: 11px;

    margin-top: 4px;
}

.filters {
    display: flex;

    gap: 4px;

    background: #eee;

    padding: 3px;

    border-radius: 8px;
}

.filter {
    border: 0;

    background: transparent;

    padding: 7px 10px;

    border-radius: 6px;

    color: #888;

    font-size: 10px;
}

.filter.active {
    background: white;

    color: var(--text);

    box-shadow: 0 1px 4px rgba(0,0,0,.05);
}


/* TASK */

.tasks {
    display: flex;

    flex-direction: column;

    gap: 8px;
}

.task {
    background: white;

    border: 1px solid var(--border);

    border-radius: 11px;

    padding: 15px 16px;

    display: flex;

    align-items: center;

    gap: 13px;

    transition: .2s;
}

.task:hover {
    border-color: #dcd9ed;

    transform: translateY(-1px);
}

.task.done {
    opacity: .58;
}

.check {
    width: 22px;
    height: 22px;

    flex-shrink: 0;

    border: 1.5px solid #d1d1d1;

    border-radius: 50%;

    background: white;

    display: grid;
    place-items: center;

    color: white;

    font-size: 11px;
}

.check:hover {
    border-color: var(--green);
}

.task.done .check {
    background: var(--green);
    border-color: var(--green);
}

.task-body {
    min-width: 0;
    flex: 1;
}

.task-title {
    font-size: 12px;
    font-weight: 600;
}

.task.done .task-title {
    text-decoration: line-through;
}

.task-description {
    color: #999;

    font-size: 10px;

    margin-top: 4px;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
}

.task-info {
    display: flex;

    align-items: center;

    gap: 8px;

    margin-top: 7px;
}

.tag {
    font-size: 9px;

    padding: 4px 7px;

    border-radius: 20px;

    background: #f4f4f4;

    color: #777;
}

.tag.Trabalho {
    background: var(--primary-light);
    color: var(--primary);
}

.tag.Estudos {
    background: var(--blue-light);
    color: var(--blue);
}

.tag.Pessoal {
    background: var(--green-light);
    color: var(--green);
}

.tag.Casa {
    background: var(--orange-light);
    color: #c5863e;
}

.priority {
    font-size: 9px;
}

.priority.high {
    color: var(--red);
}

.priority.low {
    color: #aaa;
}

.task-date {
    color: #999;

    font-size: 9px;
}

.task-actions {
    display: flex;

    gap: 4px;
}

.task-action {
    width: 29px;
    height: 29px;

    border: 0;

    background: transparent;

    color: #aaa;

    border-radius: 6px;

    opacity: 0;
}

.task:hover .task-action {
    opacity: 1;
}

.task-action:hover {
    background: #f5f5f5;

    color: var(--text);
}


/* EMPTY */

.empty {
    text-align: center;

    padding: 60px 20px;

    display: none;
}

.empty.visible {
    display: block;
}

.empty-icon {
    width: 50px;
    height: 50px;

    border-radius: 50%;

    background: #f0eee9;

    margin: 0 auto 15px;

    display: grid;
    place-items: center;

    font-size: 20px;
}

.empty h3 {
    font-family: Georgia, serif;

    font-size: 17px;

    font-weight: 500;
}

.empty p {
    color: #999;

    font-size: 11px;

    max-width: 300px;

    margin: 7px auto 18px;

    line-height: 1.5;
}


/* MODAL */

.modal-overlay {
    position: fixed;

    inset: 0;

    background: rgba(30,30,30,.35);

    display: none;

    align-items: center;
    justify-content: center;

    z-index: 100;

    padding: 20px;
}

.modal-overlay.show {
    display: flex;
}

.modal {
    width: 560px;

    max-width: 100%;

    max-height: 90vh;

    overflow-y: auto;

    background: white;

    border-radius: 15px;

    box-shadow: 0 20px 60px rgba(0,0,0,.15);
}

.modal-header {
    display: flex;

    justify-content: space-between;

    padding: 22px;

    border-bottom: 1px solid var(--border);
}

.modal-header h2 {
    font-family: Georgia, serif;

    font-size: 19px;

    font-weight: 500;
}

.modal-header p {
    color: #999;

    font-size: 10px;

    margin-top: 4px;
}

.close {
    width: 30px;
    height: 30px;

    border: 0;

    background: transparent;

    color: #888;

    font-size: 24px;
}

form {
    padding: 22px;
}

label {
    display: block;

    color: #555;

    font-size: 10px;
    font-weight: 600;

    margin-bottom: 7px;

    margin-top: 15px;
}

label:first-of-type {
    margin-top: 0;
}

input,
textarea,
select {
    width: 100%;

    border: 1px solid var(--border);

    background: #fafafa;

    border-radius: 8px;

    outline: none;

    padding: 11px;

    font-size: 12px;

    color: var(--text);
}

input:focus,
textarea:focus,
select:focus {
    border-color: #c9c2f4;

    background: white;
}

textarea {
    height: 90px;

    resize: vertical;
}

.form-row {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 12px;
}

.modal-actions {
    display: flex;

    justify-content: flex-end;

    gap: 8px;

    margin-top: 22px;

    padding-top: 17px;

    border-top: 1px solid var(--border);
}

.cancel {
    border: 1px solid var(--border);

    background: white;

    border-radius: 8px;

    padding: 10px 15px;

    font-size: 11px;
}

.save {
    border: 0;

    background: var(--primary);

    color: white;

    border-radius: 8px;

    padding: 10px 17px;

    font-size: 11px;

    font-weight: 600;
}


/* TOAST */

.toast {
    position: fixed;

    right: 25px;
    bottom: 25px;

    background: #282828;

    color: white;

    padding: 12px 16px;

    border-radius: 8px;

    font-size: 11px;

    opacity: 0;

    transform: translateY(10px);

    pointer-events: none;

    transition: .25s;

    z-index: 200;
}

.toast.show {
    opacity: 1;

    transform: translateY(0);
}


/* RESPONSIVO */

@media(max-width: 900px) {

    .sidebar {
        transform: translateX(-100%);
        transition: .25s;
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .content {
        margin-left: 0;

        width: 100%;
    }

    .mobile-brand {
        display: flex;

        align-items: center;

        gap: 8px;
    }

    .mobile-brand button {
        border: 0;

        background: transparent;

        font-size: 18px;
    }

    .search {
        margin-left: auto;

        width: 250px;
    }

    .page {
        padding: 30px 20px;
    }
}


@media(max-width: 650px) {

    .topbar {
        padding: 0 17px;
    }

    .search {
        width: auto;
        flex: 1;
    }

    .profile {
        display: none;
    }

    .summary {
        grid-template-columns: 1fr 1fr;
    }

    .main-summary {
        grid-column: 1 / -1;
    }

    .welcome {
        align-items: flex-start;

        gap: 20px;

        flex-direction: column;
    }

    .task-header {
        align-items: flex-start;

        gap: 12px;

        flex-direction: column;
    }

    .task-action {
        opacity: 1;
    }
}


@media(max-width: 450px) {

    .summary {
        grid-template-columns: 1fr;
    }

    .main-summary {
        grid-column: auto;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .task {
        align-items: flex-start;
    }

    .task-actions {
        flex-direction: column;
    }

    .task-date {
        display: none;
    }
}