class TradingApp {
    constructor() {
        this.canvas = document.getElementById('mainChart');
        this.ctx = this.canvas.getContext('2d');
        this.candles = [];
        this.currentPrice = 1.09243;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.generateHistory(); // Cria dados iniciais
        this.startTick();       // Inicia o mercado em tempo real
        this.render();          // Inicia o loop de desenho
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    generateHistory() {
        for (let i = 0; i < 50; i++) {
            this.addCandle();
        }
    }

    addCandle() {
        const lastOpen = this.candles.length > 0 ? this.candles[this.candles.length - 1].close : this.currentPrice;
        const close = lastOpen + (Math.random() - 0.5) * 0.002;
        this.candles.push({
            open: lastOpen,
            close: close,
            high: Math.max(lastOpen, close) + Math.random() * 0.001,
            low: Math.min(lastOpen, close) - Math.random() * 0.001
        });
    }

    startTick() {
        setInterval(() => {
            // Simula variação de micro-preço (Tick)
            const change = (Math.random() - 0.5) * 0.0005;
            this.currentPrice += change;
            
            // Atualiza a última vela ou cria uma nova a cada minuto
            let lastCandle = this.candles[this.candles.length - 1];
            lastCandle.close = this.currentPrice;
            if (this.currentPrice > lastCandle.high) lastCandle.high = this.currentPrice;
            if (this.currentPrice < lastCandle.low) lastCandle.low = this.currentPrice;

            document.getElementById('live-price').innerText = this.currentPrice.toFixed(5);
        }, 100);
    }

    render() {
        const { ctx, canvas, candles } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const candleWidth = (canvas.width / 60);
        const spacing = 10;

        candles.forEach((c, i) => {
            const x = i * (candleWidth + spacing);
            const isBull = c.close >= c.open;
            
            ctx.fillStyle = isBull ? "#00ff73" : "#ff3e3e";
            ctx.strokeStyle = ctx.fillStyle;

            // Desenhar Pavio (High/Low)
            ctx.beginPath();
            ctx.moveTo(x + candleWidth/2, canvas.height - (c.high * 100 - 100)); // Simulação de escala
            ctx.lineTo(x + candleWidth/2, canvas.height - (c.low * 100 - 100));
            ctx.stroke();

            // Desenhar Corpo
            const bodyHeight = Math.abs(c.close - c.open) * 5000; // Multiplicador para visibilidade
            const y = canvas.height - (Math.max(c.open, c.close) * 100 - 100);
            ctx.fillRect(x, y, candleWidth, Math.max(bodyHeight, 2));
        });

        requestAnimationFrame(() => this.render());
    }

    executeTrade(type) {
        console.log(`Ordem de ${type} executada em ${this.currentPrice.toFixed(5)}`);
        // Aqui entraria a lógica de expiração e verificação de Win/Loss
    }
}

const app = new TradingApp();