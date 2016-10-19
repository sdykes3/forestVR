//This file actually runs commands to get the geolocation started,
//and to set variables on screen.


//0.We wait until the 3d scene has loaded.
var scene = document.getElementById("theScene");

console.log("Is anything happening?");


if (scene.hasLoaded) {
  run();
}

else {
  scene.addEventListener('loaded', run);
}

function run () {

  console.log("Starting the program.");

  //1. Initialize all the variables in Scene One (forest) to access the scene objects.
  // one1=document.getElementById("one1");
  // one2=document.getElementById("one2");
  // one3=document.getElementById("one3");
  // one4=document.getElementById("one4");
  // one5=document.getElementById("one5");
  // one6=document.getElementById("one6");
  // one7=document.getElementById("one7");
  // one8=document.getElementById("one8");
  // one9=document.getElementById("one9");
  // one10=document.getElementById("one10");
  // one11=document.getElementById("one11");
  // one12=document.getElementById("one12");
  // one13=document.getElementById("one13");
  // one14=document.getElementById("one14");
  // one15=document.getElementById("one15");
  // one16=document.getElementById("one16");
  // one17=document.getElementById("one17");
  // one18=document.getElementById("one18");
  // one19=document.getElementById("one19");
  // one20=document.getElementById("one20");
  // one21=document.getElementById("one21");
  // one22=document.getElementById("one22");
  // one23=document.getElementById("one23");
  // one24=document.getElementById("one24");
  // one25=document.getElementById("one25");
  // one26=document.getElementById("one26");
  // one27=document.getElementById("one27");
  // oneLight=document.getElementById("oneLight");
  // oneCam=document.getElementById("oneCam");

  // oneObjects = [one1,one2,one3,one4,one5,one6,one7];

  sceneOneStuff = document.getElementById("sceneOneStuff");


  // leftText=document.getElementById("locationText");  //status, or current location text.
  // rightText=document.getElementById("progressText"); //progress text.
  // debugText=document.getElementById("debugText"); //progress text.

  panoElement=document.getElementById("pano");

  //2.Set the beginning text.
  setInitialText();

  //3.Make the geolocation call.  This function will do the rest of the
  //variable checking for us.
  geolocationCall = navigator.geolocation.watchPosition(checkReceivedLocation,
                                                        error, geolocationOptions);

}
