const timeDiv = document.getElementById("time");
const setTimeButton = document.getElementById("setTimeButton");

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
    if (hours > 23) {
        inputedHours.value = 23;
    } else if (hours < 0) {
        inputedHours.value = 0;
    }

    setTimeButton.disabled = false;
};
validateMinutesAndSeconds = (input) => {
    let value = input.value;
    input.value = Math.round(value);
    if (value > 59) {
        input.value = 59;
    } else if (value < 0) {
        input.value = 0;
    }
    setTimeButton.disabled = false;
};

// ON INPUT

inputedHours.addEventListener("input", validateHours);
inputedMinutes.addEventListener("input", () =>
    validateMinutesAndSeconds(inputedMinutes)
);
inputedSeconds.addEventListener("input", () =>
    validateMinutesAndSeconds(inputedSeconds)
);

// Validation part end

handleStartClick = () => {
    clearInterval(currentTime);

    let inputedHours = +document.getElementById("hours").value;
    let inputedMinutes = +document.getElementById("minutes").value;
    let inputedSeconds = +document.getElementById("seconds").value;

    let myTimeInterval = setInterval(() => {
        //  time changing part
        if (inputedSeconds < 60) {
            inputedSeconds = inputedSeconds + 1;
        } else {
            inputedMinutes = inputedMinutes + 1;
            inputedSeconds = 0;
        }

        if (inputedMinutes === 60) {
            inputedMinutes = 0;
            inputedHours = inputedHours + 1;
        }

        if (inputedHours === 24) {
            inputedHours = 0;
        }
        // time changing part ends here
        timeDiv.textContent =
            addZero(inputedHours) +
            ":" +
            addZero(inputedMinutes) +
            ":" +
            addZero(inputedSeconds);
    }, 1000);

    function addZero(time) {
        return time < 10 ? "0" + time : time;
    }
};

setTimeButton.disabled = true;
setTimeButton.addEventListener("click", handleStartClick);
