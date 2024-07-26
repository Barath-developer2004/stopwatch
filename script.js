let minutes = 0;
let seconds = 0;
let interval = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const alarmSound = document.getElementById('alarmSound');

function updateDisplay() {
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function startStopwatch() {
    interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 1000);
}

function stopStopwatch() {
    clearInterval(interval);
}

function resetStopwatch() {
    stopStopwatch();
    minutes = 0;
    seconds = 0;
    updateDisplay();
}

function startStopButtonHandler() {
    if (isRunning) {
        stopStopwatch();
        startStopBtn.textContent = 'Start';
    } else {
        startStopwatch();
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function resetButtonHandler() {
    resetStopwatch();
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

startStopBtn.addEventListener('click', startStopButtonHandler);
resetBtn.addEventListener('click', resetButtonHandler);

// Play sound when time is up (example: after 25 minutes)
const studyDuration = 25 * 60; // 25 minutes in seconds
setInterval(() => {
    if (minutes * 60 + seconds >= studyDuration) {
        alarmSound.play();
        resetStopwatch();
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
}, 1000);
