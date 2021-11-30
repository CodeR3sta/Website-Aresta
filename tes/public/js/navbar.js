let about = document.getElementById("mb-about");
let info = document.getElementById("mb-info");

about.addEventListener("click", () => {
  let aboutCon = document.getElementById("ab-con");
  if ((aboutCon.style.display = "none")) {
    aboutCon.style.display = "block";
  }
});

info.addEventListener("click", () => {
  let aboutCon = document.getElementById("in-con");
  if ((aboutCon.style.display = "none")) {
    aboutCon.style.display = "block";
  }
});

// SCROLL
window.addEventListener("scroll", () => {
  let navbar = document.getElementById("navbar");
  let scrollValue = window.scrollY;
  if (scrollValue < 80) {
    navbar.classList.remove("nav-color");
  } else {
    navbar.classList.add("nav-color");
  }
});
