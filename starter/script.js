'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent; // creating the global variable

//❗ Geolocation
///To get the geolocation
// This function takes as an input 2 callback functions:
// First callback function it will be called on succes: Whenever the browser get the coordinates of the current position of the user. // Its called with a parameter
//Second callback is the error callback : which is called when it happen an error while getting the coordinates
//

// 1. To be sure we dont get any errors in an old browser we can test if navigator.geolocation actually exists
// 2. We use the navigator geolocation to get the current position
// 3 We use destructuring to save in a variable latitude , longitutde from position.coords
// 4. We go on google maps we copy the link and we pass in our variables latitude,longitude

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(
        `https://www.google.com/maps/@${latitude},${longitude},15z?entry=ttu`
      );

      const coords = [latitude, longitude]; // creating an array with lat and long
      map = L.map('map').setView(coords, 15); // reassign the global variable

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //Handling Cliks on Map
      map.on('click', function (mapE) {
        mapEvent = mapE; /// reassign the mapEvent,
        form.classList.remove('hidden'); // removing the class
        inputDistance.focus(); // we focus the field on the element
      });
    },
    function () {
      alert('Could not get your position'); // we get alert in the browser if we dont allow the geolocation
    }
  );

///❗Rendering Workout Input Form
form.addEventListener('submit', function (e) {
  e.preventDefault(); // We have to prevent default oterwise (form its reloading in the default)

  //Clear Input Fields
  inputDistance.value =
    inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      ''; // We have to clear the value not the entire element // value = '';

  //Display the marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng; // taking the lat,long from the obj using destructuring
  L.marker([lat, lng]) //  we pass in the lat and lng // to put the pin where we click// we specified an array url [lat,lng]
    .addTo(map) // we add to the map
    .bindPopup(
      L.popup({
        maxWidth: 300,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    ) //creates a Popup and bind it to the marker// we can create an obj with options
    .setPopupContent('Workout') // set the content of the popup
    .openPopup();
});

// Changing from cadence to elevation and back
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); //closest() select the closest parent with that class
});

/// ❗Displayng a map using LEAFLET Library (THIRD PARTY LIBRARY)
/// We go to Download page :
//  1. we can downloaded to our computer if we want.
// 2. or we can use a hosted version of leaflet(a version of this library hosted by someone else)
// 3. We can use a package manager like npm . All we have to do npm install leaflet into our application

/// 1. First thing when we use 3rd party libraryes we have to include it in our site
// For the moment we use the hosted version on CDN
// 2. we copy the link and paste it in the html <head > </head> before of our own script ❗
// 3. In our script we will use the leaflet library
//   By the time our script loads the browser must already downloaded the library
// 4. Sience the order matters we have to specify the defer atribute in the leaflet library code wich we pass in  (We should never put any JS in the header without of any defer or async attributes)
// 5. We need to use the functions wich are defined in the library (Overview page). We copy the code and paste it in our code in the first function of the navigator.goelocation and adapt to our current situation
// 6. We make a const from var // wherever string we pass in to the map() function must be the id name of an element in our html, and is in that element where the map will be displayed
// In our html we need an element with the id of map
// The L is basically the main function that leaflet gives us like an entry point. This is kind of namespace . (Example like Intl() name space for Internalization API)
// This L has a couple of methods what we can use
// The L variable is a global variable wich we can acces from all other scripts
// 7. We create ( const variable) an array coords which contain latitude and longitude (it's a standard) and we pass in to setView() because expects an array
// 8. we pass in to marker() the coords array also
// 9. The tileLayer() . The map what we see on the page it's made of small tiles and the tiles come from the url what is pass openstreetmap// We can use this url to change the appearance to our map :
//10. We have the marker() wich is the marker + popup

