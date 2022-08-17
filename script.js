// Progress bar
window.onscroll = function() { progressBar() };
function progressBar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("bar").style.width = scrolled + "%";
}

// Slideshow
const slide = document.getElementsByClassName('slide')[0];
const title = document.getElementById('slideshow-title');
const prev = document.getElementsByClassName('prev')[0];
const next = document.getElementsByClassName('next')[0];
let slideArr = ["OldKyivCenter", "OldKyivStreet", "StAndrewsChurch", "KyivBridge", "OldKyivStreet_2", "OldKyivStreet_3"];
let titleArr = ["Independence Square, Kyiv", "Andrew's Descent, Kyiv", "St. Andrew's Church, Kyiv", "Nicholas chain bridge, 19th century Kyiv", "Old Podil, Kyiv", "Old Kyiv"];
let slideIndex = 0;

function changeSlide(action) {
    if (slideIndex + action < 0 || slideIndex + action > slideArr.length - 1) {
        return;
    }

    slideIndex += action;
    slide.style.backgroundImage = `url("./pics/${slideArr[slideIndex]}.jpg")`;
    title.innerHTML = titleArr[slideIndex];
    if (slideIndex === 0) {
        prev.style.color = "gray";
    }
    else if (slideIndex === slideArr.length - 1) {
        next.style.color = "gray";
    }
    else {
        prev.style.color = "black";
        next.style.color = "black";
    }
}

// Dark mode
let sections = [];
let findSections = document.getElementsByClassName('sections');
for (let i = 0; i < findSections.length; i++) {
    sections.push(findSections[i]);
}
sections.push(document.getElementsByTagName('header')[0]);
sections.push(document.getElementsByClassName('progress-bar')[0]);

let isDarkMode = false;
function changeMode() {
    isDarkMode = !isDarkMode;
    sections.forEach(section => {
       section.classList.toggle('dark-mode');
    });
}

// Browse all projects
function browseAllButton() {

}

// Fade in on scroll
const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            hideScrollElement(el)
        }
    })
}
window.addEventListener("scroll", () => {
    handleScrollAnimation();
});

// API
async function getWeather(lat = 50.450001, lon = 30.523333) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b85e521716c4a0f78aa64cb1d4fa7d69`;
    let res = await fetch(url).then(response => response.json());

    let data = {
        temp : res.main.temp - 273.15,
        wind : res.wind.speed,
        humidity : res.main.humidity,
        city : res.name,
        country : res.sys.country,
        description : res.weather[0].description
    }

    document.getElementById('city').innerHTML = data.city;
    document.getElementById('country').innerHTML = data.country;
    document.getElementById('temperature').innerHTML = `${Math.round(data.temp)}&deg;C`;
    document.getElementById('wind').innerHTML = `${Math.round(data.wind)} m/s`;
    document.getElementById('humidity').innerHTML = `${Math.round(data.humidity)}%`;
    document.getElementById('weather-description').innerHTML = data.description;
}
getWeather();

// User activity
let startTime;
let isAfk = false;

document.addEventListener('mousemove', () => {
    startTime = new Date();
});

function afk(timeMs, callback) {
    const helper = () => {
        let currentTime = new Date();

        // == Dark mode ==
        let currentHour = currentTime.getHours();
        if (currentHour >= 21 || currentHour < 6) {
            if (!isDarkMode) {
                changeMode();
            }
        }
        // == Dark mode ==

        let diff = currentTime - startTime;
        if (diff >= timeMs) {
            if (!isAfk) {
                isAfk = true;
                callback();
            }
        }
    }
    helper();
    setInterval(helper, 1000);
}

const afkScreen = document.getElementsByClassName("afk")[0];
// 60000
afk(6000000, () => {
    setTimeout(() => {
        if (isAfk) {
            window.close();
        }
    }, 30000);
    afkScreen.style.display = "flex";
});

function setAfk (status) {
    isAfk = status;
    if (!status) {
        afkScreen.style.display = "none";
    }
}