
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #fafafa;
}

header {
    height: 65px;
    background: white;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: sticky;
    top: 0;
    z-index: 10;
}

header h1 {
    font-family: cursive;
    font-size: 28px;
}

header input {
    padding: 10px;
    background: #efefef;
    border: none;
    border-radius: 8px;
}

.header-icons {
    display: flex;
    gap: 20px;
    font-size: 23px;
    cursor: pointer;
}

main {
    width: 500px;
    max-width: 95%;
    margin: 25px auto;
}

.stories {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.story {
    text-align: center;
    font-size: 12px;
}

.story img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #e1306c;
    padding: 2px;
    object-fit: cover;
}

.story p {
    margin-top: 5px;
}

.new-post {
    background: white;
    padding: 15px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    border-radius: 8px;
}

.new-post h3 {
    margin-bottom: 12px;
}

.new-post input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.new-post button {
    width: 100%;
    padding: 10px;
    background: #0095f6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.post {
    background: white;
    border: 1px solid #ddd;
    margin-bottom: 25px;
    border-radius: 8px;
    overflow: hidden;
}

.post-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
}

.post-header img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.post-image {
    width: 100%;
    display: block;
}

.post-actions {
    padding: 10px;
}

.post-actions button {
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    margin-right: 10px;
}

.post p {
    padding: 5px 12px;
}

.likes {
    font-weight: bold;
}

@media (max-width: 600px) {
    header input {
        display: none;
    }

    header h1 {
        font-size: 23px;
    }

    .header-icons {
        gap: 12px;
    }

    main {
        width: 100%;
        margin-top: 10px;
    }

    .post {
        border-radius: 0;
    }
}
