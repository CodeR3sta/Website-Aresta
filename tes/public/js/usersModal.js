let open = document.getElementById('op-modal')
let modal = document.getElementById('modal')
let close1 = document.getElementsByClassName('close')[0]
let close2 = document.getElementsByClassName('closeb')[0  ]
let submit = document.getElementById('submit-modal')

open.onclick = function() {
    modal.style.display = "block";
  }
  
submit.onclick = function() {
  modal.style.display = "none";
}

close1.onclick = function() {
    modal.style.display = "none";
  }

close2.onclick = function() {
  modal.style.display = "none";
}
  
  
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }