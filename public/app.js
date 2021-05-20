const form = document.querySelector('form');
const searchElement = document.querySelector('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(searchElement.value) {
    document.getElementById('main').style.display = 'none';
    document.getElementsByClassName('loader')[0].classList.remove('display-none');
    fetch('http://localhost:3000/weather?address=' + searchElement.value)
      .then(response => response.json()
        .then(data => {
          document.getElementById('main').innerHTML = data.data;
          document.getElementById('main').classList.remove('warning');
          document.getElementById('main').style.display = 'block';
          document.getElementsByClassName('loader')[0].classList.add('display-none');
        }))
  } else {
    document.getElementById('main').classList.add('warning');
    document.getElementById('main').innerHTML = 'Please enter correct address';
  }
})