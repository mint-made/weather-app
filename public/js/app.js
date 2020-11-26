// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  // if (!location) {
  //   return console.log('Please enter a location to search');
  // }

  fetch('http://localhost:3000/weather?address=' + location).then(
    (response) => {
      response.json().then(({ error, temperature, location, lat, lon }) => {
        if (error) {
          return console.log(error);
        }
        const message = `It is currently ${temperature} degrees in ${location} / (${lat}, ${lon})`;
        console.log(message);
      });
    }
  );
});
