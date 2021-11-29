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
