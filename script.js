const timeDiv = document.getElementById("time");
const setTimeButton = document.getElementById("setTimeButton");
const alarmIsSetImageContainer = document.getElementById(
    "alarmIsSetImageContainer"
);
const alarmIsRingingImageContainer = document.getElementById(
    "alarmIsRingingImageContainer"
);
const alarmTime = document.getElementById("alarmTime");
const alarmNameInput = document.getElementById("alarmName");
const alertText = document.getElementById("alertText");

// time input
const inputedHours = document.getElementById("hours");
const inputedMinutes = document.getElementById("minutes");
const inputedSeconds = document.getElementById("seconds");
// alarm input
const alarmHours = document.getElementById("alarmHours");
const alarmMinutes = document.getElementById("alarmMinutes");
const alarmSeconds = document.getElementById("alarmSeconds");

let newDateCreated = false;
let clockTime;
let createdAlarmTime;
let alarmExists = false;

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();

// CONSTANT

const ALERT_TEXT = "You have already set alarm time";
const ALERT_TEXT_REQUIRED = "required";

// Reusable functions

function addZero(time) {
    return time < 10 ? "0" + time : time;
}

removeSpace = (string) => {
    const stringWithoutSpaces = string.replace(/\s+/, "");
    return stringWithoutSpaces;
};

newTimeInterval(hours, minutes, seconds);

function addZero(time) {
    return time < 10 ? "0" + time : time;
}

// Validation part

validateHours = (inputedHours) => {
    const hours = inputedHours.value;
    inputedHours.value = Math.round(hours);
    if (hours > 23) {
        inputedHours.value = 23;
    } else if (hours < 0) {
        inputedHours.value = 0;
    }

    if (inputedHours.id === "hours") {
        setTimeButton.disabled = false;
    }
    if (inputedHours.id === "alarmHours") {
        alarmCreateBtn.disabled = false;
    }
};
validateMinutesAndSeconds = (input) => {
    let value = input.value;
    input.value = Math.round(value);
    if (value > 59) {
        input.value = 59;
    } else if (value < 0) {
        input.value = 0;
    }
    if (input.id === "minutes" || input.id === "seconds") {
        setTimeButton.disabled = false;
    }
    if (input.id === "alarmMinutes" || input.id === "alarmSeconds") {
        alarmCreateBtn.disabled = false;
    }
};

// ON INPUT

inputedHours.addEventListener("input", () => validateHours(inputedHours));
inputedMinutes.addEventListener("input", () =>
    validateMinutesAndSeconds(inputedMinutes)
);
inputedSeconds.addEventListener("input", () =>
    validateMinutesAndSeconds(inputedSeconds)
);

// ON ALRM INPUT
alarmHours.addEventListener("input", () => validateHours(alarmHours));
alarmMinutes.addEventListener("input", () =>
    validateMinutesAndSeconds(alarmMinutes)
);
alarmSeconds.addEventListener("input", () =>
    validateMinutesAndSeconds(alarmSeconds)
);

function newTimeInterval(inputedHours, inputedMinutes, inputedSeconds) {
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

    // Clock time
    if (
        createdAlarmTime ===
        addZero(inputedHours) +
            ":" +
            addZero(inputedMinutes) +
            ":" +
            addZero(inputedSeconds)
    ) {
        alarmIsRingingImageContainer.style.display = "block";
        alarmIsSetImageContainer.style.display = "none";
    }
    // time changing part ends here
    timeDiv.textContent =
        addZero(inputedHours) +
        ":" +
        addZero(inputedMinutes) +
        ":" +
        addZero(inputedSeconds);
    setTimeout(() => {
        newTimeInterval(inputedHours, inputedMinutes, inputedSeconds);
    }, 1000);
}

// Validation part end

handleStartClick = () => {
    newDateCreated = true;
    let id = window.setTimeout(function () {}, 0);

    while (id--) {
        window.clearTimeout(id);
    }
    let inputedHours = +document.getElementById("hours").value;
    let inputedMinutes = +document.getElementById("minutes").value;
    let inputedSeconds = +document.getElementById("seconds").value;
    newTimeInterval(inputedHours, inputedMinutes, inputedSeconds);
};
// HANDLE ALARM CLICK

handleAlarmCreateClick = () => {
    if (removeSpace(alarmName.value) === "") {
        alarmName.placeholder = ALERT_TEXT_REQUIRED;
        return "";
    }

    if (!createdAlarmTime) {
        alarmIsSetImageContainer.style.display = "block";
        createdAlarmTime =
            addZero(alarmHours.value) +
            ":" +
            addZero(alarmMinutes.value) +
            ":" +
            addZero(alarmSeconds.value);
        alarmTime.textContent = createdAlarmTime + " " + alarmName.value;
    } else {
        alertText.textContent = ALERT_TEXT;
    }
};

setTimeButton.disabled = true;
alarmCreateBtn.disabled = true;
setTimeButton.addEventListener("click", handleStartClick);
alarmCreateBtn.addEventListener("click", handleAlarmCreateClick);
