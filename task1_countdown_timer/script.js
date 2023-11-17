let clickBtn = document.querySelector('.click-btn');
let timerTag = document.getElementById('timer-tag');
let infoTag = document.getElementById('info-tag');


clickBtn.addEventListener('click', ()=> {
    dateAndTime();
    reset();
    start();
})


function dateAndTime() {
    var currentDate = new Date();
    infoTag.innerText = `Date & Time
    ${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}
    ${currentDate.getHours()} : ${currentDate.getMinutes()} : ${currentDate.getSeconds()}
    `
}

let isRunning = false;
let seconds = 0;
let interval;

function start() {
    if (isRunning) {
        clearInterval(interval);
    } else {
        interval = setInterval(updateStopwatch, 1000);
    }
    isRunning = !isRunning;
}

function updateStopwatch() {
    seconds++;
    displayTime();
}

function displayTime() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedTime = `Last update before
    ${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    timerTag.innerText = formattedTime;
}

function reset() {
    clearInterval(interval);
    seconds = 0;
    isRunning = false;
    displayTime();
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}








