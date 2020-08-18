const timeDiv = document.getElementById("time");

let currentTime = setInterval(() => {
    var date = new Date();

    var hours = date.getHours();

    var minutes = date.getMinutes();

    var seconds = date.getSeconds();

    timeDiv.textContent =
        addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
}, 1000);

function addZero(time) {
    return time < 10 ? "0" + time : time;
}
