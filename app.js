var app = {};

function init() {

    // run function every 1000ms
    setInterval(setTime, 1000);

    // setup dom
    setupDom();

    // add listeners
    addListeners();

    // check if name is stored in localstorage
    // checkName();


    // check if name is stored in localstorage
    // checkLocation();

    getUserLocation();

}

function setupDom() {

    app.dom = {};

    app.dom.settingsButton = document.getElementById("settings-button")
    app.dom.settingsContainer = document.getElementById("settings-container");
    app.dom.mainContainer = document.getElementById("main-container");
    app.dom.timeContainer = document.getElementById("time-container");
    app.dom.time = document.getElementById("time");
    app.dom.timeOfDay = document.getElementById("time-of-day");
    app.dom.submitName = document.getElementById("set-name-input");
    app.dom.nameInput = document.getElementById("name-input");
    app.dom.userName = document.getElementById("user-name");
    app.dom.sunMoon = document.getElementById("sun-moon");
    app.dom.sunMoonContainer = document.getElementById("sun-moon-container");
    app.dom.moon = document.getElementById("moon");
    app.dom.sun = document.getElementById("sun");
    app.dom.temp = document.getElementById("temp");
    app.dom.desc = document.getElementById("desc");
    app.dom.loc = document.querySelectorAll(".loc");
    app.dom.setLocationInput = document.getElementById("set-location-input")


    app.dom.savedName = localStorage.getItem("name");
    app.dom.savedLocation = localStorage.getItem("location");

    // console.log(localStorage.key)

    checkLocalStorage(app.dom.savedName)
    checkLocalStorage(app.dom.savedLocation)

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

    var key = "26635eff02fd24fca61eaae889279afb"
    var url = "https://api.openweathermap.org/data/2.5/forecast?&lat=" + lat + "&lon=" + lon + "&appid=" + key + "&units=metric"

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

    var name = data.city.name
    var desc = data.list[0].weather[0].main
    var temp = data.list[0].main.temp;
    var tempRound = Math.round(temp);

    for (var i = 0; i < app.dom.loc.length; i++) {
        app.dom.loc[i].innerHTML = name
    }

    app.dom.desc.innerHTML = desc
    app.dom.temp.innerHTML = tempRound + "&deg;c"

    console.log(data.list.length);

    var weatherEl = createEl(data.list.length, "div");

    for (var i = 0; i < data.list.length; i++) {

        var dateTime = data.list[i].dt_txt

        var date = dateTime.substring(0, 10),
            weatherDay = date.substring(8, 10),
            weatherMonth = date.substring(5, 7),
            weatherYear = date.substring(0, 4),
            time = dateTime.substring(11, 19),
            weatherHour = time.substring(0, 2),
            weatherMinute = time.substring(3, 5);

        // console.log("Date: " + weatherDay + "/" + weatherMonth + "\n" + "Time: " + weatherHour + ":" + weatherMinute + "\n" + );

        // console.log("weatherDay: " + weatherDay);
        // console.log("weatherMonth: " + weatherMonth);
        // console.log("weatherYear: " + weatherYear);
        // console.log("weatherHour: " + weatherHour);
        // console.log("weatherMinute: " + weatherMinute);


        // console.log("date: " + date);
        // console.log("time: " + time);

    }

    for (var i = 0; i < weatherEl.length; i++) {

        weatherEl[i].classList.add("weather-container");

        weatherEl[i].innerHTML += date + "<br>" + time;




    }

    // console.log(weatherEl)
}













function createEl(number, type) {

    var arr = [];

    for (var i = 0; i < number; i++) {

        var el = document.createElement(type);

        arr.push(el)


    }

    return arr

}

function appendEl(arr, container) {

    for(var i = 0; i < arr.length; i++) {

        container.appendChild(arr[i]);

    }
}

function checkLocalStorage(key) {

    // setupDom();

    console.log("Checking key...");

    // check if 
    if (key !== null && key.length < 1) {

        console.log("key exists, but no name set")

    } else if (key !== null && key.length >= 1) {

        console.log("key exists, set as: " + key)

        app.dom.userName.innerHTML = key

    } else if (key === null) {

        console.log("key does not exist");
    }

}



function changeNameHandler() {

    console.log("checking and changing name...");

    // get the value of the username input
    var newName = app.dom.nameInput.value;

    console.log("app.dom.savedName exists, but no name set");

    localStorage.setItem("name", newName)

    checkLocalStorage(app.dom.savedName)

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
    if (hours <= 12) {
        var bgColour_r = hours * 11.250;
        var bgColour_g = hours * 17.166;
        var bgColour_b = hours * 19.583;
    }
    if (hours > 12) {
        var bgColour_r = (hours * 11.25) - (11.25 * ((hours - 12) * 2));
        var bgColour_g = (hours * 17.166) - (17.166 * ((hours - 12) * 2));
        var bgColour_b = (hours * 19.583) - (19.583 * ((hours - 12) * 2));
    }

    var bgRBG = bgColour_r + "," + bgColour_g + "," + bgColour_b;

    app.dom.mainContainer.style.backgroundColor = "rgb(" + bgRBG + ")";
    app.dom.sunMoon.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

    // adds a 0 in front of the time if it's less than 10
    if (hours < 10) { hours = "0" + hours };
    if (minutes < 10) { minutes = "0" + minutes };
    if (seconds < 10) { seconds = "0" + seconds };

    var timeString = hours + ":" + minutes + ":" + seconds;

    app.dom.time.innerHTML = timeString;

    app.dom.timeContainer.style.opacity = "1";
    app.dom.sunMoonContainer.style.opacity = "1";

}

window.onload = init