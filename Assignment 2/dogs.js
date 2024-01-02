
// Gets random images and puts them in slider
document.addEventListener("DOMContentLoaded", function() {
  const slider = document.getElementById("dogImages");
  fetch(`https://dog.ceo/api/breeds/image/random/10`)
    .then(res => res.json())
    .then(images => {
      images.message.forEach(element => {
        const image = document.createElement("img");
        image.setAttribute("src", element);
        image.setAttribute("height", "100%");
        image.setAttribute("width", "100%");
        slider.appendChild(image);
      });

      simpleslider.getSlider({
      container: document.getElementById('dogImages'),
      delay: 5
    });
  });

  // Creates and populates breed buttons
  const breeds = document.getElementById("breedButtons");
  fetch(`https://dogapi.dog/api/v2/breeds`)
    .then(res => res.json())
    .then(data => {
      var dogs = data.data;
      dogs.forEach(breed => {
        const button = document.createElement("button");
        button.textContent = `${breed.attributes.name}`;
        button.setAttribute("id",`${breed.id}`);
        button.setAttribute("class", "breed");
        const name = breed.attributes.name.toLowerCase();
        button.setAttribute("name", `${name}`)
        breeds.appendChild(button);
      });
      const buttons = document.querySelectorAll(".breed");
      buttons.forEach(function(button) {
        button.addEventListener("click", function() {
          const id = button.id;
          getBreed(id);
        });
      });
    });
  
  // Function to population breed info box
  async function getBreed(breedId) {
    const button = document.getElementById(breedId);
    const breedBox = document.getElementById("descriptionBox");
    const infoBox = document.createElement("div");
    const name = document.createElement("h1");
    const description = document.createElement("h2");
    const minLife = document.createElement("h2");
    const maxLife = document.createElement("h2");
    
    breedBox.innerHTML = "";

    fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`)
      .then(res => res.json())
      .then(data => {
        var breed = data.data;
        var info = breed.attributes;

        name.textContent = `Name: ${info.name}`;
        description.textContent = `Description: ${info.description}`;
        minLife.textContent = `Min Life: ${info.life.min}`;
        maxLife.textContent = `Max Life: ${info.life.max}`;

        infoBox.setAttribute("id", "info");
        infoBox.appendChild(name);
        infoBox.appendChild(description);
        infoBox.appendChild(minLife);
        infoBox.appendChild(maxLife);

        breedBox.appendChild(infoBox);
      })
  }
})

// Audio controls
function start() {
  if (annyang) {
    const commands = {
      'hello': function () {
        alert('Hello World!');
      },

      'change the color to *color': function(color) {
        document.body.style.backgroundColor = color;
      },

      'navigate to :page': function(page) {
        const lowercase = page.toLowerCase();

        if (lowercase === 'home') {
          window.location.href = 'home-page.html';
        } else if (lowercase === 'stocks') {
          window.location.href = 'stocks-page.html';
        } else if (lowercase === 'dogs') {
          window.location.href = 'dogs-page.html';
        }
      },

      'Load Dog Breed *breed': function(breed) {
        const lowercase = breed.toLowerCase();
        const buttons = document.querySelectorAll(".breed");

        var id = "";
          buttons.forEach(function(button) {
            if(lowercase === button.name){
              button.click();
            }
          })
      }
    };

    annyang.addCommands(commands);
    annyang.start();
  }
}

function stop() {
  annyang.abort();
}

    





