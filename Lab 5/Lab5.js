// Event Listener loads page to input Curreny options
document.addEventListener("DOMContentLoaded", function () {
  
  // Function to add currency options to form
  function populateForm() {
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');
    fetch("https://www.frankfurter.app/currencies")
    .then(res => res.json())
    .then(data => {
      for(const key in data) {
        const option = document.createElement('option')
        option.value = key;
        option.innerHTML = data[key];
        fromCurrency.appendChild(option);
        toCurrency.appendChild(option.cloneNode(true));
      }
    });
  }

  // Adds currency option to form on page
  populateForm();

// Event listener to stop refresh after submit 
document.getElementById("convertForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const fromCurrency = document.getElementById("fromCurrency").value
  const toCurrency = document.getElementById("toCurrency").value
  const amount = document.getElementById("convertNum").value
  const result = document.getElementById("result")

  // Alerts if same currency, else converts the chosen currencies
  if(fromCurrency == toCurrency) {
    alert("You cannot convert to and from the same currency!")
  } else {
    console.log("Amount: ", amount);
    console.log("To: ", toCurrency);
    console.log("From:", fromCurrency);
   fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then(res => res.json())
      .then((data) => {

      // Adds conversion result to page 
      result.innerHTML = (`${amount} ${fromCurrency} is equal to ${data.rates[toCurrency]} ${toCurrency}`);
    });
  } 
})

})