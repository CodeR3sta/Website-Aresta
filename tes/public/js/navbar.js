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

// tutup
let s_1 = document.getElementById("_1");
let s_2 = document.getElementById("_2");
let s_3 = document.getElementById("_3");
let s_4 = document.getElementById("_4");

s_1.addEventListener("click", () => {
  let cek = document.getElementById("cek");
  cek.checked = false;
});

s_2.addEventListener("click", () => {
  let cek = document.getElementById("cek");
  cek.checked = false;
});

s_3.addEventListener("click", () => {
  let cek = document.getElementById("cek");
  cek.checked = false;
});

s_4.addEventListener("click", () => {
  let cek = document.getElementById("cek");
  cek.checked = false;
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
