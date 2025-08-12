
mapboxgl.accessToken =mapToken;
	mapboxgl.accessToken = 'pk.eyJ1IjoiYWNoaWV2ZXI1NjEiLCJhIjoiY21lMGF1aXA4MDJuMDJrc2VoeWZmZnpzYSJ9.pT8gK7yRAg5-s4qLOP8ipA';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12',
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({color : "red"})
  .setLngLat(listing.geometry.coordinates)  //listing geometry coordinates 
  .setPopup(
    new mapboxgl.Popup({offset: 25}).setHTML(
    `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
    ))
  .addTo(map);

const marker2 = new mapboxgl.Marker({color : "red"})
  .setLngLat(listing.geometry.coordinates)  //listing geometry coordinates 
  .setPopup(
    new mapboxgl.Popup({offset: 25}).setHTML(
    `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
    ))
  .addTo(map);







  



//for satellite view
// mapboxgl.accessToken = 'pk.eyJ1IjoiYWNoaWV2ZXI1NjEiLCJhIjoiY21lMGF1aXA4MDJuMDJrc2VoeWZmZnpzYSJ9.pT8gK7yRAg5-s4qLOP8ipA';
// const map = new mapboxgl.Map({
//   container: 'map', // container ID
//         // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//   style: 'mapbox://styles/mapbox/satellite-v9', // style URL
//   center: [77.2088, 28.6139], // starting position [lng, lat]
//   zoom: 9, // starting zoom
//   projection: 'globe'
//   });
// map.on('style.load', () => {
//   map.setFog({}); // Set the default atmosphere style, since satellite-v9 doesn't include atmosphere by default.
// });
