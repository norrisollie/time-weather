var app = {};

function init() {

    // run function every 1000ms
    setInterval(setTime, 1000);

    // setup dom
    setupDom();

    // add listeners
    addListeners();

    checkName();


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

    app.dom.savedName = localStorage.getItem("name");

}

function addListeners() {

    app.dom.settingsButton.addEventListener("click", settingsClickHandler)
    app.dom.submitName.addEventListener("click", changeNameHandler)

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

    // adds a 0 in front of the time if it's less than 10
    if (hours < 10) { hours = "0" + hours };
    if (minutes < 10) { minutes = "0" + minutes };
    if (seconds < 10) { seconds = "0" + seconds };

    var timeString = hours + ":" + minutes + ":" + seconds;

    app.dom.time.innerHTML = timeString;

    /* switch (hours) {
        case 0:
            sunMoon.style.transform = "rotate(180deg)";
            container.style.backgroundColor = "#000000";
            break;
        case 1:
            sunMoon.style.transform = "rotate(195deg)";
            container.style.backgroundColor = "#000000";
            break;
        case 2:
            sunMoon.style.transform = "rotate(210deg)";
            container.style.backgroundColor = "#0c1317";
            break;
        case 3:
            sunMoon.style.transform = "rotate(225deg)";
            container.style.backgroundColor = "#19262f";
            break;
        case 4:
            sunMoon.style.transform = "rotate(240deg)";
            container.style.backgroundColor = "#253947";
            break;
        case 5:
            sunMoon.style.transform = "rotate(255deg)";
            container.style.backgroundColor = "#324c5f";
            break;
        case 6:
            sunMoon.style.transform = "rotate(270deg)";
            container.style.backgroundColor = "#3f6077";
            break;
        case 7:
            sunMoon.style.transform = "rotate(285deg)";
            container.style.backgroundColor = "#4b738e";
            break;
        case 8:
            sunMoon.style.transform = "rotate(300deg)";
            container.style.backgroundColor = "#5886a6";
            break;
        case 9:
            sunMoon.style.transform = "rotate(315deg)";
            container.style.backgroundColor = "#6499be";
            break;
        case 10:
            sunMoon.style.transform = "rotate(330deg)";
            container.style.backgroundColor = "#71acd6";
            break;
        case 11:
            sunMoon.style.transform = "rotate(345deg)";
            container.style.backgroundColor = "#7ec0ee";
            break;
        case 12:
            sunMoon.style.transform = "rotate(0deg)";
            container.style.backgroundColor = "#7ec0ee";
            break;
        case 13:
            sunMoon.style.transform = "rotate(15deg)";
            container.style.backgroundColor = "#7ec0ee";
            break;
        case 14:
            sunMoon.style.transform = "rotate(30deg)";
            container.style.backgroundColor = "#71acd6";
            break;
        case 15:
            sunMoon.style.transform = "rotate(45deg)";
            container.style.backgroundColor = "#6499be";
            break;
        case 16:
            sunMoon.style.transform = "rotate(60deg)";
            container.style.backgroundColor = "#5886a6";
            break;
        case 17:
            sunMoon.style.transform = "rotate(75deg)";
            container.style.backgroundColor = "#4b738e";
            break;
        case 18:
            sunMoon.style.transform = "rotate(90deg)";
            container.style.backgroundColor = "#3f6077";
            // sun.style.backgroundColor = "sun";
            break;
        case 19:
            sunMoon.style.transform = "rotate(105deg)";
            container.style.backgroundColor = "#324c5f";
            break;
        case 20:
            sunMoon.style.transform = "rotate(120deg)";
            container.style.backgroundColor = "#253947";
            break;
        case 21:
            sunMoon.style.transform = "rotate(135deg)";
            container.style.backgroundColor = "#19262f";
            break;
        case 22:
            sunMoon.style.transform = "rotate(150deg)";
            container.style.backgroundColor = "#0c1317";
            break;
        case 23:
            sunMoon.style.transform = "rotate(165deg)";
            container.style.backgroundColor = "#000000";
            break;
    }
    */


    // console.log(hours)
    // console.log(minutes)
    // console.log(seconds)



}

window.onload = init








// function init() {

//     setInterval(setTime, 1000);
//     getUserLocation();

// }



// function getUserLocation() {

//     function success(position) {

//         var latitude = position.coords.latitude;
//         var longitude = position.coords.longitude;

//         // console.log(latitude + "," + longitude)

//         createWeatherUrl(latitude, longitude)



//     }

//     function error() {


//     }

//     navigator.geolocation.getCurrentPosition(success, error);

// }

// function createWeatherUrl(lat, lon) {

//     console.log(lat + "," + lon);



// }

// function request(url) {

//     var request = new XMLHttpRequest();
//     request.open('GET', url, true);

//     request.onload = function() {
//         if (this.status >= 200 && this.status < 400) {
//             // Success!
//             var data = JSON.parse(this.response);
//         } else {
//             // We reached our target server, but it returned an error