//❗ Displayng a Map Marker
// We have to use again the Leaflet Library
//  Next is to bind an eventhandler ,Whenever the user clicks on the map we can then display a marker on the map
// We will render a workout on the map which it's not yet a workout, but we are gone put a pin or a marker on the map and later we can replace thatwith data coming from the workout
// 1. First we have to add the event handler to the map so that we can then handle any incoming clicks
// We need acces to the coordinates of the point that was just clicked
// We cannot use the usual addEventListener it will not work because we will not know where the user click on the map (we will not know the gps coordinates of whatever location the user cliked on the map, it's data that only map knows ),We need acces to the coordinates of the point that was just clicked, We can use something which is available on Leaflet
// 2. This is now where the const variable map what we create comes in to play for first time (we stored the result of creating the map in to the const map variable). It is on this map object now where we can add an eventListener
// We wil use the on() Which it is coming from the Leaflet Library method basically like an eventListener on the map const.  The map object it is generated by the Leaflet, we can see it by the L. It is a special object with a couple of methods and properties on it
// 3. We will use map.on() in the body of first function of the navigator.geolocatin.getCurrentPosition after the marker. We will specified the type of the event and the callback function with an event as parameter. When Leaflet will call the function it will be with a special event created by Leaflet. map is the variable which is the result of calling Leaflet l.map()
// 4. We can take this event  object take the coordinates out of latitude and longitude using destructuring and then add a marker at exactly that point
// 5. In to the L.marker()//  we pass in the lat and lng // to put the pin where we click// we specified an array url [lat,lng]
// In Leaflet we are able to add our own class names to the Popup
// 6. in to the bindPopup() method we create an obj with options passing the options what we want from documentation

//❗ Rendering Workout Input Form
// We want in the eventHandler when user click on the map to render the form taht a new workout can be added and on that from we add an eventListener so whenever that form it is submited only then the marker is rendered on the map
// We manipulate the DOM with adding and removing classes
// 1. In the map.on() we remove the hidden class of the class form.   For a better UX we imemdiatly focus on the km field (on the input element of the distance we call the focus() method)
// 2. We add an eventHandler to the form to submitting it (we want when the form it is submitted a marker to appears on the page,exactly at the place that was previously clicked). We have to do it completly separate out
// 3. We pass in the code which display the marker. // and we try to access map and mapEvent ,Sience map and mapEvent it's not declared in the current scope we have to: 1. Create a global variable for map with let and we dont assign any value to it because it will be assign later in to first navigator function. 2.It is inside of the eventHandler where we get acces to the mapEvent (to that object that will contain the coordinates) However we dont need it there in that handler we dispaly the form, and where we need it it is where the form its submitted And as a way to pass it in to the form event Listener we: For mapEvent we create  a global variable and reassign it  to the function parameter eventHandler map.on() mapEvent = mapE
// Now form it is dispalyed and when we submit that form the marker is then rendered on the map
// 4. All the values in the field should be cleared and also the form should dissapear after we input somethingh. We take the all input elemnts field
// 5. We want when we switch from running to Cycling  the cadence should change to elevation. It is an event which it is triggered whenever we change the value of this select element// On inputType element we add an eventlistener add we select the closest parent with the form row and we toggle the class. And we do the same for inputCadence
//By toggle() the same class on both of them we make sure that it is one of them that's hidden an the other one visible

//❗ Project Architecture
// There are some advanced architecture patterns in JS. But in this small project we will simply use OOP with classes
// Architecure is to give the project a structure. And in that structure we can develop the functionality
// One of the most important aspects of any architecture is to decide where and how to store the data. Data is probably the most fundamental part of any application.
// In this case the data what we need to store and to manage comes directly from the user stories. We will design our classes so that can create objects that will hold this kind of data. that is for now about the architecture of our data.
// The rest of the architecture is gone be more about structuring the code that we already have from previously lectures. And the events that we already have are: event loading of the page; event reciving a postion from the Geolocation API; event Click on the map; event of Change Input Form from running to cyclyng and back; event of submiting form.
// We have to create different functions that will handle these different events.  We will create a big class called App that will hold all of these functions as methods
