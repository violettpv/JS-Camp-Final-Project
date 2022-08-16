console.log("the funniest");
const loader = document.getElementsByClassName("loader")[0];
setTimeout(() => {
    console.log("the funniest 2");
    loader.style.display = "none";
}, 5000);
