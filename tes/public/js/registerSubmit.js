var form = document.getElementById("formID");
var submitButton = document.getElementById("submit-tahap2");

form.addEventListener(
  "submit",
  () => {
    // Disable the submit button
    submitButton.setAttribute("disabled", "disabled");
  },
  false
);
