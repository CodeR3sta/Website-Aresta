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

document.getElementById("op-desk").addEventListener("click", () => {
  let desk = document.getElementById("desk");
  desk.style.display = "flex";
});

document.getElementById("cls-desk").addEventListener("click", () => {
  let desk = document.getElementById("desk");
  desk.style.display = "none";
});

document.getElementById("op-about-cont").addEventListener("click", () => {
  if (window.innerWidth < 901) {
    let about = document.getElementById("about-cont");
  }
});

document.getElementById("op-info-cont").addEventListener("click", () => {
  if (window.innerWidth < 901) {
    let info = document.getElementById("info-cont");
  }
});
