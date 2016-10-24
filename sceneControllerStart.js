//This file runs at the start and assigns variables referring to scene elements

var debugText;
var debugText2;
var panoElement;

var inDefault = true; //keeps track of which scene has been loaded
var inForest = false; //keeps track of which scene has been loaded
var inCreek = false; //keeps track of which scene has been loaded

var audioForest = new Audio('https://sdykes3.github.io/forestVR/my-img/forestBest.wav');
var audioCreek = new Audio('https://sdykes3.github.io/forestVR/my-img/streamBest.wav');

//looping for audio, in different browsers
if (typeof audioCreek.loop == 'boolean')
{
    audioCreek.loop = true;
}
else
{
    audioCreek.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
if (typeof audioForest.loop == 'boolean')
{
    audioForest.loop = true;
}
else
{
    audioForest.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

var forestStuff;
var creekStuff;
var primitiveStuff;

var maxDistance=0.06; // in km
var locations= [
                  //Busy road by Klaus
                  {
                    name: "Klaus road",
                    latitude : 33.777025,
                    longitude: -84.395491
                  },

                  //GT Campaline
                  {
                    name: "Campanile",
                    latitude : 33.774238,
                    longitude: -84.398073
                  },,

                  //Skiles
                  {
                    name: "Skiles Building",
                    latitude : 33.773576,
                    longitude: -84.395639
                  },

                  //My house, for testing
                  {
                    name: "Psi U",
                    latitude : 33.7774918,
                    longitude: -84.39175829
                  },

                  //South-eastern Piedmont Park, location of historic but currently non-existant stream
                  {
                    name: "Piedmont Park",
                    latitude : 33.781832,
                    longitude: -84.372836
                  },

                  //Penn and Ponce, location of historic but currently non-existant stream
                  {
                    name: "Penn and Ponce",
                    latitude : 33.772584,
                    longitude: -84.379021
                  }
              ];

//Geolocation related variables.
var geolocationCall;
var geolocationOptions = {

    enableHighAccuracy: true,
    //timeout: 5000,
    maximumAge: 0

};





// Wait until the 3d scene has loaded, call run()
var scene = document.getElementById("3dScene");

console.log("Is anything happening?");


if (scene.hasLoaded) {
  run();
}

else {
  scene.addEventListener('loaded', run);
}

function run () {

  console.log("Starting the program.");

  // Initialize all the variables to access the scene objects.
  debugText=document.getElementById("debugText");
  debugText2=document.getElementById("debugText2");
  panoElement=document.getElementById("pano");

  forestStuff=document.getElementById("forestStuff");
  creekStuff=document.getElementById("creekStuff");
  primitiveStuff=document.getElementById("primitiveStuff");

  // Geolocation call
  geolocationCall = navigator.geolocation.watchPosition(checkReceivedLocation,
                                                        error, geolocationOptions);
}
