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

// Contact Form
const nameSpan = document.getElementById('fname-error');
const emailSpan = document.getElementById('email-error');
const subjSpan = document.getElementById('subj-error');
const msgSpan = document.getElementById('msg-error');

const nameInput = document.getElementById('fname');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subj');
const messageInput = document.getElementById('msg');

function sendMessage() {
    nameSpan.style.display = "none";
    emailSpan.style.display = "none";
    subjSpan.style.display = "none";
    msgSpan.style.display = "none";

    let isValid = true;
    const checkName = /[A-Z]+[a-zA-Z]*/g;
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const checkSubject = /[A-Za-zА-Яа-яЇїЄєІі\s]+/g;

    let name = nameInput.value;
    let email = emailInput.value;
    let subject = subjectInput.value;
    let message = messageInput.value;
    let temp;

    temp = name.match(checkName) || [""];
    if (name !== temp[0] || name === "") {
        nameSpan.style.display = "inline";
        isValid = false;
    }
    temp = email.match(checkEmail) || [""];
    if (email !== temp[0] || email === "") {
        emailSpan.style.display = "inline";
        isValid = false;
    }
    temp = subject.match(checkSubject) || [""];
    if (subject !== temp[0] || subject === "") {
        subjSpan.style.display = "inline";
        isValid = false;
    }
    if (message === "") {
        msgSpan.style.display = "inline";
        isValid = false;
    }
    if (!isValid) {
        return;
    }
    let data = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };
    saveData(data);
    if (data.subject.toLowerCase().includes("зробити замовлення")) {
        document.getElementsByClassName("thanks")[0].style.display = "flex";
        setTimeout(() => {
            document.getElementsByClassName("thanks")[0].style.display = "none";
        }, 3000);
   }

}
function saveData(data) {
    localStorage.setItem("message", JSON.stringify(data));
}


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
// 60000 6000000
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

const projectsArea = document.getElementsByClassName("portfolio-section__projects")[0];
function formProjectComponent(data) {
    return `<div href="${data.url}" class="portfolio-section__project"> <div style="background-image: url("${data.image}");     background-position: center;     background-repeat: no-repeat;     background-size: cover;" class="portfolio-section__project-img"> <div class="portfolio-section__project-description">Date: ${data.description.date}<br>Tech: ${data.description.technologies}<br>Price: ${data.description.price}</div> </div> <div class="portfolio-section__project-title"> <div class="portfolio-section__project-icon"><img src="${data.ico}" alt="books"></div> <div class="portfolio-section__project-name">${data.description.name}</div> </div> </div>`;
}

// read data from json file
async function readData() {
    return await fetch("./projects.json")
        .then(response => response.json());
}

readData().then(projectsData => {
    console.log(projectsData.data);
    for (let i = 0; i < projectsData.data.length; i++) {
        projectsArea.innerHTML += formProjectComponent(projectsData.data[i]);
    }
});


