const timeDiv = document.getElementById("time");
const setTimeButton = document.getElementById("setTimeButton");
const alarmIsSetImageContainer = document.getElementById(
    "alarmIsSetImageContainer"
);
const alarmIsRingingImageContainer = document.getElementById(
    "alarmIsRingingImageContainer"
);
const alarmTime = document.getElementById("alarmTime");
let alarmNameInput = document.getElementById("alarmName");
const alertText = document.getElementById("alertText");

// time input
let inputedHours = document.getElementById("hours");
let inputedMinutes = document.getElementById("minutes");
let inputedSeconds = document.getElementById("seconds");
// alarm input
let alarmHours = document.getElementById("alarmHours");
let alarmMinutes = document.getElementById("alarmMinutes");
let alarmSeconds = document.getElementById("alarmSeconds");
//
let clockTime;
let createdAlarmTime;
let alarmExists = false;

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
// ////////////
let currentTime = setInterval(() => {
    let date = new Date();

    let hours = date.getHours();

    let minutes = date.getMinutes();

    let seconds = date.getSeconds();

    // console.log(createdAlarmTime);
    // console.log(
    //     addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)
    // );

    if (
        createdAlarmTime ===
        addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)
    ) {
        alarmIsRingingImageContainer.style.display = "block";
        alarmIsSetImageContainer.style.display = "none";
    }

    timeDiv.textContent =
        addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
}, 1000);

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
    }, 1000);
};
// HANDLE ALARM CLICK

handleAlarmCreateClick = () => {
    if (removeSpace(alarmName.value) === "") {
        alarmName.placeholder = ALERT_TEXT_REQUIRED;
        return "";
    }
    alarmIsSetImageContainer.style.display = "block";
    if (!createdAlarmTime) {
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
