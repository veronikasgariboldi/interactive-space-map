// Initialize MapLibre map centered on Prague using OpenFreeMap dark style
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/bright', 
  zoom: 1
});

//our own icon/marker - img from wikipedia
const Icon = document.createElement('img');

//icon description
Icon.src = 'International_Space_Station.svg';
Icon.className = 'marker';
Icon.title = 'International Space Station (ISS)';

//ISS Marker on map!
const issMarker = new maplibregl.Marker({ 
    element: Icon,
    anchor: 'center'
  })
    .setLngLat([0,0])  //this will get replaced by the ISS coordinates from the API, its just here to have the marker on the map :)
    .addTo(map); 

//API from: https://wheretheiss.at/w/developer !! very useful
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

//function to get the coordnates of the ISS
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    
    const { latitude, longitude } = data;  //this variable will contain the coordinates

    issMarker.setLngLat([longitude, latitude]);
    map.panTo([longitude, latitude]);
}

getISS(); 
setInterval(getISS, 2000); //this will update the coordinates every 2 seconds, so the ISS marker will move on the map in real time!! exciting