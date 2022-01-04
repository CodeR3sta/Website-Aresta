// SCROLL
window.addEventListener("scroll", () => {
  let navbar = document.getElementById("navbar");
  let scrollValue = window.scrollY;
  if (scrollValue < 200) {
    navbar.classList.remove("nav-color");
  } else {
    navbar.classList.add("nav-color");
  }
});

document.getElementById("op-desk").addEventListener("click", () => {
  let desk = document.getElementById("desk");
  desk.style.display = "flex";
});

document.getElementById("cls-desk").addEventListener("click", () => {
  let desk = document.getElementById("desk");
  desk.style.display = "none";
});

document.getElementById("op-about-cont").addEventListener("click", () => {
  let about = document.getElementById("about-cont");
  if (about.style.display == "" || about.style.display == "none") {
    about.style.display = "block";
  } else {
    about.style.display = "none";
  }
});

document.getElementById("op-info-cont").addEventListener("click", () => {
  let info = document.getElementById("info-cont");
  if (info.style.display == "" || info.style.display == "none") {
    info.style.display = "block";
  } else {
    info.style.display = "none";
  }
});
