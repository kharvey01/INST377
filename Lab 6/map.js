// Creates map centered on the US
var map = L.map('map').setView([39.50, -98.35], 4)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 2,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// Generates random coordinates
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

/* Loop to create markers based off each coordinate and put the coordinates into their 
  respective html elements */
for (var i= 1; i < 4; i++) {
  const markDetail = document.getElementById(`Mark${i}`);

  var latitude = getRandomInRange(30, 35, 3);
  var longitude =  getRandomInRange(-90, -100, 3);
  var marker = L.marker([latitude,longitude]).addTo(map);
  marker.bindPopup(`Marker ${i}`);
  markDetail.innerHTML = (`Marker ${i}: Latitude: ${latitude}, Longitude: ${longitude}`);
  getLocality(latitude,longitude, i);
}

// Gets locality of coordinates and puts it into the html elemen
function getLocality(latitude, longitude, local) {
  const locality = document.getElementById(`local${local}`);
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then((response => response.json()))
    .then((data) => {
      locality.innerHTML = (`Locality: ${data.locality}`);
    });

}



