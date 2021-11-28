// show password
document.getElementById("show").addEventListener("change", () => {
  let show = document.getElementById("show");
  let pass = document.getElementById("password");
  if (show.checked) {
    pass.type = "text";
  } else {
    pass.type = "password";
  }
});
