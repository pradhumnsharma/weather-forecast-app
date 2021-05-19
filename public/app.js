// document.getElementById('main').innerHTML = '';

const form = document.querySelector('form');
const searchElement = document.querySelector('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('http://localhost:3000/weather?address=' + searchElement.value)
    .then(response => response.json()
      .then(data => document.getElementById('main').innerHTML = data.data))
})