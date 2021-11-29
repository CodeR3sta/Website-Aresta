document.getElementById("show").addEventListener("change", () => {
  const show = document.getElementById("show");
  const pass = document.getElementById("password");
  if (show.checked) {
    pass.type = "text";
  } else {
    pass.type = "password";
  }
});
