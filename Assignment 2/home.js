// Loads quote on page load
document.addEventListener("DOMContentLoaded", function() {
  const quoteText = document.getElementById('quote');
  const quoteAuthor = document.getElementById('author');
  fetch(`https://zenquotes.io/api/quotes/`)
    .then(res => res.json())
    .then(data => {
      quoteText.innerHTML = data[0].q;
      quoteAuthor.innerHTML = data[0].a;
    });
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

        if (page === 'home') {
          window.location.href = 'home-page.html';
        } else if (page === 'stocks') {
          window.location.href = 'stocks-page.html';
        } else if (page === 'dogs') {
          window.location.href = 'dogs-page.html';
        }
      }
    };

    annyang.addCommands(commands);
    annyang.start();
  }
}

function stop() {
  annyang.abort();
}