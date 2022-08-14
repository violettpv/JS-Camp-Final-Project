console.log("i am alive");

const slide = document.getElementsByClassName('slide')[0];
const title = document.getElementById('slideshow-title');
const prev = document.getElementsByClassName('prev')[0];
const next = document.getElementsByClassName('next')[0];
let slideArr = ["OldKyivCenter", "OldKyivStreet", "StAndrewsChurch"];
let titleArr = ["Independence Square, Kyiv", "Andrew's Descent, Kyiv", "St. Andrew's Church, Kyiv"];
let slideIndex = 0;

function changeSlide(action) {
    console.log("called func");
    if (slideIndex + action < 0 || slideIndex + action > 2) {
        console.log("out of range");
        return;
    }

    slideIndex += action;
    console.log("plus or minus action");
    slide.style.backgroundImage = `url("./pics/${slideArr[slideIndex]}.jpg")`;
    console.log("change pic");
    title.innerHTML = titleArr[slideIndex];
    console.log("change title");
    if (slideIndex === 0) {
        console.log("first slide");
        prev.style.color = "gray";
    }
    else if (slideIndex === 2) {
        next.style.color = "gray";
        console.log("last slide");
    }
    else {
        console.log("slide 2");
        prev.style.color = "black";
        next.style.color = "black";
    }
}

function browseAllButton() {

}
