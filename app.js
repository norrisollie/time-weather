function init() {

    setInterval(setTime, 1000);
    getUserLocation();

}



function getUserLocation() {

    function success(position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        console.log(latitude + "," + longitude)

    }

    function error() {


    }

    navigator.geolocation.getCurrentPosition(success, error);

}

function setTime() {

    var date = new Date();
    var month = date.getMonth();
    var fullYear = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var time = document.getElementById("time");

    if (minutes < 10) {

        minutes = "0" + minutes

    }

    if (hours < 10) {

        hours = "0" + hours

    }

    if (seconds < 10) {

        seconds = "0" + seconds

    }

    time.innerHTML = hours + ":" + minutes + ":" + seconds;

    var sunMoon = document.getElementById("sun-container");
    var sun = document.getElementById("sun");
    var moon = document.getElementById("moon");
    var container = document.getElementById("container");
    var timeOfDay = document.getElementById("time-of-day");
    var userName = document.getElementById("user-name");

    if (hours >= 6 && hours < 12) {

        timeOfDay.innerHTML = "Morning";

    } else if (hours >= 12 && hours < 18) {

        timeOfDay.innerHTML = "Afternoon";

    } else if (hours >= 18 && hours < 24) {

        timeOfDay.innerHTML = "Evening";

    }


    switch (hours) {
        case "00":
            sunMoon.style.transform = "rotate(180deg)";
            container.style.backgroundColor = "#000000";
            break;
        case "01":
            sunMoon.style.transform = "rotate(195deg)";
            container.style.backgroundColor = "#000000";
            break;
        case "02":
            sunMoon.style.transform = "rotate(210deg)";
            container.style.backgroundColor = "#0c1317";
            break;
        case "03":
            sunMoon.style.transform = "rotate(225deg)";
            container.style.backgroundColor = "#19262f";
            break;
        case "04":
            sunMoon.style.transform = "rotate(240deg)";
            container.style.backgroundColor = "#253947";
            break;
        case "05":
            sunMoon.style.transform = "rotate(255deg)";
            container.style.backgroundColor = "#324c5f";
            break;
        case "06":
            sunMoon.style.transform = "rotate(270deg)";
            container.style.backgroundColor = "#3f6077";
            break;
        case "07":
            sunMoon.style.transform = "rotate(285deg)";
            container.style.backgroundColor = "#4b738e";
            break;
        case "08":
            sunMoon.style.transform = "rotate(300deg)";
            container.style.backgroundColor = "#5886a6";
            break;
        case "09":
            sunMoon.style.transform = "rotate(315deg)";
            container.style.backgroundColor = "#6499be";
            break;
        case "10":
            sunMoon.style.transform = "rotate(330deg)";
            container.style.backgroundColor = "#71acd6";
            break;
        case "11":
            sunMoon.style.transform = "rotate(345deg)";
            container.style.backgroundColor = "#7ec0ee";
            break;
        case "12":
            sunMoon.style.transform = "rotate(0deg)";
            container.style.backgroundColor = "#7ec0ee";
            break;
        case "13":
            sunMoon.style.transform = "rotate(15deg)";
            container.style.backgroundColor = "#7ec0ee";
            break;
        case "14":
            sunMoon.style.transform = "rotate(30deg)";
            container.style.backgroundColor = "#71acd6";
            break;
        case "15":
            sunMoon.style.transform = "rotate(45deg)";
            container.style.backgroundColor = "#6499be";
            break;
        case "16":
            sunMoon.style.transform = "rotate(60deg)";
            container.style.backgroundColor = "#5886a6";
            break;
        case "17":
            sunMoon.style.transform = "rotate(75deg)";
            container.style.backgroundColor = "#4b738e";
            break;
        case "18":
            sunMoon.style.transform = "rotate(90deg)";
            container.style.backgroundColor = "#3f6077";
            // sun.style.backgroundColor = "sun";
            break;
        case "19":
            sunMoon.style.transform = "rotate(105deg)";
            container.style.backgroundColor = "#324c5f";
            break;
        case "20":
            sunMoon.style.transform = "rotate(120deg)";
            container.style.backgroundColor = "#253947";
            break;
        case "21":
            sunMoon.style.transform = "rotate(135deg)";
            container.style.backgroundColor = "#19262f";
            break;
        case "22":
            sunMoon.style.transform = "rotate(150deg)";
            container.style.backgroundColor = "#0c1317";
            break;
        case "23":
            sunMoon.style.transform = "rotate(165deg)";
            container.style.backgroundColor = "#000000";
            break;
        default:
            console.log(hours);
    }
}

window.onload = init