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

  //1. Initialize all the variables to access the scene objects.

  leftText=document.getElementById("locationText");  //status, or current location text.
  rightText=document.getElementById("progressText"); //progress text.
  debugText=document.getElementById("debugText"); //progress text.
  debugText2=document.getElementById("debugText2"); //progress text.

  panoElement=document.getElementById("pano");

  forestStuff=document.getElementById("forestStuff");
  creekStuff=document.getElementById("creekStuff");
  primitiveStuff=document.getElementById("primitiveStuff");

  //2.Set the beginning text.
  setInitialText();

  //3.Make the geolocation call.  This function will do the rest of the
  //variable checking for us.
  geolocationCall = navigator.geolocation.watchPosition(checkReceivedLocation,
                                                        error, geolocationOptions);

}
