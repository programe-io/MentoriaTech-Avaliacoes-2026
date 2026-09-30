@media (max-width: 1200px) {

    .app-layout {
        grid-template-columns:
            220px
            minmax(400px, 1fr);
    }

    .right-sidebar {
        display: none;
    }

    .topbar-left {
        width: 220px;
    }

    .search-box {
        width: 300px;
    }
}


@media (max-width: 900px) {

    .app-layout {
        display: block;

        padding-left: 15px;
        padding-right: 15px;
    }

    .sidebar {
        position: fixed;

        left: -280px;

        width: 250px;

        background: var(--surface);

        padding: 20px;

        z-index: 2000;

        transition: .3s;

        box-shadow: 10px 0 30px rgba(0,0,0,.08);
    }

    .sidebar.open {
        left: 0;
    }

    .mobile-menu-button {
        display: flex;

        align-items: center;
        justify-content: center;

        width: 35px;
        height: 35px;

        margin-right: 5px;

        background: transparent;

        color: var(--text-secondary);

        border-radius: 8px;
    }

    .topbar-left {
        width: auto;
    }

    .search-box {
        margin-left: 20px;

        flex: 1;

        max-width: 400px;
    }

    .main-content {
        max-width: 700px;

        margin: 0 auto;
    }
}


@media (max-width: 650px) {

    :root {
        --header-height: 60px;
    }

    .topbar {
        padding: 0 12px;
    }

    .logo > span:last-child {
        display: none;
    }

    .search-box {
        margin-left: 10px;

        width: auto;
    }

    .topbar-actions {
        gap: 2px;
    }

    .topbar-actions .icon-button:nth-child(2) {
        display: none;
    }

    .app-layout {
        padding-top: 75px;
    }

    .stories-card,
    .create-post-card,
    .post-card {
        border-radius: 10px;
    }

    .create-action {
        font-size: 10px;
    }

    .create-action i {
        font-size: 14px;
    }

    .page-header h1 {
        font-size: 20px;
    }

    .page-header p {
        font-size: 11px;
    }

    .explore-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .friends-grid {
        grid-template-columns: 1fr;
    }

    .messages-layout {
        height: calc(100vh - 90px);

        grid-template-columns: 1fr;
    }

    .conversation-list {
        display: none;
    }

    .profile-cover {
        height: 170px;
    }

    .profile-info-card {
        padding: 0 15px 15px;
    }

    .profile-main {
        flex-wrap: wrap;
    }

    .profile-avatar {
        width: 90px;
        height: 90px;
    }

    .profile-avatar-wrapper {
        margin-top: -45px;
    }

    .profile-name h1 {
        font-size: 17px;
    }

    .profile-main .secondary-button {
        margin-left: auto;
    }

    .profile-stats {
        gap: 20px;
    }

    .profile-details {
        flex-direction: column;

        gap: 7px;
    }
}


@media (max-width: 430px) {

    .search-box {
        max-width: none;
    }

    .search-box input {
        font-size: 11px;
    }

    .profile-mini {
        width: 35px;
        height: 35px;
    }

    .topbar .icon-button {
        width: 35px;
        height: 35px;
    }

    .explore-grid {
        grid-template-columns: 1fr;
    }

    .create-post-actions {
        justify-content: space-between;
    }

    .create-action {
        padding: 5px;
    }

    .create-action i {
        margin-right: 0;
    }

    .create-action {
        font-size: 0;
    }

    .create-action i {
        font-size: 17px;
    }

    .modal {
        padding: 15px;
    }
}
