// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherImg = document.querySelector('#weather-img');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  weatherImg.src = '';

  fetch('/weather?address=' + location).then((response) => {
    response
      .json()
      .then(
        ({ error, temperature, location, lat, lon, feelsLike, iconUrl }) => {
          if (error) {
            messageOne.textContent = error;
            return console.log('Error: ' + error);
          }
          const textOne = `${location}, located at (${lat}, ${lon})`;
          const textTwo = `Temperature is ${temperature}\xB0C but feels like ${feelsLike}\xB0C`;
          messageOne.textContent = textOne;
          messageTwo.textContent = textTwo;
          weatherImg.src = iconUrl;
        }
      );
  });
});
