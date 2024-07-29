let minutes = 0;
let seconds = 0;
let interval = null;
let isRunning = false;
let studyDuration = 0; // Default to 0 seconds, which means no time set
let alarmPlayed = false; // To track if the alarm has already played

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const alarmSound = document.getElementById('alarmSound');
const relaxationSound = document.getElementById('relaxationSound');
const taskInput = document.getElementById('taskInput');
const taskBtn = document.getElementById('taskBtn');
const studyMinutesInput = document.getElementById('studyMinutesInput');
const studySecondsInput = document.getElementById('studySecondsInput');
const setTimeBtn = document.getElementById('setTimeBtn');

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

        // Check if time is up
        if ((minutes * 60 + seconds) >= studyDuration) {
            stopStopwatch();
            if (!alarmPlayed) {
                playAlarm();
                alert('Study time is up!');
                relaxationSound.play();
                alarmPlayed = true; // Set alarmPlayed to true so it won't ring again
            }
            startStopBtn.textContent = 'Start';
        }
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
    alarmPlayed = false; // Reset alarmPlayed when resetting the stopwatch
}

function startStopButtonHandler() {
    if (!studyDuration) {
        alert('Please set study time first.');
        return;
    }

    if (isRunning) {
        stopStopwatch();
        startStopBtn.textContent = 'Start';
    } else {
        const task = taskInput.value;
        if (task) {
            alert(`Your task: ${task}`);
            startStopwatch();
            startStopBtn.textContent = 'Stop';
        } else {
            alert('Please enter a task.');
        }
    }
    isRunning = !isRunning;
}

function resetButtonHandler() {
    resetStopwatch();
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

function setTimeButtonHandler() {
    const minutesInput = parseInt(studyMinutesInput.value, 10) || 0;
    const secondsInput = parseInt(studySecondsInput.value, 10) || 0;

    if (isNaN(minutesInput) || minutesInput < 0 || isNaN(secondsInput) || secondsInput < 0 || secondsInput >= 60) {
        alert('Please enter valid minutes and seconds.');
        return;
    }

    studyDuration = (minutesInput * 60) + secondsInput; // Convert to seconds
    alert(`Study time set to ${minutesInput} minutes and ${secondsInput} seconds.`);
    resetStopwatch(); // Reset stopwatch when time is set
    startStopBtn.disabled = false; // Enable the start/stop button
}

function playAlarm() {
    alarmSound.currentTime = 0; // Reset the sound to the start
    alarmSound.play();
    setTimeout(() => {
        alarmSound.pause(); // Stop the sound after 5 seconds
        alarmSound.currentTime = 0; // Reset the sound to the start
    }, 7000); // 5000 milliseconds = 5 seconds
}

// Event listeners
startStopBtn.addEventListener('click', startStopButtonHandler);
resetBtn.addEventListener('click', resetButtonHandler);
setTimeBtn.addEventListener('click', setTimeButtonHandler);
taskBtn.addEventListener('click', () => {
    const task = taskInput.value;
    if (task) {
        alert(`Your task: ${task}`);
    } else {
        alert('Please enter a task.');
    }
});






