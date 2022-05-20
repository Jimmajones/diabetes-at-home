const toggle = (id) => {
  let x = document.getElementById(id)
  let y = document.getElementById('button-' + id)
  if (x.style.display === 'none') {
    x.style.display = 'block'
    y.style.transform = 'rotate(90deg)'
  } else {
    x.style.display = 'none'
    y.style.transform = 'none'
  }
}

let prevComment = null
const commentToggle = (id) => {
  let x = document.getElementById(id)
  if (prevComment != null) {
    let y = document.getElementById(prevComment)
    y.style.display = 'none'
  }
  x.style.display = 'block'
  prevComment = id
}

let toggleAvatar = (numID, avatarID) => {
  let x = document.getElementById(avatarID)
  x.src = '/assets/avatar_' + numID + '.svg'
}

function stepper(btnType) {
  let myInput = document.getElementById('bloodGlucoseLeveltime')
  let btn = get.getElementById(btnType)
  let id = btn.getAttribute('id')
  let min = btn.getAttribute('min')
  let max = btn.getAttribute('max')
  let step = btn.getAttribute('step')
  let val = btn.getAttribute('value')
  let calcStep = id == 'incrment' ? step * 1 : step * -1
  let newValue = parseInt(val) * calcStep
  if (newValue >= min && newValue <= max) {
    myInput.setAttribute('value', newValue)
  }
}

// const dropdown = document.querySelector('.dropdown');
// const dropdownBtn = document.querySelector('.dropdown .dropdown-btn');
// const dropdownMenu = document.querySelector('.dropdown .dropdown-content');
//
// ['mouseover', 'click'].forEach(e => {
//   dropdown.addEventListener(e, function() {
//     dropdownBtn.classList.add("show");
//     dropdownMenu.classList.add("show");
//   });
// });
//
// dropdown.addEventListener('mouseout', function() {
//   dropdownBtn.classList.remove("show");
//   dropdownMenu.classList.remove("show");
// });

const toggleDropdown = (event) => {
  let dropdowns = document.querySelectorAll('.dropdown')

  if (!dropdowns) {
    return
  }

  dropdowns.forEach((dropdown) => {
    if (event.target.classList.contains('toggle')) {
      dropdown.classList.toggle('show')
    } else {
      dropdown.classList.remove('show')
    }
  })
}

// let dropBtn = document.querySelector(".navbar-toggle");
document.addEventListener('click', toggleDropdown)