//         }
//     };

//     request.onerror = function() {
//         // There was a connection error of some sort
//     };

//     request.send();


// }



// function setTime() {

//     var date = new Date();
//     var month = date.getMonth();
//     var fullYear = date.getFullYear();
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var seconds = date.getSeconds();

//     var time = document.getElementById("time");

//     if (minutes < 10) {

//         minutes = "0" + minutes

//     }

//     if (hours < 10) {

//         hours = "0" + hours

//     }

//     if (seconds < 10) {

//         seconds = "0" + seconds

//     }

//     time.innerHTML = hours + ":" + minutes + ":" + seconds;

//     var sunMoon = document.getElementById("sun-container");
//     var sun = document.getElementById("sun");
//     var moon = document.getElementById("moon");
//     var container = document.getElementById("container");
//     var timeOfDay = document.getElementById("time-of-day");
//     var userName = document.getElementById("user-name");

//     if (hours >= 6 && hours < 12) {

//         timeOfDay.innerHTML = "Morning";

//     } else if (hours >= 12 && hours < 18) {

//         timeOfDay.innerHTML = "Afternoon";

//     } else if (hours >= 18 && hours < 24) {

//         timeOfDay.innerHTML = "Evening";

//     }


// switch (hours) {
//     case 0:
//         sunMoon.style.transform = "rotate(180deg)";
//         container.style.backgroundColor = "#000000";
//         break;
//     case 01:
//         sunMoon.style.transform = "rotate(195deg)";
//         container.style.backgroundColor = "#000000";
//         break;
//     case 02:
//         sunMoon.style.transform = "rotate(210deg)";
//         container.style.backgroundColor = "#0c1317";
//         break;
//     case 03:
//         sunMoon.style.transform = "rotate(225deg)";
//         container.style.backgroundColor = "#19262f";
//         break;
//     case 04:
//         sunMoon.style.transform = "rotate(240deg)";
//         container.style.backgroundColor = "#253947";
//         break;
//     case 05:
//         sunMoon.style.transform = "rotate(255deg)";
//         container.style.backgroundColor = "#324c5f";
//         break;
//     case 06:
//         sunMoon.style.transform = "rotate(270deg)";
//         container.style.backgroundColor = "#3f6077";
//         break;
//     case 07:
//         sunMoon.style.transform = "rotate(285deg)";
//         container.style.backgroundColor = "#4b738e";
//         break;
//     case 08:
//         sunMoon.style.transform = "rotate(300deg)";
//         container.style.backgroundColor = "#5886a6";
//         break;
//     case 09:
//         sunMoon.style.transform = "rotate(315deg)";
//         container.style.backgroundColor = "#6499be";
//         break;
//     case 10:
//         sunMoon.style.transform = "rotate(330deg)";
//         container.style.backgroundColor = "#71acd6";
//         break;
//     case 11:
//         sunMoon.style.transform = "rotate(345deg)";
//         container.style.backgroundColor = "#7ec0ee";
//         break;
//     case 12:
//         sunMoon.style.transform = "rotate(0deg)";
//         container.style.backgroundColor = "#7ec0ee";
//         break;
//     case 13:
//         sunMoon.style.transform = "rotate(15deg)";
//         container.style.backgroundColor = "#7ec0ee";
//         break;
//     case 14:
//         sunMoon.style.transform = "rotate(30deg)";
//         container.style.backgroundColor = "#71acd6";
//         break;
//     case 15:
//         sunMoon.style.transform = "rotate(45deg)";
//         container.style.backgroundColor = "#6499be";
//         break;
//     case 16:
//         sunMoon.style.transform = "rotate(60deg)";
//         container.style.backgroundColor = "#5886a6";
//         break;
//     case 17:
//         sunMoon.style.transform = "rotate(75deg)";
//         container.style.backgroundColor = "#4b738e";
//         break;
//     case 18:
//         sunMoon.style.transform = "rotate(90deg)";
//         container.style.backgroundColor = "#3f6077";
//         // sun.style.backgroundColor = "sun";
//         break;
//     case 19:
//         sunMoon.style.transform = "rotate(105deg)";
//         container.style.backgroundColor = "#324c5f";
//         break;
//     case 20:
//         sunMoon.style.transform = "rotate(120deg)";
//         container.style.backgroundColor = "#253947";
//         break;
//     case 21:
//         sunMoon.style.transform = "rotate(135deg)";
//         container.style.backgroundColor = "#19262f";
//         break;
//     case 22:
//         sunMoon.style.transform = "rotate(150deg)";
//         container.style.backgroundColor = "#0c1317";
//         break;
//     case 23:
//         sunMoon.style.transform = "rotate(165deg)";
//         container.style.backgroundColor = "#000000";
//         break;
//     default:
//             console.log(hours);
//     }
// }

// window.onload = init