function showTime() {
	const clock = document.getElementById('currentTime');
	if (clock) {
		clock.textContent = new Date().toUTCString();
	}
}

showTime();
setInterval(showTime, 1000);
