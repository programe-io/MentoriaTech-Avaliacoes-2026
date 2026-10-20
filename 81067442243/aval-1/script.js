function showTime() {
        const el = document.getElementById('currentTime');
            if (el) {
                    el.textContent = new Date().toUTCString();
                        }
                        }

                        showTime();
                        setInterval(showTime, 1000);n
}