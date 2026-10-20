document.addEventListener('DOMContentLoaded', () => {
        const currentTime = document.getElementById('currentTime');
            if (!currentTime) return;

                const updateTime = () => {
                        currentTime.textContent = new Date().toUTCString();
                            };

                                updateTime();
                                    setInterval(updateTime, 1000);
                                    });se
})