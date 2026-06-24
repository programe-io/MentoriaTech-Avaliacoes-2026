* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    width: 90%;
    max-width: 500px;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.input-area {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    flex: 1;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
}

input:focus {
    border-color: #4f46e5;
}

button {
    border: none;
    padding: 12px 15px;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
}

#addBtn {
    background: #4f46e5;
    color: white;
}

#addBtn:hover {
    background: #4338ca;
}

#taskList {
    list-style: none;
}

.task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f3f4f6;
    margin-bottom: 10px;
    padding: 12px;
    border-radius: 8px;
}

.task.completed span {
    text-decoration: line-through;
    color: gray;
}

.actions {
    display: flex;
    gap: 5px;
}

.complete-btn {
    background: #22c55e;
    color: white;
}

.delete-btn {
    background: #ef4444;
    color: white;
}

.footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#clearBtn {
    background: #111827;
    color: white;
}