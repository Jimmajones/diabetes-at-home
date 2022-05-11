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
  let dropdown = document.querySelector('.dropdown')

  if (event.target.classList.contains('toggle')) {
    dropdown.classList.toggle('show')
  } else {
    dropdown.classList.remove('show')
  }
}

// let dropBtn = document.querySelector(".navbar-toggle");
document.addEventListener('click', toggleDropdown)
