const timeDiv = document.getElementById("time");

let inputedHours = document.getElementById("hours");
let inputedMinutes = document.getElementById("minutes");
let inputedSeconds = document.getElementById("seconds");

let currentTime = setInterval(() => {
    let date = new Date();

    let hours = date.getHours();

    let minutes = date.getMinutes();

    let seconds = date.getSeconds();

    timeDiv.textContent =
        addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
}, 1000);

function addZero(time) {
    return time < 10 ? "0" + time : time;
}

// Validation part

validateHours = () => {
    const hours = inputedHours.value;
    inputedHours.value = Math.round(hours);
    if (hours > 24) {
        inputedHours.value = 24;
    } else if (hours < 0) {
        inputedHours.value = 0;
    }
};
validateMinutesAndSeconds = (input) => {
    let value = input.value;
    input.value = Math.round(value);
    if (value > 60) {
        input.value = 60;
    } else if (value < 0) {
        input.value = 0;
    }
};

inputedHours.addEventListener("input", validateHours);
inputedMinutes.addEventListener("input", () =>
    validateMinutesAndSeconds(inputedMinutes)
);
inputedSeconds.addEventListener("input", () =>
    validateMinutesAndSeconds(inputedSeconds)
);

// Validation part end

handleStartClick = () => {
    let inputedHours = document.getElementById("hours").value;
    let inputedMinutes = document.getElementById("minutes").value;
    let inputedSeconds = document.getElementById("seconds").value;

    console.log(inputedHours, inputedMinutes, inputedSeconds);
};

const setTimeButton = document.getElementById("setTimeButton");
setTimeButton.addEventListener("click", handleStartClick);
