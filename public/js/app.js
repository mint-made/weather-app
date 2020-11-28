// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch('http://localhost:3000/weather?address=' + location).then(
    (response) => {
      response.json().then(({ error, temperature, location, lat, lon }) => {
        if (error) {
          messageOne.textContent = error;
          return console.log('Error: ' + error);
        }
        const textOne = `${location}: (${lat}, ${lon})`;
        const textTwo = `In ${location}: It is currently ${temperature}\xB0C`;
        messageOne.textContent = textOne;
        messageTwo.textContent = textTwo;
      });
    }
  );
});
