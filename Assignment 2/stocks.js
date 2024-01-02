// Fills table data on page load
document.addEventListener("DOMContentLoaded", function() {
  const table = document.getElementById("stocksTable");
 
  fetch(`https://tradestie.com/api/v1/apps/reddit`)
    .then(res => res.json())
    .then(data => {
      for(var i = 0; i < 5; i++) {
        const stockRow = document.createElement("tr");
        
        const ticker = document.createElement("td");
        const link = document.createElement("a")
        link.href = `https://finance.yahoo.com/quote/${data[i].ticker}`;
        link.textContent = data[i].ticker;
        ticker.appendChild(link);
        stockRow.appendChild(ticker);
        

        const comments = document.createElement("td");
        comments.textContent = data[i].no_of_comments;
        stockRow.appendChild(comments);

        const sentiment = document.createElement("td");
        const sentimentPic = document.createElement("img");
        if(data[i].sentiment === "Bullish") {
          sentimentPic.src = "images/bullish.avif";
        } else if(data[i].sentiment === "Bearish") {
          sentimentPic.src = "images/bearish.webp";
        }

        sentiment.appendChild(sentimentPic);
        stockRow.appendChild(sentiment);
        table.appendChild(stockRow);
      }
    });

    const lookupButton = document.getElementById("lookup");
    lookupButton.addEventListener("click", getData);
})

  // Converts EPOCH into readable dates
  function convertDate (epoch){
    const date = new Date(epoch);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  //Subtracts a number of days from another day
  function subtractDaysFromDate(date, daysToSubtract) {
    const resultDate = new Date(date); 
    resultDate.setDate(resultDate.getDate() - daysToSubtract);
    return resultDate;
  }

  const date = new Date();
  const ctx = document.getElementById('myChart');

  // Gets data for stock charts and updates/creates chart
  async function getData(stockTicker) {
    const ticker = (document.getElementById("ticker").value).toUpperCase();
    const days = document.getElementById("days").value;

    console.log(ticker);
    console.log(days);

    const date = new Date();
    const currDate = convertDate(date);
    const past = subtractDaysFromDate(date, days);
    const prevDate = convertDate(past);
    
    let chartStatus = Chart.getChart("myChart"); 
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    var data = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${prevDate}/${currDate}?adjusted=true&sort=asc&limit=120&apiKey=GTtiT1ydaYazBuTvAB4qFbCGOpqZVvl0`)
      .then((res) => res.json());
    var stockData = data.results;
    var closingPrices = [];
    var dates = [];
    stockData.forEach(element => {
          closingPrices.push(element.c);
          dates.push(convertDate(element.t));
        });

    const ctx = document.getElementById('myChart');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: '($) Stock Price',
          data: closingPrices,
          borderWidth: 1
        }]
      }
    });
  }

  // Voice commands
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
        },

        'lookup *ticker': function(ticker) {
          document.getElementById("ticker").value = ticker;
          document.getElementById("days").value = 30
          getData();
        }
      };
  
      annyang.addCommands(commands);
      annyang.start();
    }
  }
  
  function stop() {
    annyang.abort();
  }
