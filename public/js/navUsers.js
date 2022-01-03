document.getElementById("op-nav").addEventListener("click", () => {
  let nav = document.getElementById("mb-nav-users");
  if (nav.style.display == "none") {
    nav.style.display = "flex";
  } else {
    nav.style.display = "none";
  }
});

window.addEventListener("click", (ev) => {
  let tabBtn = document.getElementsByClassName("tablinks");
  let nav = document.getElementById("mb-nav-users");

  for (let i = 0; i < 6; i++) {
    if (ev.target === tabBtn[i]) {
      nav.style.display = "none";
    }
  }
});
