let audioContext;
let oscillators = [];

function getAudioContext() {

    if (!audioContext) {
        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();
    }

    return audioContext;
}

function stopSound() {

    oscillators.forEach(oscillator => {
        try {
            oscillator.stop();
        } catch (error) {}
    });

    oscillators = [];
}


// Criar um som usando Web Audio API

function createTone(frequency, duration, type = "sine") {

    const audio = getAudioContext();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(
        frequency,
        audio.currentTime
    );

    gain.gain.setValueAtTime(
        0.0001,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.3,
        audio.currentTime + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();
    oscillator.stop(audio.currentTime + duration);

    oscillators.push(oscillator);

    setTimeout(() => {

        oscillators = oscillators.filter(
            item => item !== oscillator
        );

    }, duration * 1000);
}


// Sons

function playSound(type) {

    stopSound();

    const audio = getAudioContext();

    if (type === "laser") {

        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "sawtooth";

        oscillator.frequency.setValueAtTime(
            1000,
            audio.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            100,
            audio.currentTime + 0.5
        );

        gain.gain.setValueAtTime(
            0.3,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 0.5
        );

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start();
        oscillator.stop(audio.currentTime + 0.5);

        oscillators.push(oscillator);
    }


    if (type === "pulse") {

        createTone(220, 0.3, "square");

        setTimeout(() => {
            createTone(440, 0.3, "square");
        }, 350);

        setTimeout(() => {
            createTone(660, 0.3, "square");
        }, 700);
    }


    if (type === "warp") {

        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            80,
            audio.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            1500,
            audio.currentTime + 2
        );

        gain.gain.setValueAtTime(
            0.001,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.5,
            audio.currentTime + 0.5
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 2
        );

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start();
        oscillator.stop(audio.currentTime + 2);

        oscillators.push(oscillator);
    }


    if (type === "alien") {

        const notes = [
            300,
            520,
            280,
            700,
            400,
            900
        ];

        notes.forEach((note, index) => {

            setTimeout(() => {

                createTone(
                    note,
                    0.25,
                    "triangle"
                );

            }, index * 300);

        });
    }
}