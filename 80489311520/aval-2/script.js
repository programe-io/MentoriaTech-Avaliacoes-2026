* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f4f7f6;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.counter-container {
    background: #ffffff;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    text-align: center;
    width: 350px;
}

h1 {
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 1rem;
}

#value {
    display: block;
    font-size: 4.5rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
}

.button-container {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn {
    border: none;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: #e2e8f0;
    color: #4a5568;
}

.btn:hover {
    transform: translateY(-2px);
    filter: brightness(0.9);
}

/* Classes utilitárias aplicadas via JavaScript */
.positive {
    color: #2ecc71 !important;
}

.negative {
    color: #e74c3c !important;
}
