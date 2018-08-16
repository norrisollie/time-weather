var app = {};

function init() {

    // run function every 1000ms
    setInterval(setTime, 1000);

    // setup dom
    setupDom();

    // add listeners
    addListeners();

    // check if name is stored in localstorage
    checkName();

    getUserLocation();

}

function setupDom() {

    app.dom = {};

    app.dom.settingsButton = document.getElementById("settings-button")
    app.dom.settingsContainer = document.getElementById("settings-container");
    app.dom.mainContainer = document.getElementById("main-container");
    app.dom.time = document.getElementById("time");
    app.dom.timeOfDay = document.getElementById("time-of-day");
    app.dom.submitName = document.getElementById("set-name-input");
    app.dom.nameInput = document.getElementById("name-input");
    app.dom.userName = document.getElementById("user-name");
    app.dom.sunMoon = document.getElementById("sun-moon");
    app.dom.moon = document.getElementById("moon");
    app.dom.sun = document.getElementById("sun");
    app.dom.temp = document.getElementById("temp");

    app.dom.savedName = localStorage.getItem("name");

}

function addListeners() {

    app.dom.settingsButton.addEventListener("click", settingsClickHandler)
    app.dom.submitName.addEventListener("click", changeNameHandler)

}

function getUserLocation() {

    function success(position) {

        console.log("success");

        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        console.log("lat: " + lat + "\nlat: " + lon)

        createWeatherUrl(lat, lon);

    }

    function error() {

        console.log("error");
    }

    navigator.geolocation.getCurrentPosition(success, error);

}

function createWeatherUrl(lat, lon) {

    var key = "175200d36b17e0983a92fd9d8217f8fb"
    var id = "18203bac"
    var url = "http://api.weatherunlocked.com/api/current/" + lat + "," + lon + "?app_id=" + id +"&app_key=" + key;

    console.log(url);

    request(url, weatherResponseHandler);

}

function request(url, callback) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);

            callback(data);

        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();

}

var weatherResponseHandler = function(data) {

    var temp_c = data.temp_c;

    app.dom.temp.innerHTML = temp_c + "ºc"






}

// runs on init, to check if name key exists, and sets the username as the name in the key
function checkName() {

    setupDom();

    console.log("Checking name...");

    // check if 
    if (app.dom.savedName !== null && app.dom.savedName.length < 1) {

        console.log("app.dom.savedName exists, but no name set")

    } else if (app.dom.savedName !== null && app.dom.savedName.length >= 1) {

        console.log("name set as: " + app.dom.savedName)

        app.dom.userName.innerHTML = app.dom.savedName

    } else if (app.dom.savedName === null) {

        console.log("savedName does not exist");
    }
}

function changeNameHandler() {

    console.log("checking and changing name...");

    // get the value of the username input
    var newName = app.dom.nameInput.value;

    console.log("app.dom.savedName exists, but no name set");

    localStorage.setItem("name", newName)

    checkName();

}

function setNameHandler() {

    var nameInputValue = app.dom.nameInput.value

    // check if name key exists
    if (localStorage.getItem("name") !== null) {

        console.log("name exists")

    } else {

        localStorage.setItem("name", nameInputValue);

    }

    changeName(nameInputValue);
}

function changeName(newName) {

    localStorage.setItem("name", newName);

    app.dom.userName.innerHTML = newName


}

function settingsClickHandler(e) {

    var targetState = e.currentTarget.dataset.state;

    if (targetState === "hidden") {

        console.log("hidden")

        // change data-state value
        e.currentTarget.dataset.state = "active";

        // unhide settings container
        app.dom.settingsContainer.style.transform = "none";
        app.dom.mainContainer.style.transform = "translateX(-300px)";


    } else if (targetState === "active") {

        console.log("active")

        // change data-state value
        e.currentTarget.dataset.state = "hidden";

        // hide settings container
        app.dom.settingsContainer.style.transform = "translateX(300px)";
        app.dom.mainContainer.style.transform = "none";
    }

}

function setTime() {

    // create new date object to get hours, minutes and seconds
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // change greeting depending on time of day
    if (hours >= 3 && hours < 12) {
        app.dom.timeOfDay.innerHTML = "Morning";
    } else if (hours >= 12 && hours < 18) {
        app.dom.timeOfDay.innerHTML = "Afternoon";
    } else if (hours >= 18 && hours < 22) {
        app.dom.timeOfDay.innerHTML = "Evening";
    } else if (hours >= 23 || hours < 3) {
        app.dom.timeOfDay.innerHTML = "Night";
    }

    // calculate angle by * hour by 15 (15 deg incremenets)
    var angle = hours * 15;

    // calculate the background colour by incrementing the rgb values by multiplying hours by the sky blue rgb value
    var bgColour_r = hours * 11.250;
    var bgColour_g = hours * 17.166;
    var bgColour_b = hours * 19.583;

    var bgRBG = bgColour_r + "," + bgColour_g + "," + bgColour_b;

    app.dom.mainContainer.style.backgroundColor = "rgb(" + bgRBG + ")";
    app.dom.sunMoon.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

    // adds a 0 in front of the time if it's less than 10
    if (hours < 10) { hours = "0" + hours };
    if (minutes < 10) { minutes = "0" + minutes };
    if (seconds < 10) { seconds = "0" + seconds };

    var timeString = hours + ":" + minutes + ":" + seconds;

    app.dom.time.innerHTML = timeString;

}

window.onload = init