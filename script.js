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
let slideArr = ["OldKyivCenter", "OldKyivStreet", "StAndrewsChurch"];
let titleArr = ["Independence Square, Kyiv", "Andrew's Descent, Kyiv", "St. Andrew's Church, Kyiv"];
let slideIndex = 0;

function changeSlide(action) {
    if (slideIndex + action < 0 || slideIndex + action > 2) {
        return;
    }

    slideIndex += action;
    slide.style.backgroundImage = `url("./pics/${slideArr[slideIndex]}.jpg")`;
    title.innerHTML = titleArr[slideIndex];
    if (slideIndex === 0) {
        prev.style.color = "gray";
    }
    else if (slideIndex === 2) {
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

afk(60000, () => {
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