//This file actually runs commands to get the geolocation started,
//and to set variables on screen.


//0.We wait until the 3d scene has loaded.
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

  // Set the beginning text
  setInitialText();

  // Geolocation call
  geolocationCall = navigator.geolocation.watchPosition(checkReceivedLocation,
                                                        error, geolocationOptions);

}
